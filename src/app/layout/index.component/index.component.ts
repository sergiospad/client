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

@Component({
  selector: 'app-index',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatIcon,
    MatFormField,
    MatLabel,
    MatHint,
    MatInput,
    MatIconButton,
    DateFormatter,
    MatDivider
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent extends FeedComponent {
    protected override getPosts(): Observable<number[]> {
        return this.postService.getAllPosts();
    }

  protected readonly DateFormatter = DateFormatter;
}
