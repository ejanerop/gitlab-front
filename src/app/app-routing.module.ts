import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { UserListComponent } from './components/user/user-list/user-list.component';

const routes: Routes = [
  {path : 'login' , component : LoginComponent},
  /*{path : 'list' , component : ListComponent , canActivate : [AuthGuard]},*/
  {path : 'home' , component : HomeComponent},
  {path : 'user' , component : UserListComponent},
  {path : 'project' , component : ProjectsComponent},
  {path : '**' , pathMatch : 'full' , redirectTo : 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
