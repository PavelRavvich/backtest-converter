import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';

// Services
import {
    matDatepickerAdapterProvider,
    matDatepickerFormatProvider,
    matDatepickerLocaleProvider,
    matPaginatorIntlRuProvider
} from './services';

@NgModule({
  declarations: [],
  imports: [
      CommonModule,
      SharedModule,
      HttpClientModule,
      RouterModule,
      ReactiveFormsModule,
  ],
    providers: [
        matPaginatorIntlRuProvider,
        matDatepickerAdapterProvider,
        matDatepickerFormatProvider,
        matDatepickerLocaleProvider,
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: { duration: 5000, verticalPosition: 'top' },
        },
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
