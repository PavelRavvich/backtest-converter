import { ComparisonType, FilterType } from '../enums';

// Filter output
export interface IFilter {

    // Using or not current filter
    isActive: boolean;

    // Param name for collection
    paramSn: string;

    // Filter type numeric or boolean
    filterType: FilterType;

    // Comparision type for different filter types
    compareType: ComparisonType;

    // Value for comparision
    value?: boolean | number;
}
