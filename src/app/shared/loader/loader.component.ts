import { Component, AfterContentInit } from '@angular/core';
import { LoaderService } from '../../loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements AfterContentInit {
  public isLoading = true;

  constructor(private loaderService: LoaderService) { }

  public ngAfterContentInit() {
    this.loaderService.isLoading.subscribe(
      (result) => this.isLoading = result
    );
  }
}