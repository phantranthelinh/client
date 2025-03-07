import HtmlParser from "html-react-parser";
export const parseHtml = (html?: string) => {
  return HtmlParser(`${html ?? ""} `);
};
