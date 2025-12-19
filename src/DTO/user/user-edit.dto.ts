export class UserEditDto{
  constructor(id: number, firstname: string, lastname: string, bio: string) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.bio = bio;
  }
  id:number;
  firstname:string;
  lastname:string;
  bio:string;
}
