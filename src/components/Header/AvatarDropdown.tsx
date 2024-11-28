'use client'

import {
	Popover,
	Transition,
	PopoverButton,
	PopoverPanel,
} from '@headlessui/react'
import { FC, Fragment, useEffect } from 'react'
import Avatar from '@/components/Avatar/Avatar'
import Link from 'next/link'
import {
	BookmarkIcon,
	FingerPrintIcon,
	FireIcon,
	HeartIcon,
	LightBulbIcon,
	PlusCircleIcon,
	PowerIcon,
	UserIcon as TwUserIcon,
	UserPlusIcon,
} from '@heroicons/react/24/outline'
import { useLogout } from '@faustwp/core'
import { useSelector } from 'react-redux'
import { RootState } from '@/stores/store'
import { useLoginModal } from '@/hooks/useLoginModal'
import { getImageDataFromImageFragment } from '@/utils/getImageDataFromImageFragment'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import CircleLoading from '../Loading/CircleLoading'
import { useRouter } from 'next/router'
import getTrans from '@/utils/getTrans'
import { UserIcon } from '../Icons/Icons'

interface Props {
	className?: string
}
export default function AvatarDropdown({ className = '' }: Props) {
	const { isReady, isAuthenticated } = useSelector(
		(state: any) => state.viewer.authorizedUser,
	)
	const { logout } = useLogout()
	const { viewer } = useSelector((state: any) => state.viewer)
	const { openLoginModal } = useLoginModal()
	const router = useRouter()
	const T = getTrans()

	useEffect(() => {
		// mot so truong hop ngoai le, can phai reload lai trang
		if (isAuthenticated === false && !!viewer?.databaseId) {
			router.reload()
		}
	}, [isAuthenticated, viewer?.databaseId])

	const renderAvatar = () => {
		if (!viewer?.databaseId) {
			return null
		}
		return (
			<Link href={viewer.uri || ''} className="flex items-center">

				<div className="ms-3 flex-grow">
					<h4 className="font-semibold capitalize">{viewer?.name}</h4>
					<p className="mt-0.5 text-xs">{viewer?.email}</p>
				</div>
			</Link>
		)
	}

	const renderCreatePost = () => {
		return (
			<Link
				href={'/submission'}
				className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
				onClick={e => {
					if (isAuthenticated === false) {
						e.preventDefault()
						openLoginModal('/submission')
					}
				}}
			>
				<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
					<PlusCircleIcon className="h-6 w-6" />
				</div>
				<div className="ms-4">
					<p className="text-sm font-medium">{T['Create']}</p>
				</div>
			</Link>
		)
	}

	const renderMenuEditProfile = () => {
		return (
			<Link
				href={'/dashboard/edit-profile/profile'}
				className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
			>
				<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
					<TwUserIcon className="h-6 w-6" />
				</div>
				<div className="ms-4">
					<p className="text-sm font-medium">{T['Edit profile']}</p>
				</div>
			</Link>
		)
	}

	const renderMenuMyPosts = () => {
		return (
			<Link
				href={'/dashboard/posts/published'}
				className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
			>
				<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
					<svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none">
						<path
							d="M8 12.2H15"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeMiterlimit="10"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M8 16.2H12.38"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeMiterlimit="10"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M10 6H14C16 6 16 5 16 4C16 2 15 2 14 2H10C9 2 8 2 8 4C8 6 9 6 10 6Z"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeMiterlimit="10"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M16 4.02002C19.33 4.20002 21 5.43002 21 10V16C21 20 20 22 15 22H9C4 22 3 20 3 16V10C3 5.44002 4.67 4.20002 8 4.02002"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeMiterlimit="10"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
				<div className="ms-4">
					<p className="text-sm font-medium">{T['My Posts']}</p>
				</div>
			</Link>
		)
	}

	const renderMenuWishlist = () => {
		return (
			<Link
				href={`/author/${viewer?.slug}/favorites`}
				className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
			>
				<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
					<HeartIcon className="h-6 w-6" />
				</div>
				<div className="ms-4">
					<p className="text-sm font-medium">{T.Wishlist}</p>
				</div>
			</Link>
		)
	}

	const renderMenuBookmark = () => {
		return (
			<Link
				href={'/readinglist'}
				className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
			>
				<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
					<BookmarkIcon className="h-6 w-6" />
				</div>
				<div className="ms-4">
					<span className="text-sm font-medium">{T['Reading list']}</span>
				</div>
			</Link>
		)
	}

	const renderSwitchDarkMode = () => {
		return (
			<div className="-m-3 flex items-center justify-between rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700">
				<div className="flex items-center">
					<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
						<LightBulbIcon className="h-6 w-6" />
					</div>
					<div className="ms-4">
						<p className="text-sm font-medium">{T['Dark theme']}</p>
					</div>
				</div>
			</div>
		)
	}

	return (
		""
	)
}
