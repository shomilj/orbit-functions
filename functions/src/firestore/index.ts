// The Firebase Admin SDK to access Cloud Firestore.
import * as admin from "firebase-admin";
import { CardModel } from "../models/card";
import { CellModel } from "../models/cell";
admin.initializeApp();
import * as hash from "object-hash";

export const writeCard = async (card: CardModel) => {
  const cardId = hash({
    key: card.key,
  });
  const writeResult = await admin
    .firestore()
    .collection("cards")
    .doc(cardId)
    .set(JSON.parse(JSON.stringify(card)));
  console.log("Write Result:", writeResult);
};

export const writeCell = async (cell: CellModel) => {
  const cellId = hash({
    cardId: cell.cardKey,
    params: cell.params,
  });
  const writeResult = await admin
    .firestore()
    .collection("cells")
    .doc(cellId)
    .set(JSON.parse(JSON.stringify(cell)));
  console.log("Write Result:", writeResult);
};
