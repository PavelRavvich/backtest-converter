import { MatPaginatorIntl } from '@angular/material';

// Русификация пагинатора
export class MatPaginatorIntlRu extends MatPaginatorIntl {
  itemsPerPageLabel = 'Показывать элементов:';
  nextPageLabel = 'Следующая страница';
  previousPageLabel = 'Предыдущая страница';
  firstPageLabel = 'Первая страница';
  lastPageLabel = 'Последняя страница';

  getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `0 из ${length}`;
    }

    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} из ${length}`;
  };
}
