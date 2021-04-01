import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  contactList: Contact[] = [];
  listSubscription: Subscription = new Subscription();

  // We inject the Contact Service to the component
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    // Before the component is rendered, we need to obtain the list
    // of contacts. We use the service to obtain the list

    // Basic Call
    // this.contactList = this.contactService.getAllContacts();

    // Promise Call
    // this.contactService.getAllContacts()
    //   .then((response: Contact[]) => {
    //     this.contactList = response;
    //   }).catch((reason) => {
    //     console.log(`Error obtaining contacts: ${reason}`)
    //   }).finally(() => {
    //     console.log('Retrieving contacts ended')
    //   });

    // Observable Call
    this.listSubscription = this.contactService.getAllContacts().subscribe((response: Contact[]) => {
      this.contactList = response;
    });

  }

  /**
   * We ensure that all subscriptions are deleted
   * when the component is destroyed
   */
  ngOnDestroy(){
    // Unsubscribe of all subscriptions
    this.listSubscription.unsubscribe();
  }

}
