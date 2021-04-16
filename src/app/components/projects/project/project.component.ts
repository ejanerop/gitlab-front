import { Component, Input, OnInit } from '@angular/core';
import { Dialog } from '../../dialog/dialog.component';
import { GitUser } from 'src/app/models/git-user';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {

  @Input() id                   : string    = '';
  @Input() name                 : string    = '';
  @Input() description          : string    = '';
  @Input() name_with_namespaces : string    = '';
  @Input() avatar_url?          : string    = '';
  @Input() visible              : boolean   = true;

  loading                       : boolean   = false;
  members                       : GitUser[] = [];
  initialized                   : boolean   = false;
  displayedColumns              : string[]  = ['name', 'actions'];

  constructor(
    private projectService : ProjectService,
    public dialog: MatDialog,
    private util : UtilService
  ) { }

  initMembers()
  {
    this.loading = true;
    this.projectService.members( this.id ).subscribe(( resp : any ) => {
      this.members = [];
      for (const item of resp.body) {
        this.members.push(
          new GitUser(
            item.id,
            item.name,
            item.username,
            item.state,
            item.web_url,
            item.avatar_url,
            item.access_level
          )
        );
      }
      this.initialized = true;
      this.loading = false;
    });
  }

  get visibleTable()
  {
    return (this.initialized && this.members.length != 0 && !this.loading);
  }


  showMembers()
  {
    if (!this.initialized) {
      this.initMembers();
    }
  }

  delete( user_id : string )
  {
    this.dialog.open(Dialog, {
      data : {
        title : 'Está seguro que quiere remover el usuario del proyecto?',
        content : 'No tendrá acceso al proyecto.'
      }
    }).afterClosed().subscribe(confirmed => {
      if(confirmed) {
        this.loading = true;
        this.projectService.deleteMember(this.id, user_id).subscribe(( resp : any ) =>{
          this.loading = false;
          this.initMembers();
          this.util.openSnackBar('Usuario removido correctamente', 'Cerrar');
        }, error => {
          this.loading = false;
          this.util.openSnackBar(error.error, 'Cerrar');
        });
      }
    });

  }


}
