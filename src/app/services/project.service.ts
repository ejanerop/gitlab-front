import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  url: string = environment.api_url;

  constructor(private http: HttpClient, private auth: AuthService) {}

  projects() {
    const url = `${this.url}/project`;
    const headers = this.auth.getAuthHeader();

    return this.http.get(url, { observe: 'response', headers: headers });
  }

  members(project: string) {
    const url = `${this.url}/project/${project}/members`;
    const headers = this.auth.getAuthHeader();

    return this.http.get(url, { observe: 'response', headers: headers });
  }

  deleteMember(project: string, user: string) {
    const url = `${this.url}/project/${project}/members/${user}`;
    const headers = this.auth.getAuthHeader();

    return this.http.delete(url, { observe: 'response', headers: headers });
  }
}
