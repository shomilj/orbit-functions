// The Firebase Admin SDK to access Cloud Firestore.
import * as admin from "firebase-admin";
import { CardModel } from "../models/card";
import { CellModel } from "../models/cell";
import { DetailModel } from "../models/detail";

export const writeCellToUser = async (
  userId: string,
  cellId: string,
  existingCells: string[]
) => {
  if (existingCells.includes(cellId)) {
    return;
  } else {
    const newCells = [cellId, ...existingCells];
    await admin.firestore().collection("users").doc(userId).set(
      {
        cells: newCells,
      },
      { merge: true }
    );
  }
};

export const writeCard = async (card: CardModel) => {
  await admin
    .firestore()
    .collection("cards")
    .doc(card.documentId())
    .set(JSON.parse(JSON.stringify(card)));
};

export const writeCell = async (cell: CellModel) => {
  await admin
    .firestore()
    .collection("cells")
    .doc(cell.documentId())
    .set(JSON.parse(JSON.stringify(cell)));
};

export const writeDetail = async (detail: DetailModel) => {
  await admin
    .firestore()
    .collection("nodes")
    .doc(detail.documentId())
    .set(JSON.parse(JSON.stringify(detail)));
};
