import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Contact } from '../models/contact/contact.model';
import { Todo } from '../models/todo/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }



  updateTodo(todo:Todo): Observable<any> {

    let body = {
      id:  todo.id,
      titulo:  todo.titulo,
      descripcion: todo.descripcion,
      urgencia:   todo.urgencia,
      responsable:   todo.responsable,
      fechaInicio:   todo.fechaInicio,
      fechaFin:   todo.fechaFin,
    };
    return this.http.put('https://reqres.in/api/users', body)


  }
}
