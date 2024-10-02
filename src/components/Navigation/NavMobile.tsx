'use client'

import React from 'react'
import ButtonClose from '@/components/ButtonClose/ButtonClose'
import Logo from '@/components/Logo/Logo'
import { Disclosure } from '@headlessui/react'
import { NavItemType } from './NavigationItem'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import MyImage from '../MyImage'
import { FragmentType } from '@/__generated__'
import { NC_PRIMARY_MENU_QUERY_FRAGMENT } from '@/fragments/menu'
import { flatListToHierarchical } from '@faustwp/core'
import { useRouter } from 'next/router'
import { SearchIcon } from '../Icons/Icons'

export interface NavMobileProps {
	menuItems: FragmentType<typeof NC_PRIMARY_MENU_QUERY_FRAGMENT>[]
	onClickClose?: () => void
}

const NavMobile: React.FC<NavMobileProps> = ({
	menuItems: menuItemsProp,
	onClickClose,
}) => {
	const router = useRouter()
	const menuItems = flatListToHierarchical(menuItemsProp, {
		idKey: 'id',
		parentKey: 'parentId',
		childrenKey: 'children',
	})

	const _renderMenuChild = (
		item: NavItemType,
		itemClass = ' ps-3 text-base font-medium ',
	) => {
		return (
			<ul className="nav-mobile-sub-menu relative pb-1 ps-6 text-base">
				{item.children?.map((i, index) => (
					<Disclosure key={index} as="li">
						<Link
							href={{
								pathname: i.uri || '',
							}}
							className={`mt-0.5 flex rounded-lg pe-4 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 ${itemClass}`}
						>
							<span
								className={`py-2.5 ${!i.children ? 'block w-full' : ''}`}
								onClick={onClickClose}
							>
								{i.label}
							</span>
							{!!i.children?.length && (
								<span
									className="flex flex-grow items-center"
									onClick={e => e.preventDefault()}
								>
									<Disclosure.Button
										as="span"
										className="flex flex-grow justify-end"
									>
										<ChevronDownIcon
											className="ms-2 h-4 w-4 text-neutral-500"
											aria-hidden="true"
										/>
									</Disclosure.Button>
								</span>
							)}
						</Link>
						{!!i.children?.length && (
							<Disclosure.Panel>
								{_renderMenuChild(
									i,
									'ps-3 text-neutral-600 dark:text-neutral-400 ',
								)}
							</Disclosure.Panel>
						)}
					</Disclosure>
				))}
			</ul>
		)
	}

	const _renderItem = (item: NavItemType, index: number) => {
		return (
			<Disclosure
				key={index}
				as="li"
				className="text-neutral-900 dark:text-white"
				defaultOpen={!index}
			>
				<Link
					className="flex w-full items-center rounded-lg px-4 py-2.5 text-base font-medium capitalize tracking-wide hover:bg-neutral-100 dark:hover:bg-neutral-800"
					href={{
						pathname: item.uri || '',
					}}
				>
					<span
						className={!item.children ? 'block w-full' : ''}
						onClick={onClickClose}
					>
						{item.label}
					</span>
					{!!item.children?.length && (
						<span className="block flex-grow" onClick={e => e.preventDefault()}>
							<Disclosure.Button
								as="span"
								className="flex flex-grow justify-end"
							>
								<ChevronDownIcon
									className="ms-2 h-4 w-4 text-neutral-500"
									aria-hidden="true"
								/>
							</Disclosure.Button>
						</span>
					)}
				</Link>
				{!!item.children?.length && (
					<Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
				)}
			</Disclosure>
		)
	}

	return (
		<div className="h-screen w-full transform divide-y-2 divide-neutral-100 overflow-y-auto bg-white py-2 shadow-lg ring-1 transition dark:divide-neutral-800 dark:bg-black dark:ring-neutral-700">
			<div className="px-5 py-6">
				<span className="absolute end-2 top-2 p-1">
					<ButtonClose onClick={onClickClose} />
				</span>
			</div>
			<ul className="flex flex-col space-y-1 px-2 py-6 rtl:space-x-reverse">
				{menuItems?.map((item, index) =>
					_renderItem(item as NavItemType, index),
				)}
			</ul>
		</div>
	)
}

export default NavMobile
