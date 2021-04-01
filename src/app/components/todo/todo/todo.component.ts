import { Component, OnInit,Input,Output ,EventEmitter} from '@angular/core';
import {Todo} from 'src/app/models/todo/todo.model';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
    fe = new Date();
  @Input() tarea:Todo=new Todo("","",0,"",this.fe,this.fe);

  constructor() { }
  @Output() tareaMandada: EventEmitter<Todo> = new EventEmitter<Todo>();
  ngOnInit(): void {
  }
/**
 * Metodo completar
 * Sirve para cambiar el estado de la tarea del componente
 * llamamos al metodo de la clase "Completar()"
 */



  completar(): void{
    //this.tareaMandada.emit(this.tarea);
    this.tarea.completar();

  }

  /**
   * Metodo get color
   * sirve para darle color al componente
   * @returns string
   * El color del string
   */
  getColor(): string {
    switch (this.tarea.urgencia) {
      case 1:
        return '#EF4816';
      case 2:
        return '#EA631F';
        case 3:
        return '#EEAE38';
      default:
        return '#57B9B0';
    }
  }
}
