import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { pairwise } from 'rxjs/operators';

// Enums
import { ComparisonType, FilterType } from '../../enums';

// Interfaces
import { IFilter } from '../../interfaces';

// Filter by single adviser param
@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

    // Notification about state change
    @Output() public stateChange = new EventEmitter<IFilter>();

    // Notification about remove this filter instance
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
    }

    private createForm(): void {
        this.form = new FormGroup({
            paramSn: new FormControl(null),
            compareType: new FormControl(null),
            filterType: new FormControl(null),
            valueNumber: new FormControl(null),
            valueBoolean: new FormControl(null),
        });

        this.form
            .valueChanges
            .subscribe(() => {
                const {
                    paramSn,
                    filterType,
                    compareType,
                    valueNumber,
                    valueBoolean,
                } = this.form.getRawValue();

                this.stateChange.emit({
                    paramSn,
                    filterType,
                    compareType,
                    isActive: !this.form.disabled && !this.form.invalid,
                    value: filterType === FilterType.Boolean ? valueBoolean : valueNumber,
                });
            });
    }

    private subscribeForm(): void {
        const {
            filterType,
            compareType,
            valueNumber,
            valueBoolean,
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

                        valueNumber.reset();
                        valueNumber.markAsPristine();
                        valueNumber.setErrors(null);

                        valueBoolean.reset();
                        valueBoolean.markAsPristine();
                        valueBoolean.setErrors(null);
                    }
                }
            );
    }

    public power(): void {
        const {
            paramSn,
            filterType,
            compareType,
            valueNumber,
            valueBoolean,
        } = this.form.getRawValue();

        this.form.disabled
            ? this.form.enable()
            : this.form.disable();

        this.form.get('paramSn').setValue(paramSn);
        this.form.get('filterType').setValue(filterType);
        this.form.get('compareType').setValue(compareType);
        this.form.get('valueNumber').setValue(valueNumber);
        this.form.get('valueBoolean').setValue(valueBoolean);
    }
}
