import { Injectable } from '@angular/core';

// Test case table config service
@Injectable()
export class TableService {

    private readonly defaultColumns = [
        'number',
        'value',
        'profitToDropDown',
        'profit',
        'dropDownCurrency',
    ];

    private config: any = {
        columns: [],
        params: [],
    };

    public addParam(param: string): void {
        this.config.params.push(param);
    }

    removeParam(param: string): void {
        this.config.params.filter(item => item !== param);
    }
    public addColumn(column: string): void {
        this.config.columns = [ ... this.defaultColumns, column ];
    }

    public removeColumn(column: string): void {
        this.config.columns.filter(item => item !== column);
    }

    public resetColumns(): void {
        this.config.columns = this.defaultColumns;
    }

    public getColumns(): string[] {
        if (this.config.params.length) {
            this.config.columns.push('params');
        }
        return this.config.columns.length
            ? this.config.columns
            : this.defaultColumns;
    }
}
