import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  @Input() name : string = '';
  @Input() username : string = '';
  @Input() state : string = '';
  @Input() avatar_url : string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
