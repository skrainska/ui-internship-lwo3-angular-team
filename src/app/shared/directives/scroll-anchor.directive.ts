import { Directive, ElementRef, AfterViewInit, AfterContentInit, Input } from '@angular/core';

import { ScrollService } from '../services';

@Directive({
  selector: '[appScrollAnchor]'
})
export class ScrollAnchorDirective implements AfterContentInit {
  @Input('appScrollAnchor') title: string;

  constructor(
    private elementReference: ElementRef,
    private scrollService: ScrollService
  ) {
    console.log('kek', this.elementReference);
  }

  public ngAfterContentInit(): void {
   this.addToScrollService();
  }

  public addToScrollService(): void {
    this.scrollService.addAnchor(this.elementReference);
  }
}
