export class PostCreateDto{
  title:string;
  caption:string;
  location:string;

  constructor(title: string, caption: string, location: string) {
    this.title = title;
    this.caption = caption;
    this.location = location;
  }
}
