import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact/contact.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-contact-detail-page',
  templateUrl: './contact-detail-page.component.html',
  styleUrls: ['./contact-detail-page.component.scss'],
})
export class ContactDetailPageComponent implements OnInit {
  // ID of the Contact, that comes from the URL Parms
  idContact: string = '';
  contact :any={};
  archivoCapturado: any;
  imagebase64: any;
  imagebase64Json: string = '';
  updateForm: FormGroup = new FormGroup({});
  authSubscription: Subscription = new Subscription();
  /**
   * Constructor
   * @param activatedRoute --> The Active Route in that moment
   * @param router --> To navigate to another route
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    console.log(this.contact);
    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.idContact = params.id;
      } else {
        alert('No Contact found');
        this.returnBack();
      }
    });

    // We obtain the contact

    if (this.location.getState()) {
      this.contact = this.location.getState();
    }
    console.log('-------------------------------------');
    console.log(this.contact as Contact);

    this.updateForm = this.formBuilder.group({
      avatar: [''],
      email: ['', Validators.email],
      first_name: [''],
      last_name: [''],
    });
  }

  update() {
    if(this.updateForm.value.email!=null){
      this.contact.email=this.updateForm.value.email;
    }

    if(this.imagebase64!=null){
      this.contact.avatar=this.imagebase64Json;
    }
    if(this.updateForm.value.first_name!=null){
      this.contact.first_name=this.updateForm.value.first_name;
    }
    if(this.updateForm.value.last_name!=null){
      this.contact.last_name=this.updateForm.value.last_name;
    }

    console.table(this.contact)

    this.contactService.updateContact(this.contact);
/////////////////////////////////////////////////////////////////////////////////////////////



this.authSubscription = this.contactService.updateContact(this.contact)
.subscribe((response) => {
  if(response.token){
    console.log(`Token: ${response}`);

  }
},(error)=> {
  console.log('Error '+error.status+' Fallo en el registro, No llego el Token de respuesta' )

  alert('Error '+error.status+' Fallo en el Login, No llego el Token de respuesta' );

});


















//////////////////////////////////////////////////////


    this.router.navigateByUrl("/contacts/"+this.idContact, {state:this.contact});



  }
  showPreview(event: any) {
    this.archivoCapturado = event.target.files[0];
    this.contactService
      .extraerBase64(this.archivoCapturado)
      .then((imagen: any) => {
        this.imagebase64 = imagen.base;
        this.contact.avatar = imagen.base;
      });
  }

  returnBack() {
    // 1.
    // this.router.navigate(['/contacts']);
    // 2.
    this.location.back();

  }
}
