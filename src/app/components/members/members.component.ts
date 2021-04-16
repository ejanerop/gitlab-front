import { Component, OnInit } from '@angular/core';
import { Dialog } from '../dialog/dialog.component';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GitUser } from 'src/app/models/git-user';
import { GroupService } from 'src/app/services/group.service';
import { MatDialog } from '@angular/material/dialog';
import { UtilService } from 'src/app/services/util.service';
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html'
})
export class MembersComponent implements OnInit {

  form      : FormGroup = new FormGroup({});
  groupName : string    = '';
  loading   : boolean   = false;
  users     : GitUser[] = [];

  constructor(
    private groupService : GroupService,
    private fb           : FormBuilder,
    public dialog        : MatDialog,
    private util         : UtilService
  ) {
    this.form = this.fb.group({
      'name' : ['']
    });
  }

  get name()
  {
    return this.form.get('name')?.value;
  }

  ngOnInit(): void
  {
    this.initGroup();
    this.refresh();
  }

  delete( member : string )
  {
    this.dialog.open(Dialog, {
      data : {
        title : 'Está seguro que quiere remover el usuario del grupo?',
        content : 'Se le removerá también el permiso a todos los proyectos del grupo.'
      }
    }).afterClosed().subscribe(confirmed => {
      if(confirmed) {
        this.loading = true;
        this.groupService.deleteMember(environment.group_id, member ).subscribe( () => {
          this.refresh();
          this.util.openSnackBar('Usuario removido correctamente', 'Cerrar');
        }, error => {
          this.loading = false;
          this.util.openSnackBar(error.error, 'Cerrar');
        });
      }
    });
  }

  refresh()
  {
    this.loading = true;
    this.groupService.members(environment.group_id).subscribe((resp : any) => {
      this.users = [];
      for (const item of resp.body) {
        this.users.push(
          new GitUser(
            item.id,
            item.name,
            item.username,
            item.state,
            item.web_url,
            item.avatar_url,
            item.access_level ? item.access_level : 0
          )
        )
      }
      this.loading = false;
    }, error => {
      console.error(error);
      this.loading = false;
      if (error.status == 0) {
        this.util.openSnackBar('Sin respuesta desde el servidor.', 'Cerrar');
      }else {
        this.util.openSnackBar(error.error, 'Cerrar');
      }
    });
  }

  initGroup()
  {
    this.groupService.group(environment.group_id).subscribe( ( resp : any ) => {
      console.log(resp);
      this.groupName = resp.body.name;
    });
  }

  find()
  {
    this.users.forEach(user => {
      user.checkName(this.name);
    });
  }

}
