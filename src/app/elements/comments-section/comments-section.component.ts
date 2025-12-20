import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommentShowDto} from '../../../DTO/comment/comment-show.dto';
import {CommentBoxComponent} from '../comment-box/comment-box.component';
import {MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {PostShowDto} from '../../../DTO/post/post-show.dto';

@Component({
  selector: 'app-comments-section',
  imports: [
    CommentBoxComponent,
    MatFormField,
    MatLabel,
    MatInput,
    MatHint
  ],
  templateUrl: './comments-section.component.html',
  styleUrl: './comments-section.component.css',
})
export class CommentsSectionComponent {
  @Input() comments:CommentShowDto[]|undefined;
  @Input() allowedToDeleteComment!:boolean;
  @Input() post!:PostShowDto;
  @Output() sendComment = new EventEmitter<{ message:string, post:PostShowDto }>

  handleEnterPress(message:string, post:PostShowDto){
    this.sendComment.emit({message, post});
  }
}
