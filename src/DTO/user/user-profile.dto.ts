import {PostShowDto} from '../post/post-show.dto';

export interface UserProfileDto{
  id:number;
  username:string;
  email:string;
  firstname:string;
  lastname:string;
  bio:string;
  posts: number[];
}
