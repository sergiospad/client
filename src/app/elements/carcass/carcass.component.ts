import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PostShowDto} from '../../../DTO/post/post-show.dto';
import {UserShowNameDto} from '../../../DTO/user/user-show-name.dto';
import {CommentsSectionComponent} from '../comments-section/comments-section.component';
import {LikeButtonComponent} from '../like-button/like-button.component';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {PostHeaderComponent} from '../post-header/post-header.component';
import {SliderComponent} from '../slider/slider.component';

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

  @Output() postLiked = new EventEmitter<PostShowDto>();

  handleClick(post:PostShowDto): void {
    this.postLiked.emit(post);
  }

  @Output() sendComment = new EventEmitter<{ message:string, post:PostShowDto }>

  handleEnterPress(message:string, post:PostShowDto){
    this.sendComment.emit({message, post});
  }
}
