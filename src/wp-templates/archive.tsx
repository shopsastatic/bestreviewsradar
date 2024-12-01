import { gql } from "@/__generated__";
import {
  NcgeneralSettingsFieldsFragmentFragment,
  PageArchiveGetArchiveQuery,
} from "@/__generated__/graphql";
import Alert from "@/components/Alert";
import PageLayout from "@/container/PageLayout";
import ArchiveLayout from "@/container/archives/ArchiveLayout";
import { GET_POSTS_FIRST_COMMON } from "@/contains/contants";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import { PostDataFragmentType } from "@/data/types";
import { getPostFormatDataFromFragment } from "@/utils/getPostFormatDataFromFragment";
import { FaustTemplate } from "@faustwp/core";

const Archive: FaustTemplate<PageArchiveGetArchiveQuery> = (props: any) => {
  // LOADING ----------
  if (props.loading) {
    return <>Loading...</>;
  }

  if (!props?.data || !props.data.nodeByUri) {
    return null;
  }

  // START ----------

  if (props.data.nodeByUri.__typename !== "PostFormat") {
    return (
      <PageLayout
        headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
        footerMenuItems={props.data?.footerMenuItems?.nodes || []}
        sidebarMenuItems={props.data?.sidebarMenuItems?.nodes || []}
        pageFeaturedImageUrl={null}
        pageTitle={props.data.nodeByUri.__typename}
        generalSettings={
          props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
        }
      >
        <div className="container py-10">
          <Alert type="error">
            This page is not a PostFormat, please check your page uri again! 🤔
            <br />
            Or please contact the administrator for more details. 🤗
            <br />
            {JSON.stringify(props.data.nodeByUri)}
          </Alert>
        </div>
      </PageLayout>
    );
  }

  const { databaseId, count, description, name, uri } =
    getPostFormatDataFromFragment(props.data.nodeByUri);
  const initPostsPageInfo = props.data?.nodeByUri?.posts?.pageInfo;
  const posts = props.data?.nodeByUri?.posts;

  const _top10Categories =
    (props.data?.categories?.nodes as any) || [];

  return (
    <>
      <PageLayout
        headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
        footerMenuItems={props.data?.footerMenuItems?.nodes || []}
        sidebarMenuItems={props.data?.sidebarMenuItems?.nodes || []}
        pageFeaturedImageUrl={null}
        pageTitle={"Archive " + name}
        pageDescription={description || ""}
        generalSettings={
          props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
        }
      >
        <ArchiveLayout
          name={name}
          initPosts={posts?.nodes as PostDataFragmentType[] | null}
          initPostsPageInfo={initPostsPageInfo}
          tagDatabaseId={databaseId}
          taxonomyType="tag"
          top10Categories={_top10Categories}
        >
          <div>
            Amazon Explore
          </div>
        </ArchiveLayout>
      </PageLayout>
    </>
  );
};

Archive.variables = ({ uri }) => ({
  uri,
  first: GET_POSTS_FIRST_COMMON,
  headerLocation: PRIMARY_LOCATION,
  footerLocation: FOOTER_LOCATION,
});

Archive.query = gql(`
 query PageArchiveGetArchive($uri: String! = "", $first: Int, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!) {
  nodeByUri(uri: $uri) {
      uri
      id
      ... on PostFormat {
        ...NcmazFcPostFormatFullFieldsFragment
      }
    }
     # common query for all page 
   generalSettings {
      ...NcgeneralSettingsFieldsFragment
    }
    primaryMenuItems: menuItems(where: { location:  $headerLocation  }, first: 80) {
      nodes {
        ...NcPrimaryMenuFieldsFragment
      }
    }
    footerMenuItems: menuItems(where: { location:  $footerLocation  }, first: 50) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
    sidebarMenuItems: menuItems(where: { location: MAIN_MENU }, first: 40) {
      nodes {
        ...NcSideBarMenuFieldsFragment
      }
    }
    # end common query for all page
  }`);

export default Archive;
