import * as functions from "firebase-functions";
import * as Features from "./features";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

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
