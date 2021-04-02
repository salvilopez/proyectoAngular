import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact/contact.model';
import { ContactResponse } from 'src/app/models/contactResponse/contact-response.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-list-page',
  templateUrl: './contact-list-page.component.html',
  styleUrls: ['./contact-list-page.component.scss']
})
export class ContactListPageComponent implements OnInit {



  objetoRecogido:ContactResponse | undefined;
  contactList: Contact[] = [];
  // Example to Navigate to Contact Detail passing a 3 as the ID
  // And passing a Contact through navigation
  id: number = 3;
  contact: Contact = new Contact(
    'Martín',
    'San José',
    'martin@imaginagroup.com',
    '45677754432'
  );

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {

    this.contactService.getAllContact().subscribe(
      (res) => {
         this.objetoRecogido= res;
        this.contactList=this.objetoRecogido.data

      },
      (err) => console.log('Error',err)
    );

    console.log(this.contactList[1]);
  }
}

