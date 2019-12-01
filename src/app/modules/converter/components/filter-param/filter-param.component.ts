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

// Helpers
import { skipControlValidation } from '@shared/helpers';

// Services
import { TableService } from '../../services';

// Filter by single adviser param
@Component({
    selector: 'app-filter-param',
    templateUrl: './filter-param.component.html',
    styleUrls: ['./filter-param.component.scss']
})
export class FilterParamComponent implements OnInit {

    // Filter form
    @Input() public form: FormGroup;

    // Notification about remove this filter
    @Output() public removeChange = new EventEmitter<string>();

    // Params for autocomplete
    public params: string[];

    // Filter data types enum
    public FilterType = FilterParamType;

    // Comparison types enum
    public ComparisonType = ComparisonType;

    constructor(
        private readonly tableService: TableService,
    ) {
        this.params = tableService.getParams();
    }

    public ngOnInit(): void {
        this.subscribeForm();
    }

    private subscribeForm(): void {
        const {
            value,
            valueTo,
            valueFrom,
            filterType,
            compareType,
        } = this.form.controls;

        filterType.valueChanges
            .pipe(pairwise())
            .subscribe(([ prev, next ]: [ FilterParamType, FilterParamType ]) => {
                if (prev !== next) {
                    skipControlValidation(compareType);
                    skipControlValidation(valueFrom);
                    skipControlValidation(valueTo);
                    skipControlValidation(value);
                }
            });

        compareType.valueChanges
            .pipe(pairwise())
            .subscribe(([ prev, next ]: [ ComparisonType, ComparisonType ]) => {
                if (prev !== next) {
                    skipControlValidation(value);
                    skipControlValidation(valueTo);
                    skipControlValidation(valueFrom);
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
