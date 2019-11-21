import { Component } from '@angular/core';

// Карточка
@Component({
    selector: 'app-card',
    template: '<ng-content></ng-content>',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent {}

