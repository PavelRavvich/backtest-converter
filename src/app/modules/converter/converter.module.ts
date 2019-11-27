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
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
    declarations: [
        FormComponent,
        ListComponent,
        LayoutComponent,
        FilterRowComponent,
        FilterComponent,
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
