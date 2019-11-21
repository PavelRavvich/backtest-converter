import { ValueProvider } from '@angular/core';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material';
import { Platform } from '@angular/cdk/platform';

// Services
import { AppDateAdapter } from './mat-datepicker.service';

// Locale provider
export const matDatepickerLocaleProvider: ValueProvider = {
  provide: MAT_DATE_LOCALE,
  useValue: 'ru-RU',
};

// Format provider
export const matDatepickerFormatProvider: ValueProvider = {
  provide: MAT_DATE_FORMATS,
  useValue: {
    parse: {
      dateInput: 'DD.MM.YYYY',
    },
    display: {
      dateInput: 'DD.MM.YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM-YYYY',
    },
  },
};

// Провайдер адаптера
export const matDatepickerAdapterProvider = {
  provide: DateAdapter,
  useClass: AppDateAdapter,
  deps: [MAT_DATE_LOCALE, Platform],
};
