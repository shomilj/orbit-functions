// This card displays a countdown to an event of the user's choosing.

import * as moment from "moment";
import { CellModel, CellType } from "../models/cell";
import { Label, FontStyle } from "../models/cards/markdown";
import { Param, ParamType } from "../models/parameter";
import { CardGroup, CardModel } from "../models/card";

const DATE_MAP: Record<string, string> = {
  "Dead Week": "2020-02-22",
  "First Day of Summer": "2020-05-15",
};

interface Params {
  event: string;
}

export const getParams = async () => {
  // Return all parameter options for this card.
  return [
    new Param("event", "Event", ParamType.SingleSelect, Object.keys(DATE_MAP)),
  ];
};

export const writeCard = async (pushCard: any) => {
  // Write the card structure for this card to Firestore.
  const params = await getParams();
  const card = new CardModel(
    "Countdown",
    "This card displays a countdown to major calendar events!",
    "calendar",
    [CardGroup.AllCards],
    params
  );
  pushCard(card);
};

export const writeCell = async (
  params: Params,
  pushCell: any,
  pushDetail: any
) => {
  // Write the cell structure for this cell to Firestore.
  // Then, write the child node if the cell contains a child.
  const header = "Days To " + params.event;
  const daysLeft =
    moment().diff(moment(DATE_MAP[params.event]), "days") + " Days";

  const cell = new CellModel(header, CellType.Markdown, [
    Label(daysLeft, FontStyle.h2),
  ]);
  pushCell(cell);
};
