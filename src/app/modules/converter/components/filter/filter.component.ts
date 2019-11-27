import { Component, OnInit } from '@angular/core';

// Interfaces
import {IFilter, IFilterConfig} from '../../interfaces';

// Services
import { UuidService } from '@shared/services';

// Filters holder
@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

    constructor(
        public readonly uuidService: UuidService,
    ) {}

    // Filter config list
    public confList: IFilterConfig[] = [];

    public ngOnInit(): void {
    }

    public add(): void {
        this.confList.push({
            id: this.uuidService.random(),
            position: this.confList.length,
        });
    }

    public formChange(filter: IFilter): void {
        console.log(filter);
    }

    public remove(id: string): void {
        this.confList = this.confList.filter(item => id !== item.id);
    }
}
