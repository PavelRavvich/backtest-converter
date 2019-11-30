import { Injectable } from '@angular/core';

const DEFAULT_COLUMNS = [
    'number',
    'value',
    'profitToDropDown',
    'profit',
    'dropDownCurrency',
];

// Test case table config service
@Injectable()
export class TableService {

    private readonly config: any = {
        columns: [ ... DEFAULT_COLUMNS ],
        params: [],
    };

    public addParam(param: string): void {
        this.config.params.push(param);
    }

    public addColumn(column: string): void {
        this.config.columns.push(column);
    }

    public reset(): void {
        this.config.params = [];
        this.config.columns = [ ... DEFAULT_COLUMNS ];
    }

    public getColumns(): string[] {
        if (this.config.params.length && this.config.columns.indexOf('params') === -1) {
            this.config.columns.push('params');
        }
        return this.config.columns;
    }

    public getParams(): string[] {
        return this.config.params;
    }
}
