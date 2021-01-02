export enum CellType {
  Markdown = "MARKDOWN",
}

export class CellModel {
  actionType?: string;
  actionData?: string;
  header: string;
  cellType: string;
  cellData: any;

  constructor(
    header: string,
    cellType: CellType,
    cellData: any,
    actionType?: string,
    actionData?: string
  ) {
    this.header = header;
    this.cellType = cellType;
    this.cellData = cellData;
    this.actionType = actionType;
    this.actionData = actionData;
  }
}
