import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Todo } from 'src/app/models/todo/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs/internal/Subscription';
import { TodoResponse } from 'src/app/models/todoResponse/todo-response.model';

@Component({
  selector: 'app-todo-detail-page',
  templateUrl: './todo-detail-page.component.html',
  styleUrls: ['./todo-detail-page.component.scss'],
})
export class TodoDetailPageComponent implements OnInit, OnDestroy {
  todo: any = {};
  idTodo: number = 0;
  updateForm: FormGroup = new FormGroup({});
  actuali: Boolean = false;
  todoSubscription: Subscription = new Subscription();
  todoResponse: any = {};

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private todoService: TodoService
  ) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {


    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.idTodo = params.id;
      } else {
        this.snackBar.open('No Todo Found', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.returnBack();
      }
    });
    if (this.actuali == true) {
      this.todo.id = JSON.parse(this.todoResponse.id);
      this.todo.titulo = this.todoResponse.titulo;
      this.todo.descripcion = this.todoResponse.descripcion;
      this.todo.urgencia = this.todoResponse.urgencia;
      this.todo.responsable = this.todoResponse.responsable;
      this.todo.fechaInicio = this.todoResponse.fechaInicio;
      this.todo.fechaFin = this.todoResponse.fechaFin;
    }
    if (this.location.getState() && this.actuali == false) {
      this.todo = this.location.getState();
      this.actuali = true;
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

  /**
   * Metodo volver atras
   */
  returnBack() {
    this.location.back();
  }

  /**
   * Metodo para editar las tareas
   */
  update() {
    this.location.replaceState('/todos/' + this.todo.id);

    this.todoSubscription = this.todoService.updateTodo(this.todo).subscribe(
      (response) => {
        this.todoResponse = response as TodoResponse;
        console.log(this.todoResponse);
        this.snackBar.open(
          'Elemento actualizado correctamente',
          'Timestamp: ' + this.todoResponse.updatedAt,
          {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          }
        );
        this.router.navigate(['/todos'], {
          state: {
            key: 'data',
            data: this.todo,
          },
        });
      },
      (error) => {
        this.snackBar.open(
          'Error en el Update',
          'Error: ' + error.status + ' : ' + error.message,
          {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          }
        );
      }
    );
    this.router.navigateByUrl('/todos/' + this.idTodo);
  }
}
