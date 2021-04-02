import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo/todo.model';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss']
})
export class TodoListPageComponent implements OnInit {

  titulo: string = '';
  descripcion: string = '';
  urgencia: number = 0;
  responsable: string = '';
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();

  urgencia1List: Todo[] = [];
  urgencia2List: Todo[] = [];
  urgencia3List: Todo[] = [];
  urgencia4List: Todo[] = [];
  urgencia5List: Todo[] = [];
  constructor() {}

  ngOnInit(): void {}
  crearTarea(): void {
    if ( this.titulo != '' &&this.descripcion != '' && this.urgencia != 0 &&this.responsable != '') {
      let idMax =this.urgencia1List.length +this.urgencia2List.length +this.urgencia3List.length +this.urgencia4List.length + this.urgencia5List.length +1;
      let nuevaTarea = new Todo( this.titulo,this.descripcion,  this.urgencia, this.responsable, this.fechaInicio,this.fechaFin);
      nuevaTarea.id = idMax;
      switch (nuevaTarea.urgencia) {
        case 1:
          this.urgencia1List.push(nuevaTarea);
          break;
        case 2:
          this.urgencia2List.push(nuevaTarea);
          break;
        case 3:
          this.urgencia3List.push(nuevaTarea);
          break;
        case 4:
          this.urgencia4List.push(nuevaTarea);
          break;
        case 5:
          this.urgencia5List.push(nuevaTarea);
          break;
        default:
          this.urgencia5List.push(nuevaTarea);
          break;
      }
    }else{
      alert("Por favor , Rellena los campos");
    }
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.cambiarUrgenciaDrop(event);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  cambiarUrgenciaDrop(data: any) {
    switch (data.container.id) {
      case 'urgencia1':
        data.previousContainer.data[0].urgencia = 1;
        break;
      case 'urgencia2':
        data.previousContainer.data[0].urgencia = 2;
        break;
      case 'urgencia3':
        data.previousContainer.data[0].urgencia = 3;
        break;
      case 'urgencia4':
        data.previousContainer.data[0].urgencia = 4;
        break;
      case 'urgencia5':
        data.previousContainer.data[0].urgencia = 5;
        break;
      default:
        data.previousContainer.data[0].urgencia = 5;
        break;
    }
  }
}
