import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaderResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {UserModel} from './user.model';
import {catchError, map, tap} from 'rxjs/operators';

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

  constructor(private http: HttpClient) {
  }

  // signup(aemail: string, apassword: string) {
  //   const url = '';
  //   return this.http.post<any>(url,
  //     {
  //       email: aemail,
  //       password: apassword,
  //       returnToken: true
  //     }
  //   )
  //     .pipe(tap(responseData => {
  //       this.handleAuthentication(responseData.email, responseData.id, responseData.tokenid, +responseData.expircesIn);
  //     }));
  // }
  getId() {
    return this.id;
  }

  signup(aemail: string, apassword: string) {
    const url = 'http://localhost:8080/bets';
    return this.http.get(url,
      {
        headers: new HttpHeaders({
          Authorization: this.token
        })
      }
    );
  }

  login(aemail: string, pass: string) {
    const url = 'http://localhost:8080/login';
    console.log(aemail);
    console.log(pass);

    return this.http.post<object>(url,
      {
        username: aemail,
        password: pass
      }, {observe: 'response'}).pipe(map(responseData => {
      // console.log('login';
      this.token = responseData.headers.get('Authorization');
      this.id = responseData.headers.get('UserId');
      // .replace(/Bearer /gi, '');
      console.log('heaeder: ', responseData.headers.get('Authorization'));
      console.log('heaeder: ', this.token);
      // console.log(responseData);
      // this.handleAuthentication(responseData.email, responseData.id, responseData.tokenid, +responseData.expircesIn);
    }));
  }

  private handleAuthentication(email: string, id: string, token: string, expiresIn: number) {
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new UserModel(
      email,
      id,
      token,
      expDate
    );
    this.user.next(user);
  }

  createOrder() {
    const url = 'http://localhost:8080/login';
    return this.http.get(url, {observe: 'response'}).pipe(
      map(resp => console.log('heaeder', resp.headers.get('Authorization')))
    );
  }
}
