import { Injectable } from '@angular/core';

// Interfaces
import { ICase, ICaseList } from '../interfaces';
import { IListRequest } from '@shared/interfaces';

@Injectable()
export class BacktestService {
    private store: ICase[];

    public setStore(store: ICase[]): void {
        this.store = store;
    }

    public getList(request: IListRequest): ICaseList {
        return {
            total: this.store.length,
            items: this.store.slice(request.offset, request.offset + request.limit)
        };
    }
}
