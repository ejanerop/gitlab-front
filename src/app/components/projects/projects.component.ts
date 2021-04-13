import { Component, OnInit } from '@angular/core';
import { GitUser } from 'src/app/models/git-user';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects : Project[] = [];

  constructor( private projectService : ProjectService ) { }

  ngOnInit(): void {
    this.projectService.projects().subscribe(( resp : any ) => {
      console.log(resp.body);
      for (const item of resp.body) {
        let lenght = this.projects.push(new Project(item.id, item.name, item.description, item.name_with_namespace));
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
      console.log(this.projects);
    });
  }

}
