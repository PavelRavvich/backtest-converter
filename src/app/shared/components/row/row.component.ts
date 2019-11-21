import { Component } from '@angular/core';

// Row of elements
@Component({
    selector: 'app-row',
    template: '<ng-content></ng-content>',
})
export class RowComponent {}
