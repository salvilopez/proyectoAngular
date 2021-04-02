import { Component, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {



  // We inject the Contact Service to the component
  constructor() { }

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

  }

  /**
   * We ensure that all subscriptions are deleted
   * when the component is destroyed
   */
  ngOnDestroy(){

  }

}
