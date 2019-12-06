import { Injectable } from '@angular/core';

const DEFAULT_COLUMNS = [
    { title: 'Проход', value: 'number' },
    { title: 'Всего сделок', value: 'value' },
    { title: 'Прибыль/Просадка', value: 'profitToDropDown' },
    { title: 'Прибыль', value: 'profit' },
    { title: 'Просадка $', value: 'dropDownCurrency' },
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

    public addColumn(column: { title: string, value: string }): void {
        this.config.columns.push(column);
    }

    public reset(): void {
        this.config.params = [];
        this.config.columns = [ ... DEFAULT_COLUMNS ];
    }

    public getColumns(): Array<{ title: string, value: string }> {
        if (this.config.params.length && this.config.columns.indexOf('params') === -1) {
            this.config.columns.push({ title: 'Параметры', value: 'params' });
        }
        return this.config.columns;
    }

    public getParams(): string[] {
        return this.config.params;
    }
}
