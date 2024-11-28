import { gql } from "../__generated__";
import {
  GetPostSiglePageQuery,
  NcgeneralSettingsFieldsFragmentFragment,
} from "../__generated__/graphql";
import { FaustTemplate } from "@faustwp/core";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import PageLayout from "@/container/PageLayout";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Component: FaustTemplate<GetPostSiglePageQuery> = (props: any) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  if (props.loading) {
    return <>Loading...</>;
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const _post = props.data?.post || {};
  const IS_PREVIEW = router.pathname === "/preview";

  const {
    title,
    featuredImage,
    excerpt,
    seo
  } = getPostDataFromPostFragment(_post);

  return (
    <>
      <PageLayout
        headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
        footerMenuItems={props.data?.footerMenuItems?.nodes || []}
        pageFeaturedImageUrl={featuredImage?.sourceUrl}
        pageTitle={seo?.title || title}
        pageDescription={seo?.metaDesc || excerpt.replace(/<[^>]+>/g, '') || ""}
        metaRobots={seo?.metaRobotsNoindex}
        generalSettings={
          props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
        }
      >
        1
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
