import { gql } from "@/__generated__";

export const NC_PRIMARY_MENU_QUERY_FRAGMENT = gql(`
    fragment NcPrimaryMenuFieldsFragment on MenuItem {  
        id  
        uri
        path  
        label
        parentId
        databaseId
    }
`) as any;

export const NC_FOOTER_MENU_QUERY_FRAGMENT = gql(`
fragment NcFooterMenuFieldsFragment on MenuItem {
      databaseId
      uri
      label
      parentId
      databaseId
      id
}
`) as any;


export const NC_SIDEBAR_MENU_QUERY_FRAGMENT = gql(`
    fragment NcSideBarMenuFieldsFragment on MenuItem {
          databaseId
          uri
          label
          parentId
          databaseId
          id
    }
`) as any;
    

export const NC_CATEGORY_QUERY_FRAGMENT = gql(`
    fragment NcCategoryFieldsFragment on MenuItem {
          databaseId
          uri
          label
          parentId
          databaseId
          id
          menuAddons {
            menuIcon
            trending
          }
    }
`) as any;
    