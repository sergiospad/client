import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PostShowDto} from '../../../DTO/post/post-show.dto';
import {UserShowNameDto} from '../../../DTO/user/user-show-name.dto';
import {CommentsSectionComponent} from '../comments-section/comments-section.component';
import {LikeButtonComponent} from '../like-button/like-button.component';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {PostHeaderComponent} from '../post-header/post-header.component';
import {SliderComponent} from '../slider/slider.component';
import {CommentShowDto} from '../../../DTO/comment/comment-show.dto';

@Component({
  selector: 'app-carcass',
  imports: [
    CommentsSectionComponent,
    LikeButtonComponent,
    MatCard,
    MatCardContent,
    MatIcon,
    PostHeaderComponent,
    SliderComponent
  ],
  templateUrl: './carcass.component.html',
  styleUrl: './carcass.component.css',
})
export class CarcassComponent {
  @Input() posts:PostShowDto[]|undefined;
  @Input() user:UserShowNameDto|undefined
  @Input() allowToDelete!:boolean;

  @Output() postLiked = new EventEmitter<PostShowDto>;
  @Output() deletePost = new EventEmitter<number>;
  @Output() deleteComment = new EventEmitter<CommentShowDto>;

  @Output() sendComment = new EventEmitter<{ message:string, post:PostShowDto }>

  handleEnterPress(message:string, post:PostShowDto){
    this.sendComment.emit({message, post});
  }
}
