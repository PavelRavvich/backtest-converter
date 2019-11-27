import { ComparisonType } from '../enums';

// Result of column filter
export interface IFilterColumn {

    // Key of column of IBacktest
    key: string;

    // Using or not current filter
    isActive: boolean;

    // Comparision type
    compareType: ComparisonType;

    // Value for comparision
    value: number;

}
