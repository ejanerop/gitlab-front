import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GitUser } from 'src/app/models/git-user';
import { ProjectService } from 'src/app/services/project.service';
import { Dialog } from '../../dialog/dialog.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @Input() id : string = '';
  @Input() name : string = '';
  @Input() description : string = '';
  @Input() name_with_namespaces : string = '';
  @Input() avatar_url? : string = '';
  @Input() visible : boolean = true;

  members : GitUser[] = [];
  initialized : boolean = false ;
  displayedColumns: string[] = ['name', 'actions'];

  constructor( private projectService : ProjectService, public dialog: MatDialog, private snack : MatSnackBar ) { }

  ngOnInit(): void {
  }

  initMembers() {
    this.projectService.members( this.id ).subscribe(( resp : any ) => {
      this.members = [];
      console.log(resp);
      this.initialized = true;
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
    });
  }


  showMembers() {
    if (!this.initialized) {
      this.initMembers();
    }
  }

  delete( user_id : string ) {

    this.dialog.open(Dialog , {
      data : {
        title : 'Está seguro que quiere remover el usuario del proyecto?',
        content : 'No tendrá acceso al proyecto.'
      }
    }).afterClosed().subscribe(confirmed => {
      if(confirmed) {
        this.projectService.deleteMember(this.id, user_id).subscribe(( resp : any ) =>{
          console.log(resp);
          this.initMembers();
          this.openSnackBar('Usuario removido correctamente', 'Cerrar');
        }, error => {
          this.openSnackBar(error.error, 'Cerrar');
        });
      }
    });

  }

  openSnackBar(message: string, action: string) {
    this.snack.open(message, action, {
      duration: 2000,
    });
  }

}
