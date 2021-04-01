import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  // Contacto to be shown by the component
  @Input() contact: Contact = new Contact('', '', '', '');



  constructor() { }

  ngOnInit(): void {
  }

}
