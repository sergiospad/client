import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {PostCreateDto} from '../../../../DTO/post/post-create.dto';
import {NotificationService} from '../../../../service/notification-service';
import {PostService} from '../../../../service/post.service';
import {ImageUploadService} from '../../../../service/image-upload.service';
import {forkJoin} from 'rxjs';
import {SliderComponent} from '../../slider/slider.component';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';

@Component({
  selector: 'app-add-post',
  imports: [
    SliderComponent,
    MatButton,
    MatIcon,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatDialogClose
  ],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css',
})
export class AddPostComponent implements OnInit{
  readonly stockPic = 'https://play-lh.googleusercontent.com/QTGIa44vlItPa2hs73btKocNVJfK4qEdi8EEiF8GG9JvcGSN1cVZ-gqI_2zDgGN19A=w480-h960';
  public postForm!:FormGroup;
  private readonly dialogRef = inject(MatDialogRef<AddPostComponent>);
  post:PostCreateDto|undefined;
  selectedFile?:Blob;
  filesToUpload:Blob[] = new Array<Blob>();
  imagesURL:string[] = new Array<string>();

  private readonly fb = inject(FormBuilder);
  private readonly notificationService = inject(NotificationService);
  private readonly postService = inject(PostService);
  private readonly imageService = inject(ImageUploadService);

  ngOnInit(): void {
    this.postForm = this.createPostForm();
  }

  private createPostForm():FormGroup{
    return this.fb.group({
      title:['', Validators.compose([Validators.required])],
      caption:['', Validators.compose([Validators.required])],
      location:['', Validators.compose([Validators.required])],
    });
  }

  submit() {
    this.postService.createPost(this.formPost())
      .subscribe({
        next: (data) => {
          const post = data;
          if (this.filesToUpload) {
            const imgs = this.filesToUpload.map(file => this.postService.uploadImage(post.id, file))
            forkJoin(imgs).subscribe({
              next: data => post.images = data,
              error: () => this.notificationService.showSnackBar("Error!"),
              complete: () => {
                this.dialogRef.close();
                window.location.reload();
              }
            })
          }

          this.notificationService.showSnackBar("Post created.")
        }
      })
  }

  formPost():PostCreateDto{
    return {
      title: this.postForm.value.title,
      location: this.postForm.value.location,
      caption: this.postForm.value.caption
    } as PostCreateDto;
  }

  onFileSelected(event: Event){
    const input = event.target as HTMLInputElement
    if(input.files && input.files[0]){
      this.selectedFile = input.files[0];
      this.filesToUpload.push(this.selectedFile);
      this.imageService.convertBlobToDataUrl(this.selectedFile)
        .then(str=>this.imagesURL.push(str))
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
