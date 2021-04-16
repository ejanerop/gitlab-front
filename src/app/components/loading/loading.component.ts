import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html'
})
export class LoadingComponent {

  @Input() loading : boolean = false;
  @Input() height : number = 10;

  constructor() { }

}
