import { gql } from '../__generated__'

// TAG =================================================
export const NC_TAG_SHORT_FIELDS_FRAGMENT = gql(/* GraphQL */ `
	fragment NcmazFcTagShortFieldsFragment on Tag {
		__typename
		name
		uri
		databaseId
		count
	}
`)
export const NC_TAG_FULL_FIELDS_FRAGMENT = gql(/* GraphQL */ `
	fragment NcmazFcTagFullFieldsFragment on Tag {
		...NcmazFcTagShortFieldsFragment
		description
		count
	}
`)

// CATEGORY =================================================
export const NC_CATEGORY_FULL_FIELDS_FRAGMENT = gql(/* GraphQL */ `
	fragment NcmazFcCategoryFullFieldsFragment on Category {
	  __typename
	  id
	  databaseId
	  description
	  name
	  uri
	  count
	  seo {
			metaDesc
			metaKeywords
			title
	  }
	  ancestors {
	 	nodes {
			id
			name
			uri
		}
	  }
	  children {
		nodes {
			name
			uri
			... on Category {
				posts (first: 6) {
					nodes {
						title
						uri
						featuredImage {
							node {
								sourceUrl
								altText
							}
						}
					}
				}
			}
		}
      }
	  ncTaxonomyMeta {
		color
		featuredImage {
		  node {
			...NcmazFcImageFields
		  }
		}
	  }
	}
  `);

export const NC_CATEGORY_CARD_FIELD_NOT_IMAGE_FRAGMENT = gql(/* GraphQL */ `
	fragment NcmazFcCategoryCardFieldsNotImage on Category {
		__typename
		name
		uri
		count
		databaseId
		parentDatabaseId
		posts (first: 10) {
			nodes {
				...GetPostFields
			}
		}
	}
`)

export const GET_POSTS_ON_CATEGORY = gql(/* GraphQL */ `
	fragment GetPostFields on Post {
		title
		uri
		date
		content
		author {
			node {
				id
				name
			}
		}
		featuredImage {
			node {
				...NcmazFcImageHasDetailFields
			}
		}
	}
`)


// POST FORMAT =================================================
export const NC_POST_FORMAT_SHORT_FIELDS_FRAGMENT = gql(/* GraphQL */ `
	fragment NcmazFcPostFormatShortFieldsFragment on PostFormat {
		__typename
		name
		uri
		databaseId
		count
	}
`)
export const NC_POST_FORMAT_FULL_FIELDS_FRAGMENT = gql(/* GraphQL */ `
	fragment NcmazFcPostFormatFullFieldsFragment on PostFormat {
		...NcmazFcPostFormatShortFieldsFragment
		description
		count
	}
`)

// POSTS =================================================
export const NC_POST_FULL_FRAGMENT = gql(/* GraphQL */ `
	fragment NcmazFcPostFullFields on Post {
		__typename
		uri
		date
		status
		excerpt
		databaseId
		title
		amazonShortcode {
			amazonShortcode
		}
		numberOfToplist {
			numberOfToplist
		}
		content
		seo {
			metaDesc
			metaKeywords
			title
			metaRobotsNoindex
		}
		author {
			node {
				description
				...NcmazFcUserShortForPostCardFragment
			}
		}
		categories {
			nodes {
				...NcmazFcCategoryCardFieldsNotImage
			}
		}
		featuredImage {
			node {
				...NcmazFcImageHasDetailFields
			}
		}
	}
`)

export const POST_BY_CHILD_CATEGORY = gql(/* GraphQL */ `
	fragment ChildCategoryPosts on Post {
		title
		uri
		featuredImage {
			node {
				altText
				sourceUrl
			}
		}
	}
`)

export const NC_POST_CARD_FRAGMENT = gql(/* GraphQL */ `
	fragment NcmazFcPostCardFields on Post {
		...NcmazFcPostCardFieldsNOTNcmazGalleryImgs
	}
`)
export const NC_POST_CARD_NOT_NCMAZGALLERY_FRAGMENT = gql(/* GraphQL */ `
	fragment NcmazFcPostCardFieldsNOTNcmazGalleryImgs on Post {
		__typename
		databaseId
		title
		uri
		status
		modified
		date
		excerpt
		author {
			node {
				...NcmazFcUserShortForPostCardFragment
			}
		}
		categories {
			nodes {
				...NcmazFcCategoryCardFieldsNotImage
			}
		}
		featuredImage {
			node {
				...NcmazFcImageFields
			}
		}
	}
`)

export const NC_POST_CARD_NOT_NCMAZ_MEDIA_FRAGMENT = gql(/* GraphQL */ `
	fragment PostCardFieldsNOTNcmazMEDIA on Post {
		__typename
		databaseId
		title
		uri
		status
		modified
		date
		excerpt
		author {
			node {
				...NcmazFcUserShortForPostCardFragment
			}
		}
		categories {
			nodes {
				...NcmazFcCategoryCardFieldsNotImage
			}
		}
		featuredImage {
			node {
				...NcmazFcImageFields
			}
		}
	}
`)

// MEDIA =================================================
export const NC_IMAGE_MEDIA_FRAGMENT = gql(/* GraphQL */ `
	fragment NcmazFcImageFields on MediaItem {
		__typename
		altText
		databaseId
		sourceUrl
	}
`)
export const NC_IMAGE_MEDIA_HAS_DETAIL_FRAGMENT = gql(/* GraphQL */ `
	fragment NcmazFcImageHasDetailFields on MediaItem {
		__typename
		altText
		databaseId
		sourceUrl
	}
`)

//  POSTS METADATA =================================================
export const NC_POST_META_DATA_FRAGMENT = gql(/* GraphQL */ `
	fragment NcmazFcPostMetaFields on NcPostMetaData {
		__typename
		viewsCount
		readingTime
		likesCount
	}
`)
export const NC_POST_META_DATA_FULL_FRAGMENT = gql(/* GraphQL */ `
	fragment NcmazFcPostMetaFullFields on NcPostMetaData {
		__typename
		viewsCount
		readingTime
		likesCount
		savedsCount
		showRightSidebar
		template
	}
`)

// USER   =================================================
export const NC_USER_SHORT_FOR_POST_CARD_FRAGMENT = gql(/* GraphQL */ `
	fragment NcmazFcUserShortForPostCardFragment on User {
		databaseId
		uri
		username
		name
		ncUserMeta {
			color
			facebookUrl
			instagramUrl
			linkedinUrl
			ncBio
			pinterestUrl
			twitterUrl
			youtubeUrl
			tiktokUrl
			featuredImage {
				node {
					...NcmazFcImageFields
				}
			}
			backgroundImage {
				node {
					...NcmazFcImageFields
				}
			}
		}
	}
`)

export const NC_USER_FULL_FIELDS_FRAGMENT = gql(/* GraphQL */ `
	fragment NcmazFcUserFullFields on User {
		id
		databaseId
		uri
		username
		name
		description
		ncUserMeta {
			color
			facebookUrl
			githubUrl
			linkedinUrl
			ncBio
			pinterestUrl
			twitterUrl
			youtubeUrl
			tiktokUrl
			featuredImage {
				node {
					...NcmazFcImageFields
				}
			}
			backgroundImage {
				node {
					...NcmazFcImageFields
				}
			}
		}
	}
`)