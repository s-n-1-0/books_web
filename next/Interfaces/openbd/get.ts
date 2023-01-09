interface OpenBDBookDataOnixCollateralDetailTextContent {
  Text: string;
}
interface OpenBDBookDataOnix {
  CollateralDetail: {
    TextContent: OpenBDBookDataOnixCollateralDetailTextContent[];
  };
}
interface OpenBDBookDataSummary {
  isbn: string;
  title: string;
  publisher: string;
  volume: string;
  series: string;
  author: string;
  pubdate: string;
  cover: string;
}
interface OpenBDBookData {
  summary: OpenBDBookDataSummary;
  onix: OpenBDBookDataOnix;
}
type OpenBDGetResponseData = OpenBDBookData[];

export type { OpenBDGetResponseData, OpenBDBookData };
