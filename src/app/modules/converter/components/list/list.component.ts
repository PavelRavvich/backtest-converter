import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    // Table rows
    public rows = [];

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
        options: [ 5, 10, 25, 100 ],
        pageIndex: 0,
        pageSize: 10,
        count: 0,
    };

    constructor() {
    }

    ngOnInit() {
    }

    public onPageChange(event: PageEvent): void {
        this.pagination.pageIndex = event.pageIndex;
        this.pagination.pageSize = event.pageSize;
    }
}
