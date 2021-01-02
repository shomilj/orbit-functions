// This card displays a countdown to an event of the user's choosing.
import { CellModel, CellType, ActionType } from "../models/cell";
import { Label, FontStyle } from "../models/cards/markdown";
import { CardGroup, CardModel } from "../models/card";
import { MapPage } from "../models/detail/map";

export const writeCard = async (pushCard: any) => {
  // Write the card structure for this card to Firestore.
  const card = new CardModel(
    "Campus Map",
    "View the UC Berkeley Campus Map.",
    "map",
    [CardGroup.AllCards]
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
  const cellType = CellType.Markdown;
  const cellData = [Label("Tap Here to View the Campus Map", FontStyle.h3)];
  const expires = -1;
  const actionType = ActionType.Expand;
  const cell = new CellModel(header, cellType, cellData, expires, actionType);
  pushCell(cell);

  // Then, write the child node if the cell contains a child.
  const mapData = require("../assets/campusmap.json");
  pushDetail(MapPage(mapData));
};
