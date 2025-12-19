import {OwlOptions} from 'ngx-owl-carousel-o';
import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SliderService{

  public static readonly customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    items: 1,
    navSpeed: 700,
    navText: ['', ''],

    nav: false
  }
}
