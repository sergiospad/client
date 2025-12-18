
export interface CommentShowDto{
  id:number;
  commentatorId:number;
  username:string;
  lastname:string;
  firstname:string;
  message:string;
  creationDate:Date;
  avatarIndex?:number;
}
