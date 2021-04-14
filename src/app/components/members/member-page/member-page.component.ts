import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GitUser } from 'src/app/models/git-user';
import { Project } from 'src/app/models/project';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-page',
  templateUrl: './member-page.component.html',
  styleUrls: ['./member-page.component.css']
})
export class MemberPageComponent implements OnInit {

  id : string | null = '';
  loading : boolean = true;
  user : GitUser = new GitUser(0,'','','','','');
  projects : Project[] = [];
  displayedColumns: string[] = ['name', 'description'];

  constructor( private route : ActivatedRoute, private memberService : MemberService ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id != null && !isNaN(+this.id) ) {
      this.memberService.member(this.id).subscribe(( resp : any ) => {
        console.log(resp);
        let item = resp.body;
        this.user = new GitUser(item.id, item.name, item.username, item.state, item.web_url, item.avatar_url);
        this.loading = false;
      });
    }
  }

}
