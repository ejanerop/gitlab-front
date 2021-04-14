import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @Input() name : string = '';
  @Input() description : string = '';
  @Input() name_with_namespaces : string = '';
  @Input() avatar_url? : string = '';
  @Input() visible : boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
