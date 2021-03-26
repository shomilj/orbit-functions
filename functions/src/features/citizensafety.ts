import axios from "axios";
const moment = require("moment");
import { CardModel, CardCategory } from "../models/card";
import { ActionType, CellModel } from "../models/cell";
import { DetailModel } from "../models/detail";
import { MapDetail, MapLocation } from "../models/detail/map";
import { TableRow, TableDetail } from "../models/detail/table";
import { ButtonRow } from "../models/rows/button";
import { DateFormat, DateRow } from "../models/rows/date";
import { TextRow, FontStyle } from "../models/rows/text";

export const CARD_KEY = "citizen-safety";

const CAMPUS_REGION = {
  latitude: 37.87165863763554,
  latitudeDelta: 0.02356112816934086,
  longitude: -122.25983113754275,
  longitudeDelta: 0.01878764059128457,
};

export const writeCard = async (pushCard: any) => {
  // Write the card structure for this card to Firestore.
  const card = new CardModel(
    CARD_KEY,
    "Live Safety Alerts",
    "View live safety events around the City of Berkeley. Powered by the Citizen App.",
    "warning-outline",
    CardCategory.Safety
  );
  pushCard(card);
};

interface ResponseRow {
  created_at: number;
  updated_at: number;
  title: string;
  address: string;
  neighborhood: string;
  categories: string[];
  severity: string;
  _geoloc: {
    lat: number;
    lng: number;
  }[];
  updates: any;
}

const bbox = [37.851294, -122.281868, 37.881786, -122.245648];
const url = `https://citizen.com/api/incident/search?insideBoundingBox[0]=${bbox[0]}&insideBoundingBox[1]=${bbox[1]}&insideBoundingBox[2]=${bbox[2]}&insideBoundingBox[3]=${bbox[3]}&limit=200`;

export const writeCell = async (
  params: any,
  pushCell: any,
  pushDetail: any
) => {
  // Write the cell structure for this cell to Firestore.

  let cellData = [];
  let response = await axios.get(url);
  let safetyEvents: ResponseRow[] = response.data.hits;

  for (let i = 0; i < Math.min(2, safetyEvents.length); i++) {
    const event = safetyEvents[i];
    cellData.push(
      DateRow(
        event.created_at,
        FontStyle.h5,
        DateFormat.relative,
        event.neighborhood.split(", ")[0] + " • "
      ),
      TextRow(event.title, FontStyle.body)
    );
  }

  const detailMap = new DetailModel(
    CARD_KEY,
    params,
    "safety-detail-map",
    null
  );

  const detailList = new DetailModel(
    CARD_KEY,
    params,
    "safety-detail-list",
    null
  );

  cellData.push(
    DateRow(
      new Date().getTime() - 3000,
      FontStyle.footer,
      DateFormat.relative,
      "Last Updated "
    )
  );

  cellData.push(
    ButtonRow("View Map", ActionType.Detail, detailMap.documentId())
  );
  cellData.push(
    ButtonRow("View List", ActionType.Detail, detailList.documentId())
  );

  const header = `Live Safety Alerts`;
  const expires = -1;

  // Initialize the detail model so we can get a reference to it
  const cell = new CellModel(CARD_KEY, params, header, cellData, expires);
  pushCell(cell);

  // Then, write the child node if the cell contains a child.
  const tableNode: TableRow[] = [];
  const mapNode: MapLocation[] = [];

  safetyEvents.forEach((event) => {
    const data: any = [];
    data.push(
      DateRow(event.created_at, FontStyle.h5, DateFormat.relative),
      TextRow(event.title, FontStyle.h4),
      TextRow(event.address, FontStyle.footer)
    );
    tableNode.push({
      data: data,
    });

    var then = event.created_at;
    var now = new Date().getTime();
    var minutes = Math.round((now - then) / 1000 / 60);
    let color;
    if (minutes < 240) {
      color = "#800000";
    } else if (minutes < 720) {
      color = "#b22222";
    } else if (minutes < 1440) {
      color = "#dc143c";
    } else if (minutes < 4320) {
      color = "#f08080";
    } else if (minutes < 7000) {
      color = "#e9967a";
    } else {
      color = "#f1c40f";
    }

    mapNode.push({
      title: event.title,
      subtitle: moment(event.created_at).fromNow(),
      latitude: event._geoloc[0].lat,
      longitude: event._geoloc[0].lng,
      icon: "pin",
      color: color,
    });
  });

  detailList.node = TableDetail(tableNode);
  detailMap.node = MapDetail(mapNode, CAMPUS_REGION);
  pushDetail(detailList);
  pushDetail(detailMap);
};
