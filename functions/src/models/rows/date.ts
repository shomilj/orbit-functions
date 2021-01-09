import { RowType } from "../cell";
import { FontStyle } from "./text";

export enum DateFormat {
  relative = "relative",
  f = "f",
  ff = "ff",
  fff = "fff",
  ffff = "ffff",
}

export const DateRow = (
  content: number,
  style: FontStyle,
  format: DateFormat,
  prefix?: string
) => {
  return {
    type: RowType.Date,
    data: { content: content, style: style, format: format, prefix: prefix },
  };
};
