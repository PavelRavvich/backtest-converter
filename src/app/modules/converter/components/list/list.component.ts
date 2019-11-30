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
import {
    Sort,
    PageEvent,
} from '@angular/material';
import { finalize } from 'rxjs/operators';

// Services
import {
    TableService,
    BacktestService,
} from '../../services';

// Interfaces
import {
    IBacktest,
    IBacktestList,
} from '../../interfaces';

// Helpers
import {
    toIFilter,
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
    public readonly paramForms: FormGroup[] = [];

    // Columns filter list
    public readonly columnForms: FormGroup[] = [
        new FormGroup({
            key: new FormControl('value'),
            name: new FormControl('Всего сделок'),
            value: new FormControl(null),
            valueTo: new FormControl(null),
            valueFrom: new FormControl(null),
            compareType: new FormControl(null),
        }),
        new FormGroup({
            key: new FormControl('profit'),
            name: new FormControl('Прибыль $'),
            value: new FormControl(null),
            valueTo: new FormControl(null),
            valueFrom: new FormControl(null),
            compareType: new FormControl(null),
        }),
        new FormGroup({
            key: new FormControl('dropDownCurrency'),
            name: new FormControl('Просадка $'),
            value: new FormControl(null),
            valueTo: new FormControl(null),
            valueFrom: new FormControl(null),
            compareType: new FormControl(null),
        }),
        new FormGroup({
            key: new FormControl('profitToDropDown'),
            name: new FormControl('Прибыль/Просадка $'),
            value: new FormControl(null),
            valueTo: new FormControl(null),
            valueFrom: new FormControl(null),
            compareType: new FormControl(null),
        }),
    ];

    // View loader
    public isLoading = false;

    // Table rows
    public rows: IBacktest[] = [];

    // Displayed columns
    public columns = [];

    // Header sort
    private readonly sort: Sort = {
        active: null,
        direction: null,
    };

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
        private readonly storeService: BacktestService,
    ) {
        this.columns = this.tableService.getColumns();
    }

    public ngOnInit() {
        this.loadPage();
    }

    public loadPage(): void {
        this.isLoading = true;

        this.storeService.getList({
            sort: this.sort,
            limit: this.pagination.pageSize,
            offset: this.pagination.pageIndex * this.pagination.pageSize,
            params: this.paramForms.map(item => toIFilter(item)).filter(item => item.isActive),
            columns: this.columnForms.map(item => toIFilter(item)).filter(item => item.isActive),
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
        this.paramForms.push(
            new FormGroup({
                id: new FormControl(randomUUID()),
                key: new FormControl(null),
                filterType: new FormControl(null),
                compareType: new FormControl(null),
                value: new FormControl(null),
                valueFrom: new FormControl(null),
                valueTo: new FormControl(null),
            })
        );
    }

    // Remove filter param
    public removeFilterParam(id: string): void {
        const swap = this.paramForms
            .filter(item => id !== item.get('id').value);
        this.paramForms.length = 0;
        this.paramForms.push(... swap);
    }

    public sorting(sort: Sort): void {
        this.sort.active = sort.active;
        this.sort.direction = sort.direction;
        this.loadPage();
    }

    public back(): void {
        this.tableService.reset();
        this.router.navigate([ '..' ], {
            relativeTo: this.route,
            queryParamsHandling: 'merge',
        });
    }
}
