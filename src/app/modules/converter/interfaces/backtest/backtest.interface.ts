// Backtest item
export interface IBacktest {

    // Adviser input parameters.
    params?: any;

    // Number of backtest
    number: number;

    // Profit of all deals in currency
    profit: number;

    // Deals amount
    value: number;

    // Profitable in percent from start deposit
    profitable: number;

    // Math expectations
    mathExpectation: number;

    // Drop down in currencies
    dropDownCurrency: number;

    // Drop down in percentage from start deposit
    dropDownPercent: number;

    // Coefficient profit/dropdown
    profitToDropDown: number;

}
