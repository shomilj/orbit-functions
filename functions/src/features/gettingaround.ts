// This card displays a countdown to an event of the user's choosing.
import { CellModel, ActionType } from "../models/cell";
import { TextRow, FontStyle } from "../models/rows/text";
import { CardCategory, CardModel } from "../models/card";
import { DetailModel } from "../models/detail";
import { MapDetail } from "../models/detail/map";
import { ButtonRow } from "../models/rows/button";

const CARD_KEY = "getting-around";

export const writeCard = async (pushCard: any) => {
  // Write the card structure for this card to Firestore.
  const card = new CardModel(
    CARD_KEY,
    "Getting Around Campus",
    "View the campus map, find restrooms & water fountains, and more - this card has all the tools you'll need to find your way around campus.",
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
  const header = "Getting Around Campus";

  // Initialize the detail model so we can get a reference to it
  const detailCampusMap = new DetailModel(CARD_KEY, params, "campus-map", null);
  const detailAroundMe = new DetailModel(CARD_KEY, params, "around-me", null);

  const cellData = [
    TextRow(
      "View the campus map to quickly find a building or library.",
      FontStyle.h4
    ),
    ButtonRow("Campus Map", ActionType.Detail, detailCampusMap.documentId()),
    TextRow(
      "Need to find a water fountain? Or a printer? View this map!",
      FontStyle.h4
    ),
    ButtonRow("Around Me", ActionType.Detail, detailAroundMe.documentId()),
  ];

  const expires = -1;
  const cell = new CellModel(CARD_KEY, params, header, cellData, expires);

  pushCell(cell);

  // Then, write the child node if the cell contains a child.
  const campusMapData = require("../assets/campusmap.json");
  const aroundMeData = require("../assets/aroundme.json");
  detailCampusMap.node = MapDetail(campusMapData);
  detailAroundMe.node = MapDetail(aroundMeData);
  pushDetail(detailCampusMap);
  pushDetail(detailAroundMe);
};
