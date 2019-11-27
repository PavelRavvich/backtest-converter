// Backtest item
export interface IBacktest {

    // Adviser input parameters.
    params: any;

    // Number of backtest
    number: string;

    // Profit of all deals in currency
    profit: string;

    // Deals amount
    value: string;

    // Profitable in percent from start deposit
    profitable: string;

    // Math expectations
    mathExpectation: string;

    // Drop down in currencies
    dropDownCurrency: string;

    // Drop down in percentage from start deposit
    dropDownPercent: string;

    // Coefficient profit/dropdown
    profitToDropDown: number;

}
