import { Component, AfterContentInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.html',
  styleUrls: ['./loader.scss']
})
export class LoaderComponent implements AfterContentInit {
  public isLoading = true;
  public bulletsArray = new Array(12).fill('');

  constructor(private loaderService: LoaderService) { }

  public ngAfterContentInit() {
    this.loaderService.isLoading
      .subscribe(result => this.isLoading = result);
  }
}
