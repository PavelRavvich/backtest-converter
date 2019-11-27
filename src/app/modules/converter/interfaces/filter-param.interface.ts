import { ComparisonType, FilterParamType } from '../enums';

// Filter param output
export interface IFilterParam {

    // Filter-row id
    id: string;

    // Using or not current filter-param-list-param
    isActive: boolean;

    // Param name for collection
    paramSn: string;

    // Filter type numeric or boolean
    filterType: FilterParamType;

    // Comparision type for different filter-param-list-param-row types
    compareType: ComparisonType;

    // Value for comparision
    value?: boolean | number;
}
