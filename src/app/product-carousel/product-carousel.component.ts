import { Component, OnInit, AfterViewInit, AfterViewChecked, ViewChild, HostListener, ElementRef } from '@angular/core';
import { ProductShortInfoService } from '../product-short-info.service';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { IProductShortInfo } from '../product-short-info';

const BREAK_POINTS = {
  mobile: {
    width: 575,
    slideNum: 1
  },
  tablet_S: {
    width: 576,
    slideNum: 2
  },
  tablet_M: {
    width: 768,
    slideNum: 3
  },
  laptop_S: {
    width: 992,
    slideNum: 4
  }
};

const MARGIN = 10;

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss']
})
export class ProductCarouselComponent implements OnInit, AfterViewInit, AfterViewChecked {
  public faArrowLeft = faArrowLeft;
  public faArrowRight = faArrowRight;

  @ViewChild('products', {static: false}) products: ElementRef;
  @ViewChild('productsContainer', {static: false}) productsContainer: ElementRef;

  public canMoveToNext = true;
  public canMoveToPrev = false;
  public productContainer: HTMLElement;
  public productData: Array<IProductShortInfo>;
  public productArray: Array<IProductShortInfo>;
  public itemWidth: number;
  public visibleNum: number;
  public pageWidth: number;
  public position = 0;
  public additionalScroll = 0;
  public containerScroll = 0;

  constructor(private productList: ProductShortInfoService) { }

  @HostListener('window:resize', [])
  public onResize(): void {
    this.pageWidth = window.innerWidth;

    this.resetPositionValue();
    this.toggleButtonsState();
    this.indicateViewNumber();
  }

  @HostListener('touchend', [])
  public handleTouch(): void {
    this.additionalScroll = this.productsContainer.nativeElement.scrollLeft % this.itemWidth;

    if (this.additionalScroll) {
      this.productsContainer.nativeElement.scrollLeft > this.containerScroll
        ? this.moveTo('next')
        : this.moveTo('prev');
    }

    this.containerScroll = this.productsContainer.nativeElement.scrollLeft;

    this.toggleButtonsState();
  }

  public ngOnInit(): void {
    this.productList.getShortInfo()
      .subscribe((data) => this.productData = data);

    this.pageWidth = window.innerWidth;
  }

  public ngAfterViewInit(): void {
    this.productContainer = this.products.nativeElement;

    this.indicateViewNumber();
  }

  public toggleButtonsState(): void {
    const maxPosition = -this.itemWidth * (this.productArray.length - this.visibleNum);

    this.canMoveToPrev = this.position !== 0;
    this.canMoveToNext = this.position !== maxPosition;
  }

  public moveTo(direction: string): void {
    if (direction === 'next') {
      const newPosition = this.position - this.itemWidth * this.visibleNum;
      const possiblePosition = -this.itemWidth * (this.productArray.length - this.visibleNum);
      this.position = newPosition >= possiblePosition ? newPosition : possiblePosition;
    }

    if (direction === 'prev') {
      const newPosition = this.position + this.itemWidth * this.visibleNum;
      const possiblePosition = 0;
      this.position = newPosition >= possiblePosition ? possiblePosition : newPosition;
    }

    this.productContainer.style.marginLeft = this.position + this.additionalScroll + 'px';

    this.toggleButtonsState();
  }

  public ngAfterViewChecked(): void {
    const [_, ...rest] = this.products.nativeElement.childNodes;
    this.productArray = [...rest];

    if (this.productArray.length) {
      this.itemWidth = [...this.products.nativeElement.childNodes][1].childNodes[0].offsetWidth + MARGIN;
    }
  }

  public indicateViewNumber(): void {
    switch (true) {
      case this.pageWidth > BREAK_POINTS.laptop_S.width:
        this.visibleNum = BREAK_POINTS.laptop_S.slideNum;
        break;
      case this.pageWidth > BREAK_POINTS.tablet_M.width:
        this.visibleNum = BREAK_POINTS.tablet_M.slideNum;
        break;
      case this.pageWidth > BREAK_POINTS.tablet_S.width:
        this.visibleNum = BREAK_POINTS.tablet_S.slideNum;
        break;
      default:
        this.visibleNum = BREAK_POINTS.mobile.slideNum;
    }
  }

  public resetPositionValue(): void {
    this.position = 0;
    this.productContainer.style.marginLeft = 0 + 'px';
    this.productsContainer.nativeElement.scrollLeft = 0;
  }
}