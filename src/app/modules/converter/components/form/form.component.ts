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
import { toCase } from '../../helpers';

// Services
import { BacktestService } from '../../services';

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
        private readonly backtestService: BacktestService,
    ) {}

    // Data form
    public form: FormGroup;

    public ngOnInit(): void {
        this.form = new FormGroup({
            content: new FormControl(null, [ Validators.required ]),
            paramsLength: new FormControl(17, [ Validators.required ])
        });
    }

    public convert(): void {
        const {
            content,
            paramsLength,
        } = this.form.value;

        this.form.get('content').reset();

        this.backtestService.cases = content
            .trim()
            .split('\n')
            .map(item => toCase(item, paramsLength))
            .sort((a, b) => b.profitToDropDown - a.profitToDropDown);

        this.router.navigate([ 'list' ], {
            relativeTo: this.route,
            queryParamsHandling: 'merge',
        });
    }
}
