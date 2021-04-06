import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact/contact.model';
import {ContactListComponent} from 'src/app/views/contact-list/contact-list.component'
@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss']
})
export class ContactTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email','avatar'];
  @Input() contactList:Contact[]=[]
  constructor(private ContactListComponent:ContactListComponent) { }
  dataSource:Contact[]=[];
  ngOnInit(): void {
    console.log("---------------------------------------------------")
    console.log(this.contactList)
    console.log("---------------------------------------------------")
  }

}
