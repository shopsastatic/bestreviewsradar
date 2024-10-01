import { FragmentType } from '@/__generated__'
import { NC_FOOTER_MENU_QUERY_FRAGMENT } from '@/fragments/menu'
import WidgetAddSubscriberForm from '../WidgetAddSubscriberForm/WidgetAddSubscriberForm'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import MyImage from '../MyImage'
import { flatListToHierarchical } from '@faustwp/core'
import { NcFooterMenuFieldsFragmentFragment } from '@/__generated__/graphql'
import Link from 'next/link'

interface Props {
	menuItems: FragmentType<typeof NC_FOOTER_MENU_QUERY_FRAGMENT>[] | null
}

export type FooterNavItemType = NcFooterMenuFieldsFragmentFragment & {
	children?: FooterNavItemType[]
}

export default function Footer({ menuItems }: Props) {
	const menus = flatListToHierarchical(menuItems || [], {
		idKey: 'id',
		parentKey: 'parentId',
		childrenKey: 'children',
	}) as FooterNavItemType[]

	const renderMenuItem = (item: FooterNavItemType, index: number) => {
		return (
			<div key={index + item.id}>
				<h3 className="text-sm font-semibold leading-6 text-neutral-900 dark:text-neutral-200">
					<Link href={item.uri ?? '/'}>{item.label}</Link>
				</h3>
				<ul role="list" className="mt-6 space-y-4">
					{item.children?.map((j, id) => (
						<li key={j.id + id}>
							<Link
								href={j.uri ?? ''}
								className="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-neutral-100"
							>
								{j.label}
							</Link>
						</li>
					))}
				</ul>
			</div>
		)
	}

	return (
		<footer className='bg-[#1C202C]'>
			<div className='container grid grid-cols-2 md:grid-cols-3'>
				<div className='text-white py-10 col-span-1'>
					<h5>Categories</h5>
					<ul className='text-sm text-[#b6c4d2] mt-5 flex flex-col gap-4'>
						<li><Link href={"/"}>Monitors</Link></li>
						<li><Link href={"/"}>Cordless-Vacuums</Link></li>
						<li><Link href={"/"}>Drills</Link></li>
						<li><Link href={"/"}>Robotic-Vacuums</Link></li>
						<li><Link href={"/"}>Gaming-Chairs</Link></li>
						<li><Link href={"/"}>Earbuds</Link></li>
					</ul>
				</div>
				<div className='text-white py-10 col-span-1'>
					<h5>Contact</h5>
					<ul className='text-sm text-[#b6c4d2] mt-5 flex flex-col gap-4'>
						<li><Link href={"/"}>Monitors</Link></li>
						<li><Link href={"/"}>Cordless-Vacuums</Link></li>
						<li><Link href={"/"}>Drills</Link></li>
						<li><Link href={"/"}>Robotic-Vacuums</Link></li>
						<li><Link href={"/"}>Gaming-Chairs</Link></li>
						<li><Link href={"/"}>Earbuds</Link></li>
					</ul>
				</div>
				<div className='text-white py-10 col-span-1'>
					<img src="/images/logo-brr.png" width={180} alt="Logo Best Reviews Radar" />
					<div className='flex items-center gap-2 mt-10'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 480c-123.5 0-224-100.5-224-224s100.5-224 224-224s224 100.5 224 224S379.5 480 256 480zM256 184c13.25 0 24-10.74 24-24c0-13.25-10.75-24-24-24S232 146.7 232 160C232 173.3 242.7 184 256 184zM304 352h-32V240C272 231.2 264.8 224 256 224H224C215.2 224 208 231.2 208 240S215.2 256 224 256h16v96h-32C199.2 352 192 359.2 192 368C192 376.8 199.2 384 208 384h96c8.836 0 16-7.164 16-16C320 359.2 312.8 352 304 352z" fill="#fff" /></svg>
						<span className='text-sm'>Advertising Disclosure</span>
					</div>
					<div className='flex items-center gap-3 mt-4'>
						<img src="/images/us.png" width={30} alt="" />
						<span className='text-[#b6c4d2]'>United States</span>
					</div>
				</div>
			</div>

			<div className='container footer-bottom py-5 pb-10'>
				<p className='text-left md:text-center text-xs md:text-sm text-[#b6c4d2]'>Amazon, Amazon Prime, the Amazon logo and Amazon Prime logo are trademarks of Amazon.com, Inc. or its affiliates</p>
				<p className='text-left md:text-center text-xs md:text-sm text-[#b6c4d2]'>Copyright © 2024 by BestReviewsRadar.com</p>
			</div>
		</footer>
	)
}
