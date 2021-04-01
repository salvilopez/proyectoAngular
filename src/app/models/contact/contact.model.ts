import { IContact } from "./icontact.interface";
export class Contact implements IContact{
  id: number=0;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;

  constructor(first_name: string, last_name: string, email: string, avatar:string ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.avatar = avatar;
  }




}
