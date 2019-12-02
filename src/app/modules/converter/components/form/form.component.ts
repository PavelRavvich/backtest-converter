import {
    OnInit,
    Component,
} from '@angular/core';
import {
    FormGroup,
    Validators,
    FormControl,
} from '@angular/forms';
import {
    Router,
    ActivatedRoute,
} from '@angular/router';
import { finalize } from 'rxjs/operators';

// Services
import {
    TableService,
    BacktestService,
} from '../../services';


// Form for collecting backtest data from MT4
@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly tableService: TableService,
        private readonly backtestService: BacktestService,
    ) { }

    // Data conversation process
    public isLoader = false;

    // Form
    public form: FormGroup;

    // Adviser input param keys
    public params: string[] = [];

    // Optional columns
    public readonly columns: Array<{ title: string, controlName: string }> = [
        { title: 'Прибыльность', controlName: 'profitable'},
        { title: 'Просадка %', controlName: 'dropDownPercent'},
        { title: 'Матожидание', controlName: 'mathExpectation'},
    ];

    public ngOnInit(): void {
        this.createForm();
    }

    private createForm(): void {
        this.form = new FormGroup({
            content: new FormControl(null, [ Validators.required ]),
            params: new FormGroup({}),
            columns: new FormGroup({}),
        });
    }

    // Move to next step
    public next(): void {
        this.isLoader = true;
        const fn = () =>
            this.backtestService
                .setStore(this.form.get('content').value)
                .pipe(finalize(() => { this.isLoader = false; }))
                .subscribe(() => {
                    this.configureTable();
                    this.router.navigate([ 'list' ], {
                        relativeTo: this.route,
                        queryParamsHandling: 'merge',
                    });
                });
        // Crutch for view loader
        setTimeout(fn, 200);
    }

    // Save datatable config into service
    private configureTable(): void {
        this.columns.forEach(column => {
            if (this.form.get('columns').get(column.controlName).value) {
                this.tableService.addColumn(column.controlName);
            }
        });

        this.params.forEach(param => {
            if (this.form.get('params').get(param).value) {
                this.tableService.addParam(param);
            }
        });
    }

    // Paste backtest data from clipboard
    public paste() {
        window.clientInformation.clipboard.readText()
            .then(content => {
                this.form.get('content').setValue(content);
                if (content.indexOf('\n') !== -1) {
                    this.initParamForm();
                    this.initColumnForm();
                }
            });
    }

    // Init input params as form
    private initParamForm(): void {
        const columns = this.form.get('content').value
            .split('\n', 1)[0]
            .split('\t');
        this.params = columns
            .slice(8, columns.length)
            .map(item => item.split('=')[0]);

        const paramsForm = this.form.get('params') as FormGroup;
        this.params.forEach(controlName =>
            paramsForm.addControl(controlName, new FormControl()));
    }

    // Init adviser input params as form
    private initColumnForm(): void {
        const columns = this.form.get('columns') as FormGroup;
        this.columns.forEach(item =>
            columns.addControl(item.controlName, new FormControl()));
    }
}
