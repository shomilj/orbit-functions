interface TableRow {
  actionType?: string;
  actionData?: string;
  rows: any[];
}

interface TableDetailType {
  type: string;
  rows: TableRow[];
}

export const TableDetail = (rows: TableRow[]): TableDetailType => {
  return {
    type: "TABLE",
    rows: rows,
  };
};
