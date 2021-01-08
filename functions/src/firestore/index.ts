// The Firebase Admin SDK to access Cloud Firestore.
import * as admin from "firebase-admin";
import { CardModel } from "../models/card";
import { CellModel } from "../models/cell";
import { DetailModel } from "../models/detail";

export const writeCellToUser = async (userId: string, cellId: string) => {
  await admin
    .firestore()
    .collection("users")
    .doc(userId)
    .set(
      {
        cells: {
          [cellId]: 0,
        },
      },
      { merge: true }
    );
};

export const writeCard = async (card: CardModel) => {
  const writeResult = await admin
    .firestore()
    .collection("cards")
    .doc(card.documentId())
    .set(JSON.parse(JSON.stringify(card)));
  console.log("Write Result:", writeResult);
};

export const writeCell = async (cell: CellModel) => {
  const writeResult = await admin
    .firestore()
    .collection("cells")
    .doc(cell.documentId())
    .set(JSON.parse(JSON.stringify(cell)));
  console.log("Write Result:", writeResult);
};

export const writeDetail = async (detail: DetailModel) => {
  const writeResult = await admin
    .firestore()
    .collection("nodes")
    .doc(detail.documentId())
    .set(JSON.parse(JSON.stringify(detail)));
  console.log("Write Result:", writeResult);
};
