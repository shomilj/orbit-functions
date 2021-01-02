import * as Countdown from "./countdown";
import * as CampusMap from "./campusmap";
import * as CityCovid from "./citycovid";

import * as Firestore from "../firestore/index";
import { CardModel } from "../models/card";

export const writeAll = async () => {
  await Countdown.writeCard((card: CardModel) =>
    Firestore.writeCard(card, "countdown")
  );
  await CampusMap.writeCard((card: CardModel) =>
    Firestore.writeCard(card, "campusmap")
  );
  await CityCovid.writeCard((card: CardModel) =>
    Firestore.writeCard(card, "citycovid")
  );
};
