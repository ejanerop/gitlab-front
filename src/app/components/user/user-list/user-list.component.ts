import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Dialog } from '../../dialog/dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users : User[] = [];
  displayedColumns: string[] = ['name', 'email', 'actions'];

  constructor( private userService : UserService , private router : Router, public dialog: MatDialog , private snack : MatSnackBar ) { }


  ngOnInit(): void {
    this.refresh();
  }

  new() {
    this.router.navigateByUrl('/user/new');
  }

  edit( element : User ) {
    this.router.navigateByUrl(`/user/${element.id}`);
  }

  delete(element : User) {
    this.dialog.open(Dialog , {
      data : {
        title : 'Está seguro que quiere eliminar el usuario?',
        content : 'Tenga en cuenta que la información se perderá.'
      }
    }).afterClosed().subscribe(confirmed => {
      if(confirmed) {
        this.userService.deleteUser(element).subscribe(resp => {
          console.log(resp);
          this.refresh();
          this.openSnackBar('Usuario eliminado correctamente', 'Cerrar');
        }, (error) => {
          console.log(error);
          this.openSnackBar(error.error, 'Cerrar');
        });
      }
    });
  }

  refresh() {
    this.userService.users().subscribe( (resp : any) => {
      console.log(resp);
      this.users = [];
      for (const item of resp.body) {
        this.users.push(new User( item.id , item.name , item.email ));
      }
      console.log(this.users);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snack.open(message, action, {
      duration: 2000,
    });
  }

}
