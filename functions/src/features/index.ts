import * as Countdown from "./countdown";
import * as GettingAround from "./gettingaround";
import * as CityCovid from "./citycovid";
import * as UpcomingGames from "./upcominggames/upcominggames";
import * as Reddit from "./reddit";

import * as Firestore from "../firestore/index";
import { CardModel } from "../models/card";

export const writeAll = async () => {
  await Countdown.writeCard((card: CardModel) => Firestore.writeCard(card));
  await GettingAround.writeCard((card: CardModel) => Firestore.writeCard(card));
  await CityCovid.writeCard((card: CardModel) => Firestore.writeCard(card));
  await UpcomingGames.writeCard((card: CardModel) => Firestore.writeCard(card));
  await Reddit.writeCard((card: CardModel) => Firestore.writeCard(card));
};

export const testWriteCells = async () => {
  await CityCovid.writeCell(null, Firestore.writeCell, (detail: any) =>
    console.log(detail)
  )
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });

  await GettingAround.writeCell(
    null,
    Firestore.writeCell,
    Firestore.writeDetail
  )
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });

  await UpcomingGames.writeCell(
    { team: "Men's Basketball" },
    Firestore.writeCell,
    Firestore.writeDetail
  )
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });

  await Reddit.writeCell(null, Firestore.writeCell, Firestore.writeDetail)
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};
