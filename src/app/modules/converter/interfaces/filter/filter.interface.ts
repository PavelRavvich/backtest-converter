import { ComparisonType, FilterParamType } from '../../enums';

// Filter output
export interface IFilter {

    // Param name for collection
    key: string;

    // Using or not current filter
    isActive: boolean;

    // Filter type numeric or boolean
    filterType: FilterParamType;

    // Comparision type
    compareType: ComparisonType;

    // Value for comparision in not range mode
    value?: boolean | number;

    // Value for comparision in range mode
    valueFrom?: boolean | number;

    // Value for comparision in range mode
    valueTo?: boolean | number;
}
