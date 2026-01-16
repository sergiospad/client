import {Component, inject} from '@angular/core';
import {Observable} from 'rxjs';
import {FeedComponent} from '../feed.component';
import {CarcassComponent} from '../../elements/carcass/carcass.component';
import {PostShowDto} from '../../../DTO/post/post-show.dto';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditPostComponent} from '../../elements/dialog-window/edit-post/edit-post.component';

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
