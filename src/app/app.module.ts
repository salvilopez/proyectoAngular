import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
// Angular Material modules
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './views/list/list.component';
import { ContactComponent } from './components/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactDetailPageComponent } from './pages/contact-detail-page/contact-detail-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TodoComponent } from './components/todo/todo/todo.component';
import { TodoDetailPageComponent } from './pages/todo-detail-page/todo-detail-page.component';
import { ContactListPageComponent } from './pages/contact-list-page/contact-list-page.component';
import { TodoListPageComponent } from './pages/todo-list-page/todo-list-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ContactComponent,
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NotFoundPageComponent,
    ContactDetailPageComponent,
    TodoComponent,
    TodoDetailPageComponent,
    ContactListPageComponent,
    TodoListPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // We import HttpClientModule to perform http requests
    HttpClientModule,
    // We import ReactiveFormsModule to create Advanced Forms
    ReactiveFormsModule,
    // Angular Material Modules
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    NgbModule,
    FormsModule,
    DragDropModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
