import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Todo } from 'src/app/models/todo/todo.model';
import { ContactService } from 'src/app/services/contact.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo-detail-page',
  templateUrl: './todo-detail-page.component.html',
  styleUrls: ['./todo-detail-page.component.scss']
})
export class TodoDetailPageComponent implements OnInit {
  todo:any={};
  idTodo:number=0;
  updateForm: FormGroup = new FormGroup({});
  actuali:Boolean=false;
  constructor(private formBuilder: FormBuilder, private location: Location, private activatedRoute: ActivatedRoute,private contactService: ContactService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.idTodo = params.id;
      } else {
        alert('No Contact found');
        this.returnBack();
      }
    });

    // We obtain the contact
//TODOaqui hay que insertar el relleno de datos con la condicion actuali a true
/**
 * if(this.actuali==true){
  this.contact.avatar= JSON.parse(this.contactResponse.avatar)
  this.contact.first_name= this.contactResponse.first_name
  this.contact.last_name= this.contactResponse.last_name
  this.contact.id= this.contactResponse.id
  this.contact.email= this.contactResponse.email}
 *
 */




    if (this.location.getState()&&this.actuali==false) {
      this.todo = this.location.getState();
      this.actuali=true;
    }



    this.updateForm = this.formBuilder.group({

      email: '',
      password: ''
    });



  }
  returnBack() {

    this.location.back();

  }

  update(){
    console.log(this.todo)
  }
}
