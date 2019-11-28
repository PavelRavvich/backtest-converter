import { ComparisonType, FilterParamType } from '../enums';

// Filter param output
export interface IFilterParam {

    // Filter-row id
    id: string;

    // Using or not current filter
    isActive: boolean;

    // Param name for collection
    paramSn: string;

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
