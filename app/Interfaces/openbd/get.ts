interface OpenBDBookDataSummary {
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
}
type OpenBDGetResponseData = OpenBDBookData[];

export type { OpenBDGetResponseData, OpenBDBookData };
