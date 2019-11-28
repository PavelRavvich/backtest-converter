import { FormGroup } from '@angular/forms';

// Interfaces
import {
    IFilterParam,
    IFilterColumn,
} from '../interfaces';

export function toFilterParam(id: string, form: FormGroup): IFilterParam {
    const {
        value,
        paramSn,
        valueTo,
        valueFrom,
        filterType,
        compareType,
    } = form.value;

    return {
        id,
        value,
        paramSn,
        valueTo,
        valueFrom,
        filterType,
        compareType,
        isActive: form.valid,
    };
}

export function toFilterColumn(key: string, form: FormGroup): IFilterColumn {
    const {
        value,
        compareType,
    } = form.value;

    return {
        key,
        value,
        compareType,
        isActive: form.valid,
    };
}
