import * as Countdown from "../src/features/countdown";
import * as CampusMap from "../src/features/campusmap";
import * as CityCovid from "../src/features/citycovid";

describe("", () => {
  // the tests container

  const writeCard = (card: any) => {
    console.log("Write Card:", JSON.parse(JSON.stringify(card)));
  };

  const writeCell = (cell: any) => {
    console.log("Write Cell:", JSON.parse(JSON.stringify(cell)));
  };

  const writeDetail = (detail: any) => {
    console.log("Write Detail:", JSON.parse(JSON.stringify(detail)));
  };

  it("countdown", () => {
    Countdown.writeCard(writeCard).then(() => {});
    Countdown.writeCell(
      { event: "Dead Week" },
      writeCell,
      writeDetail
    ).then(() => {});
  });

  it("campusmap", () => {
    CampusMap.writeCard(writeCard).then(() => {});
    CampusMap.writeCell(null, writeCell, writeDetail).then(() => {});
  });

  it("citycovid", () => {
    CityCovid.writeCard(writeCard).then(() => {});
    CityCovid.writeCell(null, writeCell, writeDetail)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  });
});
