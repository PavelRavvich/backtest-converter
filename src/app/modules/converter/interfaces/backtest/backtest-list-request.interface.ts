import { IFilter } from '../filter/filter.interface';
import { IListRequest } from '@shared/interfaces';

// Request list backtest
export interface IBacktestListRequest extends IListRequest {

    // Filters by columns and params
    filters: IFilter[];

}
