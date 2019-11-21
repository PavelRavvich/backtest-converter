import {
    OnInit,
    Component,
} from '@angular/core';
import {
    FormGroup,
    Validators,
    FormControl,
} from '@angular/forms';

// Form for collecting backtest data from MT4
@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

    constructor() {
    }

    // Data form
    public form: FormGroup;

    public ngOnInit(): void {
        this.form = new FormGroup({
            content: new FormControl(null, [Validators.required])
        });
    }

}
