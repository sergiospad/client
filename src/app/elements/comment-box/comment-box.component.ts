import {Component, inject, Input} from '@angular/core';
import {ImageUploadService} from '../../../service/image-upload.service';
import {CommentShowDto} from '../../../DTO/comment/comment-show.dto';
import {last} from 'rxjs';
import {DateFormatter} from '../../../util/date-formatter';
import {MatDivider} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-comment-box',
  imports: [
    DateFormatter,
    MatDivider,
    MatIcon
  ],
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.css',
})
export class CommentBoxComponent {
  readonly imageUploadService = inject(ImageUploadService);
  @Input() allowedToDelete!:boolean;
  @Input() comment!:CommentShowDto;
  protected readonly last = last;
}
