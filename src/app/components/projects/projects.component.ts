import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GitUser } from 'src/app/models/git-user';
import { Project } from 'src/app/models/project';
import { GroupService } from 'src/app/services/group.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  loading : boolean = false;
  projects : Project[] = [];
  form : FormGroup = new FormGroup({});

  constructor( private groupService : GroupService, private fb : FormBuilder ) {
    this.form = this.fb.group({
      'name' : ['']
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.groupService.projects(environment.group_id).subscribe(( resp : any ) => {
      for (const item of resp.body) {
        let lenght = this.projects.push(new Project(item.id, item.name, item.description, item.name_with_namespace, item.avatar_url));
        if (item.owner) {
          this.projects[lenght-1].owner = new GitUser(
            item.owner.id,
            item.owner.name,
            item.owner.username,
            item.owner.state,
            item.owner.web_url,
            item.owner.avatar_url);
          }
        }
        this.loading = false;
      });
    }

    get name() {
      return this.form.get('name')?.value;
    }

    find() {
      this.projects.forEach(project => {
        project.checkName(this.name);
      });
    }

  }
