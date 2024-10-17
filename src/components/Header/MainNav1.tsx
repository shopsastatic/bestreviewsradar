import { FC } from 'react'
import Navigation from '@/components/Navigation/Navigation'
import MenuBar from '@/components/MenuBar/MenuBar'
import { NC_PRIMARY_MENU_QUERY_FRAGMENT } from '@/fragments/menu'
import { FragmentType } from '@/__generated__'
import AvatarDropdown from './AvatarDropdown'
import Brand from './Brand'
import CreateBtn from './CreateBtn'
import { SearchIconBtn } from './HeaderSearch'
import SearchModal from './SearchModal'
import Input from '../Input/Input'
import { useRouter } from 'next/router'
import Link from 'next/link'

export interface MainNav1Props {
	menuItems: FragmentType<typeof NC_PRIMARY_MENU_QUERY_FRAGMENT>[]
	title?: string | null
	description?: string | null
}

const MainNav1: FC<MainNav1Props> = ({ menuItems, title, description }) => {
	const router = useRouter()

	return (
		<>
			<div className="header-top bg-[#1b1d31] text-white py-3">
				<div className='max-w-[1200px] m-auto flex items-center justify-between'>
					<div className='flex items-center'>
						<Link href={"/"}><img src="/images/logo-brr.png" alt="Logo Best Reviews Radar" width={140} /></Link>
						<div className='items-center hidden md:flex'>
							<MenuBar menuItems={menuItems} />
						</div>
						<form
							className="relative ml-10 hidden min-[895px]:block md:min-w-[400px] lg:min-w-[500px] xl:min-w-[700px]"
							onSubmit={e => {
								e.preventDefault()
								router.push('/search/posts/' + e.currentTarget.hsearch.value || '')
							}}
						>
							<input type="search" id="search-input"
								placeholder='Search...'
								name="hsearch"
								className="w-full focus:ring-0 border-opacity-0 py-2.5 text-base shadow-md pe-3 sm:pe-5 text-neutral-800 rounded"
							/>
							<button type='submit'>
								<div className='absolute top-[1px] bottom-[1px] right-0 px-5 flex justify-center bg-[#eeeeee] items-center z-10 rounded-tr rounded-br'>
									<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M20.8438 19.8281C21.0781 20.0365 21.0781 20.2578 20.8438 20.4922L20.4922 20.8438C20.2578 21.0781 20.0365 21.0781 19.8281 20.8438L14.7891 15.8438C14.6849 15.7396 14.6328 15.6224 14.6328 15.4922V15.1016C13.0703 16.5339 11.2344 17.25 9.125 17.25C6.88542 17.25 4.97135 16.4557 3.38281 14.8672C1.79427 13.2786 1 11.3646 1 9.125C1 6.88542 1.79427 4.97135 3.38281 3.38281C4.97135 1.79427 6.88542 1 9.125 1C11.3646 1 13.2786 1.79427 14.8672 3.38281C16.4557 4.97135 17.25 6.88542 17.25 9.125C17.25 11.2344 16.5339 13.0703 15.1016 14.6328H15.4922C15.6224 14.6328 15.7396 14.6849 15.8438 14.7891L20.8438 19.8281ZM4.24219 14.0078C5.59635 15.3359 7.22396 16 9.125 16C11.026 16 12.6406 15.3359 13.9688 14.0078C15.3229 12.6536 16 11.026 16 9.125C16 7.22396 15.3229 5.60938 13.9688 4.28125C12.6406 2.92708 11.026 2.25 9.125 2.25C7.22396 2.25 5.59635 2.92708 4.24219 4.28125C2.91406 5.60938 2.25 7.22396 2.25 9.125C2.25 11.026 2.91406 12.6536 4.24219 14.0078Z" fill="black"></path></svg>
								</div>
							</button>
						</form>
					</div>
					<div className='flex justify-end items-center gap-2'>
						<Link href={"/"}><img src="/images/us.png" className='w-[24px] md:w-[28px]' alt="" /></Link>
						<SearchIconBtn className='!text-white hidden max-[895px]:block' />
						<MenuBar menuItems={menuItems} className="p-0 ml-0 block md:hidden" />
					</div>
				</div>
			</div>

			<div className='header-bottom bg-[#252E43] hidden md:block'>
				<div className='max-w-[1200px] m-auto'>
					<Navigation menuItems={menuItems} className="flex text-white" />
				</div>
			</div>
		</>
	)
}

export default MainNav1
