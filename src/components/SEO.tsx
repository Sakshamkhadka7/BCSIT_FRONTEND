import { Helmet } from "react-helmet-async";

const SITE_NAME = "BCSIT Study Hub";
const SITE_URL  = "https://bcsitstudhub.com"; // update when you get your real domain
const OG_IMAGE  = `${SITE_URL}/og-image.png`;

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  noIndex?: boolean;
}

export default function SEO({ title, description, keywords, canonical, noIndex }: SEOProps) {
  const fullTitle  = `${title} | ${SITE_NAME}`;
  const canonUrl   = canonical ? `${SITE_URL}${canonical}` : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonUrl  && <link rel="canonical" href={canonUrl} />}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />

      {/* Open Graph */}
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={OG_IMAGE} />
      {canonUrl && <meta property="og:url" content={canonUrl} />}
      <meta property="og:type"        content="website" />
      <meta property="og:site_name"   content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={OG_IMAGE} />
    </Helmet>
  );
}
