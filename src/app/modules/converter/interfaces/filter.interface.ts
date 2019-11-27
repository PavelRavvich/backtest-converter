import { ComparisonType, FilterType } from '../enums';

// Filter output
export interface IFilter {

    // Filter-row id
    id: string;

    // Using or not current filter-row
    isActive: boolean;

    // Param name for collection
    paramSn: string;

    // Filter type numeric or boolean
    filterType: FilterType;

    // Comparision type for different filter-row types
    compareType: ComparisonType;

    // Value for comparision
    value?: boolean | number;
}
