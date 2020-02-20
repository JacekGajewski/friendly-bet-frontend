export class Bet {
  public betId?: string;
  public title: string;
  public content: string;
  public value: string;
  public status: string;
  public creatorId: number;
  public rivalName: string;


  constructor(title: string, content: string, value: string, status: string, creatorId: number, rivalName: string, betId?: string) {
    this.betId = betId;
    this.title = title;
    this.content = content;
    this.value = value;
    this.status = status;
    this.creatorId = creatorId;
    this.rivalName = rivalName;
  }
}
