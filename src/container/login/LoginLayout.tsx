import Logo from '@/components/Logo/Logo'
import {
	IS_CHISNGHIAX_DEMO_SITE,
	NC_SITE_SETTINGS,
} from '@/contains/site-settings'
import Link from 'next/link'
import React, { FC } from 'react'

interface Props {
	children: React.ReactNode
	rightBtn: {
		text: string
		href: string
	}
	isLoginPage?: boolean
	isSignUpPage?: boolean
	isResetPasswordPage?: boolean
}

const LoginLayout: FC<Props> = ({
	children,
	rightBtn,
	isLoginPage = true,
	isSignUpPage = false,
	isResetPasswordPage = false,
}) => {

	return (
		<div className="not-dark container relative h-[100vh] min-h-[600px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 xl:min-h-[800px] dark:bg-zinc-950">
			<Link
				className="focus-visible:ring-ring absolute right-4 top-4 hidden h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 md:right-8 md:top-8 lg:inline-flex dark:hover:bg-neutral-700"
				href={rightBtn.href}
			>
				{rightBtn.text}
			</Link>
			<div className="dark relative hidden h-full flex-col overflow-y-auto border-zinc-800 p-10 text-neutral-100 lg:flex dark:border-r">
				<div className="absolute inset-0 bg-zinc-900" />
				<div className="relative z-20 flex items-center text-lg font-medium">
					<Logo />
				</div>
			</div>
			<div className="pb-8 pt-12 sm:py-8 lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-96 sm:space-y-10">
					<div className="flex flex-col text-center">
						<div className="relative z-20 flex items-center justify-center pb-10 text-lg font-medium lg:hidden">
							<Logo />
						</div>
					</div>

					{children}
				</div>
			</div>
		</div>
	)
}

export default LoginLayout
