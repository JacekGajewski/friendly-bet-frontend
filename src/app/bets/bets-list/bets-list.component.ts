import {Component, OnInit} from '@angular/core';
import {Bet} from '../model/bet.model';
import {BetService} from '../service/bet.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-bets-list',
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.css']
})
export class BetsListComponent implements OnInit {
  activeBets: Bet[] = [];
  pendingBets: Bet[] = [];
  archivedBets: Bet[] = [];
  status = 'active';

  constructor(private betService: BetService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.showBets();
    this.betService.betsListener.subscribe(
      (data: string) => {
        this.showBets();
      },
    );
  }

  showBets() {
    this.betService.getBetsByStatus('active')
      .subscribe((data: Bet[]) => {
          this.activeBets = data;
        },
      );

    this.betService.getBetsByStatus('pending')
      .subscribe((data: Bet[]) => {
          this.pendingBets = data;
        },
      );

    this.betService.getBetsByStatus('archived')
      .subscribe((data: Bet[]) => {
          this.archivedBets = data;
        },
      );
  }

  changeStatus(newStatus: string) {
    console.log('ACTIVE: ' + this.activeBets.length);
    console.log('PENDING: ' + this.pendingBets.length);
    console.log('ARCHIVED: ' + this.archivedBets.length);
    this.status = newStatus;
  }
}
