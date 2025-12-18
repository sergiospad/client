import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EndpointBuilder} from '../util/endpoint-builder';
import {Observable} from 'rxjs';
import {PostShowDto} from '../DTO/post/post-show.dto';
import {PostCreateDto} from '../DTO/post/post-create.dto';

@Injectable({
  providedIn: 'root',
})
export class PostService{
  private readonly http = inject(HttpClient);
  private readonly postAPI = new EndpointBuilder("post");

  createPost(post:PostCreateDto):Observable<PostShowDto>{
    return this.http.post<PostShowDto>(this.postAPI.build("create"), post);
  }

  getAllPosts():Observable<number[]>{
    return this.http.get<number[]>(this.postAPI.build("all"));
  }

  getPostImage(imageId:number):Observable<any>{
    return this.http.get(this.postAPI.build("image", String(imageId)));
  }

  uploadImage(postId:number):Observable<number>{
    return this.http.post<number>(this.postAPI.build("image", String(postId)), {
      responseType: 'blob'
    });
  }

  deletePost(postId:number):Observable<any>{
    return this.http.delete(this.postAPI.build("delete", String(postId)))
  }
}
