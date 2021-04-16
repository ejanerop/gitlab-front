import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MembersComponent } from './components/members/members.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { AuthGuard } from './guards/auth.guard';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  {path : 'login' , component : LoginComponent},

  {
    path : '' ,
    component : MainPageComponent,
    children : [
      {path : 'home' , component : HomeComponent, canActivate : [AuthGuard]},
      {path : 'user' , component : UserListComponent, canActivate : [AuthGuard]},
      {path : 'user/:id' , component : UserEditComponent, canActivate : [AuthGuard]},
      {path : 'project' , component : ProjectsComponent, canActivate : [AuthGuard]},
      {path : 'member' , component : MembersComponent, canActivate : [AuthGuard]},
      {path : '**' , pathMatch : 'full' , redirectTo : 'home'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
