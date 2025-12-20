
export interface CommentShowDto{
  id:number;
  postId:number;
  commentatorId:number;
  username:string;
  lastname:string;
  firstname:string;
  message:string;
  creationDate:Date;
}
