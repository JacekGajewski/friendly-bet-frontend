import {Component, OnInit} from '@angular/core';
import {Bet} from '../model/bet.model';
import {BetService} from '../service/bet.service';

@Component({
  selector: 'app-bets-list',
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.css']
})
export class BetsListComponent implements OnInit {
  bets: Bet[] = [];

  constructor(private betService: BetService) {
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
    this.betService.getBets()
      .subscribe((data: Bet[]) =>
        this.bets = data,
      );
  }
}
