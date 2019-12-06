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
    ViewMode,
    FilterType,
    ComparisonType,
} from '../../enums';

// Helpers
import { skipControlValidation } from '@shared/helpers';

// Services
import { TableService } from '../../services';

// Filter by single adviser param
@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

    @Input() public mode: ViewMode;

    // Filter form
    @Input() public form: FormGroup;

    // Notification about remove this filter
    @Output() public removeChange = new EventEmitter<string>();

    // View modes
    public ViewMode = ViewMode;

    // Filter data types enum
    public FilterType = FilterType;

    // Comparison types enum
    public ComparisonType = ComparisonType;

    // Filter by columns
    public columns: Array<{ title: string, value: string }>;

    // Filter by params (autocomplete data)
    public params: string[];

    constructor(
        private readonly tableService: TableService,
    ) {
        this.columns = this.tableService.getColumns();
        this.params = this.tableService.getParams();
    }

    public ngOnInit(): void {
        this.subscribeForm();
    }

    // Form control dependencies subscription
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
            .subscribe(([ prev, next ]: [ FilterType, FilterType ]) => {
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

    // Filtering params by title for autocomplete
    public getParams(title: string): string[] {
        return !title
            ? this.params
            : this.params
                .filter(item => item.indexOf(title) !== -1);
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
