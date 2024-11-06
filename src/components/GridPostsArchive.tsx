import { NcmazFcPostFullFieldsFragment } from '@/__generated__/graphql'
import { FC } from 'react'
import Empty from './Empty'
import ButtonPrimary from './Button/ButtonPrimary'
import getTrans from '@/utils/getTrans'

interface Props {
	posts: NcmazFcPostFullFieldsFragment[] | null
	className?: string
	loading?: boolean
	showLoadmore?: boolean
	onClickLoadmore?: () => void
}

const GridPostsArchive: FC<Props> = ({
	className = '',
	posts: currentPosts,
	loading,
	onClickLoadmore,
	showLoadmore,
}) => {
	return (
		""
	)
}

export default GridPostsArchive
