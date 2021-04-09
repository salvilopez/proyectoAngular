import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

// MDB Angular Free

@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss']
})
export class TodoListPageComponent implements OnInit {
  ngOnInit(): void {

  }
  constructor(   private location: Location){

  }
  /**
   * Metodo Pada Volver Atras
   */
  returnBack() {

    this.location.back();

  }
}
