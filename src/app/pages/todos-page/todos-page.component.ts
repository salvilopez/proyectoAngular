import { Component, OnInit } from '@angular/core';
import{Todo}from 'src/app/models/todo/todo.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.scss']
})
export class TodosPageComponent implements OnInit {

  titulo: string="";
  descripcion: string="";
  urgencia: number=4;
  responsable: string="";
  fechaInicio :Date=new Date();
  fechaFin :Date=new Date();


  todoList: Todo[]=[];
  backLogList: Todo[]=[];
  doneList: Todo[]=[];
  constructor() { }

  ngOnInit(): void {





  }
  crearTarea(): void{

    let nuevaTarea= new Todo(this.titulo,this.descripcion,this.urgencia,this.responsable,this.fechaInicio,this.fechaFin);

    this.todoList.push(nuevaTarea);
  }



  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
