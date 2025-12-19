import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PostShowDto} from '../../../DTO/post/post-show.dto';
import {MatCardActions} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-like-button',
  imports: [
    MatCardActions,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './like-button.component.html',
  styleUrl: './like-button.component.css',
})
export class LikeButtonComponent {
  @Input() liked!:boolean;
  @Input() post!:PostShowDto;
  @Output() postClicked = new EventEmitter<PostShowDto>();

  handleClick(): void {
    this.postClicked.emit(this.post);
  }
}
