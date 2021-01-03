import { RowType } from "../cell";

export enum FontStyle {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  h6 = "h6",
  body = "body",
  header = "header",
  footer = "footer",
  title = "title",
}

export const TextRow = (content: string, style: FontStyle) => {
  return { type: RowType.Text, data: { content: content, style: style } };
};
