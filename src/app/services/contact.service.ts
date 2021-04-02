import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { Contact } from '../models/contact/contact.model';
import { ContactResponse } from '../models/contactResponse/contact-response.model';
import { Todo } from '../models/todo/todo.model';

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



  updateContact(contact:Contact): Observable<any> {

    let body = {
      id:  contact.id,
      email:  contact.email,
      avatar:   JSON.stringify(contact.avatar),
      first_name:   contact.first_name,
      last_name:   contact.last_name,

    };
    return this.http.put('https://reqres.in/api/users', body)


  }

  getAllContact():Observable<ContactResponse>{
    return this.http.get<ContactResponse>("https://reqres.in/api/users");
  }

}
