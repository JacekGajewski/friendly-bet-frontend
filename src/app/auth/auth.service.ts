import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaderResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {UserModel} from './user.model';
import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

export interface AuthResponseData {
  email: string;
  id: string;
  tokenid: string;
  expircesIn: number;
  extra?: boolean; // Optional
}

@Injectable({providedIn: 'root'})
export class AuthService {

  token: string;
  user = new Subject<UserModel>();
  id: string;

  constructor(private http: HttpClient, private router: Router) {
  }

  getId() {
    return this.id;
  }

  signup(theUsername: string, thePassword: string) {
    const url = 'http://localhost:8080/users';
    return this.http.post(url, {
      username: theUsername,
      password: thePassword
    });
  }

  login(theUsername: string, thePassword: string) {
    const url = 'http://localhost:8080/login';
    return this.http.post<object>(url,
      {
        username: theUsername,
        password: thePassword
      }, {observe: 'response'})
      .pipe(map(responseData => {
        this.token = responseData.headers.get('Authorization');
        this.id = responseData.headers.get('UserId');
        this.router.navigate(['/bets']);
    }));
  }

  logout() {
    this.token = null;
    this.id = null;
    this.router.navigate(['/auth']);
  }
}
