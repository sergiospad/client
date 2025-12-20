import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {FeedComponent} from '../feed.component';
import {CarcassComponent} from '../../elements/carcass/carcass.component';

@Component({
  selector: 'app-user-feed.component',
  imports: [
    CarcassComponent
  ],
  templateUrl: './user-feed.component.html',
  styleUrl: './user-feed.component.css',
})
export class UserFeedComponent extends FeedComponent {
  protected override getPosts(): Observable<number[]> {
    return this.postService.getUserPosts();
  }
}
