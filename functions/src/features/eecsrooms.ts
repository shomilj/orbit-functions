// This card displays top posts from r/berkeley.

import axios from "axios";
import moment = require("moment");
import { CardModel, CardCategory } from "../models/card";
import { ActionType, CellModel } from "../models/cell";
import { DetailModel } from "../models/detail";
import { TableDetail, TableRow } from "../models/detail/table";
import { TextRow, FontStyle } from "../models/rows/text";

export const CARD_KEY = "eecs-rooms";

export const writeCard = async (pushCard: any) => {
    // Write the card structure for this card to Firestore.
    const card = new CardModel(
        CARD_KEY,
        "EECS Rooms",
        "View open rooms in Soda/Cory Hall.",
        "trending-up-outline",
        CardCategory.Events
    );
    pushCard(card);
};

// There's a little bit of Apps Script magic that transforms calendar data into this Google Sheet
const ROOM_CSV_DATA = "https://docs.google.com/spreadsheets/d/1pjdm1EWdQco8jsv2zF5TPWk6YvWIZGrqO5tA7Uawdrg/export?format=tsv&gid=0";

interface Room {
    title: string;
    availability: string;
    open: string;
    message: string;
    url: string;
    allEvents: string;
}

interface Event {
    start: string;
    end: string;
    title: string;
}

// I stole this from online somewhere. If it works, it works.
const csvToArray = (str: string, delimiter = "\t") => {
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter).map(row => row.trim());
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    const arr = rows.map(function (row) {
        const values = row.split(delimiter);
        const el = headers.reduce(function (object: any, header, index) {
            object[header] = values[index];
            return object;
        }, {});
        return el;
    });
    return arr;
}

export const writeCell = async (
    params: any,
    pushCell: any,
    pushDetail: any
) => {
    let cellData = [];
    let response = await axios.get(ROOM_CSV_DATA);
    let rooms: Room[] = csvToArray(response.data);

    // Write all booked rooms to the cell.
    for (let i = 0; i < rooms.length; i++) {
        const room = rooms[i];
        console.log(room);
        if (room.open == "TRUE") {
            cellData.push(
                TextRow(room.title, FontStyle.h5),
                TextRow(room.availability, FontStyle.body)
            );
        }
    }
    cellData.push(TextRow("VIEW ALL ROOMS →", FontStyle.footer));

    // Set this card to expire (a.k.a. refresh) every five minutes
    const header = `EECS Room Availability`;
    const expires = moment().add(5, "minutes").unix();

    // Tap on card => go to list of all rooms
    const detail = new DetailModel(CARD_KEY, params, "table", null);

    const cell = new CellModel(
        CARD_KEY,
        params,
        header,
        cellData,
        expires,
        ActionType.Detail,
        detail.documentId()
    );

    pushCell(cell);


    // Create list of all rooms
    const node: TableRow[] = [];
    rooms.forEach((room) => {
        const data: any = [];

        // For each room, create a row
        data.push(
            TextRow(room.title, FontStyle.h5),
            TextRow(room.availability, room.open == "FALSE" ? FontStyle.body : FontStyle.h6),
            TextRow(room.message, FontStyle.footer)
        );

        // If you tap on row, unfold to this child detail model which has the room's full calendar
        const child = new DetailModel(CARD_KEY, params, "child-" + room.title, null);
        node.push({
            data: data,
            actionType: ActionType.Detail,
            actionContent: child.documentId(),
        });

        // Construct the child detail model with full calendar
        const childNode: TableRow[] = [];
        var cellData = [];
        cellData.push(TextRow(room.title, FontStyle.h2));
        const allEvents: Event[] = JSON.parse(room.allEvents);
        allEvents.forEach((event) => {
            cellData.push(TextRow(event.start + ' - ' + event.end, FontStyle.h5));
            cellData.push(TextRow(event.title, FontStyle.body));
        })
        childNode.push({ data: cellData });

        // Push the full calendar
        child.node = TableDetail(childNode);
        pushDetail(child);
    });

    // Push the page with the list of all calendars
    detail.node = TableDetail(node);
    pushDetail(detail);
};
