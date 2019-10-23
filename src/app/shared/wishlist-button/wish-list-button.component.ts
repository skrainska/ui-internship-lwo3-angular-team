import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Store } from '@ngrx/store';
import { IAppState } from '../../store/app.store';
import { AddToWishList, RemoveFromWishList, SetToWishList } from '../../store/actions/wish-list.actions';
import { getLiked } from '../../store/selectors/wish-list.selectors';

import { Observable } from 'rxjs';

import { faHeart } from '@fortawesome/free-solid-svg-icons';

@AutoUnsubscribe()
@Component({
  selector: 'app-wish-list-button',
  templateUrl: './wish-list-button.html',
  styleUrls: ['./wish-list-button.scss']
})
export class WishListButtonComponent implements OnInit, OnDestroy {
  @Input() public productId: string;
  @Input() public wishClass: string;

  public faHeart = faHeart;
  public isLiked: boolean;
  public liked$: Observable<Array<string>>;

  constructor(private store: Store<IAppState>) { }

  public ngOnInit() {
    const localStorageLiked = JSON.parse(localStorage.getItem('liked'));

    if (localStorageLiked) {
      this.store.dispatch(new SetToWishList(localStorageLiked));
      this.isLiked = localStorageLiked.includes(this.productId);
    }
  }

  public toggleLike() {
    this.isLiked = !this.isLiked;

    this.isLiked
      ? this.store.dispatch(new AddToWishList(this.productId))
      : this.store.dispatch(new RemoveFromWishList(this.productId));

    this.setAllToLocalStorage();
  }

  public setAllToLocalStorage() {
    this.liked$ = this.store.select(getLiked);
    let stringArray;

    this.liked$.subscribe(data => stringArray = JSON.stringify(data));
    localStorage.setItem('liked', stringArray);
  }

  public ngOnDestroy() { }
}