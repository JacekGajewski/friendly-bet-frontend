import { Component, OnInit } from '@angular/core';
import {BetService} from './service/bet.service';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css'],
  providers: [BetService]
})
export class BetsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
