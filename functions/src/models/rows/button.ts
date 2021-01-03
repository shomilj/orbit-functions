import { ActionType, RowType } from "../cell";

export const ButtonRow = (
  title: string,
  actionType: ActionType,
  actionContent: any
) => {
  return {
    type: RowType.Button,
    data: {
      title: title,
      actionType: actionType,
      actionContent: actionContent,
    },
  };
};
