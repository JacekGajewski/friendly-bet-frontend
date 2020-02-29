import {Injectable} from '@angular/core';
import {UserModel} from '../../auth/user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../auth/auth.service';

@Injectable()
export class AccountSettingsService {

  private baseUrl = 'https://jg-test.herokuapp.com/users';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  changePassword(newPassword: string) {
    return this.http.put(this.baseUrl + '/' + this.authService.getId(), {
      userId: this.authService.getId(),
      username: this.authService.user.username,
      password: newPassword
    }, {
      headers: new HttpHeaders({
        Authorization: this.authService.user.token
      })
    });
  }
}
