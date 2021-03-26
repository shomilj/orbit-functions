import * as Countdown from "./countdown";
import * as GettingAround from "./gettingaround/gettingaround";
import * as CityCovid from "./citycovid";
import * as UpcomingGames from "./upcominggames/upcominggames";
import * as Reddit from "./reddit";
import * as DailyCal from "./dailycal/dailycal";
import * as DiningHall from "./dininghall";
import * as admin from "firebase-admin";
import * as Firestore from "../firestore/index";
import { CardModel } from "../models/card";
import { CellIDGen, CellModel } from "../models/cell";

// Defines the list of Feature Modules and maps card keys to features.
const FeatureMap = {
  [Countdown.CARD_KEY]: Countdown,
  [GettingAround.CARD_KEY]: GettingAround,
  [CityCovid.CARD_KEY]: CityCovid,
  [UpcomingGames.CARD_KEY]: UpcomingGames,
  [Reddit.CARD_KEY]: Reddit,
  [DailyCal.CARD_KEY]: DailyCal,
  [DiningHall.CARD_KEY]: DiningHall,
};

// This is the list of cells that a new user starts out with.
const DEFAULT_CELLS: string[] = [
  "7ff32c3c79b7f66ef65cf8c03bbb44e20ee4edd0", // City Covid
  "acf7f298eb4cbf6dd4814fc237292c4980cec329", // Daily Cal Top
  "e285349d3c67164d777f324485133919ee5001ba", // Dining Hall
  "8e699bf22da68223275504ee68d4513070536248", // Getting Around
  "a25077239157a42d4924c22b912c77c3ddb4f001", // Reddit
];

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
    throw new Error("The user object does not exist in Firestore.");
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
    throw Error("No cells exist in Firestore. Nothing to update!");
  }
  for (let doc of snapshot.docs) {
    const data = doc.data() as CellModel;
    await updateSingleCell(data.cardKey, data.params);
  }
};

export const updateSingleCell = async (cardKey: string, params?: string) => {
  const CardClass = (FeatureMap as any)[cardKey];
  await CardClass.writeCell(params, Firestore.writeCell, Firestore.writeDetail);
};
