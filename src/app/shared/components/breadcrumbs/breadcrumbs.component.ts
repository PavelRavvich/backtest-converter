import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {

    // Breadcrumbs list
    @Input() public items: any[];

    // Select breadcrumbs
    @Output() public select = new EventEmitter<any>();
}

