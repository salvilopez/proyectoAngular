import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contact } from 'src/app/models/contact/contact.model';
import { ContactResponse } from 'src/app/models/contactResponse/contact-response.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  objetoRecogido: ContactResponse = new ContactResponse(0,0,0,0,undefined,undefined);
  contactList: Contact[] = [];

  constructor(
    private contactService: ContactService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {

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
  }
}
