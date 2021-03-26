// This card displays information about COVID-19.

import { ActionType, CellModel } from "../models/cell";
import { TextRow, FontStyle } from "../models/rows/text";
import { CardCategory, CardModel, ORBIT_API_BASE } from "../models/card";
import axios from "axios";
import { Param, ParamType } from "../models/parameter";
import { DetailModel } from "../models/detail";
import { TableDetail, TableRow } from "../models/detail/table";

export const CARD_KEY = "dininghall";

interface Params {
  hall: string;
}

export const getParams = async () => {
  // Return all parameter options for this card.
  return [
    new Param("hall", "Dining Hall", ParamType.SingleSelect, [
      "Crossroads",
      "Cafe 3",
      "Clark Kerr Campus",
    ]),
  ];
};

export const writeCard = async (pushCard: any) => {
  // Write the card structure for this card to Firestore.
  const card = new CardModel(
    CARD_KEY,
    "Dining Hall Menu",
    "View today's dining hall menu.",
    "fast-food-outline",
    CardCategory.FoodDrink,
    await getParams()
  );
  pushCard(card);
};

interface Category {
  name: string;
  items: string[];
}

interface Period {
  name: string;
  categories: Category[];
}
interface DiningHall {
  times: string;
  periods: Period[];
}

export const writeCell = async (
  params: Params,
  pushCell: any,
  pushDetail: any
) => {
  // Write the cell structure for this cell to Firestore.

  let cellData = [];
  const requestURL = ORBIT_API_BASE + "?source=dining";
  let apiResponse = await axios.get(requestURL);
  let response = apiResponse.data;

  cellData.push(
    TextRow("Tap here for today's Dining Hall Menu.", FontStyle.h3),
    TextRow("View menu ->", FontStyle.footer)
  );

  const header = `UC Berkeley Dining Hall Menu`;
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

  for (const [location, value] of Object.entries(response)) {
    const hall = value as DiningHall;
    // Title Card
    node.push({
      data: [
        TextRow(location, FontStyle.h2),
        TextRow("Hours of Operation", FontStyle.header),
        TextRow(hall.times, FontStyle.body),
      ],
    });
    hall.periods.forEach((period) => {
      const data = [];
      data.push(TextRow(period.name + " Menu", FontStyle.h3));
      period.categories.forEach((category) => {
        data.push(TextRow(category.name, FontStyle.h5));
        category.items.forEach((item) => {
          data.push(TextRow(item, FontStyle.body));
        });
      });
      node.push({
        data: data,
      });
    });
  }
  detail.node = TableDetail(node);
  pushDetail(detail);
};
