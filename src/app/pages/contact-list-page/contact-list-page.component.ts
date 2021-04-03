import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact/contact.model';
import { ContactResponse } from 'src/app/models/contactResponse/contact-response.model';
import { ContactService } from 'src/app/services/contact.service';
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-contact-list-page',
  templateUrl: './contact-list-page.component.html',
  styleUrls: ['./contact-list-page.component.scss']
})
export class ContactListPageComponent implements OnInit {



  objetoRecogido:ContactResponse | undefined;
  contactList: Contact[] = [];

  id: number = 3;
  contact: Contact = new Contact('','','','');

  constructor(private contactService: ContactService,  private snackBar: MatSnackBar) {}

  ngOnInit(): void {

    this.contactService.getAllContact().subscribe(
      (res) => {
         this.objetoRecogido= res;
        this.contactList=this.objetoRecogido.data

      },
      (err) =>

      this.snackBar.open("Error en el Get de la lista","Error: "+err.status +" : "+err.message,{
        duration: 2000,
        horizontalPosition: "center",
        verticalPosition: "top",
       })

    );

  }
}

