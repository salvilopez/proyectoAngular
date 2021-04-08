import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Todo } from 'src/app/models/todo/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";
import { Subscription } from 'rxjs/internal/Subscription';
import { TodoResponse } from 'src/app/models/todoResponse/todo-response.model';

@Component({
  selector: 'app-todo-detail-page',
  templateUrl: './todo-detail-page.component.html',
  styleUrls: ['./todo-detail-page.component.scss']
})
export class TodoDetailPageComponent implements OnInit {
  @Output() tareaMandada: EventEmitter<Todo> = new EventEmitter<Todo>();
  todo:any={};
  idTodo:number=0;
  updateForm: FormGroup = new FormGroup({});
  actuali:Boolean=false;
  todoSubscription: Subscription = new Subscription();
  todoResponse: any={}

  constructor( private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private todoService: TodoService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.idTodo = params.id;
      } else {

        this.snackBar.open("No Todo Found","",{
          duration: 2000,
          horizontalPosition: "center",
          verticalPosition: "top",
         })
        this.returnBack();
      }
    });

    // We obtain the contact
//TODOaqui hay que insertar el relleno de datos con la condicion actuali a true

 if(this.actuali==true){
  this.todo.id= JSON.parse(this.todoResponse.id)
  this.todo.titulo= this.todoResponse.titulo
  this.todo.descripcion= this.todoResponse.descripcion
  this.todo.urgencia= this.todoResponse.urgencia
  this.todo.responsable= this.todoResponse.responsable
  this.todo.fechaInicio= this.todoResponse.fechaInicio
  this.todo.fechaFin= this.todoResponse.fechaFin
}





    if (this.location.getState()&&this.actuali==false) {
      this.todo = this.location.getState();
      this.actuali=true;
    }



    this.updateForm = this.formBuilder.group({
      id: [this.todo.id],
      titulo: [this.todo.titulo],
      descripcion: [this.todo.descripcion],
      urgencia: [this.todo.urgencia],
      responsable: [this.todo.responsable],
      fechaInicio: [this.todo.fechaInicio],
      fechaFin: [this.todo.fechaFin],
    });



  }
  returnBack() {

    this.location.back();

  }

  update(){
    this.location.replaceState("/todos/"+this.todo.id);

    this.todoSubscription = this.todoService.updateTodo(this.todo)
        .subscribe((response) => {
          this.todoResponse= response as TodoResponse;
            console.log( this.todoResponse)
//TODO -------------------------------------------
            this.tareaMandada.emit(this.todo);
//TODO -------------------------------------------
           this.snackBar.open("Elemento actualizado correctamente","Timestamp: "+this.todoResponse.updatedAt,{
            duration: 2000,
            horizontalPosition: "center",
            verticalPosition: "top",
           })
        },(error)=> {
            this.snackBar.open("Error en el Update","Error: "+error.status +" : "+error.message,{
              duration: 2000,
              horizontalPosition: "center",
              verticalPosition: "top",
             })
        });
    this.router.navigateByUrl("/todos/"+this.idTodo);
  }
}
