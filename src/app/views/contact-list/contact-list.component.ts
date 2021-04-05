import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contact } from 'src/app/models/contact/contact.model';
import { ContactResponse } from 'src/app/models/contactResponse/contact-response.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  objetoRecogido: ContactResponse | undefined;
  contactList: Contact[] = [];

  id: number = 3;
  contact: Contact = new Contact('', '', '', '');

  constructor(
    private contactService: ContactService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  getAllContacts():Contact[] {
    this.contactService.getAllContact().subscribe(
      (res) => {
        this.objetoRecogido = res;
        this.contactList = this.objetoRecogido.data;
      },
      (err) =>
        this.snackBar.open(
          'Error en el Get de la lista',
          'Error: ' + err.status + ' : ' + err.message,
          {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          }
        )
    );
    return this.contactList;
  }
}
