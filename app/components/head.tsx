import Head from "next/head";
type Props = {
  title: string;
  description?: string;
  pageUrl: string;
  /**
   * website: WebサイトのTOPページ
    blog: ブログのトップページ
    article: 記事ページなど、WebサイトのTOP以外のページ
    product: 製品の紹介ページ
   */
  ogType: "website" | "blog" | "article" | "product";
};
function CustomHead({ title, description = "", pageUrl, ogType }: Props) {
  return (
    <Head>
      <title>{title}</title>
      {(() => {
        if (description != "")
          return <meta name="description" content={description} />;
      })()}
      <link rel="icon" href="/images/icon.png" />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content="/images/ogp.png" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}

export default CustomHead;
