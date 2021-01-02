// This card displays a countdown to an event of the user's choosing.

import * as moment from "moment";

const DATE_MAP: Record<string, string> = {
  "Dead Week": "2020-02-22",
  "First Day of Summer": "2020-05-15",
};

interface Params {
  event: string;
}

export const getParams = async () => {
  return [
    {
      key: "event",
      type: "single-select",
      options: Object.keys(DATE_MAP),
    },
  ];
};

export const getData = async (params: Params) => {
  return moment().diff(moment(DATE_MAP[params.event]), "days");
};
