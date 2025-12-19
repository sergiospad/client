import {Component, inject, OnInit} from '@angular/core';
import {UserShowNameDto} from '../../DTO/user/user-show-name.dto';
import {UserService} from '../../service/user.service';
import {TokenStorageService} from '../../service/token-storage.service';
import {Router, RouterLink} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatDivider} from '@angular/material/list';
import {ImageUploadService} from '../../service/image-upload.service';

@Component({
  selector: 'app-navigation',
  imports: [
    MatToolbar,
    RouterLink,
    MatIcon,
    MatTooltip,
    MatIconButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatDivider
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit{

  user:UserShowNameDto|undefined;

  private readonly userService = inject(UserService)
  private readonly tokenService = inject(TokenStorageService);
  private readonly imageUploadService = inject(ImageUploadService);
  private readonly router = inject(Router);
  ngOnInit(): void {
    if(this.tokenService.getResponse()){
      this.user = this.tokenService.getUser();

    }
  }

  logout(){
    this.tokenService.logout();
    this.router.navigate(['/login'])
  }

  getAvatar():string|null{
    return this.imageUploadService.getAvatar(this.user!.id)
  }
}
