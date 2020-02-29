import {Component, OnInit} from '@angular/core';
import {BetService} from './service/bet.service';
import {Bet} from './model/bet.model';
import {AuthService} from '../auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css'],
  providers: [BetService]
})
export class BetsComponent implements OnInit {
  activeBets: Bet[] = [];
  pendingBets: Bet[] = [];
  archivedBets: Bet[] = [];
  status = 'active';

  constructor(private betService: BetService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
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
    this.status = newStatus;
    this.router.navigate(['/bets/home']);

  }
}
