import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {ImageUploadService} from '../../../service/image-upload.service';
import {CommentShowDto} from '../../../DTO/comment/comment-show.dto';
import {last} from 'rxjs';
import {DateFormatter} from '../../../util/date-formatter';
import {MatDivider} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {CommentService} from '../../../service/comment.service';
import {MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-comment-box',
  imports: [
    DateFormatter,
    MatDivider,
    MatIcon,
    MatIconButton,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.css',
})
export class CommentBoxComponent {
  readonly imageUploadService = inject(ImageUploadService);
  readonly commentService = inject(CommentService)
  @Input() allowedToEdit!:boolean;
  @Input() allowedToDelete!:boolean;
  @Input() comment!:CommentShowDto;
  editing = false;
  @Output() deleteComment = new EventEmitter<CommentShowDto>();

  protected readonly last = last;

  public editComment(commentId:number){
    this.editing = true;
  }
}
