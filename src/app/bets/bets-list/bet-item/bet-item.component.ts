import {Component, Input, OnInit} from '@angular/core';
import {Bet} from '../../model/bet.model';

@Component({
  selector: 'app-bet-item',
  templateUrl: './bet-item.component.html',
  styleUrls: ['./bet-item.component.css']
})
export class BetItemComponent implements OnInit {
  @Input() bet: Bet;
  @Input( )index: number;

  constructor() {
  }

  ngOnInit() {
  }

}
