import { Component, Input } from '@angular/core';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { IProduct } from 'src/app/interfaces';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.html',
  styleUrls: ['./product-item.scss']
})
export class ProductItemComponent {
  @Input() public imgUrl = '../../../assets/server-data/images/image-not-found.png';
  @Input() public productTitle = 'Product Title';
  @Input() public productPrice = 0;
  @Input() public productId = 1;

  public faHeart = faHeart;
  public product: IProduct;

  constructor(private storeService: StoreService ) { }

  public OnClick(key: string) {
    this.storeService.saveViewedHistory(key);
  }
}
