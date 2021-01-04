// import * as Countdown from "../src/features/countdown";
// import * as GettingAround from "../src/features/gettingaround";
// import * as CityCovid from "../src/features/citycovid";
import * as UpcomingGames from "../src/features/upcominggames/upcominggames";

describe("", () => {
  // the tests container

  const writeCard = (card: any) => {
    console.log("Write Card:", JSON.stringify(card));
  };

  const writeCell = (cell: any) => {
    console.log("Write Cell:", JSON.stringify(cell));
  };

  const writeDetail = (detail: any) => {
    console.log("Write Detail:", JSON.stringify(detail));
  };

  it("upcominggames", () => {
    UpcomingGames.writeCard(writeCard).then(() => {});
    UpcomingGames.writeCell(
      { team: "Men's Basketball" },
      writeCell,
      writeDetail
    ).then(() => {});
  });

  // it("campusmap", () => {
  //   GettingAround.writeCard(writeCard).then(() => {});
  //   GettingAround.writeCell(null, writeCell, writeDetail).then(() => {});
  // });

  // it("citycovid", () => {
  //   CityCovid.writeCard(writeCard).then(() => {});
  //   CityCovid.writeCell(null, writeCell, writeDetail)
  //     .then(() => {})
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // });
});
