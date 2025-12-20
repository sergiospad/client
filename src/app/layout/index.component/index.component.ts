import { Component } from '@angular/core';
import {FeedComponent} from '../feed.component';
import { Observable } from 'rxjs';
import {
  MatCard,
  MatCardContent,
} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {SliderComponent} from '../../elements/slider/slider.component';
import {PostHeaderComponent} from '../../elements/post-header/post-header.component';
import {LikeButtonComponent} from '../../elements/like-button/like-button.component';
import {CommentBoxComponent} from '../../elements/comment-box/comment-box.component';
import {CommentsSectionComponent} from '../../elements/comments-section.component/comments-section.component';

@Component({
  selector: 'app-index',
  imports: [
    MatCard,
    MatCardContent,
    MatIcon,
    MatFormField,
    MatLabel,
    MatHint,
    MatInput,
    CarouselModule,
    SliderComponent,
    PostHeaderComponent,
    LikeButtonComponent,
    CommentBoxComponent,
    CommentsSectionComponent,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent extends FeedComponent {
    protected override getPosts(): Observable<number[]> {
        return this.postService.getAllPosts();
    }
}
