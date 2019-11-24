import {
  Directive,
  ElementRef,
  Input
} from '@angular/core';

import * as Inputmask from 'inputmask';

// Mask for input
@Directive({
  selector: '[appInputMask]'
})
export class InputMaskDirective {

  constructor(private readonly el: ElementRef) {}

  // Properties mask
  @Input() public set appInputMask(value: any) {
    Inputmask(value)
      .mask(this.el.nativeElement);
  }
}
