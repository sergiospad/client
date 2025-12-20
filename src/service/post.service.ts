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

  getUserPosts():Observable<number[]>{
    return this.http.get<number[]>(this.postAPI.build("user"));
  }

  getPostImage(imageId:number):Observable<Blob>{
    return this.http.get(this.postAPI.build("image", String(imageId)),{
      responseType: 'blob'
    });
  }

  uploadImage(postId:number, file:Blob):Observable<number>{
    const uploadData = new FormData();
    uploadData.append('file', file);
    return this.http.post<number>(this.postAPI.build("image", String(postId)), uploadData);
  }

  deletePost(postId:number):Observable<any>{
    return this.http.delete(this.postAPI.build("delete", String(postId)))
  }

  getPostById(postId:number):Observable<PostShowDto>{
    return this.http.get<PostShowDto>(this.postAPI.build(String(postId)));
  }
}
