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
        columns: []
    };

    public addColumns(columns: string[]): void {
        this.config.columns = [ ... this.defaultColumns, ...columns ];
    }

    public resetColumns(): void {
        this.config.columns = this.defaultColumns;
    }

    public getColumns(): string[] {
        return this.config.columns;
    }
}
