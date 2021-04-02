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

    if (this.location.getState()&&this.todo!={}) {
      this.todo = this.location.getState();
    }
    console.log('-------------------------------------');
    console.log(this.todo as Todo);
    console.log(this.todo.id)
    console.log('-------------------------------------');


    this.updateForm = this.formBuilder.group({

      email: '',
      password: ''
    });



  }
  returnBack() {
    // 1.
    // this.router.navigate(['/contacts']);
    // 2.
    this.location.back();

  }

  update(){
    console.log(this.todo)
  }
}
