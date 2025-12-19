import {Directive, inject, OnInit} from '@angular/core';
import {PostShowDto} from '../../DTO/post/post-show.dto';
import {UserShowNameDto} from '../../DTO/user/user-show-name.dto';
import {PostService} from '../../service/post.service';
import {CommentService} from '../../service/comment.service';
import {NotificationService} from '../../service/notification-service';
import { concatMap, forkJoin, from, map, Observable, toArray} from 'rxjs';
import {UserService} from '../../service/user.service';
import {CommentCreateDto} from '../../DTO/comment/comment-create.dto';

@Directive()
export abstract class FeedComponent implements OnInit{

  private avatarCache: Map<number, string> = new Map();
  postsId:number[]|undefined;
  fullPosts: PostShowDto[]|undefined;
  user!:UserShowNameDto;
  avatars = new Array<any>;
  protected readonly postService = inject(PostService);
  protected readonly userService = inject(UserService);
  protected readonly commentService = inject(CommentService);
  protected readonly notificationService = inject(NotificationService);

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
          .pipe(concatMap((id)=>this.postService.getPostById(id)), toArray())
          .subscribe(data=> {
            this.fullPosts = data;
            this.getImagesToPosts();
            this.getFullComments();
          })
        },
        error: err => console.log("Didn't get posts")
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
          this.createImageFromBlob(img, post);
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
              this.loadAndCacheAvatar(comment.commentatorId))
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
      error: ()=>"Haven't uploaded comment"});
  }


  async createImageFromBlob(image: Blob, post:PostShowDto) {
      const base64 = await this.convertBlobToDataUrl(image)
      post.img?.push(base64);
  }

  private convertBlobToDataUrl(blob: Blob): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result as string);
      };

      reader.readAsDataURL(blob);
    });
  }

  loadAndCacheAvatar(commentatorId:number){
    if (this.avatarCache.has(commentatorId)) {
      return;
    }
    this.userService.getAvatarByUserId(commentatorId).subscribe(data => {
      this.convertBlobToDataUrl(data).then(r => {
        this.avatarCache.set(commentatorId, r);
      })
    })
  }

  likePost(post:PostShowDto){
    this.userService.likePost(post.id).subscribe({next:data=>post.likedUsers = data})
  }

  getAvatar(userId: number): string|null {
    return this.avatarCache.get(userId)||null;
  }
}
