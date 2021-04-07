import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ContactDetailPageComponent } from './pages/contact-detail-page/contact-detail-page.component';
import { TodoComponent } from './components/todo/todo/todo.component';
import { TodoDetailPageComponent } from './pages/todo-detail-page/todo-detail-page.component';
import { ContactListPageComponent } from './pages/contact-list-page/contact-list-page.component';
import { TodoListPageComponent } from './pages/todo-list-page/todo-list-page.component';
import { ContactService } from './services/contact.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NotFoundPageComponent,
    ContactDetailPageComponent,
    TodoComponent,
    TodoDetailPageComponent,
    ContactListPageComponent,
    TodoListPageComponent,
    HeaderComponent,
    FooterComponent,

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
    MatSnackBarModule,
    NgbModule,
    FormsModule,
    DragDropModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule


  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
