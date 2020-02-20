import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }

    const email = authForm.form.value.email;
    const pass = authForm.form.value.password;

    // let authObsv: Observable<object>;

    this.isLoading = true;
    if (this.isLoginMode) {
      this.authService.login(email, pass).subscribe(responseData => {
        console.log(responseData);
        this.isLoading = false;
      }, error => {
        console.log(error);
        this.error = 'An error occurred';
        this.isLoading = false;
      });
    } else {
      this.authService.signup(email, pass).subscribe(responseData => {
        console.log(responseData);
        this.isLoading = false;
      }, error => {
        console.log(error);
        this.error = 'An error occurred';
        this.isLoading = false;
      });;
      // this.authService.signup(email, pass)
      //   .subscribe(responseData => {
      //     console.log(responseData);
      //     this.isLoading = false;
      //   }, error => {
      //     console.log(error);
      //     this.error = 'An error occurred';
      //     this.isLoading = false;
      //   });
    }
    // authObsv.subscribe(responseData => {
    //   console.log(responseData);
    //   this.isLoading = false;
    // }, error => {
    //   console.log(error);
    //   this.error = 'An error occurred';
    //   this.isLoading = false;
    // });

    authForm.reset();
  }
}
