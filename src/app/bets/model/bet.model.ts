export class Bet {
  public betId?: number;
  public title: string;
  public content: string;
  public value: string;
  public status: string;
  public creatorId: number;
  public rivalName: string;


  constructor(title: string, content: string, value: string, status: string, creatorId: number, rivalName: string, betId?: number) {
    this.betId = betId;
    this.title = title;
    this.content = content;
    this.value = value;
    this.status = status;
    this.creatorId = creatorId;
    this.rivalName = rivalName;
  }
}
