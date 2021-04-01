import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact/contact.model';
import{HttpClient,HttpHeaders, HttpParams}from '@angular/common/http';
import { ContactService} from 'src/app/services/contact.service';
@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent implements OnInit {
  contactList: Contact[]=[];
  // Example to Navigate to Contact Detail passing a 3 as the ID
  // And passing a Contact through navigation
  id: number = 3
  contact: Contact = new Contact("Martín", "San José", "martin@imaginagroup.com", "45677754432");

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {

    let obsCon=this.contactService.getAllContacts();

    obsCon.subscribe((listaC)=>{
      this.contactList=listaC;
    })
  }


}
