import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  url : string = environment.api_url;

  constructor( private http : HttpClient, private auth : AuthService ) { }

  group( group : string )
  {
    const url = `${this.url}/group/${group}`;
    const headers = this.auth.getAuthHeader();
    return this.http.get(url , { observe : 'response', headers : headers });
  }

  members( group : string )
  {
    const url = `${this.url}/group/${group}/members`;
    const headers = this.auth.getAuthHeader();
    return this.http.get(url , { observe : 'response', headers : headers });
  }

  projects( group : string )
  {
    const url = `${this.url}/group/${group}/projects`;
    const headers = this.auth.getAuthHeader();
    return this.http.get(url , { observe : 'response', headers : headers });
  }
}
