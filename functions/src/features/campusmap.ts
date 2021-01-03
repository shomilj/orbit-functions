// This card displays a countdown to an event of the user's choosing.
import { CellModel, ActionType } from "../models/cell";
import { TextRow, FontStyle } from "../models/rows/text";
import { CardCategory, CardModel } from "../models/card";
import { MapDetail } from "../models/detail/map";
import { DetailModel } from "../models/detail";

const CARD_KEY = "campus-map";

export const writeCard = async (pushCard: any) => {
  // Write the card structure for this card to Firestore.
  const card = new CardModel(
    CARD_KEY,
    "Campus Map",
    "View the UC Berkeley Campus Map.",
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
  const header = "UC Berkeley Campus Map";
  const cellData = [TextRow("Tap Here to View the Campus Map", FontStyle.h3)];
  const expires = -1;
  const actionType = ActionType.Detail;
  const cell = new CellModel(
    CARD_KEY,
    params,
    header,
    cellData,
    expires,
    actionType
  );
  pushCell(cell);

  // Then, write the child node if the cell contains a child.
  const mapData = require("../assets/campusmap.json");
  pushDetail(new DetailModel(CARD_KEY, params, "map", MapDetail(mapData)));
};
