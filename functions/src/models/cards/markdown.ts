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

export const Label = (content: string, style: FontStyle) => {
  return { content: content, style: style };
};
