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

  user: UserModel;
  private expTimeToken;

  constructor(private http: HttpClient, private router: Router) {
  }

  getId() {
    return this.user.id;
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
      .pipe(tap(responseData => {
        const expData = new Date(new Date().getTime() + (+responseData.headers.get('ExpiresIn') * 24 * 3600 * 1000));
        this.user = new UserModel(
          theUsername,
          responseData.headers.get('UserId'),
          responseData.headers.get('Authorization'),
          expData
        );
        localStorage.setItem('userData', JSON.stringify(this.user));
        this.autoLogout(+responseData.headers.get('ExpiresIn') * 24 * 3600); // TODO: Check if the time is correct
        this.router.navigate(['/bets']);
        // this.token = responseData.headers.get('Authorization');
        // this.id = responseData.headers.get('UserId');
        // this.router.navigate(['/bets']);
      }));
  }

  autoLogin() {
    const userData: {
      username: string,
      id: string,
      _token: string,
      __tokenExpDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return null;
    }
    const loadedUser = new UserModel(
      userData.username,
      userData.id,
      userData._token,
      new Date(userData.__tokenExpDate)
    );

    if (loadedUser.token) {
      this.user = loadedUser;
      const expDuration = new Date(userData.__tokenExpDate).getTime() -
        new Date().getTime();
      this.autoLogout(expDuration);
    }
  }

  logout() {
    this.user = null;
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);

    if (this.expTimeToken) {
      clearTimeout(this.expTimeToken);
    }
    this.expTimeToken = null;
  }

  autoLogout(expDuration: number) {
    this.expTimeToken = setTimeout(() => {
      this.logout();
    }, expDuration);
  }
}
