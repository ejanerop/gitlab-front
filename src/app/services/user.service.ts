import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url : string = environment.api_url;

  constructor( private http : HttpClient, private auth : AuthService ) { }

  users()
  {
    const url = `${this.url}/user`;
    const headers = this.auth.getAuthHeader();

    return this.http.get(url, { observe : 'response', headers : headers });
  }

  user( id : string )
  {
    const url = `${this.url}/user/${id}`;
    const headers = this.auth.getAuthHeader();

    return this.http.get(url, { observe : 'response', headers : headers });
  }

  createUser( data : any )
  {
    const url     = `${this.url}/user`;
    const headers = this.auth.getAuthHeader();

    return this.http.post(url, data, { observe : 'response', headers : headers });
  }

  editUser( data : any )
  {
    const url     = `${this.url}/user/${data.id}`;
    const headers = this.auth.getAuthHeader();

    return this.http.put(url, data, { observe : 'response', headers : headers });
  }

  deleteUser( user : User )
  {
    const url     = `${this.url}/user/${user.id}`;
    const headers = this.auth.getAuthHeader();

    return this.http.delete(url, { observe : 'response', headers : headers });
  }
}
