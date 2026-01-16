import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../../../service/notification-service';
import {PostService} from '../../../../service/post.service';
import {PostEditDto} from '../../../../DTO/post/post-edit.dto';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';

@Component({
  selector: 'app-edit-post',
  imports: [
    FormsModule,
    MatButton,
    MatDialogClose,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css',
})
export class EditPostComponent implements OnInit{
  public editPostForm!:FormGroup;
  private readonly dialogRef = inject(MatDialogRef<EditPostComponent>);
  private readonly fb = inject(FormBuilder);
  private readonly notificationService = inject(NotificationService);
  private readonly postService = inject(PostService);
  public data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.editPostForm = this.createPostForm();
  }

  createPostForm():FormGroup{
    return this.fb.group({
      title:[this.data.post?.title|| '', Validators.compose([Validators.required])],
      location:[this.data.post?.location|| '', Validators.compose([Validators.required])],
      caption:[this.data.post?.caption|| '']
    });
  }

  formPost():PostEditDto{
    return {
      id: this.data.post.id,
      title: this.editPostForm.value.title,
      location:this.editPostForm.value.location,
      caption: this.editPostForm.value.caption
    }as PostEditDto;
  }

  submit(){
    this.postService.editPost(this.formPost()).subscribe({
      next: (data)=> this.notificationService.showSnackBar("Пост обновлен"),
      error: (data)=> this.notificationService.showSnackBar("Ошибка"),
      complete: ()=> {
        this.closeDialog();
        window.location.reload();
      }
    })
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
