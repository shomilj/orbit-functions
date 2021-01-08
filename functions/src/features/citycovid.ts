// This card displays a countdown to an event of the user's choosing.

import { ActionType, CellModel } from "../models/cell";
import { TextRow, FontStyle } from "../models/rows/text";
import { CardCategory, CardModel } from "../models/card";
import * as moment from "moment";
import axios from "axios";
import { ButtonRow } from "../models/rows/button";
import { DateFormat, DateRow } from "../models/rows/date";

export const CARD_KEY = "city-covid";

export const writeCard = async (pushCard: any) => {
  // Write the card structure for this card to Firestore.
  const card = new CardModel(
    CARD_KEY,
    "City of Berkeley COVID-19 Data",
    "This card displays information from the City of Berkeley COVID-19 dashboard.",
    "medkit",
    CardCategory.HealthFitness
  );
  pushCard(card);
};

export const writeCell = async (
  params: any,
  pushCell: any,
  pushDetail: any
) => {
  // Write the cell structure for this cell to Firestore.
  // Then, write the child node if the cell contains a child.

  const result = await axios.get(
    "https://data.cityofberkeley.info/resource/xn6j-b766.json"
  );
  const data = result.data;
  const recent = data[data.length - 1];
  // const newCases = recent.bklhj_newcases + " New Cases";
  const totalCases = recent.bklhj_cumulcases;
  const header = "City of Berkeley COVID-19 Data";
  const expires = moment().add(30, "minutes").unix();

  const cell = new CellModel(
    CARD_KEY,
    params,
    header,
    [
      TextRow(
        "There are " + totalCases + " positive cases in the City of Berkeley.",
        FontStyle.h2
      ),
      DateRow(
        recent.date,
        FontStyle.footer,
        DateFormat.relative,
        "Last Updated "
      ),
      ButtonRow(
        "Book a COVID Test",
        ActionType.Web,
        "https://etang.berkeley.edu/"
      ),
      ButtonRow(
        "COVID-19 Cases on Campus",
        ActionType.Web,
        "https://covid.berkeley.edu/"
      ),
    ],
    expires
  );
  pushCell(cell);
};
