import { Component, OnInit } from '@angular/core';
import {Bet} from '../model/bet.model';
import {BetService} from '../service/bet.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-bet-detail',
  templateUrl: './bet-detail.component.html',
  styleUrls: ['./bet-detail.component.css']
})
export class BetDetailComponent implements OnInit {
  bet: Bet;
  id: number;
  constructor(private betService: BetService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.betService.getBet(this.id).subscribe(
          (data: Bet) => this.bet = data
        );
      }
    );
  }

  deleteBet() {
    this.betService.deleteBet(this.id).subscribe(responseData => this.betService.onEmit());
    // this.router.navigate(['']);
  }
}
