import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GitUser } from 'src/app/models/git-user';
import { GroupService } from 'src/app/services/group.service';
import { environment } from 'src/environments/environment';
import { Dialog } from '../dialog/dialog.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  users : GitUser[] = [];
  form : FormGroup = new FormGroup({});

  constructor( private groupService : GroupService , private fb : FormBuilder, public dialog: MatDialog , private snack : MatSnackBar  ) {
    this.form = this.fb.group({
      'name' : ['']
    });
  }

  get name() {
    return this.form.get('name')?.value;
  }

ngOnInit(): void {
  this.refresh()
}

  delete( member : string ) {
    this.dialog.open(Dialog , {
      data : {
        title : 'Está seguro que quiere remover el usuario del grupo?',
        content : 'Se le removerá también el permiso a todos los proyectos del grupo.'
      }
    }).afterClosed().subscribe(confirmed => {
      if(confirmed) {
        this.groupService.deleteMember(environment.group_id, member ).subscribe(resp => {
          console.log(resp);
          this.refresh();
          this.openSnackBar('Usuario removido correctamente', 'Cerrar');
        }, (error) => {
          console.log(error);
          this.openSnackBar(error.error, 'Cerrar');
        });
      }
    });
  }
  refresh() {
    this.groupService.members(environment.group_id).subscribe((resp : any) => {
    console.log(resp);
    this.users = [];
    for (const item of resp.body) {
      this.users.push(new GitUser(
        item.id,
        item.name,
        item.username,
        item.state,
        item.web_url,
        item.avatar_url,
        item.access_level ? item.access_level : 0
      ))
    }
  });
  }

  openSnackBar(message: string, action: string) {
    this.snack.open(message, action, {
      duration: 2000,
    });
  }

  find() {
    this.users.forEach(user => {
      user.checkName(this.name);
    });
  }

}
