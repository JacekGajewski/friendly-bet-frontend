import {Bet} from '../model/bet.model';
import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class BetService {
  @Output() betsListener = new EventEmitter();
  private bets: Bet[];
  private baseUrl = 'http://localhost:8080/bets';

  // private bets: Bet[] = [
  //   new Bet('Wybuch wojny światowej', 1),
  //   new Bet('Kto wyżej w tabeli', 1),
  //   new Bet('Fantasy Premier League', 1),
  //   new Bet('Kto więcej wyciśnie', 1),
  //   new Bet('Wyższa waga', 2)
  // ];

  constructor(private http: HttpClient) {
  }

  getBet(id: number) {
    return this.http.get(this.baseUrl + '/' + ++id);
  }

  getBets() {
    return this.http.get(this.baseUrl);
  }

  addBet(newBet: Bet): Observable<Bet> {
    return this.http.post<Bet>(this.baseUrl, newBet);
    // this.betsListener.emit();
    // this.bets.push(new Bet(content, name, value));
    // this.betsListener.emit(this.bets.slice());
  }

  deleteBet(id: number): Observable<{}> {
    return this.http.delete(this.baseUrl + '/' + ++id);
    // this.betsListener.emit();
    // this.bets.splice(id, 1);
    // this.betsListener.emit(this.bets.slice());
  }

  onEmit() {
    this.betsListener.emit('cos');
  }

}
