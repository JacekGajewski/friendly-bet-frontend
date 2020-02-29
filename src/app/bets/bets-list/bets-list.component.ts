import {Component, Input, OnInit} from '@angular/core';
import {Bet} from '../model/bet.model';
import {BetService} from '../service/bet.service';
import {AuthService} from '../../auth/auth.service';
import {ActivatedRoute, Router, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-bets-list',
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.css']
})
export class BetsListComponent implements OnInit {
  @Input() bets: Bet[] = [];

  constructor(private betService: BetService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

  }
}
