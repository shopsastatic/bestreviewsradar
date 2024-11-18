import { GetServerSideProps } from 'next'
import { getServerSideSitemapLegacy } from 'next-sitemap'
import { gql } from '@apollo/client'
import { getApolloClient } from '@faustwp/core'

const client = getApolloClient()
const SITE_URL = process.env.NEXT_PUBLIC_URL

const SITEMAP_QUERY = gql`
	query SitemapQuery2($after: String) {
		contentNodes(
			where: { contentTypes: [POST] }
			first: 50
			after: $after
		) {
			pageInfo {
				hasNextPage
				endCursor
			}
			nodes {
				uri
				modifiedGmt
			}
		}
	}
`

async function getAllWPContent(after = null, acc: any[] = []) {
	const { data } = await client.query({
		query: SITEMAP_QUERY,
		variables: {
			after,
			noCache: true
		},
		fetchPolicy: 'no-cache',
		context: {
			headers: {
				'Cache-Control': 'no-cache',
				'Pragma': 'no-cache'
			}
		}
	})

	acc = [...acc, ...data.contentNodes.nodes]

	if (data.contentNodes.pageInfo.hasNextPage) {
		acc = await getAllWPContent(data.contentNodes.pageInfo.endCursor, acc)
	}

	return acc
}

// Sitemap component
export default function WPSitemap() { }

// collect all the post
export const getServerSideProps: GetServerSideProps = async ctx => {
	ctx.res.setHeader(
		'Cache-Control',
		'no-store, no-cache, must-revalidate, proxy-revalidate'
	)
	ctx.res.setHeader('Pragma', 'no-cache')
	ctx.res.setHeader('Expires', '0')

	const nodes = await getAllWPContent()

	const allRoutes = nodes.reduce((acc, node) => {
		if (!node.uri) {
			return acc
		}

		acc.push({
			loc: SITE_URL + node.uri,
			lastmod: new Date(node.modifiedGmt).toISOString(),
		})

		return acc
	}, [])

	return await getServerSideSitemapLegacy(ctx, allRoutes)
}
