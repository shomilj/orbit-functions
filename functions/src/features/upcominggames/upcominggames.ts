// This card displays a countdown to an event of the user's choosing.
import { CellModel, ActionType } from "../../models/cell";
import { TextRow, FontStyle } from "../../models/rows/text";
import { CardCategory, CardModel } from "../../models/card";
import { DetailModel } from "../../models/detail";
import { TableDetail } from "../../models/detail/table";
import { Param, ParamType } from "../../models/parameter";

import * as ical from "node-ical";
import moment = require("moment");

const CARD_KEY = "upcoming-games";

interface ParamsType {
  team: string;
}

interface DataRow {
  team: string;
  calendar: string;
}

const TEAM_CALENDARS: DataRow[] = require("./games.json");

export const getParams = async () => {
  // Return all parameter options for this card.
  return [
    new Param(
      "team",
      "Team",
      ParamType.SingleSelect,
      TEAM_CALENDARS.map((row) => row.team)
    ),
  ];
};

export const writeCard = async (pushCard: any) => {
  // Write the card structure for this card to Firestore.
  const params = await getParams();

  const card = new CardModel(
    CARD_KEY,
    "Cal Athletics",
    "View upcoming games for your favorite Cal sports teams!",
    "map",
    CardCategory.Navigation,
    params
  );
  pushCard(card);
};

export const writeCell = async (
  params: ParamsType,
  pushCell: any,
  pushDetail: any
) => {
  // Write the cell structure for this cell to Firestore.

  var cellData = [];

  const row = TEAM_CALENDARS.filter((row) => row.team == params.team)[0];
  try {
    const events = await ical.async.fromURL(row.calendar);
    const values = Object.values(events);
    for (var i = 0; i < Math.min(3, values.length); i++) {
      const event = values[i];
      console.log(event);
      if (event.start) {
        const start = event.start as ical.DateWithTimeZone;
        var gameTitle = event.summary as string;
        gameTitle = gameTitle.replace(`(${row.team}) - ${row.team}`, "");
        cellData.push(
          TextRow(
            moment(start.getDate()).format("LLLL").toUpperCase(),
            FontStyle.header
          ),
          TextRow(gameTitle, FontStyle.body)
        );
      }
    }
  } catch (e) {
    console.log("Cannot get events:", e);
  }

  cellData.push(TextRow("VIEW ALL GAMES →", FontStyle.footer));

  const header = `Upcoming Games (${row.team})`;
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

  detail.node = TableDetail([
    {
      data: [
        TextRow("California at Oregon State (Men's Basketball)", FontStyle.h3),
        TextRow("Saturday, 1/2/21 • 3:00 PM to 5:00 PM", FontStyle.footer),
      ],
    },
    {
      data: [
        TextRow("California at Oregon State (Men's Basketball)", FontStyle.h3),
        TextRow("Saturday, 1/2/21 • 3:00 PM to 5:00 PM", FontStyle.footer),
      ],
    },
    {
      data: [
        TextRow("California at Oregon State (Men's Basketball)", FontStyle.h3),
        TextRow("Saturday, 1/2/21 • 3:00 PM to 5:00 PM", FontStyle.footer),
      ],
    },
  ]);

  pushDetail(detail);
};
