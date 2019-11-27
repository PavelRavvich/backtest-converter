import { IBacktest } from './backtest.interface';

export interface IBacktestList {

    // Total items in storage
    total: number;

    // Backtest items
    items: IBacktest[];

}
