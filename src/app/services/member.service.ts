import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  url: string = environment.api_url;

  constructor(private http: HttpClient, private auth: AuthService) {}

  members() {
    const url = `${this.url}/member`;
    const headers = this.auth.getAuthHeader();

    return this.http.get(url, { observe: 'response', headers: headers });
  }

  member(id: string) {
    const url = `${this.url}/member/${id}`;
    const headers = this.auth.getAuthHeader();

    return this.http.get(url, { observe: 'response', headers: headers });
  }

  memberships(id: string) {
    const url = `${this.url}/member/${id}/memberships`;
    const headers = this.auth.getAuthHeader();

    return this.http.get(url, { observe: 'response', headers: headers });
  }
}
