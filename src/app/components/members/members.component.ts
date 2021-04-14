import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GitUser } from 'src/app/models/git-user';
import { GroupService } from 'src/app/services/group.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  users : GitUser[] = [];
  form : FormGroup = new FormGroup({});

  constructor( private groupService : GroupService , private fb : FormBuilder ) {
    this.form = this.fb.group({
      'name' : ['']
    });
  }

  get name() {
    return this.form.get('name')?.value;
  }

  ngOnInit(): void {
    this.groupService.members(environment.group_id).subscribe((resp : any) => {
      console.log(resp);
      for (const item of resp.body) {
        this.users.push(new GitUser(
          item.id,
          item.name,
          item.username,
          item.state,
          item.web_url,
          item.avatar_url,
          item.access_level ? item.access_level : 0
        ))
      }
    });
  }

  find() {
    this.users.forEach(user => {
      user.checkName(this.name);
    });
  }

}
