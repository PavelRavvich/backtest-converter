import { Injectable } from '@angular/core';
import { Observable, ReplaySubject} from 'rxjs';

// Interfaces
import {
    IBacktest,
    IBacktestList,
} from '../interfaces';
import { IListRequest } from '@shared/interfaces';

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

    // Back tests store
    private readonly store = new ReplaySubject<IBacktest[]>(1);

    public setStore(bactests: IBacktest[]): void {
        this.store.next(bactests);
    }

    public getList(request: IListRequest): Observable<IBacktestList> {
        return new Observable((obs) => {
            obs.next(mock);
        });
    }
}
