import { FaustPage } from '@faustwp/core'
import { useFragment } from '@/__generated__'
import {
	GetAuthorWithPostsQuery,
	NcgeneralSettingsFieldsFragmentFragment,
} from '@/__generated__/graphql'
import React from 'react'
import useHandleGetPostsArchivePage from '@/hooks/useHandleGetPostsArchivePage'
import { NC_USER_FULL_FIELDS_FRAGMENT } from '@/fragments'
import PageLayout from '@/container/PageLayout'
import { getImageDataFromImageFragment } from '@/utils/getImageDataFromImageFragment'
import { PostDataFragmentType } from '@/data/types'
import AuthorLayout from '@/container/AuthorPageLayout'

const AuthorPostsChild: FaustPage<GetAuthorWithPostsQuery> = props => {
	const { user } = props.data || {}

	const posts = user?.posts as any
	const { databaseId, id, name, ncUserMeta } = useFragment(
		NC_USER_FULL_FIELDS_FRAGMENT,
		user || {},
	)
	//

	const {
		currentPosts,
		handleChangeFilterPosts,
		handleClickShowMore,
		hasNextPage,
		loading,
	} = useHandleGetPostsArchivePage({
		initPosts: (posts?.nodes as PostDataFragmentType[]) || [],
		initPostsPageInfo: posts?.pageInfo || null,
		authorDatabaseId: databaseId,
	})

	return (
		<>
			<PageLayout
				headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
				footerMenuItems={props.data?.footerMenuItems?.nodes || []}
				pageFeaturedImageUrl={
					getImageDataFromImageFragment(ncUserMeta?.featuredImage?.node)
						?.sourceUrl || null
				}
				pageTitle={name}
				generalSettings={
					props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
				}
			>
				<AuthorLayout user={user || {}}>
					<div className="container space-y-16 py-16 lg:space-y-28 lg:pb-28 lg:pt-20">
						<main>
							
						</main>
					</div>
				</AuthorLayout>
			</PageLayout>
		</>
	)
}

export default AuthorPostsChild
