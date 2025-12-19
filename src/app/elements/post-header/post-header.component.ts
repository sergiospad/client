import {Component, inject, Input} from '@angular/core';
import {PostShowDto} from '../../../DTO/post/post-show.dto';
import {ImageUploadService} from '../../../service/image-upload.service';
import {MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-post-header',
  imports: [
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatIcon
  ],
  templateUrl: './post-header.component.html',
  styleUrl: './post-header.component.css',
})
export class PostHeaderComponent {
  readonly imageUploadService = inject(ImageUploadService);
  @Input() post!:PostShowDto;

}
