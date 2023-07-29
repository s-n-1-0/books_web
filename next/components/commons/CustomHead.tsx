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
  noindex?: boolean;
};
function CustomHead({
  title,
  description = "",
  pageUrl,
  ogType,
  noindex = false,
}: Props) {
  return (
    <Head>
      <title>{title}</title>
      {(() => {
        if (description != "")
          return <meta name="description" content={description} />;
      })()}
      <link rel="icon" href="/images/icon_web.png" />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta
        property="og:image"
        content="https://books.sn-10.net/images/ogp.png"
      />
      <meta name="twitter:card" content="summary" />
      {(() => {
        if (noindex) return <meta name="robots" content="noindex" />;
      })()}
    </Head>
  );
}

export default CustomHead;
