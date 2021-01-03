export enum ActionType {
  Web = "WEB",
  Detail = "DETAIL",
}

export enum RowType {
  Text = "TEXT",
  Button = "BUTTON",
}

export class CellModel {
  cardKey: string;
  actionType?: string;
  actionData?: string;
  header: string;
  params: string;
  data: any[];
  expires: number;

  constructor(
    cardKey: string,
    params: any,
    header: string,
    data: any[],
    expires: number,
    actionType?: string,
    actionData?: string
  ) {
    this.cardKey = cardKey;
    this.params = params;
    this.header = header;
    this.data = data;
    this.expires = expires;
    this.actionType = actionType;
    this.actionData = actionData;
  }
}
