export enum CellType {
  Markdown = "MARKDOWN",
}

export enum ActionType {
  Expand = "EXPAND",
}

export class CellModel {
  actionType?: string;
  actionData?: string;
  header: string;
  cellType: string;
  cellData: any;
  expires: number;

  constructor(
    header: string,
    cellType: CellType,
    cellData: any,
    expires: number,
    actionType?: string,
    actionData?: string
  ) {
    this.header = header;
    this.cellType = cellType;
    this.cellData = cellData;
    this.expires = expires;
    this.actionType = actionType;
    this.actionData = actionData;
  }
}
