import { FormGroup } from '@angular/forms';

// Interfaces
import {
    IFilter,
    IBacktest,
} from '../../interfaces';

// Enums
import {
    FilterType,
    ComparisonType,
} from '../../enums';

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
        value: filterType !== FilterType.Boolean ? +value : value,
        isActive: form.valid && form.touched,
    };
}

const commands: Array<{
    is: (filterType: FilterType, comparisonType: ComparisonType) => boolean,
    execute: (item: IBacktest, filter: IFilter) => boolean
}> = [{
        is: (filterType: FilterType, comparisonType: ComparisonType): boolean =>
            filterType === FilterType.Boolean || comparisonType === ComparisonType.Equal,
        execute: (item: IBacktest, filter: IFilter): boolean =>
            item[filter.key] === filter.value
    }, {
        is: (filterType: FilterType, comparisonType: ComparisonType): boolean =>
            filterType === FilterType.Numeric && comparisonType === ComparisonType.Less,
        execute: (item: IBacktest, filter: IFilter): boolean =>
            item[filter.key] <= filter.value
    }, {
        is: (filterType: FilterType, comparisonType: ComparisonType): boolean =>
            filterType === FilterType.Numeric && comparisonType === ComparisonType.More,
        execute: (item: IBacktest, filter: IFilter): boolean =>
            item[filter.key] >= filter.value
    }, {
        is: (filterType: FilterType, comparisonType: ComparisonType): boolean =>
            filterType === FilterType.Numeric && comparisonType === ComparisonType.Range,
        execute: (item: IBacktest, filter: IFilter): boolean =>
            item[filter.key] >= filter.valueFrom && item[filter.key] <= filter.valueTo,
    }
];

export const compare = (item: IBacktest, filter: IFilter): boolean =>
    commands
        .find(
            command => command.is(filter.filterType, filter.compareType)
        )
        .execute(item, filter);
