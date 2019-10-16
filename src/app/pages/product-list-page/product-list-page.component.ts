import { Component, ViewChildren, QueryList } from '@angular/core';
import { ScrollService } from 'src/app/scroll.service';
import { ScrollAnchorDirective } from 'src/app/scroll-anchor.directive';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.html',
})
export class ProductListPageComponent {
  @ViewChildren(ScrollAnchorDirective)
    private pageAnchors: QueryList<ScrollAnchorDirective>;

  constructor(private scrollService: ScrollService) { }

  public ngAfterViewInit(): void {
    this.pageAnchors.forEach(el =>
      this.scrollService.addAnchor(el.elementReference)
    );
  }
}
