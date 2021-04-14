import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { Dialog } from '../../dialog/dialog.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  @Input() id : number = 0;
  @Input() name : string = '';
  @Input() username : string = '';
  @Input() state : string = '';
  @Input() avatar_url : string = '';
  @Input() web_url : string = '';
  @Input() visible : boolean = true;
  @Input() access_level : number | undefined = 0;
  @Output() remove : EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  removeMember() {
    this.remove.emit(this.id.toString());
  }


}
