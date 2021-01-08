import * as Countdown from "./countdown";
import * as GettingAround from "./gettingaround";
import * as CityCovid from "./citycovid";
import * as UpcomingGames from "./upcominggames/upcominggames";
import * as Reddit from "./reddit";
import * as DailyCal from "./dailycal/dailycal";

import * as Firestore from "../firestore/index";
import { CardModel } from "../models/card";

const FeatureMap = {
  [Countdown.CARD_KEY]: Countdown,
  [GettingAround.CARD_KEY]: GettingAround,
  [CityCovid.CARD_KEY]: CityCovid,
  [UpcomingGames.CARD_KEY]: UpcomingGames,
  [Reddit.CARD_KEY]: Reddit,
  [DailyCal.CARD_KEY]: DailyCal,
};

export const writeAll = async () => {
  for (const cardKey in FeatureMap) {
    const CardClass = (FeatureMap as any)[cardKey];
    await CardClass.writeCard((card: CardModel) => Firestore.writeCard(card));
  }
};

export const writeSingle = async (cardKey: string, params?: string) => {
  const CardClass = (FeatureMap as any)[cardKey];
  await CardClass.writeCell(params, Firestore.writeCell, Firestore.writeDetail);
};

export const testWriteCells = async () => {
  await DailyCal.writeCell(
    { category: "Top" },
    Firestore.writeCell,
    Firestore.writeDetail
  )
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });

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
