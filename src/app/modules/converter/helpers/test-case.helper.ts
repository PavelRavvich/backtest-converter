import { IBacktest } from '../interfaces';

export function toTestCase(data: string, paramsLength: number): IBacktest {
    const item = data.split('\t');
    return {
        number: item[0],
        profit: item[1],
        value: item[2],
        profitable: item[3],
        mathExpectation: item[4],
        dropDownCurrency: item[5],
        dropDownPercent: item[6],
        profitToDropDown: +item[1] / +item[5],
        params: paramsLength && toParams(item, paramsLength),
    };
}

export function toParams(data: string[], paramsLength: number): any {
    return data.slice(paramsLength * -1).join(', ');
}
