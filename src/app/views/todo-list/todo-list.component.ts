import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { Location } from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router';
import { State } from '@popperjs/core';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
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

  constructor(
    private snackBar: MatSnackBar,
    public todoService: TodoService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.rellenarListas();
    this.traerTareaModificada();
  }

  /***
   * Rellena las litas del mock
   */
  rellenarListas(){
    this.todoService.getAllTodos().subscribe((response) => {
    let tareas: Todo[] = response as Todo[];
    this.cargarListas(tareas);
    });
  }



  /**
   * metodo que recoge la tarea modificada del state y la updata en la lista
   */
  traerTareaModificada() {
    let tareaRecibida: Todo = history.state.data as Todo;
    if (tareaRecibida !== undefined) {
      switch (tareaRecibida.urgencia) {
        case 1:
          this.encontrarTarea(this.urgencia1List, tareaRecibida);
          break;
        case 2:
          this.encontrarTarea(this.urgencia2List, tareaRecibida);
          break;
        case 3:
          this.encontrarTarea(this.urgencia3List, tareaRecibida);
          break;
        case 4:
          this.encontrarTarea(this.urgencia4List, tareaRecibida);
          break;
        case 5:
          this.encontrarTarea(this.urgencia5List, tareaRecibida);
          break;
        default:
          this.encontrarTarea(this.urgencia5List, tareaRecibida);
          break;
      }
    }
  }

  /**
   * Metodo para encontrar la tarea modificada  en las listas y modificarla
   * @param lista de la tarea
   * @param objeto tarea a modificada
   */
  encontrarTarea(lista: Todo[], objeto: Todo) {
    for (let i = 0; i < lista.length; i++) {
      if (lista[i].id === objeto.id) {
        lista[i] = objeto;
      }
    }
  }



  /**
   * Metodo para crear la tarea y la carga en la lista correspondiente
   */
  crearTarea(): void {
    if (
      this.titulo != '' &&
      this.descripcion != '' &&
      this.urgencia != 0 &&
      this.responsable != ''
    ) {
      let idMax =
        this.urgencia1List.length +
        this.urgencia2List.length +
        this.urgencia3List.length +
        this.urgencia4List.length +
        this.urgencia5List.length +
        1;
      let nuevaTarea = new Todo(
        this.titulo,
        this.descripcion,
        this.urgencia,
        this.responsable,
        this.fechaInicio,
        this.fechaFin
      );
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
          nuevaTarea.urgencia = 5;
          this.urgencia5List.push(nuevaTarea);
          break;
      }
    } else {
      this.snackBar.open('Pro favor rellena los campos Correctamente', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }
/**
 * Metodo drag and drop  para mover Todos
 * @param event
 */
  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log(event);
      this.cambiarUrgenciaDrop(event);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  /**
   * Metodo del drag and drog para cambiar la urgencia al mover de lista
   * @param data
   */
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

  /**
   * Metodo para cargar las listas que recogemos con las tareas del mock
   * @param listaT Losta de Todo con los Todo del mock
   */
  cargarListas(listaT: Todo[]) {
    for (let index = 0; index < listaT.length; index++) {
      let tar: Todo = listaT[index] as Todo;
      this.llenarLista(tar);
    }
  }

  /**
   * Metodo para organizar las tareas en la lista correspondiente
   * @param tarea
   */
  llenarLista(tarea: Todo) {
    switch (tarea.urgencia) {
      case 1:
        this.urgencia1List.push(tarea);
        break;
      case 2:
        this.urgencia2List.push(tarea);
        break;
      case 3:
        this.urgencia3List.push(tarea);
        break;
      case 4:
        this.urgencia4List.push(tarea);
        break;
      case 5:
        this.urgencia5List.push(tarea);
        break;
      default:
        tarea.urgencia = 5;
        this.urgencia5List.push(tarea);
        break;
    }
  }
}
