import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_token : string | null = '';
  user : string | null = '';
  url = environment.api_url;

  constructor( private http : HttpClient) {

    this.loadInfo();

  }

  login( data : any ){

    const url = `${this.url}/login`;

    return this.http.post(url, data, {observe: 'response'});

  }

  logout() {

    const url = `${this.url}/logout`;

    const token = this.api_token;

    const headers = this.getAuthHeader();

    return this.http.get(url, {headers : headers}).pipe( map( (resp : any) => {
      this.removeInfo();
      return resp;
    })
    );

  }

  saveInfo( token : string, user : string ) {

    this.api_token = token;
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'user', user );

    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem( 'expira', hoy.getTime().toString() );

  }

  removeInfo() {

    localStorage.removeItem('token');
    localStorage.removeItem('expira');
    localStorage.removeItem('user');

    this.api_token = '';
    this.user = '';

  }

  loadInfo() {

    if ( localStorage.getItem('token') == null ) {
      this.api_token = '';
    } else {
      this.api_token = localStorage.getItem('token');
      this.user = localStorage.getItem('user');
    }

    return this.api_token;

  }

  get token()
  {
    return this.api_token;
  }

  authUser()
  {
    return this.user;
  }

  isAuth() {

    if ( this.api_token != null && this.api_token.length < 2  ) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if ( expiraDate > new Date() ) {
      return true;
    } else {
      return false;
    }

  }

  getAuthHeader() : HttpHeaders
  {
    const headers = new HttpHeaders({'Authorization':`Bearer ${this.api_token}`});

    return headers;
  }

}
