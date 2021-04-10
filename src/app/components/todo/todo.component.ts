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
  @Output()borrarTareaEmiter = new EventEmitter<number>();
  constructor() { }
  ngOnInit(): void {
  }
/**
 * Metodo completar
 * Sirve para cambiar el estado de la tarea del componente
 *
 */
  getColor(): string {
    switch (this.tarea.urgencia) {
      case 1:
        return '#EF4816';
      case 2:
        return '#EA631F';
      case 3:
        return '#EEAE38';
      case 4:
        return '#E6FF33';
      case 5:
        return '#33F0FF';
      default:
        return '#33F0FF';
    }
  }

//TODO----------------------------------------
  borrarTarea(event:any){
    console.log(event.currentTarget.id)
    //this.borrarTareaEmiter.emit()

  }
  //TODO----------------------------------------
}
