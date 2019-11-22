import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';

// Services
import { BacktestService } from '../../services';

// Interfaces
import { ICase } from '../../interfaces';

// List cases
@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    // Table rows
    public rows: ICase[] = [];

    // Displayed columns
    public columns = [
        'number',
        'profit',
        'value',
        'profitable',
        'mathExpectation',
        'dropDownCurrency',
        'dropDownPercent',
        'params',
    ];

    // Pagination
    public readonly pagination = {
        options: [ 100, 250, 500, 1000 ],
        pageIndex: 0,
        pageSize: 100,
        count: 0,
    };

    constructor(
        private readonly backtestService: BacktestService
    ) {}

    public ngOnInit() {
        this.rows = this.backtestService.cases;
    }

    public onPageChange(event: PageEvent): void {
        this.pagination.pageIndex = event.pageIndex;
        this.pagination.pageSize = event.pageSize;
    }
}
