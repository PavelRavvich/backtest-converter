import { KeyValue } from '@angular/common';

// Interfaces
import { IBacktest } from '../../interfaces';

export function parseBacktest(data: string): IBacktest {
    const item = data.split('\t');
    const backtest = {
        number: +item[0],
        profit: +item[1],
        value: +item[2],
        profitable: +item[3],
        mathExpectation: +item[4],
        dropDownCurrency: +item[5],
        dropDownPercent: +item[6].slice(0, -1),
        profitToDropDown: +item[1] / +item[5],
    };

    parseParams(item.slice(8, item.length))
        .forEach(param => backtest[param.key] = param.value);

    return backtest;
}

export function parseParams(data: string[]): Array<KeyValue<string, number>> {
    const params = new Array<KeyValue<string, number>>();
    data.forEach(item => {
        const arr = item
            .trim()
            .split('=');
        params.push({
            key: arr[0],
            value: +arr[1]
        });
    });
    return params;
}
