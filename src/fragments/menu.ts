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
`);

export const NC_FOOTER_MENU_QUERY_FRAGMENT = gql(`
fragment NcFooterMenuFieldsFragment on MenuItem {
      databaseId
      uri
      label
      parentId
      databaseId
      id
}
`);
