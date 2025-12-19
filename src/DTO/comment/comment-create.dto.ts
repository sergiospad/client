export class CommentCreateDto{
  message:string;
  postId:number;

  constructor(message: string, postId: number) {
    this.message = message;
    this.postId = postId;
  }
}
