import { gql } from '@/__generated__';
import Head from "next/head";
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

interface Props {
  title: any;
  description: any;
  imageUrl: any;
  url: any;
}

const GET_SITE_SETTINGS = gql(`
  query TestQuery {
    generalSettings {
      title
      description
    }
  }
`) as any;

export default function SEO({ title, description, imageUrl, url, metaRobots }: any) {
  // Use useQuery hook to execute the query
  const { data, loading, error }: any = useQuery(GET_SITE_SETTINGS);
  const router = useRouter();

  // Get WordPress settings
  const siteTitle = data?.generalSettings?.title;
  const siteDescription = data?.generalSettings?.description;

  // Use provided values or fall back to WordPress settings
  const pageTitle = title || siteTitle;
  const pageDescription = description?.replace(/<[^>]*>?/gm, "") || siteDescription;

  // Don't render if no data available
  if (!pageTitle && !pageDescription && !imageUrl && !url) {
    return null;
  }

  if (metaRobots == "noindex") {
    metaRobots = "noindex, nofollow";
  } else {
    metaRobots = "index, follow";
  }

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
      <meta name="robots" content={metaRobots} />
      <link rel="canonical" href={url} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content={data?.generalSettings?.title} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta itemProp="name" content={title} />
      <meta property="article:section" content="BestReviewsRadar" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/site.webmanifest"></link>
    </Head>
  );
}