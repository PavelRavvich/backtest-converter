import { randomUUID } from '@shared/helpers';
import {
    FormGroup,
    FormControl,
} from '@angular/forms';

// Enums
import { FilterType } from '../../enums';

export const filterFactory = (isColumn: boolean = false) =>
    new FormGroup({
        id: new FormControl(randomUUID()),
        key: new FormControl(null),
        value: new FormControl(null),
        valueTo: new FormControl(null),
        valueFrom: new FormControl(null),
        compareType: new FormControl(null),
        filterType: new FormControl(isColumn ? FilterType.Numeric : null),
    });
