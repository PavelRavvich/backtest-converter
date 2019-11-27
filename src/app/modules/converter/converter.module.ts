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
    FilterParamComponent,
} from './components';

// Services
import {
    TableService,
    StoreService,
} from './services';
import { FilterColumnComponent } from './components/filter-column/filter-column.component';

@NgModule({
    declarations: [
        FormComponent,
        ListComponent,
        LayoutComponent,
        FilterParamComponent,
        FilterColumnComponent,
    ],
    imports: [
        SharedModule,
        CommonModule,
        ReactiveFormsModule,
        ConverterRoutingModule,
    ],
    providers: [
        TableService,
        StoreService,
    ]
})
export class ConverterModule {
}
