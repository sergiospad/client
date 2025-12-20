import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../../../service/notification-service';
import {UserService} from '../../../../service/user.service';
import {TokenStorageService} from '../../../../service/token-storage.service';
import {UserEditDto} from '../../../../DTO/user/user-edit.dto';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-edit-profile',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent implements OnInit{
  public profileEditForm!:FormGroup;
  private readonly dialogRef = inject(MatDialogRef<EditProfileComponent>);
  private readonly fb = inject(FormBuilder);
  private readonly notificationService = inject(NotificationService);
  private readonly userService = inject(UserService);
  private readonly tokenService = inject(TokenStorageService)
  public data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.profileEditForm = this.createProfileForm();
  }

  createProfileForm():FormGroup{
    return this.fb.group({
      firstname:[this.data.user?.firstname|| '', Validators.compose([Validators.required])],
      lastname:[this.data.user?.lastname|| '', Validators.compose([Validators.required])],
      bio:[this.data.user?.bio|| '']
    });
  }

  submit(){
    this.userService.updateUser(this.uploadUser())
      .subscribe(data=> {
        this.dialogRef.close();
        window.location.reload();
        this.notificationService.showSnackBar("Profile updated")
      });

  }

  uploadUser():UserEditDto{
   return  {
     id: this.tokenService.getUser().id,
     firstname: this.profileEditForm.value.firstname,
     lastname: this.profileEditForm.value.lastname,
     bio: this.profileEditForm.value.bio
    } as UserEditDto
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
