import { Injectable, NgZone } from '@angular/core';
import { Sort } from '@angular/material';
import { Observable, of } from 'rxjs';

// Interfaces
import {
    IFilter,
    IBacktest,
    IBacktestList,
    IBacktestListRequest,
} from '../../interfaces';

// Helpers
import {
    compare,
    parseBacktest,
    removeDuplicates,
} from '../../helpers';

@Injectable()
export class BacktestService {

    // Total loaded backtest
    private store: IBacktest[] = [];

    // Active backtest for view
    private data: IBacktest[] = [];

    constructor(
        private readonly ngZone: NgZone,
    ) {}

    public setStore(content: string): Observable<void> {
        return new Observable<void>((observer) => {
            this.store = this.ngZone
                .runOutsideAngular(
                    (): IBacktest[] =>
                        removeDuplicates(
                            content
                                .trim()
                                .split('\n')
                                .map(
                                    item => parseBacktest(item)
                                )
                        )
                );
            observer.next();
            observer.complete();
        });
    }

    public getList(request: IBacktestListRequest): Observable<IBacktestList> {
        debugger
        this.data = this.store;
        this.filter(request.filters, compare);
        this.sort(request.sort);
        return of({
            total: this.data.length,
            items: this.data.slice(
                request.offset,
                request.offset + request.limit
            ),
        });
    }

    private filter(
        filters: IFilter[],
        comparator: (
            item: IBacktest,
            filter: IFilter,
        ) => boolean,
    ): void {
        filters.forEach(filter =>
            this.data = this.ngZone
                .runOutsideAngular(
                    (): IBacktest[] => this.data
                        .filter(
                            item => comparator(item, filter)
                        )
                )
        );
    }

    private sort(sort: Sort): void {
        if (!sort.direction) { return; }
        const compareFn = sort.direction === 'asc'
            ? (a, b) => b[sort.active] - a[sort.active]
            : (a, b) => a[sort.active] - b[sort.active];
        this.data = this.data.sort(compareFn);
    }
}
