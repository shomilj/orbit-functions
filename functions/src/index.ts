import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as Features from "./features";

// Initialize the Firebase App.
admin.initializeApp();

const ERROR_PARAMS = { error: "Missing or incorrect parameters." };

/*  Parameters:
      - userId: string
      - name: string
    Description:
      If a user exists in Firebase, this simply updates the name.
      Otherwise, this creates a new user in Firebase.
*/
export const updateUserProfile = functions.https.onRequest(
  (request, response) => {
    const userId = request.body.userId as string;
    const name = request.body.name as string;
    if (!userId || !name) {
      response.json(ERROR_PARAMS);
      return;
    }
    Features.updateUserProfile(userId, name)
      .then(() => {
        response.json({ success: true });
      })
      .catch((error) => {
        console.log("updateUserProfile failure:", error.message);
        response.json({ error: error.message });
      });
  }
);

/*  Parameters:
      - userId: string
      - cardKey: string
      - params: [string: string]?
    Description:
      Adds a cell to the user object's [cells] array in Firebase.
      Note that the user object must exist in Firebase for 
      a new cell to be added!
*/
export const addCellToUser = functions.https.onRequest((request, response) => {
  const userId = request.body.userId as string;
  const cardKey = request.body.cardKey as string;
  const params = request.body.params as any;
  if (!userId || !cardKey) {
    response.json(ERROR_PARAMS);
    return;
  }
  Features.addCellToUser(userId, cardKey, params)
    .then(() => {
      response.json({ success: true });
    })
    .catch((error) => {
      console.log("addCellToUser failure:", error.message);
      response.json({ error: error.message });
    });
});

/*  Parameters:
      - cardKey: string
      - params: [string: string]?
    Description:
      Updates a single cell and writes the updated cell
      to Firebase.
*/
export const updateSingleCell = functions.https.onRequest(
  (request, response) => {
    const cardKey = request.body.cardKey as string;
    const params = request.body.params as any;
    if (!cardKey) {
      response.json(ERROR_PARAMS);
      return;
    }
    Features.updateSingleCell(cardKey, params)
      .then(() => {
        response.json({ success: true });
      })
      .catch((error) => {
        console.log("updateSingleCell failure:", error.message);
        response.json({ error: error.message });
      });
  }
);

/*  Parameters: None
    Description: updates all cells that are currently 
      active in the Firebase /cells node.
*/
export const updateAllCells = functions.https.onRequest((request, response) => {
  // TODO: Modify this function to only query for and update cells that are expired.
  Features.updateAllCells()
    .then(() => {
      response.json({ success: true });
    })
    .catch((error) => {
      console.log("updateAll failure:", error.message);
      response.json({ error: error.message });
    });
});

/*  Parameters: None
    Description: updates all CARDS from the local list/map of cards.
*/
export const updateAllCards = functions.https.onRequest((request, response) => {
  Features.updateAllCards()
    .then(() => {
      response.json({ success: true });
    })
    .catch((error) => {
      console.log("updateAllCards failure:", error.message);
      response.json({ error: error.message });
    });
});
