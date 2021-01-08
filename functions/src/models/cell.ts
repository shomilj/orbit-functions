import * as hash from "object-hash";

export enum ActionType {
  Web = "WEB",
  Detail = "DETAIL",
}

export enum RowType {
  Text = "TEXT",
  Button = "BUTTON",
}

export function CellIDGen(cardKey: string, params?: any) {
  return hash({
    cardKey: cardKey,
    params: params,
  });
}

export class CellModel {
  cardKey: string;
  actionType?: string;
  actionContent?: string;
  params?: string;
  header: string;
  data: any[];
  expires: number;

  constructor(
    cardKey: string,
    params: any,
    header: string,
    data: any[],
    expires: number,
    actionType?: string,
    actionContent?: string
  ) {
    this.cardKey = cardKey;
    this.params = params;
    this.header = header;
    this.data = data;
    this.expires = expires;
    this.actionType = actionType;
    this.actionContent = actionContent;
  }

  documentId = () => {
    return CellIDGen(this.cardKey, this.params);
  };
}
