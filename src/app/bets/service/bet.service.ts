import {Bet} from '../model/bet.model';
import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Injectable()
export class BetService {
  @Output() betsListener = new EventEmitter();
  private baseUrl = 'http://localhost:8080/bets';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getBet(id: number) {
    return this.http.get(this.baseUrl + '/' + id, {
      headers: new HttpHeaders({
        Authorization: this.authService.token
      })
    });
  }

  getBetsByStatus(status: string) {
    return this.http.get('http://localhost:8080/bets/' + this.authService.getId() + '/' + status, {
      headers: new HttpHeaders({
        Authorization: this.authService.token
      })
    });
  }

  addBet(newBet: Bet, userId: string, rivalId: string): Observable<Bet> {
    return this.http.post<Bet>(this.baseUrl + '/' + userId + '/' + rivalId, newBet, {
      headers: new HttpHeaders({
        Authorization: this.authService.token
      })
    });
  }

  deleteBet(id: number): Observable<{}> {
    return this.http.delete(this.baseUrl + '/' + id, {
      headers: new HttpHeaders({
        Authorization: this.authService.token
      })
    });

  }

  updateBet(bet: Bet) {
    return this.http.put(this.baseUrl, bet, {
      headers: new HttpHeaders({
        Authorization: this.authService.token
      })
    });
  }

  onEmit() {
    this.betsListener.emit('cos');
  }

}
