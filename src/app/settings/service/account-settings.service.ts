import {Injectable} from '@angular/core';
import {UserModel} from '../../auth/user.model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {EnvService} from '../../env.service';

@Injectable()
export class AccountSettingsService {

  private baseUrl = this.proccess.apiUrl + '/users/';

  constructor(private http: HttpClient, private authService: AuthService, private proccess: EnvService) {
  }

  changePassword(oldPassword: string, newPassword: string) {
    return this.http.patch(this.baseUrl + this.authService.getId() + '/password', {
      oldPassword,
      newPassword
    }, {
      headers: new HttpHeaders({Authorization: this.authService.user.token})
    });
  }

  changeUsername(newUsername: string) {
    return this.http.patch(this.baseUrl + this.authService.getId() + '/username', {}, {
      headers: new HttpHeaders({Authorization: this.authService.user.token}),
      params: new HttpParams().set('new-username', newUsername)
    });
  }

  deleteAccount() {
    return this.http.delete(this.baseUrl + this.authService.getId(), {
      headers: new HttpHeaders({Authorization: this.authService.user.token}),
    });
  }

}
