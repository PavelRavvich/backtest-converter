import {
    Output,
    OnInit,
    Component,
    EventEmitter,
} from '@angular/core';
import {
    FormGroup,
    FormControl,
} from '@angular/forms';
import { pairwise } from 'rxjs/operators';

// Enums
import {
    FilterType,
    ComparisonType,
} from '../../enums';

// Interfaces
import { IFilter } from '../../interfaces';

// Filter by single adviser param
@Component({
    selector: 'app-filter-row',
    templateUrl: './filter-row.component.html',
    styleUrls: ['./filter-row.component.scss']
})
export class FilterRowComponent implements OnInit {

    // Notification about state change
    @Output() public formChange = new EventEmitter<IFilter>();

    // Notification about remove this filter-row instance
    @Output() public removeChange = new EventEmitter<void>();

    // Filter data types enum
    public FilterType = FilterType;

    // Comparison types enum
    public ComparisonType = ComparisonType;

    // Filter form
    public form: FormGroup;

    public ngOnInit(): void {
        this.createForm();
        this.subscribeForm();
        this.subscribeEmitter();
    }

    private createForm(): void {
        this.form = new FormGroup({
            paramSn: new FormControl(null),
            compareType: new FormControl(null),
            filterType: new FormControl(null),
            value: new FormControl(null),
        });

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
                ([ prev, next ]: [ FilterType, FilterType ]) => {
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

    private subscribeEmitter(): void {
        this.form
            .valueChanges
            .subscribe(() => {
                const {
                    value,
                    paramSn,
                    filterType,
                    compareType,
                } = this.form.getRawValue();

                this.formChange.emit({
                    value,
                    paramSn,
                    filterType,
                    compareType,
                    isActive: !this.form.disabled && !this.form.invalid,
                });
            });
    }

    public powerSwitch(): void {
        const {
            value,
            paramSn,
            filterType,
            compareType,
        } = this.form.getRawValue();

        this.form.disabled
            ? this.form.enable()
            : this.form.disable();

        this.form.get('value').setValue(value);
        this.form.get('paramSn').setValue(paramSn);
        this.form.get('filterType').setValue(filterType);
        this.form.get('compareType').setValue(compareType);
    }
}
