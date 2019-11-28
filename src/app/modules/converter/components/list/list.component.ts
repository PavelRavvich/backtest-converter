import {
    OnInit,
    Component,
} from '@angular/core';
import {
    Router,
    ActivatedRoute,
} from '@angular/router';
import {
    FormGroup,
    FormControl,
} from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { PageEvent } from '@angular/material';

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
    public readonly filtersParam: IFilterParamConfig[] = [];

    // Columns filter list
    public readonly filtersColumn: IFilterColumnConfig[] = [
        {
            key: 'value',
            form: new FormGroup({
                name: new FormControl('Всего сделок'),
                value: new FormControl(null),
                valueTo: new FormControl(null),
                valueFrom: new FormControl(null),
                compareType: new FormControl(null),
            })
        },
        {
            key: 'profit',
            form: new FormGroup({
                name: new FormControl('Прибыль $'),
                value: new FormControl(null),
                valueTo: new FormControl(null),
                valueFrom: new FormControl(null),
                compareType: new FormControl(null),
            })
        },
        {
            key: 'dropDownCurrency',
            form: new FormGroup({
                name: new FormControl('Просадка $'),
                value: new FormControl(null),
                valueTo: new FormControl(null),
                valueFrom: new FormControl(null),
                compareType: new FormControl(null),
            }),
        },
        {
            key: 'profitToDropDown',
            form: new FormGroup({
                name: new FormControl('Прибыль/Просадка $'),
                value: new FormControl(null),
                valueTo: new FormControl(null),
                valueFrom: new FormControl(null),
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
            .pipe(finalize(() => this.isLoading = false))
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
                filterType: new FormControl(null),
                compareType: new FormControl(null),
                value: new FormControl(null),
                valueFrom: new FormControl(null),
                valueTo: new FormControl(null),
            })
        });
    }

    // Remove filter param
    public removeFilterParam(id: string): void {
        const swap = this.filtersParam
            .filter(item => id !== item.id);
        this.filtersParam.length = 0;
        this.filtersParam.push(... swap);
    }

    public back(): void {
        this.tableService.resetColumns();
        this.router.navigate([ '..' ], {
            relativeTo: this.route,
            queryParamsHandling: 'merge',
        });
    }
}
