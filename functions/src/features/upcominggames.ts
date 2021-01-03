// This card displays a countdown to an event of the user's choosing.
import { CellModel, ActionType } from "../models/cell";
import { TextRow, FontStyle } from "../models/rows/text";
import { CardCategory, CardModel } from "../models/card";
import { DetailModel } from "../models/detail";
import { TableDetail } from "../models/detail/table";

const CARD_KEY = "upcoming-games";

export const writeCard = async (pushCard: any) => {
  // Write the card structure for this card to Firestore.
  const card = new CardModel(
    CARD_KEY,
    "Cal Athletics",
    "View upcoming games.",
    "map",
    CardCategory.Navigation
  );
  pushCard(card);
};

export const writeCell = async (
  params: any,
  pushCell: any,
  pushDetail: any
) => {
  // Write the cell structure for this cell to Firestore.
  const header = "Cal Athletics";
  const cellData = [TextRow("Tap here to view upcoming games.", FontStyle.h3)];
  const expires = -1;
  const actionType = ActionType.Detail;

  // Initialize the detail model so we can get a reference to it
  const detail = new DetailModel(CARD_KEY, params, "table", null);
  const cell = new CellModel(
    CARD_KEY,
    params,
    header,
    cellData,
    expires,
    actionType,
    detail.documentId()
  );

  pushCell(cell);

  // Then, write the child node if the cell contains a child.

  detail.data = TableDetail([
    {
      rows: [
        TextRow("California at Oregon State (Men's Basketball)", FontStyle.h3),
        TextRow("Saturday, 1/2/21 • 3:00 PM to 5:00 PM", FontStyle.footer),
      ],
    },
    {
      rows: [
        TextRow("California at Oregon State (Men's Basketball)", FontStyle.h3),
        TextRow("Saturday, 1/2/21 • 3:00 PM to 5:00 PM", FontStyle.footer),
      ],
    },
    {
      rows: [
        TextRow("California at Oregon State (Men's Basketball)", FontStyle.h3),
        TextRow("Saturday, 1/2/21 • 3:00 PM to 5:00 PM", FontStyle.footer),
      ],
    },
  ]);

  pushDetail(detail);
};
