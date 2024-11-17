import {
	Combobox,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions,
	Dialog,
	DialogPanel,
	Transition,
	TransitionChild,
} from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { ArrowUpRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { FC, ReactNode, useEffect, useState } from 'react'
import {
	CategoriesIcon,
	PostSearchIcon,
	SearchIcon,
	UserSearchIcon,
} from '../Icons/Icons'
import clsx from 'clsx'
import getTrans from '@/utils/getTrans'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import Empty from '../Empty'
import { gql } from '@/__generated__'
import { getApolloClient } from '@faustwp/core'
import _, { set } from 'lodash'
import Loading from '../Button/Loading'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import ncFormatDate from '@/utils/formatDate'
import MyImage from '../MyImage'
import { useRouter } from 'next/router'
import Link from 'next/link'

const T = getTrans()

interface PersonType {
	name: string
	uri: string
	type: string
	icon: typeof PostSearchIcon
}

interface Props {
	renderTrigger?: () => ReactNode
	triggerClassName?: string
}

const SearchModal: FC<Props> = ({ renderTrigger, triggerClassName = '' }) => {
	const client = getApolloClient()
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [open, setOpen] = useState(false)
	const [query, setQuery] = useState('')
	const [posts, setPosts] = useState<any>([])

	const GQL = gql(`
		#graphql
		query SearchCategoryQuery2(
			$search: String
		) {
			categories(first: 10, where: { search: $search }) {
				nodes {
					name
					uri
				}
				pageInfo {
					endCursor
					hasNextPage
				}
			}
		}
	`)

	function fetchData(query: string) {
		setIsLoading(true)
		client
			.query({
				query: GQL,
				variables: {
					search: query,
					first: 8,
				},
			})
			.then(res => {
				setPosts((res?.data?.categories?.nodes as any) || [])
			})
			.catch(err => {
				console.log(err)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	useEffect(() => {
		if (query !== '') {
			fetchData(query)
		}
	}, [query])

	const handleSetSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value)
	}

	const handleResultClick = async (uri: string) => {
		if (!uri) return
		try {
			await router.push(uri)
			setOpen(false)
		} catch (error) {
			console.error('Navigation error:', error)
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!query.trim()) return

		try {
			await router.push(`/search/${encodeURIComponent(query.trim())}`)
			setOpen(false)
		} catch (error) {
			console.error('Navigation error:', error)
		}
	}

	return (
		<>
			<div onClick={() => setOpen(true)} className={triggerClassName}>
				{renderTrigger ? (
					renderTrigger()
				) : (
					<button className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100 focus:outline-none sm:h-12 sm:w-12 dark:text-neutral-300 dark:hover:bg-neutral-800">
						<SearchIcon className="h-5 w-5" />
					</button>
				)}
			</div>

			<Transition show={open} appear>
				<Dialog className={`relative z-50`} onClose={setOpen}>
					<TransitionChild
						enter="ease-out duration-200"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-150"
						leaveFrom="opacity-200"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-neutral-900/50 transition-opacity" />
					</TransitionChild>

					<div className="fixed inset-0 z-10 flex w-full overflow-y-auto sm:p-6 md:pb-10 md:pt-20">
						<TransitionChild
							enter="ease-out duration-200"
							enterFrom="opacity-0 translate-y-20 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-20 sm:translate-y-0 sm:scale-95"
						>
							<DialogPanel className="mx-auto w-full max-w-2xl transform divide-y divide-gray-100 self-end overflow-hidden bg-white shadow-2xl ring-1 ring-black/5 transition-all sm:self-start sm:rounded-xl dark:divide-gray-700 dark:bg-neutral-800 dark:ring-white/10">
								<form onSubmit={handleSubmit} className="relative">
									<MagnifyingGlassIcon
										className="pointer-events-none absolute start-4 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-300"
										aria-hidden="true"
									/>
									<div className="pe-9">
										<input
											type="text"
											autoFocus
											name="search"
											className="h-12 w-full border-0 bg-transparent pe-4 ps-11 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-0 dark:text-gray-100 dark:placeholder:text-gray-300"
											placeholder='Search...'
											value={query}
											onChange={(e) => {
												setQuery(e.target.value)
												_.debounce(handleSetSearchValue, 200)(e)
											}}
										/>
									</div>
									<button
										type="button"
										className="absolute end-3 top-1/2 z-10 -translate-y-1/2 text-xs text-neutral-400 focus:outline-none sm:end-4 dark:text-neutral-300"
										onClick={() => setOpen(false)}
									>
										<XMarkIcon className="block h-5 w-5 sm:hidden" />
										<span className="hidden sm:block">
											<kbd className="font-sans">Esc</kbd>
										</span>
									</button>
								</form>

								<div className="max-h-[70vh] overflow-y-auto">
									{isLoading && (
										<div className="flex w-full items-center justify-center py-5">
											<Loading />
										</div>
									)}

									{query !== '' && !isLoading && (
										<div className="p-2 pt-0">
											<ul className="divide-y divide-gray-100 text-sm text-gray-700 dark:divide-gray-700 dark:text-gray-300">
												{posts.length ? (
													posts.map((post: any) => (
														<li key={post.uri}>
															<Link
																href={post.uri?.replace(/^\/|\/$/g, '')?.split('/')?.pop() ?? ""}
																className="block w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700"
															>
																{post.name}
															</Link>
														</li>
													))
												) : (
													<div className="py-5 text-center">
														<p>Enter to find more search results</p>
													</div>
												)}
											</ul>
										</div>
									)}
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}

export default SearchModal