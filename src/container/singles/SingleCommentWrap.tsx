import React, {
	FC,
	createContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'

export const CommentWrapContext = createContext<{
	isReplyingDatabaseId?: number | null
	isEditingDatabaseId?: number | null
	isDeletingDatabaseId?: number | null
	isCreateNewReplyCommentLoading?: boolean
	isDeleteCommentsByIdLoading?: boolean
	isCreateNewCommentLoading?: boolean
	isUpdateCommentByIdLoading?: boolean
}>({})

interface SingleCommentWrapProps {
	postDatabaseId: number
	commentCount: number
}

const SingleCommentWrap: FC<SingleCommentWrapProps> = ({
	postDatabaseId,
	commentCount: commentCountProp,
}) => {

	return (
		<></>
	)
}

export default SingleCommentWrap
