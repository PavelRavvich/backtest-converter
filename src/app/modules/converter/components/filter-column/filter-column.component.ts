import {
    OnInit,
    Input,
    Component,
} from '@angular/core';
import { pairwise } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

// Enums
import { ComparisonType } from '../../enums';

// Helpers
import { skipControlValidation } from '@shared/helpers';

@Component({
    selector: 'app-filter-column',
    templateUrl: './filter-column.component.html',
    styleUrls: ['./filter-column.component.scss']
})
export class FilterColumnComponent implements OnInit {

    // Filter form
    @Input() public form: FormGroup;

    // Comparison types enum
    public ComparisonType = ComparisonType;

    public ngOnInit(): void {
        this.subscribeForm();
    }

    private subscribeForm(): void {
        const {
            value,
            valueTo,
            valueFrom,
            compareType,
        } = this.form.controls;

        compareType.valueChanges
            .pipe(pairwise())
            .subscribe(([ prev, next ]: [ ComparisonType, ComparisonType ]) => {
                if (prev !== next) {
                    if (prev !== ComparisonType.Range && next === ComparisonType.Range) {
                        skipControlValidation(value);
                    } else if (prev === ComparisonType.Range && next !== ComparisonType.Range) {
                        skipControlValidation(valueFrom);
                        skipControlValidation(valueTo);
                    }
                }
            });
    }

    // Switch on/off filter
    public switchOn() {
        this.form.disabled
            ? this.form.enable()
            : this.form.disable();

        const compareType = this.form.get('compareType').value;
        if (compareType) {
            if (compareType === ComparisonType.Range) {
                skipControlValidation(this.form.get('value'));
            } else {
                skipControlValidation(this.form.get('valueFrom'));
                skipControlValidation(this.form.get('valueTo'));
            }
        }
    }
}
