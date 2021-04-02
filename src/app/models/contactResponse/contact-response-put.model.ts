export class ContactResponsePut {
  id: number=0;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  updatedAt: string;



  constructor(first_name: string, last_name: string, email: string, avatar:string,updatedAt: string ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.avatar = avatar;
    this.updatedAt=updatedAt;
  }
}
