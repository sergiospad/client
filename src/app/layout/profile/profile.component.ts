import {Component, inject, OnInit} from '@angular/core';
import {UserProfileDto} from '../../../DTO/user/user-profile.dto';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NotificationService} from '../../../service/notification-service';
import {ImageUploadService} from '../../../service/image-upload.service';
import {UserService} from '../../../service/user.service';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDivider} from '@angular/material/list';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [
    MatButton,
    MatIcon,
    MatDivider,
    RouterOutlet
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit{
  readonly stockPic = 'https://play-lh.googleusercontent.com/QTGIa44vlItPa2hs73btKocNVJfK4qEdi8EEiF8GG9JvcGSN1cVZ-gqI_2zDgGN19A=w480-h960';
  user!: UserProfileDto;
  selectedFile?: Blob;
  userProfileImage?: any;

  private readonly dialog = inject(MatDialog);
  private readonly notificationService = inject(NotificationService);
  private readonly imageService = inject(ImageUploadService);
  private readonly userService = inject(UserService);
    ngOnInit(): void {
          this.userService.getCurrentUserProfile()
            .subscribe(data=>this.user = data)
          this.userService.getAvatar().subscribe(data=>
            this.imageService.convertBlobToDataUrl(data)
              .then(str =>this.userProfileImage = str ))
    }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      this.userService.getAvatar().subscribe(data=>
        this.imageService.convertBlobToDataUrl(data)
          .then(str =>this.userProfileImage = str ))
    }
  }

  openEditDialog() {
    const dialogUserEditConfig = new MatDialogConfig();
    dialogUserEditConfig.width = "600px";
    dialogUserEditConfig.data = {
      user: this.user
    };
    //TODO EditUserComponent
    // this.dialog.open(EditUserComponent, dialogUserEditConfig);
  }

  onUpload(): void {
    if (this.selectedFile != null) {
      this.userService.postAvatar(this.selectedFile)
        .subscribe(() => {
          this.notificationService
            .showSnackBar("Profile Image uploaded successfully")
          this.reloadAvatar();
        }
      )
    }
  }

  reloadAvatar(){
    this.imageService.updateAndCacheAvatar(this.user.id);
    this.userService.getAvatar().subscribe(data=>
      this.imageService.convertBlobToDataUrl(data)
        .then(str =>this.userProfileImage = str ))
  }

  openAddPostDialog() {
    const dialogAddPostConfig = new MatDialogConfig();
    dialogAddPostConfig.width = "600px";
    dialogAddPostConfig.data = {
      user: this.user
    };
    //TODO AddPostComponent
    // this.dialog.open(AddPostComponent, dialogAddPostConfig);
  }

}
