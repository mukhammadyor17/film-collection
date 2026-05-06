import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appFocus]',
})
export class Focus implements AfterViewInit {
  private el = inject(ElementRef<HTMLInputElement>);

  ngAfterViewInit(): void {
    this.el.nativeElement.focus();
  }
}
