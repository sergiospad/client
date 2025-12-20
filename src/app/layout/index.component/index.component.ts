import { Component } from '@angular/core';
import {FeedComponent} from '../feed.component';
import { Observable } from 'rxjs';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {CarcassComponent} from '../../elements/carcass/carcass.component';

@Component({
  selector: 'app-index',
  imports: [
    CarouselModule,
    CarcassComponent,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent extends FeedComponent {
    protected override getPosts(): Observable<number[]> {
        return this.postService.getAllPosts();
    }
}
