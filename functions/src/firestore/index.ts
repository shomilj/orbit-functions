// The Firebase Admin SDK to access Cloud Firestore.
import * as admin from "firebase-admin";
import { CardModel } from "../models/card";
admin.initializeApp();

export const writeCard = async (card: CardModel, id: string) => {
  const writeResult = await admin
    .firestore()
    .collection("cards")
    .doc(id)
    .set(JSON.parse(JSON.stringify(card)));
  console.log("Write Result:", writeResult);
};
