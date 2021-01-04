// This card displays a countdown to an event of the user's choosing.
import { CellModel, ActionType } from "../../models/cell";
import { TextRow, FontStyle } from "../../models/rows/text";
import { CardCategory, CardModel, ORBIT_API_BASE } from "../../models/card";
import { DetailModel } from "../../models/detail";
import { TableDetail, TableRow } from "../../models/detail/table";
import { Param, ParamType } from "../../models/parameter";
import axios from "axios";

import moment = require("moment");
import { ButtonRow } from "../../models/rows/button";

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

interface ResponseRow {
  name: string;
  begin: number;
  end: number;
  description: string;
  location: string;
}

export const writeCell = async (
  params: ParamsType,
  pushCell: any,
  pushDetail: any
) => {
  // Write the cell structure for this cell to Firestore.

  var cellData = [];

  const row = TEAM_CALENDARS.filter((row) => row.team == params.team)[0];
  let response = await axios.get(
    ORBIT_API_BASE + "?source=calendar&url=" + row.calendar
  );
  const events: ResponseRow[] = response.data;
  for (var i = 0; i < Math.min(3, events.length); i++) {
    const event = events[i];
    var gameTitle = event.name.replace(`(${row.team}) - ${row.team}`, "");
    cellData.push(
      TextRow(
        moment(event.begin).format("LLLL").toUpperCase(),
        FontStyle.header
      ),
      TextRow(gameTitle, FontStyle.body)
    );
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

  const node: TableRow[] = [];

  const titleRow = [
    TextRow(
      "Here's a list of upcoming events for " + row.team + ". Go Bears!",
      FontStyle.h2
    ),
    ButtonRow("Subscribe to Calendar", ActionType.Web, row.calendar),
    ButtonRow("Cal Athletics Homepage", ActionType.Web, "https://calbears.com"),
  ];
  node.push({ data: titleRow });

  events.forEach((event) => {
    const data: any = [];
    var gameTitle = event.name.replace(`(${row.team}) - ${row.team}`, "");
    data.push(
      TextRow(
        moment(event.begin).format("LLLL").toUpperCase(),
        FontStyle.h5
      ),
      TextRow(gameTitle, FontStyle.body)
    );
    node.push({
      data: data,
    });
  });

  detail.node = TableDetail(node);
  pushDetail(detail);
};
