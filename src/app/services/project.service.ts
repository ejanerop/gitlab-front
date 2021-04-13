import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url : string = environment.api_url;

  constructor( private http : HttpClient, private auth : AuthService ) { }

  projects()
  {
    const url = `${this.url}/project`;
    const headers = this.auth.getAuthHeader();
    return this.http.get(url , { observe : 'response', headers : headers });
  }
}
