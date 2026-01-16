import {Directive, inject, OnInit} from '@angular/core';
import {PostShowDto} from '../../DTO/post/post-show.dto';
import {UserShowNameDto} from '../../DTO/user/user-show-name.dto';
import {PostService} from '../../service/post.service';
import {CommentService} from '../../service/comment.service';
import {NotificationService} from '../../service/notification-service';
import {concatMap, filter, forkJoin, from, map, Observable, toArray} from 'rxjs';
import {UserService} from '../../service/user.service';
import {CommentCreateDto} from '../../DTO/comment/comment-create.dto';
import {ImageUploadService} from '../../service/image-upload.service';
import {CommentShowDto} from '../../DTO/comment/comment-show.dto';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditPostComponent} from '../elements/dialog-window/edit-post/edit-post.component';

@Directive()
export abstract class FeedComponent implements OnInit{

  postsId:number[]|undefined;
  fullPosts: PostShowDto[]|undefined;
  user!:UserShowNameDto;
  private readonly dialog = inject(MatDialog);
  protected readonly postService = inject(PostService);
  protected readonly userService = inject(UserService);
  protected readonly commentService = inject(CommentService);
  protected readonly notificationService = inject(NotificationService);
  protected readonly imageUploadService = inject(ImageUploadService);

  protected abstract getPosts():Observable<number[]>

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(data=>{
        this.user = data;
      });
    this.getPosts()
      .subscribe({next:data=>{
        this.postsId = data;
        from(this.postsId)
          .pipe(concatMap((id)=>
            this.postService.getPostById(id)), toArray())
          .subscribe(data=> {
            this.fullPosts = data;
            this.fullPosts.forEach(post=>
            this.imageUploadService.loadAndCacheAvatar(post.author))
            this.getImagesToPosts();
            this.getFullComments();
          })
        },
        error: err => this.notificationService.showSnackBar(("Didn't get posts"))
      });
  }

  getImagesToPosts(){
    const imagesRequests = this.fullPosts!.flatMap(post =>
        post.images.map(id=>this.postService.getPostImage(id)
          .pipe(map(img=> ({post, img})))));

    forkJoin(imagesRequests).subscribe({
      next: (results) =>
        results.forEach(({post, img}) => {
          post.img ??= new Array<any>();
          this.imageUploadService.createImageFromBlob(img, post);
        })

    })
  }

  getFullComments(){
    const commentRequests = this.fullPosts!.map(post =>
      this.commentService.getAllCommentsOfPost(post.id)
        .pipe(map(comments => ({post, comments}))))

    forkJoin(commentRequests)
      .subscribe({
        next: (results) => results
          .forEach(({post, comments}) => {
            post.fullComments = comments;
            post.fullComments.forEach(comment=>
              this.imageUploadService.loadAndCacheAvatar(comment.commentatorId));
          })
      })
  }

  postComment(message:string, post: PostShowDto){
    if (!message.trim()) return;
    let comment = new CommentCreateDto(message, post.id);
    this.commentService.createComment(comment)
      .subscribe({next:newComment=> {
          post.fullComments?.push(newComment);
        },
      error: ()=>this.notificationService.showSnackBar("Haven't uploaded comment")});
  }

  likePost(post:PostShowDto){
    this.userService.likePost(post.id).subscribe({next:data=>post.likedUsers = data})
  }

  getAvatar(userId: number): string|null {
    return this.imageUploadService.getAvatar(userId)
  }

  deletePost(postId:number){

    const indexToDel = this.postsId?.indexOf(postId)!;
    this.fullPosts?.splice(indexToDel, 1);
    this.postService.deletePost(postId)
      .subscribe(()=>this.notificationService.showSnackBar("Post deleted"));
  }

  deleteComment(comment:CommentShowDto){
    const post = this.fullPosts!.filter(post=>post.id == comment.postId)[0];
    console.log(post)
    const commentPost = post.fullComments!.indexOf(comment);
    post.fullComments!.splice(commentPost, 1);
    this.commentService.deleteComment(comment.id)
      .subscribe(()=> this.notificationService.showSnackBar("Comment deleted."))
  }

  openEditPostDialog(post:PostShowDto){
    const dialogEditPostConfig = new MatDialogConfig();
    dialogEditPostConfig.width = "600px";
    dialogEditPostConfig.data = {
      post: post
    };
    this.dialog.open(EditPostComponent, dialogEditPostConfig);
  }



}
