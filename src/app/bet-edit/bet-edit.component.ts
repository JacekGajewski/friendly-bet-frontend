import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {BetService} from '../bets/service/bet.service';
import {Bet} from '../bets/model/bet.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-bet-edit',
  templateUrl: './bet-edit.component.html',
  styleUrls: ['./bet-edit.component.css']
})
export class BetEditComponent implements OnInit {
  // genders = ['male', 'female'];
  signUpForm: FormGroup;
  id = -1;

  // forbiddenUserName = ['Chris', 'Anna'];

  constructor(private betService: BetService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      betData: new FormGroup({
        betName: new FormControl(null, [Validators.required]),
        betContent: new FormControl(null, [Validators.required]),
        value: new FormControl(null, [Validators.required]),
        rival: new FormControl(null, [Validators.required]),
      })
      // gender: new FormControl('male'),
      // hobbies: new FormArray([])
    });
    // console.log(this.router.url);
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     console.log(this.id);
    //
    //     this.id = +params['id'];
    //     console.log(this.id);
    //
    //     const bet = this.betService.getBet(this.id);
    //     this.signUpForm.setValue({
    //         betData: {
    //           betName: bet.name,
    //           value: bet.value
    //         }
    //       }
    //     );
    //   });
  }

  // this.signUpForm.valueChanges.subscribe(
  //   (value) => console.log(value)
  // );
  // this.signUpForm.statusChanges.subscribe(
  //   (value) => console.log(value)
  // );
  //
  // this.signUpForm.setValue({
  //   userData: {
  //     username: 'John',
  //     email: 'fa@qw.pl'
  //   },
  //   gender: 'male',
  //   hobbies: []
  // });
  //
  // this.signUpForm.reset();
  //
  // this.signUpForm.patchValue({
  //   userData: {
  //     username: 'John'
  //   }
  // });
  // }

  onSubmit() {
    // console.log(this.signUpForm);
    // console.log(this.signUpForm.get('betData'));
    console.log(this.signUpForm.get('betData').get('betName').value);
    this.betService.addBet(new Bet(
      this.signUpForm.get('betData').get('betName').value,
      this.signUpForm.get('betData').get('betContent').value,
      this.signUpForm.get('betData').get('value').value,
      'pending',
      +this.authService.getId(),
      this.signUpForm.get('betData').get('rival').value,
      this.authService.getId()), this.authService.getId(), this.signUpForm.get('betData').get('rival').value
    ).subscribe(
      responseData => this.betService.onEmit()
    );

    console.log(this.id);
  }

  // onAddHobbies() {
  //   const control = new FormControl(null, Validators.required);
  //   (this.signUpForm.get('hobbies') as FormArray).push(control);
  // }
  //
  // getControls() {
  //   return (this.signUpForm.get('hobbies') as FormArray).controls;
  // }
  //
  // forbiddenNames(control: FormControl): { [s: string]: boolean } {
  //   if (this.forbiddenUserName.indexOf(control.value) !== -1) {
  //     return {nameIsForbidden: true};
  //   }
  //   return null;
  // }
  //
  // // Asynchronous validator
  // forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
  //   const promise = new Promise<any>((resolve, reject) => {
  //     setTimeout(() => {
  //       if (control.value === 'test@test.com') {
  //         resolve({emailIsForbidden: true});
  //       } else {
  //         resolve(null);
  //       }
  //     }, 1500);
  //   });
  //   return promise;
  // }
}
