import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductShortInfoService } from '../services/product-short-info.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html'
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private shortInfoService: ProductShortInfoService,
    private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.productService
      .getProduct(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe(data =>
        this.shortInfoService.similarOptions = {
          sex: data.sex,
          category: data.category,
          id: data.id
        });
  }
}
