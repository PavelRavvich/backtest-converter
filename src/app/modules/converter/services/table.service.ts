import { Injectable } from '@angular/core';

// Test case table config service
@Injectable()
export class TableService {

    private config: any = {
        columns: [
            'number',
            'value',
            'profitToDropDown',
            'profit',
            'dropDownCurrency',
        ]
    };

    public addColumns(columns: string[]): void {
        this.config.columns.push(... columns);
    }

    public getColumns(): string[] {
        return this.config.columns;
    }
}
