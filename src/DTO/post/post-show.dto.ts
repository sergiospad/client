import {CommentShowDto} from '../comment/comment-show.dto';

export interface PostShowDto{
  id:number;
  title:string;
  caption:string;
  location:string;
  author:number;
  authorFirstname:string;
  authorLastname:string;
  createdDate:Date;
  images:number[];
  likedUsers:number[];
  img?:string[];
  fullComments?:CommentShowDto[];
}
