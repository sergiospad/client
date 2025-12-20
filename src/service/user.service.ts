import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EndpointBuilder} from '../util/endpoint-builder';
import {Observable} from 'rxjs';
import {UserShowNameDto} from '../DTO/user/user-show-name.dto';
import {UserEditDto} from '../DTO/user/user-edit.dto';
import {UserProfileDto} from '../DTO/user/user-profile.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService{
  private readonly http = inject(HttpClient);
  private readonly userAPI = new EndpointBuilder('user');

  getCurrentUser():Observable<UserShowNameDto>{
    return this.http.get<UserShowNameDto>(this.userAPI.build());
  }

  updateUser(user:UserEditDto):Observable<UserShowNameDto>{
    return this.http.put<UserShowNameDto>(this.userAPI.build("update"), user)
  }

  getCurrentUserProfile():Observable<UserProfileDto>{
    return this.http.get<UserProfileDto>(this.userAPI.build("profile"))
  }

  likePost(postId:number):Observable<number[]>{
    return this.http.get<number[]>(this.userAPI.build("like", String(postId)))
  }

  getAvatar():Observable<Blob>{
    return this.http.get(this.userAPI.build("image"),{
      responseType: 'blob'
    });
  }

  postAvatar(file:Blob):Observable<any>{
    const uploadData = new FormData();
    uploadData.append('file', file);
    return this.http.put(this.userAPI.build("image"), uploadData)
  }

  getAvatarByUserId(userId:number):Observable<Blob>{
    return this.http.get(this.userAPI.build("image", String(userId)),{
      responseType: 'blob'
    });
  }
}
