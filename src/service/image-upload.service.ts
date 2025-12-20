import {PostShowDto} from '../DTO/post/post-show.dto';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from './user.service';

@Injectable({ providedIn: 'root' })
export class ImageUploadService{
  private readonly avatarCache: Map<number, string> = new Map();
  private readonly userService = inject(UserService);

  public async createImageFromBlob(image: Blob, post:PostShowDto) {
    const base64 = await this.convertBlobToDataUrl(image)
    post.img?.push(base64);
  }

  public convertBlobToDataUrl(blob: Blob): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result as string);
      };

      reader.readAsDataURL(blob);
    });
  }

  public loadAndCacheAvatar(userId:number){
    if (this.avatarCache.has(userId)) {
      return;
    }
   this.updateAndCacheAvatar(userId);
  }

  public updateAndCacheAvatar(userId:number){
    this.userService.getAvatarByUserId(userId).subscribe(data => {
      this.convertBlobToDataUrl(data).then(r => {
        this.avatarCache.set(userId, r);
      })
    })
  }

  getAvatar(userId: number): string|null {
    return this.avatarCache.get(userId)||null;
  }
}
