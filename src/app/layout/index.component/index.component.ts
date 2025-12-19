import { Component } from '@angular/core';
import {FeedComponent} from '../feed.component';
import { Observable } from 'rxjs';
import {
  MatCard, MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';
import {DateFormatter} from '../../../util/date-formatter';
import {MatDivider} from '@angular/material/list';
import {CarouselModule, OwlOptions} from 'ngx-owl-carousel-o';
import {SliderService} from '../../../service/slider.service';
import {SliderComponent} from '../../elements/slider/slider.component';
import {PostHeaderComponent} from '../../elements/post-header/post-header.component';

@Component({
  selector: 'app-index',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatIcon,
    MatFormField,
    MatLabel,
    MatHint,
    MatInput,
    MatIconButton,
    DateFormatter,
    MatDivider,
    CarouselModule,
    MatCardImage,
    SliderComponent,
    PostHeaderComponent,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent extends FeedComponent {
    protected override getPosts(): Observable<number[]> {
        return this.postService.getAllPosts();
    }

    returnOptions():OwlOptions{
      return SliderService.customOptions;
    }

  protected readonly DateFormatter = DateFormatter;
}
