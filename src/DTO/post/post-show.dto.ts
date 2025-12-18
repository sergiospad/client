import {CommentShowDto} from '../comment/comment-show.dto';

export interface PostShowDto{
  id:number;
  title:string;
  caption:string;
  location:string;
  author:string;
  createdDate:Date;
  images:number[];
  likedUsers:number[];
  img?:any[];
  comments?:CommentShowDto[];
}
