// This card displays a countdown to an event of the user's choosing.
import axios from "axios";
import moment = require("moment");
import { CardModel, CardCategory, ORBIT_API_BASE } from "../../models/card";
import { ActionType, CellModel } from "../../models/cell";
import { DetailModel } from "../../models/detail";
import { TableRow, TableDetail } from "../../models/detail/table";
import { Param, ParamType } from "../../models/parameter";
import { TextRow, FontStyle } from "../../models/rows/text";

const CARD_KEY = "dailycal";

interface Params {
  category: string;
}

interface CategoryType {
  category: string;
  url: string;
}

const CATEGORIES: CategoryType[] = require("./categories.json");

export const getParams = async () => {
  // Return all parameter options for this card.
  return [
    new Param(
      "category",
      "Category",
      ParamType.SingleSelect,
      CATEGORIES.map((row) => row.category)
    ),
  ];
};

export const writeCard = async (pushCard: any) => {
  // Write the card structure for this card to Firestore.
  const card = new CardModel(
    CARD_KEY,
    "The Daily Cal",
    "View recently published articles by the Daily Cal.",
    "news",
    CardCategory.News,
    await getParams()
  );
  pushCard(card);
};

interface ArticleData {
  title: string;
  url: string;
  date: number;
  author: string;
  summary: string;
  content: string;
}

interface ResponseData {
  featured: {
    title: string;
    summary: string;
  };
  articles: ArticleData[];
}

export const writeCell = async (
  params: Params,
  pushCell: any,
  pushDetail: any
) => {
  // Write the cell structure for this cell to Firestore.

  const selectedCategory = CATEGORIES.filter(
    (v) => v.category == params.category
  )[0];
  var cellData = [];
  const requestURL =
    ORBIT_API_BASE + "?source=dailycal&url=" + selectedCategory.url;
  let apiResponse = await axios.get(requestURL);
  let response: ResponseData = apiResponse.data;

  // TODO: Handle case where zero posts exist.
  cellData.push(
    TextRow(response.featured.title, FontStyle.h2),
    TextRow(response.featured.summary, FontStyle.body),
    TextRow("More articles ->", FontStyle.footer)
  );

  const header = `The Daily Californian (${selectedCategory.category})`;
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

  const articles = response.articles;
  articles.forEach((article) => {
    const data: any = [];
    data.push(
      TextRow(
        moment(article.date).format("LLLL").toUpperCase(),
        FontStyle.header
      ),
      TextRow(article.author, FontStyle.h5),
      TextRow(article.title, FontStyle.h2),
      TextRow(article.summary, FontStyle.body),
      TextRow("READ MORE →", FontStyle.footer)
    );
    node.push({
      data: data,
      actionType: ActionType.Web,
      actionContent: article.url,
    });
  });

  detail.node = TableDetail(node);
  pushDetail(detail);
};
