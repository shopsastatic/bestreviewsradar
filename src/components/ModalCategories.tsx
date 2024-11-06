import { FC, useState } from 'react'
import Button from '@/components/Button/Button'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { useLazyQuery } from '@apollo/client'
import ButtonPrimary from './Button/ButtonPrimary'
import Empty from './Empty'
import { QUERY_GET_CATEGORIES } from '@/fragments/queries'
import { NcmazFcCategoryFullFieldsFragmentFragment } from '@/__generated__/graphql'
import errorHandling from '@/utils/errorHandling'
import GraphqlError from './GraphqlError'
import getTrans from '@/utils/getTrans'

export interface ModalCategoriesProps {}

const ModalCategories: FC<ModalCategoriesProps> = () => {
	const [refetchTimes, setRefetchTimes] = useState(0)

	const T = getTrans()

	const [queryGetCategories, { loading, error, data, fetchMore, refetch }] =
		useLazyQuery(QUERY_GET_CATEGORIES, {
			variables: { first: 20 },
			notifyOnNetworkStatusChange: true,
			context: {
				fetchOptions: {
					method: process.env.NEXT_PUBLIC_SITE_API_METHOD || 'GET',
				},
			},
			onError: error => {
				if (refetchTimes > 3) {
					errorHandling(error)
					return
				}
				setRefetchTimes(refetchTimes + 1)

				refetch()
			},
		})

	const handleClickShowMore = () => {
		fetchMore({
			variables: {
				after: data?.categories?.pageInfo?.endCursor,
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult || !fetchMoreResult?.categories?.nodes) {
					return prev
				}

				return {
					categories: {
						...fetchMoreResult.categories,
						nodes: [
							...(prev?.categories?.nodes || []),
							...fetchMoreResult.categories.nodes,
						],
					},
				}
			},
		})
	}

	const cats = (data?.categories?.nodes ||
		[]) as NcmazFcCategoryFullFieldsFragmentFragment[]

	const renderModalContent = () => {
		if (!!error) {
			return (
				<div>
					<GraphqlError
						error={error}
						hasRefetchBtn
						refetch={refetch}
						loading={loading}
					/>
				</div>
			)
		}

		return (
			<div>
				ModalCategory
			</div>
		)
	}

	return (
		<div className="nc-ModalCategories">
			
		</div>
	)
}

export default ModalCategories
