import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html'
})
export class LoadingComponent implements OnInit {

  @Input() loading : boolean = false;
  @Input() height : number = 10;

  constructor() { }

  ngOnInit(): void {
  }

}
