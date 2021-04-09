import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { Contact } from '../models/contact/contact.model';
import { ContactResponse } from '../models/contactResponse/contact-response.model';
import { Todo } from '../models/todo/todo.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  /**
   * Metodo para convertir las imagenes en BASE 64
   * @param $event Evento tipo file
   * @returns imagen en codigo base 64
   */
  extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
      } catch (e) {
        return null;
      }
    });
  /**
   * Metodo para Modificar  Contacts
   * @param contact contacto al editar en la Url
   * @returns devuelve el contacto editado
   */
  updateContact(contact: Contact): Observable<any> {
    let body = {
      id: contact.id,
      email: contact.email,
      avatar: JSON.stringify(contact.avatar),
      first_name: contact.first_name,
      last_name: contact.last_name,
    };
    return this.http.put('https://reqres.in/api/users', body);
  }
  /**
   * Metodo que devuelve los usuarios por json de la url
   * @returns  usuarios Observale<ContactResponse>
   */
  getAllContact(): Observable<ContactResponse> {
    return this.http.get<ContactResponse>('https://reqres.in/api/users');
  }
}
