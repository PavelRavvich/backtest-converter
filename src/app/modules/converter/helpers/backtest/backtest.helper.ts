// Interfaces
import { IBacktest } from '../../interfaces';

export function parseBacktest(data: string): IBacktest {
    const item = data.split('\t');
    return  {
        number: +item[0],
        profit: +item[1],
        value: +item[2],
        profitable: +item[3],
        mathExpectation: +item[4],
        dropDownCurrency: +item[5],
        profitToDropDown: +item[1] / +item[5],
        dropDownPercent: +item[6].slice(0, -1),
        ... parseParams(item.slice(8, item.length)),
    };
}

export function parseParams(data: string[]): any {
    const params = {} as any;
    data.forEach(item => {
        const arr = item.trim()
            .split('=');
        params[arr[0]] = +arr[1];
    });
    return params;
}
