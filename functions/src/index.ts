import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as Features from "./features";
import { CellIDGen } from "./models/cell";
import { addCellToUser } from "./firestore";

admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const addCell = functions.https.onRequest((request, response) => {
  // First, figure out what the unique ID of the cell is.
  const userId = request.body.userId as string;
  const cardKey = request.body.cardKey as string;
  const params = request.body.params as any;
  console.log("Params:", request.body);
  if (!userId || !cardKey) {
    response.json({ error: "Missing parameters." });
    return;
  }
  console.log(userId, cardKey, params);
  const cellId = CellIDGen(cardKey, params);
  const db = admin.firestore();
  db.collection("cells")
    .doc(cellId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        addCellToUser(cellId, userId);
        response.json({ success: true });
      } else {
        Features.writeSingle(cardKey, params)
          .then(() => {
            console.log("New cell created by user initiation:", cellId);
            addCellToUser(cellId, userId);
            response.json({ success: true });
          })
          .catch((error) => {
            console.log("Features.writeSingle failed:", error);
            response.json({ error: error });
          });
      }
    })
    .catch((error) => {
      console.log("New cell creation failed:", error);
      response.json({ error: error });
    });
});

export const writeAll = functions.https.onRequest((request, response) => {
  Features.writeAll()
    .then(() => {
      response.json({ success: true });
    })
    .catch((error) => {
      response.json({ error: error });
    });
});

export const testWriteCells = functions.https.onRequest((request, response) => {
  Features.testWriteCells()
    .then(() => {
      response.json({ success: true });
    })
    .catch((error) => {
      response.json({ error: error });
    });
});
