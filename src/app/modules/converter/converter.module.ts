// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { ConverterRoutingModule } from './converter-routing.module';

// Components
import {
    ListComponent,
    FormComponent,
    LayoutComponent,
    FilterRowComponent,
} from './components';

// Services
import {
    TableService,
    BacktestService,
} from './services';

@NgModule({
    declarations: [
        FormComponent,
        ListComponent,
        LayoutComponent,
        FilterRowComponent,
    ],
    imports: [
        SharedModule,
        CommonModule,
        ReactiveFormsModule,
        ConverterRoutingModule,
    ],
    providers: [
        TableService,
        BacktestService,
    ]
})
export class ConverterModule {
}
