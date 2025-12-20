import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {PostShowDto} from '../../../DTO/post/post-show.dto';
import {ImageUploadService} from '../../../service/image-upload.service';
import {MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {DateFormatter} from '../../../util/date-formatter';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-post-header',
  imports: [
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatIcon,
    DateFormatter,
    MatIconButton,
    MatTooltip
  ],
  templateUrl: './post-header.component.html',
  styleUrl: './post-header.component.css',
})
export class PostHeaderComponent {
  @Input() post!:PostShowDto;
  @Input() allowedToDelete = false;
  @Output() deletePost = new EventEmitter<number>();

  readonly imageUploadService = inject(ImageUploadService);

}
