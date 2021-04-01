import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Contact List Mock
import { CONTACTS } from '../mocks/contacts/contacts.mock';
import { Contact } from '../models/contact/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }

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
  getAllContacts(): Observable<Contact[]> {
    let observable = Observable.create((observer: any) => {
      observer.next(CONTACTS); // Next will send values to the subscriber
      observer.complete(); // This will close the emission of values to the subscriber
    });
    return observable;
  }

}
