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

// Helpers
import { subControl } from '@shared/helpers';

// Services
import {
    TableService,
    BacktestService,
} from '../../services';
import {from} from 'rxjs';
import {MatCheckboxChange} from '@angular/material';


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

    // Adviser input param keys
    public params: string[] = [];

    // Uploaded content
    public content = new FormControl(null, [ Validators.required ]);

    // Optional columns
    public readonly columns = [
        { title: 'Прибыльность', value: 'profitable'},
        { title: 'Просадка %', value: 'dropDownPercent'},
        { title: 'Матожидание', value: 'mathExpectation'},
    ];

    public ngOnInit(): void {
    }

    public load(): void {
        this.isLoader = true;
        const fn = () => this.backtestService
            .setStore(this.content.value)
            .pipe(finalize(() => { this.isLoader = false; }))
            .subscribe(() => {
                this.router.navigate([ 'list' ], {
                    relativeTo: this.route,
                    queryParamsHandling: 'merge',
                });
            });
        // Crutch for view loader
        setTimeout(fn, 200);
    }

    private changeColumns(column: string, event: MatCheckboxChange) {
        event.checked
            ? this.tableService.addColumn(column)
            : this.tableService.removeColumn(column);
    }

    private changeParams(column: string, event: MatCheckboxChange) {
        event.checked
            ? this.tableService.addParam(column)
            : this.tableService.removeParam(column);
    }

    public paste() {
        window.clientInformation.clipboard.readText()
            .then(value => {
                this.content.setValue(value);
                if (value.indexOf('\n') !== -1) {
                    const columns = value
                        .split('\n', 1)[0]
                        .split('\t');
                    this.params = columns
                        .slice(8, columns.length)
                        .map(item => item.split('=')[0]);
                } else {
                    // TODO handle error...
                }
            });
    }
}
