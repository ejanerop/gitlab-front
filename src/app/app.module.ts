import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { ProjectComponent } from './components/projects/project/project.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Dialog } from './components/dialog/dialog.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { MembersComponent } from './components/members/members.component';
import { MemberComponent } from './components/members/member/member.component';
import { MemberPageComponent } from './components/members/member-page/member-page.component';
import { LevelPipe } from './pipes/level.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent,
    HomeComponent,
    ProjectsComponent,
    UserListComponent,
    UserEditComponent,
    ProjectComponent,
    Dialog,
    ShortenPipe,
    MembersComponent,
    MemberComponent,
    MemberPageComponent,
    LevelPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
