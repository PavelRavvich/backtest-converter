import { IFilterColumn } from './filter-column.interface';
import { IFilterParam } from './filter-param.interface';
import { IListRequest } from '@shared/interfaces';

// Request list backtest
export interface IBacktestListRequest extends IListRequest{

    // Filters by columns
    columns: IFilterColumn[];

    // Filters by params
    params: IFilterParam[];

}
