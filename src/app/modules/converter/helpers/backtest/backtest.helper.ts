import { IBacktest } from '../../interfaces';

export function parseBacktest(data: string): IBacktest {
    const item = data.split('\t');
    return {
        number: +item[0],
        profit: +item[1],
        value: +item[2],
        profitable: +item[3],
        mathExpectation: +item[4],
        dropDownCurrency: +item[5],
        dropDownPercent: +item[6].slice(-1),
        profitToDropDown: +item[1] / +item[5],
        // params: paramsLength && parseParams(item, paramsLength),
    };
}

export function parseParams(data: string[], paramsLength: number): any {
    return data.slice(paramsLength * -1).join(', ');
}
