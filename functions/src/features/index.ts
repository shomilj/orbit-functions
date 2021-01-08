import * as Countdown from "./countdown";
import * as GettingAround from "./gettingaround";
import * as CityCovid from "./citycovid";
import * as UpcomingGames from "./upcominggames/upcominggames";
import * as Reddit from "./reddit";
import * as DailyCal from "./dailycal/dailycal";

import * as admin from "firebase-admin";

import * as Firestore from "../firestore/index";
import { CardModel } from "../models/card";
import { CellIDGen, CellModel } from "../models/cell";

const FeatureMap = {
  [Countdown.CARD_KEY]: Countdown,
  [GettingAround.CARD_KEY]: GettingAround,
  [CityCovid.CARD_KEY]: CityCovid,
  [UpcomingGames.CARD_KEY]: UpcomingGames,
  [Reddit.CARD_KEY]: Reddit,
  [DailyCal.CARD_KEY]: DailyCal,
};

export const addCellToUser = async (
  userId: string,
  cardKey: string,
  params?: any
) => {
  const cellId = CellIDGen(cardKey, params);
  const db = admin.firestore();
  const doc = await db.collection("cells").doc(cellId).get();
  if (doc.exists) {
    await Firestore.writeCellToUser(userId, cellId);
  } else {
    await updateSingleCell(cardKey, params);
    await Firestore.writeCellToUser(userId, cellId);
  }
};

export const updateAllCards = async () => {
  for (const cardKey in FeatureMap) {
    const CardClass = (FeatureMap as any)[cardKey];
    await CardClass.writeCard((card: CardModel) => Firestore.writeCard(card));
  }
};

export const updateAllCells = async () => {
  const db = admin.firestore();
  let snapshot = await db.collection("cells").get();
  if (snapshot.empty) {
    throw Error("Nothing to update.");
  }
  for (let doc of snapshot.docs) {
    const data = doc.data() as CellModel;
    await updateSingleCell(data.cardKey, data.params);
  }
};

export const updateSingleCell = async (cardKey: string, params?: string) => {
  console.log("updateSingleCell called with cardKey:", cardKey);
  const CardClass = (FeatureMap as any)[cardKey];
  await CardClass.writeCell(params, Firestore.writeCell, Firestore.writeDetail);
};
