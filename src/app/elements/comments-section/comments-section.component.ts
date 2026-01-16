import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommentShowDto} from '../../../DTO/comment/comment-show.dto';
import {CommentBoxComponent} from '../comment-box/comment-box.component';
import {MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {PostShowDto} from '../../../DTO/post/post-show.dto';
import {FormsModule} from '@angular/forms';
import {UserShowNameDto} from '../../../DTO/user/user-show-name.dto';

@Component({
  selector: 'app-comments-section',
  imports: [
    CommentBoxComponent,
    MatFormField,
    MatLabel,
    MatInput,
    MatHint,
    FormsModule
  ],
  templateUrl: './comments-section.component.html',
  styleUrl: './comments-section.component.css',
})
export class CommentsSectionComponent {
  @Input() comments:CommentShowDto[]|undefined;
  @Input() allowedToDeleteComment!:boolean;
  @Input() post!:PostShowDto;
  @Input() currentUser!: UserShowNameDto;
  @Output() sendComment = new EventEmitter<{ message:string, post:PostShowDto }>()
  @Output() deleteComment = new EventEmitter<CommentShowDto>();
  commentText = "";

  handleEnterPress(message:string, post:PostShowDto){
    this.commentText = ''
    this.sendComment.emit({message, post});
  }
}
