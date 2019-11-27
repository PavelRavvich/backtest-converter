import {
    Input,
    Output,
    OnInit,
    Component,
    EventEmitter,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { pairwise } from 'rxjs/operators';

// Enums
import {
    FilterParamType,
    ComparisonType,
} from '../../enums';

// Filter by single adviser param
@Component({
    selector: 'app-filter-param',
    templateUrl: './filter-param.component.html',
    styleUrls: ['./filter-param.component.scss']
})
export class FilterParamComponent implements OnInit {

    // Filter id
    @Input() public id: string;

    // Filter form
    @Input() public form: FormGroup;

    // Notification about remove this filter-param-list-param-row instance
    @Output() public removeChange = new EventEmitter<string>();

    // Filter data types enum
    public FilterType = FilterParamType;

    // Comparison types enum
    public ComparisonType = ComparisonType;

    public ngOnInit(): void {
        this.subscribeForm();
    }

    private subscribeForm(): void {
        const {
            value,
            filterType,
            compareType,
        } = this.form.controls;

        filterType
            .valueChanges
            .pipe(pairwise())
            .subscribe(
                ([ prev, next ]: [ FilterParamType, FilterParamType ]) => {
                    if (prev !== next) {
                        compareType.reset();
                        compareType.markAsPristine();
                        compareType.setErrors(null);

                        value.reset();
                        value.markAsPristine();
                        value.setErrors(null);
                    }
                }
            );
    }
}
