import {Injectable, NgZone} from '@angular/core';
import {Observable, of, ReplaySubject, Subscriber} from 'rxjs';

// Interfaces
import {
    IBacktest,
    IBacktestList,
} from '../interfaces';
import { IListRequest } from '@shared/interfaces';

// Helpers
import { toTestCase } from '../helpers';

const mock = {
    total: 1,
    items: [
        {
            params: '',
            number: '',
            profit: '',
            value: '',
            profitable: '',
            mathExpectation: '',
            dropDownCurrency: '',
            dropDownPercent: '',
            profitToDropDown: 1,
        }
    ]
};

@Injectable()
export class StoreService {

    private store: IBacktest[] = [];

    constructor(private readonly ngZone: NgZone) {}

    public setStore(content: string, paramsLength: number): Observable<void> {
        return new Observable<void>((observer) => {
            this.store = this.ngZone.runOutsideAngular((): IBacktest[] => {
                return content
                    .trim()
                    .split('\n')
                    .map(item => toTestCase(item, paramsLength))
                    .sort((a, b) => b.profitToDropDown - a.profitToDropDown);
            });
            observer.next();
            observer.complete();
        });
    }

    public getList(request: IListRequest): Observable<IBacktestList> {
        return of({
            total: this.store.length,
            items: this.store
        });
    }
}
