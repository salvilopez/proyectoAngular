import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

// Contact List Mock
import { CONTACTS } from '../mocks/contacts/contacts.mock';
import { Contact } from '../models/contact/contact.model';
import { ContactResponse } from '../models/contactResponse/contact-response.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient,private sanitizer: DomSanitizer) { }

  /**
   * Basic getAllContacts
   * */
  // getAllContacts(): Promise<Contact[]> {
  //   return CONTACTS;
  // }


  /**
   * PROMISED getAllContacts
   * Method to obtain all contacts
   * @return Promise<Contact[]>
   */
  // getAllContacts(): Promise<Contact[]> {
  //   return Promise.resolve(CONTACTS);
  // }


  /**
   * OBSERVABLE getAllContacts
   * Method to obtain all contacts
   * @return Observable<Contact[]>
  */







  /*getAllContacts(): Observable<Contact[]> {
    let observable = Observable.create((observer: any) => {
      observer.next(CONTACTS); // Next will send values to the subscriber
      observer.complete(); // This will close the emission of values to the subscriber
    });
    return observable;
  }*/

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })



  updateContact(updateForm: FormGroup,imagenjson :any): Observable<any> {

    let body = {
      username:  updateForm.get('username'),
      email:  updateForm.get('email'),
      password:  updateForm.get('password'),
      file:  imagenjson,
      first_name:  updateForm.get('first_name'),
      last_name:  updateForm.get('last_name'),
      age:  updateForm.get('age'),

    };
   // console.table(body.file)

    return this.http.post('https://reqres.in/api/register', body)



  }

  getAllContact():Observable<ContactResponse>{
    return this.http.get<ContactResponse>("https://reqres.in/api/users");
  }

}
