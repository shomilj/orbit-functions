import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as Features from "./features";

admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const addCellToUser = functions.https.onRequest((request, response) => {
  // First, figure out what the unique ID of the cell is.
  const userId = request.body.userId as string;
  const cardKey = request.body.cardKey as string;
  const params = request.body.params as any;
  if (!userId || !cardKey) {
    response.json({ error: "Missing parameters." });
    return;
  }
  console.log(userId, cardKey, params);
  Features.addCellToUser(userId, cardKey, params)
    .then(() => {
      response.json({ success: true });
    })
    .catch((error) => {
      console.log("addCellToUser failed:", error);
      response.json({ error: "Unknown error." });
    });
});

export const updateSingleCell = functions.https.onRequest(
  (request, response) => {
    // First, figure out what the unique ID of the cell is.
    const cardKey = request.body.cardKey as string;
    const params = request.body.params as any;
    console.log("Params:", request.body);
    if (!cardKey) {
      response.json({ error: "Missing parameters." });
      return;
    }
    console.log(cardKey, params);
    Features.updateSingleCell(cardKey, params)
      .then(() => {
        response.json({ success: true });
      })
      .catch((error) => {
        console.log("Features.writeSingle failed:", error);
        response.json({ error: error });
      });
  }
);

export const updateAllCells = functions.https.onRequest((request, response) => {
  Features.updateAllCells()
    .then(() => {
      response.json({ success: true });
    })
    .catch((error) => {
      console.log("updateAll failed:", error);
      response.json({ error: "Unknown error." });
    });
});

export const updateAllCards = functions.https.onRequest((request, response) => {
  Features.updateAllCards()
    .then(() => {
      response.json({ success: true });
    })
    .catch((error) => {
      response.json({ error: error });
    });
});
