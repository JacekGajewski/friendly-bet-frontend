import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from './user.model';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {EnvService} from '../env.service';

@Injectable({providedIn: 'root'})
export class AuthService {

  @Output() logListener = new EventEmitter();
  user: UserModel;
  private expTimeToken;

  constructor(private http: HttpClient, private router: Router, private env: EnvService) {
  }

  getId() {
    if (this.user) {
      return this.user.id;
    }
    return null;
  }

  signup(theUsername: string, thePassword: string) {
    const url = this.env.apiUrl + '/users';
    return this.http.post(url, {
      username: theUsername,
      password: thePassword
    });
  }

  login(theUsername: string, thePassword: string) {
    const url =  this.env.apiUrl + '/login';
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
        this.onEmit(true);
        localStorage.setItem('userData', JSON.stringify(this.user));
        this.autoLogout(+responseData.headers.get('ExpiresIn') * 24 * 3600); // TODO: Check if the time is correct
        this.router.navigate(['/bets']);
        // this.token = responseData.headers.get('Authorization');
        // this.id = responseData.headers.get('UserId');
        // this.router.navigate(['/bets']);
      }));
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      this.router.navigate(['/auth']);
      return null;
    }

    const loadedUser = new UserModel(
      userData.username,
      userData.id,
      userData._token,
      new Date(userData._tokenExpDate)
    );
    this.onEmit(true);
    if (loadedUser.token) {
      this.user = loadedUser;
      const expDuration = new Date(userData._tokenExpDate).getTime() -
        new Date().getTime();
      this.autoLogout(expDuration);
      this.onEmit(true);
      console.log('autologin');
    }
  }

  logout() {
    this.user = null;
    this.onEmit(false);
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

  onEmit(loggedIn: boolean) {
    this.logListener.emit(loggedIn);
  }
}
