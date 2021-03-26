// This card displays a countdown to an event of the user's choosing.

import * as moment from "moment";
import { CellModel } from "../models/cell";
import { Param, ParamType } from "../models/parameter";
import { CardCategory, CardModel } from "../models/card";
import { FontStyle, TextRow } from "../models/rows/text";

export const CARD_KEY = "countdown";

const DATE_MAP: Record<string, string> = {
  "Dead Week": "2021-05-01",
  "Summer Break": "2021-05-15",
  "Commencement": "2021-05-15",
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
    CARD_KEY,
    "Countdown",
    "This card displays a countdown to major calendar events!",
    "calendar",
    CardCategory.Events,
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
  const daysLeft = moment(DATE_MAP[params.event]).diff(moment(), "days");

  // Expires at end of day today.
  const expires = moment().endOf("day").unix();

  const cell = new CellModel(
    CARD_KEY,
    params,
    header,
    [
      TextRow(
        "There are " + daysLeft + " days until " + params.event,
        FontStyle.h2
      ),
    ],
    expires
  );
  pushCell(cell);
};
