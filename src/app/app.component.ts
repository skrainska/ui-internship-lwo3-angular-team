import {
  Component, QueryList, ViewChildren, OnInit, OnDestroy
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ScrollService } from './shared/services';
import { ScrollAnchorDirective } from './shared/directives';

@AutoUnsubscribe()
@Component({
  selector: 'app-root',
  templateUrl: './app.html'
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChildren(ScrollAnchorDirective)
    private pageAnchors: QueryList<ScrollAnchorDirective>;

  constructor(private scrollService: ScrollService, private router: Router) { }

  public isHomePage: boolean;
  public routerSub: Subscription;

  public ngOnInit(): void {
    this.routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe(() => {
      this.scrollService.resetAnchors();
      this.pageAnchors.forEach(el =>
        this.scrollService.addAnchor(el.elementReference));
      this.isHomePage = window.location.pathname === '/home';
    });
  }

  public ngOnDestroy(): void { }
}
