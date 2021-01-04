export interface TableRow {
  actionType?: string;
  actionContent?: string;
  data: any[];
}

export interface TableDetailType {
  type: string;
  data: TableRow[];
}

export const TableDetail = (rows: TableRow[]): TableDetailType => {
  return {
    type: "TABLE",
    data: rows,
  };
};
