// This card displays information about COVID-19.

import { ActionType, CellModel } from "../models/cell";
import { TextRow, FontStyle } from "../models/rows/text";
import { CardCategory, CardModel, ORBIT_API_BASE } from "../models/card";
import * as moment from "moment";
import axios from "axios";
import { ButtonRow } from "../models/rows/button";

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

interface CovidRow {
  date: string;
  positive: number;
}

export const writeCell = async (
  params: any,
  pushCell: any,
  pushDetail: any
) => {
  // Write the cell structure for this cell to Firestore.
  // Then, write the child node if the cell contains a child.

  // const result = await axios.get(
  //   "https://data.cityofberkeley.info/resource/xn6j-b766.json"
  // );
  // const data = result.data;
  // const recent = data[data.length - 1];
  // // const newCases = recent.bklhj_newcases + " New Cases";
  // const totalCases = recent.bklhj_cumulcases;
  const header = "Campus COVID-19 Data";
  const expires = moment().add(30, "minutes").unix();

  const result = await axios.get(ORBIT_API_BASE + "?source=campus_covid");
  console.log(result.data);
  const rows: CovidRow[] = result.data;
  const yesterdayPositive = rows[0].positive;

  const view: any[] = [];
  view.push(
    TextRow(
      "There were " +
        yesterdayPositive +
        " positive cases on campus yesterday.",
      FontStyle.h2
    )
  );

  view.push(
    TextRow(
      "LAST SEVEN DAYS",
      FontStyle.header
    )
  )

  rows.forEach((row) => {
    view.push(
      TextRow("[" + row.date + "] " + row.positive.toString() + " cases", FontStyle.body)
    );
  });

  view.push(
    ...[
      ButtonRow(
        "Book a COVID Test",
        ActionType.Web,
        "https://etang.berkeley.edu/"
      ),
      ButtonRow(
        "View the Dashboard",
        ActionType.Web,
        "https://calviz.berkeley.edu/t/COVIDRecoveryPublic/views/UHSCovidData/UHSDashboard?:iid=1&amp;:isGuestRedirectFromVizportal=y&amp;:embed=y&amp;:tabs=no&amp;:toolbar=no&amp;:showappBanner=false"
      ),
    ]
  );

  const cell = new CellModel(CARD_KEY, params, header, view, expires);
  pushCell(cell);
};
