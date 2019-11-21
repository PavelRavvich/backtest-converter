import { NativeDateAdapter } from '@angular/material';

export class AppDateAdapter extends NativeDateAdapter {

  public parse(value: any): Date | null {

    if (typeof value === 'string') {
      const arr = value.split('.');
      const month = arr.shift();
      const day = arr.shift();
      const yyyy = arr.shift();
      value = [ day, month, yyyy ]
        .filter(val => !!val)
        .join('.');
    }

    return super.parse(value);
  }
}
