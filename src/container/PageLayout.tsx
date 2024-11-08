import SEO from "@/components/SEO/SEO";
import React, { FC } from "react";
import SiteHeader from "./SiteHeader";
import Footer from "@/components/Footer/Footer";
import { FragmentType } from "@/__generated__";
import { useRouter } from 'next/router';
import {
  NC_FOOTER_MENU_QUERY_FRAGMENT,
  NC_PRIMARY_MENU_QUERY_FRAGMENT,
} from "@/fragments/menu";
import { NcgeneralSettingsFieldsFragmentFragment } from "@/__generated__/graphql";

interface Props {
  children: React.ReactNode;
  pageTitle?: string | null | undefined;
  headerMenuItems?: any;
  footerMenuItems?: FragmentType<typeof NC_FOOTER_MENU_QUERY_FRAGMENT>[] | null;
  pageFeaturedImageUrl?: string | null | undefined;
  generalSettings?: NcgeneralSettingsFieldsFragmentFragment | null | undefined;
  pageDescription?: string | null | undefined;
  metaRobots?: String | null | undefined;
}

const SITE_URL = process.env.NEXT_PUBLIC_URL;

const PageLayout: FC<Props> = ({
  children,
  footerMenuItems,
  headerMenuItems,
  pageFeaturedImageUrl,
  pageTitle,
  generalSettings,
  pageDescription,
  metaRobots
}) => {
  const router = useRouter()
  const path = router.asPath;
  const url = `${SITE_URL}${path}`;
  return (
    <>
      <SEO
        title={pageTitle || generalSettings?.title}
        description={pageDescription || generalSettings?.description || ""}
        imageUrl={pageFeaturedImageUrl}
        metaRobots={metaRobots || "index"}
        url={url}
      />

      <SiteHeader
        siteTitle={generalSettings?.title}
        siteDescription={generalSettings?.description}
        menuItems={headerMenuItems || []}
      />

      {children}

      <Footer menuItems={footerMenuItems || []} />
    </>
  );
};

export default PageLayout;
