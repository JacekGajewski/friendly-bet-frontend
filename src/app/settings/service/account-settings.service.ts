import {Injectable} from '@angular/core';
import {UserModel} from '../../auth/user.model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Injectable()
export class AccountSettingsService {

  private baseUrl = 'https://friendly-bet-backend.herokuapp.com/users';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  changePassword(oldPassword: string, newPassword: string) {
    return this.http.patch(this.baseUrl + '/' + this.authService.getId() + '/password', {
      oldPassword,
      newPassword
    }, {
      headers: new HttpHeaders({Authorization: this.authService.user.token})
    });
  }

  changeUsername(newUsername: string) {
    return this.http.patch(this.baseUrl + '/' + this.authService.getId() + '/username', {}, {
      headers: new HttpHeaders({Authorization: this.authService.user.token}),
      params: new HttpParams().set('new-username', newUsername)
    });
  }

  deleteAccount() {
    return this.http.delete(this.baseUrl + '/' + this.authService.getId(), {
      headers: new HttpHeaders({Authorization: this.authService.user.token}),
    });
  }

}
