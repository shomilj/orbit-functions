import * as Countdown from "../src/features/countdown";

describe("Countdown Tests", () => {
  // the tests container
  it("Main Test", () => {
    Countdown.writeCard((card: any) => {
      console.log("Write Card: ", JSON.parse(JSON.stringify(card)));
    }).then(() => {});

    Countdown.writeCell(
      { event: "Dead Week" },
      (cell: any) => {
        console.log("Write Cell: ", JSON.parse(JSON.stringify(cell)));
      },
      (detail: any) => {
        if (detail) {
          console.log("Write Detail: ", JSON.parse(JSON.stringify(detail)));
        }
      }
    ).then(() => {});
  });
});
