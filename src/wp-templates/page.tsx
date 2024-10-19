import { gql } from "@/__generated__";
import EntryHeader from "../components/entry-header";
import {
  GetPageQuery,
  NcgeneralSettingsFieldsFragmentFragment,
} from "../__generated__/graphql";
import { FaustTemplate, flatListToHierarchical } from "@faustwp/core";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import PageLayout from "@/container/PageLayout";
import MyWordPressBlockViewer from "@/components/MyWordPressBlockViewer";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import SingleHeader from "@/container/singles/SingleHeader";
import SingleContent from "@/container/singles/SingleContent";

const Page: FaustTemplate<GetPageQuery> = (props) => {
  if (props.loading) {
    return <>Loading...</>;
  }


  // const {
  //   title,
  //   ncPostMetaData,
  //   postFormats,
  //   featuredImage,
  //   databaseId,
  //   excerpt,
  // } = getPostDataFromPostFragment(_post);

  // for this page
  // const { title, editorBlocks, featuredImage, ncPageMeta } =
  //   props.data?.page || {};

  const isGutenbergPage =
    !!props.__SEED_NODE__?.isFrontPage || "";  // ncPageMeta?.isFullWithPage

  // const blocks = flatListToHierarchical(editorBlocks as any, {
  //   idKey: "clientId",
  //   parentKey: "parentClientId",
  // });

  if (props.__SEED_NODE__?.isFrontPage) {
    return (
      <PageLayout
        headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
        footerMenuItems={props.data?.footerMenuItems?.nodes || []}
        // pageFeaturedImageUrl={featuredImage?.node?.sourceUrl}
        // pageTitle={title}
        generalSettings={
          props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
        }
      >
        abc
        {/* <SingleHeader post={_post} />
        <SingleContent post={_post} /> */}
      </PageLayout>
    )
  }

  return (
    <>
      <PageLayout
        headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
        footerMenuItems={props.data?.footerMenuItems?.nodes || []}
        // pageFeaturedImageUrl={featuredImage?.node?.sourceUrl}
        // pageTitle={title}
        generalSettings={
          props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
        }
      >
        <div
          className={`container ${isGutenbergPage ? "" : "pb-20 pt-5 sm:pt-10"
            }`}
        >
          <main
            className={`prose max-w-full lg:prose-lg dark:prose-invert mx-auto ${isGutenbergPage ? "max-w-none" : ""
              }`}
          >
            {/* {title && !isGutenbergPage && (
              <>
                <EntryHeader title={title} />
                <hr />
              </>
            )} */}

            {/* <MyWordPressBlockViewer blocks={blocks} /> */}
          </main>
        </div>
      </PageLayout>
    </>
  );
};

Page.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
    headerLocation: PRIMARY_LOCATION,
    footerLocation: FOOTER_LOCATION,
  };
};

// Note***: tat ca cac query trong cac page deu phai co generalSettings, no duoc su dung o compoent Wrap
Page.query = gql(`
  query GetPage($databaseId: ID!, $asPreview: Boolean = false, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      ncPageMeta {
        isFullWithPage
      }
      featuredImage {
        node {
          altText
          sourceUrl
        }
      }
      editorBlocks(flat: true) {
        __typename
        renderedHtml
        clientId
        parentClientId
        ...NcmazFaustBlockMagazineFragment
        ...NcmazFaustBlockTermsFragment
        ...NcmazFaustBlockCtaFragment
        ...NcmazFaustBlockGroupFragment
        ...CoreColumnsFragment
        ...CoreColumnFragment
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
    footerMenuItems: menuItems(where: { location:  $footerLocation  }, first: 40) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
  }
`);

export default Page;
