import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor( private router : Router ) { }

  ngOnInit(): void {
  }

  member( id : number ) {
    this.router.navigateByUrl(`/member/${id}`);
  }

}
