import { Component, OnInit } from '@angular/core';
import {AccountSettingsService} from '../service/account-settings.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings-other',
  templateUrl: './settings-other.component.html',
  styleUrls: ['./settings-other.component.css']
})
export class SettingsOtherComponent implements OnInit {

  constructor(private accountService: AccountSettingsService, private router: Router) { }

  ngOnInit() {
  }

  delete() {
    if (confirm('Are you sure you want to permanently delete your account?')) {
      this.accountService.deleteAccount()
        .subscribe( responseDate => {
          console.log('ok');
          this.router.navigate(['/auth']);
        }, error => {
          console.log(error);
        });
    }
  }
}
