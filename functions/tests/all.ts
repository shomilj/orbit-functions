// import * as Countdown from "../src/features/countdown";
// import * as CampusMap from "../src/features/campusmap";
import * as CityCovid from "../src/features/citycovid";

describe("", () => {
  // the tests container

  const writeCard = (card: any) => {
    console.log("Write Card:", card);
  };

  const writeCell = (cell: any) => {
    console.log("Write Cell:", cell);
  };

  const writeDetail = (detail: any) => {
    console.log("Write Detail:", detail);
  };

  // it("countdown", () => {
  //   Countdown.writeCard(writeCard).then(() => {});
  //   Countdown.writeCell(
  //     { event: "Dead Week" },
  //     writeCell,
  //     writeDetail
  //   ).then(() => {});
  // });

  // it("campusmap", () => {
  //   CampusMap.writeCard(writeCard).then(() => {});
  //   CampusMap.writeCell(null, writeCell, writeDetail).then(() => {});
  // });

  it("citycovid", () => {
    CityCovid.writeCard(writeCard).then(() => {});
    CityCovid.writeCell(null, writeCell, writeDetail)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  });
});
