import {
    OnInit,
    Component,
} from '@angular/core';
import {
    FormGroup,
    Validators,
    FormControl,
} from '@angular/forms';

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
        private readonly backtest: BacktestService
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
        const { content, paramsLength } = this.form.value;
        const lines = content.split('\n');
        this.backtest.cases = lines.map(item => toCase(item, paramsLength));
    }
}
