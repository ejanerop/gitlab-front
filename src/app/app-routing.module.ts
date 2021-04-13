import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path : 'login' , component : LoginComponent},
  /*{path : 'list' , component : ListComponent , canActivate : [AuthGuard]},*/
  {path : 'home' , component : HomeComponent},
  {path : 'user' , component : UserListComponent, canActivate : [AuthGuard]},
  {path : 'user/:id' , component : UserEditComponent, canActivate : [AuthGuard]},
  {path : 'project' , component : ProjectsComponent, canActivate : [AuthGuard]},
  {path : '**' , pathMatch : 'full' , redirectTo : 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
