import { Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import ButtonPrimary from './Button/ButtonPrimary'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import Link from 'next/link'

export default function CookiestBoxPopover() {
	const [isOpen, setisOpen] = useState(false)

	useEffect(() => {
		if (localStorage?.acceptCookies !== 'ac') {
			setisOpen(true)
		}
	}, [])

	const handleAccept = () => {
		localStorage.acceptCookies = 'ac'
		setisOpen(false)
	}

	const handleRemove = () => {
		localStorage.acceptCookies = 'no'
		setisOpen(false)
	}

	return (
		<>
			<Transition
				as={Fragment}
				show={isOpen}
				enter="transition ease-out duration-200"
				enterFrom="opacity-0 translate-y-1"
				enterTo="opacity-100 translate-y-0"
				leave="transition ease-in duration-150"
				leaveFrom="opacity-100 translate-y-0"
				leaveTo="opacity-0 translate-y-1"
			>
				<div className="fixed bottom-0  left-0 z-20 w-full bg-white">
					<div className="overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5">
						<div className="container flex items-center justify-between gap-5 bg-white px-4 py-5 text-xs sm:px-5">
							<span>
								We use cookies to enhance your experience with us. To learn more - please refer to our <Link className="font-medium text-[#2f8fed] underline underline-offset-2"
									href="/privacy-policy">privacy policy</Link>.
							</span>

							<button className='py-2.5 px-4 font-medium text-sm rounded-2xl border border-[#2f8fed] text-[#2f8fed]' onClick={handleAccept}>Accept</button>
						</div>
					</div>
				</div>
			</Transition>
		</>
	)
}
