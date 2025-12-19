import {inject, Injectable} from '@angular/core';
import {EndpointBuilder} from '../util/endpoint-builder';
import {HttpClient} from '@angular/common/http';
import {CommentCreateDto} from '../DTO/comment/comment-create.dto';
import {Observable} from 'rxjs';
import {CommentShowDto} from '../DTO/comment/comment-show.dto';

@Injectable({
  providedIn: 'root',
})
export class CommentService{
  private readonly commentAPI = new EndpointBuilder("comment");
  private readonly http= inject(HttpClient);

  createComment(comment:CommentCreateDto):Observable<CommentShowDto>{
    return this.http.post<CommentShowDto>(this.commentAPI.build("create"), comment);
  }

  getAllCommentsOfPost(postId:number):Observable<CommentShowDto[]>{
    return this.http.get<CommentShowDto[]>(this.commentAPI.build("all", String(postId)));
  }

  deleteComment(commentId:number):Observable<any>{
    return this.http.delete(this.commentAPI.build("delete", String(commentId)));
  }

}
