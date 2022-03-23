import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';
import { Dialog } from '../../dialog/dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  loading: boolean = false;
  users: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'actions'];

  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
    private util: UtilService
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  new() {
    this.router.navigateByUrl('/user/new');
  }

  edit(element: User) {
    this.router.navigateByUrl(`/user/${element.id}`);
  }

  delete(element: User) {
    this.dialog
      .open(Dialog, {
        data: {
          title: 'Are you sure you want to delete the user?',
          content: 'All information will be lost.',
        },
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          this.loading = true;
          this.userService.deleteUser(element).subscribe(
            () => {
              this.refresh();
              this.util.openSnackBar('User deleted succesfully', 'Close');
            },
            (error) => {
              this.loading = false;
              this.util.openSnackBar(error.error, 'Close');
            }
          );
        }
      });
  }

  refresh() {
    this.loading = true;
    this.userService.users().subscribe(
      (resp: any) => {
        this.users = [];
        for (const item of resp.body) {
          this.users.push(new User(item.id, item.name, item.email));
        }
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.loading = false;
        if (error.status == 0) {
          this.util.openSnackBar('No response from the server', 'Close');
        } else {
          this.loading = false;
          this.util.openSnackBar(error.error, 'Close');
        }
      }
    );
  }
}
