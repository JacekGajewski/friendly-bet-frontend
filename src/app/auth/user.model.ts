export class UserModel {

  constructor(public username: string,
              public id: string,
              private _token: string,
              private _tokenExpDate: Date) {
  }


  get token() {
    if (!this._tokenExpDate || new Date() > this._tokenExpDate) {
      return null;
    }
    return this.token;
  }
}
