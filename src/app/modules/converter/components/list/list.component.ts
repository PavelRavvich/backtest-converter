import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import {
    TableService,
    BacktestService,
} from '../../services';

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
    public columns = [];

    // Pagination
    public readonly pagination = {
        options: [ 20, 50, 100 ],
        pageIndex: 0,
        pageSize: 20,
        total: 0,
    };

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly tableService: TableService,
        private readonly backtestService: BacktestService,
    ) {}

    public ngOnInit() {
        this.loadPage();
    }

    private loadPage(): void {
        this.columns = this.tableService.getColumns();

        const data = this.backtestService.getList({
            limit: this.pagination.pageSize,
            offset: this.pagination.pageIndex * this.pagination.pageSize,
        });

        this.rows = data.items;
        this.pagination.total = data.total;
    }

    public onPageChange(event: PageEvent): void {
        this.pagination.pageIndex = event.pageIndex;
        this.pagination.pageSize = event.pageSize;
        this.loadPage();
    }

    public back(): void {
        this.tableService.resetColumns();
        this.router.navigate([ '..' ], {
            relativeTo: this.route,
            queryParamsHandling: 'merge',
        });
    }
}
