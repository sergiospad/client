import {Component, Input} from '@angular/core';
import {CarouselModule, OwlOptions} from 'ngx-owl-carousel-o';
import {MatCardImage} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-slider',
  imports: [
    CarouselModule,
    MatCardImage,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent {
  @Input() images:any[]|undefined;

  readonly customOptions: OwlOptions = {
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
