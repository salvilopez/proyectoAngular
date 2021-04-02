import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact/contact.model';
import { Subscription } from 'rxjs';
import { ContactResponsePut } from 'src/app/models/contactResponse/contact-response-put.model';
//import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-contact-detail-page',
  templateUrl: './contact-detail-page.component.html',
  styleUrls: ['./contact-detail-page.component.scss'],
})
export class ContactDetailPageComponent implements OnInit {
  // ID of the Contact, that comes from the URL Parms
  contactResponse: any={}
  idContact: string = '';
  contact :Contact=new Contact("","","","");
  archivoCapturado: any;
  imagebase64: any;
  imagebase64Json: string = '';
  updateForm: FormGroup = new FormGroup({});
  authSubscription: Subscription = new Subscription();
  actuali:Boolean=false;
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
    private contactService: ContactService,
  //  private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.idContact = params.id;
      } else {
        alert('No Contact found');
        this.returnBack();
      }
    });

    if(this.actuali==true){
      alert("aqui tmb")
      this.contact.avatar= JSON.parse(this.contactResponse.avatar)
      this.contact.first_name= this.contactResponse.first_name
      this.contact.last_name= this.contactResponse.last_name
      this.contact.id= this.contactResponse.id
      this.contact.email= this.contactResponse.email
    }
    if (this.location.getState()&&this.actuali==false) {
      alert("aqui")
      this.contact = this.location.getState() as Contact;
      this.actuali=true;
    }
    this.updateForm = this.formBuilder.group({
      avatar: [this.contact.avatar],
      email: [this.contact.email, Validators.email],
      first_name: [this.contact.first_name],
      last_name: [this.contact.last_name],
    });
  }

  update() {
    this.location.replaceState("/contacts/"+this.contact.id);






    this.authSubscription = this.contactService.updateContact(this.contact)
        .subscribe((response) => {
          this.contactResponse= response as ContactResponsePut;
            console.log( this.contactResponse)
           // this.openSnackBar("dato actualizado correctamente","hijo Puta");
        },(error)=> {
            console.log('Error '+error.status+' Fallo en el registro, No llego el Token de respuesta' )
            alert('Error '+error.status+' Fallo en el Login, No llego el Token de respuesta' );
        });
    this.router.navigateByUrl("/contacts/"+this.idContact, {state:this.contact});
  }

  showPreview(event: any) {
   /* this.archivoCapturado = event.target.files[0];
    this.contactService
      .extraerBase64(this.archivoCapturado)
      .then((imagen: any) => {
        this.imagebase64 = imagen.base;
        this.contact.avatar = imagen.base;
      });*/
  }
  /*openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }*/
  returnBack() {
    // 1.
    // this.router.navigate(['/contacts']);
    // 2.
    this.location.back();

  }
}
