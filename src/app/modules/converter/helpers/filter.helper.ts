import { FormGroup } from '@angular/forms';

// Interfaces
import { IFilterParam } from '../interfaces';

export function toFilterParam(id: string, form: FormGroup): IFilterParam {
    const {
        value,
        paramSn,
        filterType,
        compareType,
    } = form.value;

    return {
        id,
        value,
        paramSn,
        filterType,
        compareType,
        isActive: form.valid,
    };
}
