import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {ImageUploadService} from '../../../service/image-upload.service';
import {CommentShowDto} from '../../../DTO/comment/comment-show.dto';
import {last} from 'rxjs';
import {DateFormatter} from '../../../util/date-formatter';
import {MatDivider} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-comment-box',
  imports: [
    DateFormatter,
    MatDivider,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.css',
})
export class CommentBoxComponent {
  readonly imageUploadService = inject(ImageUploadService);
  @Input() allowedToDelete!:boolean;
  @Input() comment!:CommentShowDto;
  @Output() deleteComment = new EventEmitter<CommentShowDto>();

  protected readonly last = last;
}
