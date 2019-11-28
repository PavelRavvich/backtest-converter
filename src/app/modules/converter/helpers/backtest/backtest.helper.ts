import { IBacktest } from '../../interfaces';

export function parseBacktest(data: string, paramsLength: number): IBacktest {
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
        params: paramsLength && paramsParams(item, paramsLength),
    };
}

export function paramsParams(data: string[], paramsLength: number): any {
    return data.slice(paramsLength * -1).join(', ');
}
