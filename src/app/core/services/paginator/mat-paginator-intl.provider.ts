import { ClassProvider } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';

// Services
import { MatPaginatorIntlRu } from './mat-paginator-intl.service';

// Provider
export const matPaginatorIntlRuProvider: ClassProvider = {
  provide: MatPaginatorIntl,
  useClass: MatPaginatorIntlRu,
};
