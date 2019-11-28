import { FormGroup } from '@angular/forms';

// Interfaces
import {
    IFilter,
} from '../../interfaces';

// Enums
import { FilterParamType} from '../../enums';

export function toIFilter(form: FormGroup): IFilter {
    const {
        key,
        value,
        valueTo,
        valueFrom,
        filterType,
        compareType,
    } = form.value;

    return {
        key,
        filterType,
        compareType,
        valueTo: +valueTo,
        valueFrom: +valueFrom,
        value: compareType === FilterParamType.Numeric ? +value : value,
        isActive: form.valid && form.touched,
    };
}

