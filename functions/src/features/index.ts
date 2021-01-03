import * as Countdown from "./countdown";
import * as CampusMap from "./campusmap";
import * as CityCovid from "./citycovid";

import * as Firestore from "../firestore/index";
import { CardModel } from "../models/card";

export const writeAll = async () => {
  await Countdown.writeCard((card: CardModel) => Firestore.writeCard(card));
  await CampusMap.writeCard((card: CardModel) => Firestore.writeCard(card));
  await CityCovid.writeCard((card: CardModel) => Firestore.writeCard(card));
};

export const testWriteCells = async () => {
  await CityCovid.writeCell(null, Firestore.writeCell, (detail: any) =>
    console.log(detail)
  )
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};
