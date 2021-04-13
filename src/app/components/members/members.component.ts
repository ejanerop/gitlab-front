import { Component, OnInit } from '@angular/core';
import { GitUser } from 'src/app/models/git-user';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  users : GitUser[] = [];

  constructor( private memberService : MemberService ) { }

  ngOnInit(): void {
    this.memberService.members().subscribe((resp : any) => {
      console.log(resp);
      for (const item of resp.body) {
        this.users.push(new GitUser(
          item.id,
          item.name,
          item.username,
          item.state,
          item.web_url,
          item.avatar_url
        ))
      }
    });
  }

}
