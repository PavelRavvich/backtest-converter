import { PageEvent } from '@angular/material';
import { finalize, take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import {
    TableService,
    StoreService,
} from '../../services';

// Interfaces
import {
    IBacktest,
    IBacktestList,
    IFilterParamConfig,
    IFilterColumnConfig,
} from '../../interfaces';

// Helpers
import {
    toFilterParam,
    toFilterColumn,
} from '../../helpers';
import { randomUUID } from '@shared/helpers';


// List cases
@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    // Params filter list
    public filtersParam: IFilterParamConfig[] = [];

    // Columns filter list
    public filtersColumn: IFilterColumnConfig[] = [
        {
            key: 'profit',
            form: new FormGroup({
                name: new FormControl('Прибыль'),
                value: new FormControl(null),
                compareType: new FormControl(null),
            })
        },
        {
            key: 'dropDownCurrency',
            form: new FormGroup({
                name: new FormControl('Просадка'),
                value: new FormControl(null),
                compareType: new FormControl(null),
            }),
        },
        {
            key: 'profitToDropDown',
            form: new FormGroup({
                name: new FormControl('Прибыль/Просадка'),
                value: new FormControl(null),
                compareType: new FormControl(null),
            })
        },
        {
            key: 'value',
            form: new FormGroup({
                name: new FormControl('Сделок'),
                value: new FormControl(null),
                compareType: new FormControl(null),
            })
        },
    ];

    // View loader
    public isLoading = false;

    // Table rows
    public rows: IBacktest[] = [];

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
        private readonly storeService: StoreService,
    ) {
        this.columns = this.tableService.getColumns();
    }

    public ngOnInit() {
        this.loadPage();
    }

    private loadPage(): void {
        this.isLoading = true;
        this.storeService.getList({
            limit: this.pagination.pageSize,
            offset: this.pagination.pageIndex * this.pagination.pageSize,
            params: this.filtersParam.map(item => toFilterParam(item.id, item.form)),
            columns: this.filtersColumn.map(item => toFilterColumn(item.key, item.form)),
        })
            .pipe(
                take(1),
                finalize(() => this.isLoading = false),
            )
            .subscribe(
                (data: IBacktestList) => {
                    this.rows = data.items;
                    this.pagination.total = data.total;
                }
            );
    }

    public onPageChange(event: PageEvent): void {
        this.pagination.pageIndex = event.pageIndex;
        this.pagination.pageSize = event.pageSize;
        this.loadPage();
    }

    // Add new filter to filter list
    public add(): void {
        this.filtersParam.push({
            id: randomUUID(),
            form: new FormGroup({
                paramSn: new FormControl(null),
                compareType: new FormControl(null),
                filterType: new FormControl(null),
                value: new FormControl(null),
            })
        });
    }

    // Remove filter param
    public removeFilterParam(id: string): void {
        this.filtersParam = this.filtersParam.filter(item => id !== item.id);
    }

    public back(): void {
        this.tableService.resetColumns();
        this.router.navigate([ '..' ], {
            relativeTo: this.route,
            queryParamsHandling: 'merge',
        });
    }
}
