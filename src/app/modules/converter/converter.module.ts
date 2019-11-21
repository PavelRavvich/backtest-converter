// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ConverterRoutingModule } from './converter-routing.module';

// Components
import {
    ListComponent,
    LayoutComponent,
} from './components';
import { FormComponent } from './components/form/form.component';

// Services
import { BacktestService } from './services';

@NgModule({
    declarations: [
        ListComponent,
        LayoutComponent,
        FormComponent,
    ],
    imports: [
        SharedModule,
        CommonModule,
        ConverterRoutingModule,
        ReactiveFormsModule,
    ],
    providers: [
        BacktestService,
    ]
})
export class ConverterModule {
}
