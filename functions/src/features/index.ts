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

const DEFAULT_CELLS: string[] = [];

export const updateUserProfile = async (userId: string, name: string) => {
  const db = admin.firestore();
  const result = await db.collection("users").doc(userId).get();
  if (result.exists) {
    await db
      .collection("users")
      .doc(userId)
      .set({ name: name }, { merge: true });
  } else {
    await db
      .collection("users")
      .doc(userId)
      .set({ name: name, created: new Date().getTime(), cells: DEFAULT_CELLS });
  }
};

export const addCellToUser = async (
  userId: string,
  cardKey: string,
  params?: any
) => {
  const cellId = CellIDGen(cardKey, params);
  const db = admin.firestore();
  const userData = await db.collection("users").doc(userId).get();
  if (!userData.exists) {
    throw new Error("Invalid user!");
  }
  const user = userData.data() as UserObject;
  let existingCells = user.cells || [];

  const doc = await db.collection("cells").doc(cellId).get();
  if (doc.exists) {
    await Firestore.writeCellToUser(userId, cellId, existingCells);
  } else {
    await updateSingleCell(cardKey, params);
    await Firestore.writeCellToUser(userId, cellId, existingCells);
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
