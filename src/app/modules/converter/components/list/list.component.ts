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

// Enums
import {
    ViewMode,
    FilterType,
} from '../../enums';

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
    filterFactory,
} from '../../helpers';


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
    public readonly columnForms: FormGroup[] = [];

    // Filter view modes enum
    public ViewMode = ViewMode;

    // View loader
    public isLoading = false;

    // Table rows
    public rows: IBacktest[] = [];

    // Displayed columns
    public columns = [];

    // Displayed params
    public params = [];

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
        this.params = this.tableService.getParams();
        this.columns = this.tableService.getColumns()
            .map(item => item.value);
        debugger
    }

    public ngOnInit() {
        this.loadPage();
    }

    public applyFilters(): void {
        this.pagination.pageIndex = 0;
        this.loadPage();
    }

    public loadPage(): void {
        this.isLoading = true;

        this.storeService.getList({
            sort: this.sort,
            limit: this.pagination.pageSize,
            offset: this.pagination.pageIndex * this.pagination.pageSize,
            filters: [
                ... this.paramForms.map(item => toIFilter(item)).filter(item => item.isActive),
                ... this.columnForms.map(item => toIFilter(item)).filter(item => item.isActive),
            ],
        })
            .pipe(finalize(() => this.isLoading = false))
            .subscribe(
                (data: IBacktestList) => {
                    this.rows = data.items;
                    this.pagination.total = data.total;
                }
            );
    }

    // Pagination change handler
    public onPageChange(event: PageEvent): void {
        this.pagination.pageIndex = event.pageIndex;
        this.pagination.pageSize = event.pageSize;
        this.loadPage();
    }

    // Add new param filter to filter list
    public addParamFilter(): void {
        this.paramForms.push(filterFactory());
    }

    // Add new column filter to filter list
    public addColumnFilter(): void {
        this.columnForms.push(filterFactory(true));
    }

    // Remove filter param
    public removeFilterParam(id: string): void {
        const swap = this.paramForms
            .filter(item => id !== item.get('id').value);
        this.paramForms.length = 0;
        this.paramForms.push(... swap);
    }

    // Remove filter column
    public removeFilterColumn(id: string): void {
        const swap = this.columnForms
            .filter(item => id !== item.get('id').value);
        this.columnForms.length = 0;
        this.columnForms.push(... swap);
    }

    // Table sort handler
    public sorting(sort: Sort): void {
        this.sort.active = sort.active;
        this.sort.direction = sort.direction;
        this.loadPage();
    }

    // Navigate back
    public back(): void {
        this.tableService.reset();
        this.router.navigate([ '..' ], {
            relativeTo: this.route,
            queryParamsHandling: 'merge',
        });
    }
}
