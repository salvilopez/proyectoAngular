import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ContactDetailPageComponent } from './pages/contact-detail-page/contact-detail-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import {TodoDetailPageComponent} from './pages/todo-detail-page/todo-detail-page.component';
import { TodoListPageComponent } from './pages/todo-list-page/todo-list-page.component';
import {  ContactListPageComponent} from './pages/contact-list-page/contact-list-page.component';
/**
 * App Routes that load our Pages
 */
const routes: Routes = [
  {
    path: '', // http:localhost:4200/
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: 'home', // http:localhost:4200/home
    component: HomePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login', // http:localhost:4200/login
    component: LoginPageComponent
  },
  {
    path: 'register', // http:localhost:4200/register
    component: RegisterPageComponent
  },
  {
    path: 'contacts',  // http:localhost:4200/contacts
    component:ContactListPageComponent ,
    canActivate: [AuthGuard],
  },
  {
    path: 'contacts/:id', // http:localhost:4200/contacts/1
    component: ContactDetailPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'todos', // http:localhost:4200/todos
    component: TodoListPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'todos/:id', // http:localhost:4200/todos/1
    component: TodoDetailPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
