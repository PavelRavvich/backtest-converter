// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ConverterRoutingModule } from './converter-routing.module';

// Components
import { LayoutComponent } from './components';

@NgModule({
    declarations: [
        LayoutComponent,
    ],
    imports: [
        SharedModule,
        CommonModule,
        ConverterRoutingModule,
    ]
})
export class ConverterModule {
}
