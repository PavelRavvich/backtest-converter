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

// Helpers
import { toCase} from '../../helpers';
import { subControl } from '@shared/helpers';

// Services
import {
    TableService,
    BacktestService,
} from '../../services';

// Form for collecting backtest data from MT4
@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly tableService: TableService,
        private readonly backtestService: BacktestService,
    ) { }

    // Data conversation process
    public isProcess: boolean;

    // Data form
    public form: FormGroup;

    public ngOnInit(): void {
        this.createForm();
        this.subscribeForm();
    }

    private createForm(): void {
        this.form = new FormGroup({
            content: new FormControl(null, [ Validators.required ]),
            profitable: new FormControl(null),
            mathExpectation: new FormControl(null),
            dropDownPercent: new FormControl(null),
            params: new FormControl(true),
            paramsLength: new FormControl(17),
        });
    }

    private subscribeForm(): void {
        const {
            params,
            paramsLength,
        } = this.form.controls;

        subControl(params, paramsLength);
    }

    public convert(): void {
        this.isProcess = true;

        this.setDataStore();
        this.setDatatableConfig();

        this.form.get('content').reset();
        this.isProcess = false;

        this.router.navigate([ 'list' ], {
            relativeTo: this.route,
            queryParamsHandling: 'merge',
        });
    }

    private setDataStore(): void {
        const {
            content,
            paramsLength,
        } = this.form.value;

        this.backtestService.setStore(
            content
                .trim()
                .split('\n')
                .map(item => toCase(item, paramsLength))
                .sort((a, b) => b.profitToDropDown - a.profitToDropDown)
        );
    }

    private setDatatableConfig() {
        const {
            params,
            profitable,
            dropDownPercent,
            mathExpectation,
        } = this.form.value;

        const columns = [];
        if (profitable) { columns.push('profitable'); }
        if (dropDownPercent) { columns.push('dropDownPercent'); }
        if (mathExpectation) { columns.push('mathExpectation'); }
        if (params) { columns.push('params'); }

        this.tableService.addColumns(columns);
    }
}
