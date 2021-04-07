import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {MatSnackBar} from "@angular/material/snack-bar";

// MDB Angular Free

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

  constructor(private snackBar: MatSnackBar,public todoService:TodoService) {}

  ngOnInit(): void {
this.todoService.getAllTodos().subscribe((response)=>{

    let tareas:Todo[]=response as Todo[];
    this.cargarListas(tareas);

})

  }

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
          nuevaTarea.urgencia=5
          this.urgencia5List.push(nuevaTarea);
          break;
      }
    }else{

      this.snackBar.open("Pro favor rellena los campos Correctamente","",{
        duration: 2000,
        horizontalPosition: "center",
        verticalPosition: "top",
       })
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

      console.log(event)
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
        data.previousContainer.data[data.previousIndex].urgencia = 1;
        break;
      case 'urgencia2':
        data.previousContainer.data[data.previousIndex].urgencia = 2;
        break;
      case 'urgencia3':
        data.previousContainer.data[data.previousIndex].urgencia = 3;
        break;
      case 'urgencia4':
        data.previousContainer.data[data.previousIndex].urgencia = 4;
        break;
      case 'urgencia5':
        data.previousContainer.data[data.previousIndex].urgencia = 5;
        break;
      default:
        data.previousContainer.data[data.previousIndex].urgencia = 5;
        break;
    }
  }

  cargarListas(listaT:Todo[]){
    for (let index = 0; index < listaT.length; index++) {
              let tar:Todo= listaT[index] as Todo;

              switch (tar.urgencia) {
                case 1:
                  this.urgencia1List.push(tar);
                  break;
                case 2:
                  this.urgencia2List.push(tar);
                  break;
                case 3:
                  this.urgencia3List.push(tar);
                  break;
                case 4:
                  this.urgencia4List.push(tar);
                  break;
                case 5:
                  this.urgencia5List.push(tar);
                  break;
                default:
                  tar.urgencia=5
                  this.urgencia5List.push(tar);
                  break;
              }

    }


  }


}
