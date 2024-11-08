import { gql } from "../__generated__";
import {
  GetPostSiglePageQuery,
  NcgeneralSettingsFieldsFragmentFragment,
} from "../__generated__/graphql";
import { FaustTemplate } from "@faustwp/core";
import SingleContent from "@/container/singles/SingleContent";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import PageLayout from "@/container/PageLayout";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import { useRouter } from "next/router";
import SingleHeader from "@/container/singles/SingleHeader";
import { useEffect, useState } from "react";

const Component: FaustTemplate<GetPostSiglePageQuery> = (props: any) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // useEffect(() => {
  //   if (isMounted && router.isReady && 'e' in router.query) {
  //     const _post = props.data?.post || {};
  //     window.open(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-admin/post.php?post=${_post.databaseId}&action=edit`, '_blank');
      
  //     const pathWithoutQuery = router.asPath.split('?')[0];
  //     router.replace(pathWithoutQuery, undefined, { shallow: true });
  //   }
  // }, [isMounted, router.isReady, router.query, props.data]);

  // if (props.loading || !router.isReady || !isMounted) {
  //   return <>Loading...</>;
  // }

  const _post = props.data?.post || {};
  const IS_PREVIEW = router.pathname === "/preview";

  const {
    title,
    featuredImage,
    databaseId,
    excerpt,
    seo
  } = getPostDataFromPostFragment(_post);

  return (
    <>
      <PageLayout
        headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
        footerMenuItems={props.data?.footerMenuItems?.nodes || []}
        pageFeaturedImageUrl={featuredImage?.sourceUrl}
        pageTitle={title}
        pageDescription={seo?.metaDesc || excerpt.replace(/<[^>]+>/g, '') || ""}
        metaRobots={seo?.metaRobotsNoindex}
        generalSettings={
          props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
        }
      >
        <SingleHeader post={_post} />
        <SingleContent post={_post} />
      </PageLayout>
    </>
  );
};

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
    headerLocation: PRIMARY_LOCATION,
    footerLocation: FOOTER_LOCATION,
  };
};

Component.query = gql(`
  query GetPostSiglePage($databaseId: ID!,$asPreview: Boolean = false, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
    ...NcmazFcPostFullFields
    }
    categories(first:10, where: { orderby: COUNT, order: DESC }) {
      nodes {
        ...NcmazFcCategoryFullFieldsFragment
      }
    }
    generalSettings {
      ...NcgeneralSettingsFieldsFragment
    }
    primaryMenuItems: menuItems(where: {location:$headerLocation}, first: 15) {
      nodes {
        ...NcPrimaryMenuFieldsFragment
      }
    }
    footerMenuItems: menuItems(where: {location:$footerLocation}, first: 20) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
  }
`);

export default Component;
