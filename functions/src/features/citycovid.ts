// This card displays a countdown to an event of the user's choosing.

import { CellModel, CellType } from "../models/cell";
import { Label, FontStyle } from "../models/cards/markdown";
import { CardGroup, CardModel } from "../models/card";
import * as moment from "moment";
import axios from "axios";

export const writeCard = async (pushCard: any) => {
  // Write the card structure for this card to Firestore.
  const card = new CardModel(
    "City of Berkeley COVID-19 Data",
    "This card displays information from the City of Berkeley COVID-19 dashboard.",
    "medkit",
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
  // Then, write the child node if the cell contains a child.

  const result = await axios.get(
    "https://data.cityofberkeley.info/resource/xn6j-b766.json"
  );
  const data = result.data;
  const recent = data[data.length - 1];
  const reportedDate = "Last Updated: " + moment(recent.date).format('MM/DD/YYYY');
  const newCases = recent.bklhj_newcases + " New Cases";
  const totalCases = recent.bklhj_cumulcases + " Total Cases";
  const header = "City of Berkeley COVID-19 Data";
  const expires = moment().add(30, "minutes").unix();

  const cell = new CellModel(
    header,
    CellType.Markdown,
    [
      Label(newCases, FontStyle.h2),
      Label(totalCases, FontStyle.h2),
      Label(reportedDate, FontStyle.footer),
    ],
    expires
  );
  pushCell(cell);
};
