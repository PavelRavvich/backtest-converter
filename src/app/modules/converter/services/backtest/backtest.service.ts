import { Injectable, NgZone } from '@angular/core';
import {Observable, of } from 'rxjs';

// Interfaces
import {
    IBacktest,
    IBacktestList, IBacktestListRequest,
} from '../../interfaces';

// Helpers
import { toBacktest } from '../../helpers';

@Injectable()
export class BacktestService {

    private store: IBacktest[] = [];

    constructor(private readonly ngZone: NgZone) {}

    public setStore(content: string, paramsLength: number): Observable<void> {
        return new Observable<void>((observer) => {
            this.store = this.ngZone.runOutsideAngular((): IBacktest[] => {
                return content
                    .trim()
                    .split('\n')
                    .map(item => toBacktest(item, paramsLength));
            });
            observer.next();
            observer.complete();
        });
    }

    public getList(request: IBacktestListRequest): Observable<IBacktestList> {
        console.log(request);
        return of({
            total: this.store.length,
            items: this.store
        });
    }
}
