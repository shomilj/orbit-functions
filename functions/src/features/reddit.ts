// This card displays top posts from r/berkeley.

import axios from "axios";
import { CardModel, CardCategory, ORBIT_API_BASE } from "../models/card";
import { ActionType, CellModel } from "../models/cell";
import { DetailModel } from "../models/detail";
import { TableRow, TableDetail } from "../models/detail/table";
import { DateFormat, DateRow } from "../models/rows/date";
import { TextRow, FontStyle } from "../models/rows/text";

export const CARD_KEY = "r-slash-berkeley";

export const writeCard = async (pushCard: any) => {
  // Write the card structure for this card to Firestore.
  const card = new CardModel(
    CARD_KEY,
    "Trending on r/Berkeley",
    "View what's trending on r/Berkeley.",
    "trending-up-outline",
    CardCategory.News
  );
  pushCard(card);
};

interface RedditData {
  title: string;
  text: string;
  author: string;
  created: number;
  url: string;
  ups: number;
  downs: number;
  comments: number;
}

export const writeCell = async (
  params: any,
  pushCell: any,
  pushDetail: any
) => {
  // Write the cell structure for this cell to Firestore.

  let cellData = [];
  let response = await axios.get(ORBIT_API_BASE + "?source=reddit");
  let posts: RedditData[] = response.data;

  for (let i = 0; i < Math.min(3, posts.length); i++) {
    const post = posts[i];
    cellData.push(
      DateRow(
        post.created,
        FontStyle.h5,
        DateFormat.relative,
        "u/" + post.author + " • "
      ),
      TextRow(post.title, FontStyle.body)
    );
  }

  cellData.push(TextRow("READ MORE →", FontStyle.footer));

  const header = `Trending on r/Berkeley`;
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

  //   const titleRow = [
  //     TextRow("Here's what's trending on r/Berkeley.", FontStyle.h2),
  //     ButtonRow(
  //       "Open r/Berkeley",
  //       ActionType.Web,
  //       "https://reddit.com/r/berkeley/"
  //     ),
  //   ];
  //   node.push({ data: titleRow });

  posts.forEach((post) => {
    const data: any = [];
    data.push(
      DateRow(post.created, FontStyle.header, DateFormat.relative),
      TextRow(post.title, FontStyle.h2),
      TextRow(post.text, FontStyle.body),
      TextRow(
        `${post.ups} upvotes • ${post.downs} downvotes • ${post.comments} comments`,
        FontStyle.h5
      ),
      TextRow("OPEN IN REDDIT →", FontStyle.footer)
    );
    node.push({
      data: data,
      actionType: ActionType.Web,
      actionContent: post.url,
    });
  });

  detail.node = TableDetail(node);
  pushDetail(detail);
};
