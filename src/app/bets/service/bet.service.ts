import {Bet} from '../model/bet.model';
import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Injectable()
export class BetService {
  @Output() betsListener = new EventEmitter();
  private baseUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getBet(id: number) {
    return this.http.get(this.baseUrl + '/' + this.authService.getId() + '/bets/' + id, {
      headers: new HttpHeaders({
        Authorization: this.authService.user.token
      })
    });
  }

  getBetsByStatus(status: string) {
    return this.http.get('http://localhost:8080/user/' + this.authService.getId() + '/bets/status/' + status, {
      headers: new HttpHeaders({
        Authorization: this.authService.user.token
      })
    });
  }

  addBet(newBet: Bet): Observable<Bet> {
    console.log(newBet);
    return this.http.post<Bet>(this.baseUrl + '/' + this.authService.getId() + '/bets', newBet, {
      headers: new HttpHeaders({
        Authorization: this.authService.user.token
      })
    });
  }

  deleteBet(id: number): Observable<{}> {
    return this.http.delete(this.baseUrl + '/' + this.authService.getId() + '/bets' + '/' + id, {
      headers: new HttpHeaders({
        Authorization: this.authService.user.token
      })
    });

  }

  updateBet(bet: Bet) {
    return this.http.put(this.baseUrl + '/' + this.authService.getId() + '/bets', bet, {
      headers: new HttpHeaders({
        Authorization: this.authService.user.token
      })
    });
  }

  onEmit() {
    this.betsListener.emit('cos');
  }

}
