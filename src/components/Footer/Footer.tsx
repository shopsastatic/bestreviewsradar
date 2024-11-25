import { FragmentType } from '@/__generated__'
import { NC_FOOTER_MENU_QUERY_FRAGMENT } from '@/fragments/menu'
import { flatListToHierarchical } from '@faustwp/core'
import { NcFooterMenuFieldsFragmentFragment } from '@/__generated__/graphql'
import Link from 'next/link'
import { ArrowRight, Shield, Globe, Heart, Award } from 'lucide-react'
import { useState } from 'react'

interface Props {
	menuItems: FragmentType<typeof NC_FOOTER_MENU_QUERY_FRAGMENT>[] | null
}

export type FooterNavItemType = NcFooterMenuFieldsFragmentFragment & {
	children?: FooterNavItemType[]
}

export default function Footer({ menuItems }: any) {
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const [status, setStatus] = useState<{
		type: 'success' | 'error' | null,
		message: string
	}>({ type: null, message: '' })
	const menus = flatListToHierarchical(menuItems || [], {
		idKey: 'id',
		parentKey: 'parentId',
		childrenKey: 'children',
	}) as FooterNavItemType[]

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setStatus({ type: null, message: '' })

		// Giả lập API call
		try {
			await new Promise(resolve => setTimeout(resolve, 1500)) // delay 1.5s

			setStatus({
				type: 'success',
				message: "Thank you for subscribing! We'll keep you updated."
			})
			setEmail('') // Clear input
		} catch (error) {
			setStatus({
				type: 'error',
				message: 'Something went wrong. Please try again.'
			})
		} finally {
			setLoading(false)
		}
	}

	const awards = [
		{
			title: "Best Review Platform 2024",
			organization: "Tech Excellence Awards",
			icon: <Award className="w-6 h-6" />
		},
		{
			title: "Most Trusted Tech Reviews",
			organization: "Consumer Trust Alliance",
			icon: <Shield className="w-6 h-6" />
		}
	];

	const about_links = [
		{ name: "Our Story", slug: "about" },
		{ name: "Contact Us", slug: "contact" },
		{ name: "Terms of Service", slug: "terms-of-service" },
		{ name: "Privacy Policy", slug: "privacy-policy" },
		{ name: "Affiliate Disclosure", slug: "affiliate-disclosure" },
		{ name: "Disclaimer", slug: "disclaimer" },
	]

	return (

		<footer className="bg-gray-900 text-gray-300 mt-20">
			{/* Newsletter Section */}
			<div className="border-b border-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="grid md:grid-cols-2 gap-12 items-center">
						<div>
							<h3 className="text-2xl font-bold text-white mb-2">
								Stay Updated with Latest Reviews
							</h3>
							<p className="text-gray-400">
								Get exclusive deals, product launches, and expert reviews delivered to your inbox
							</p>
						</div>
						<div>
							<form
								onSubmit={handleSubmit}
								className="flex gap-2 flex-wrap flex-col md:flex-row"
							>
								<input
									type="email"
									placeholder="Enter your email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									disabled={loading}
									required
									className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
								/>
								<button
									type="submit"
									disabled={loading}
									className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center md:justify-start gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{loading ? (
										<>
											<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
											<span>Subscribing...</span>
										</>
									) : (
										<>
											<span>Subscribe</span>
											<ArrowRight className="w-4 h-4" />
										</>
									)}
								</button>
							</form>

							{status.type && (
								<div
									className={`px-4 py-3 rounded-lg text-sm ${status.type === 'success'
										? 'bg-green-500/10 text-green-500 border border-green-500/20'
										: 'bg-red-500/10 text-red-500 border border-red-500/20'
										}`}
								>
									{status.message}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Main Footer Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid lg:grid-cols-5 gap-12">
					{/* Company Info */}
					<div className="lg:col-span-2 space-y-6">
						<div>
							<Link href={"/"} className="block w-fit mb-4">
								<img
									src="https://img.bestreviewsradar.com/images/f_auto,q_auto//v1732270282/logo-bestreviewsradar/logo-bestreviewsradar.png"
									alt="Logo Best Reviews Radar"
									width={160}
									height={160}
									loading='lazy'
									className="mx-auto"
								/>
							</Link>
							<p className="text-gray-400 mb-6 text-[15px]">
								Your trusted source for in-depth product reviews, comparisons, and buying guides. We help millions make confident purchasing decisions.
							</p>
						</div>

						{/* Awards */}
						<div className="space-y-4 pt-6">
							<h4 className="text-white font-semibold">Recognition & Awards</h4>
							<div className="grid grid-cols-2 gap-4">
								{awards.map((award, index) => (
									<div key={index} className="bg-gray-800 p-4 rounded-lg">
										<div className="flex items-center gap-3 mb-2">
											<div className="text-blue-500">
												{award.icon}
											</div>
											<div className="text-sm font-medium text-white">{award.title}</div>
										</div>
										<div className="text-xs text-gray-400">{award.organization}</div>
									</div>
								))}
							</div>
						</div>

						<div className="flex items-center gap-3 mt-4">
							<img src="https://img.bestreviewsradar.com/images/f_auto,q_auto/v1732520637/us/us.png" width="30" height={30} loading='lazy' alt="US flag" />
							<span className="text-[#b6c4d2]">United States</span>
						</div>
					</div>

					{/* Quick Links */}
					<div className="lg:col-span-3 grid md:grid-cols-3 gap-8">
						<div>
							<h4 className="text-white font-semibold mb-4">Products Details</h4>
							<ul className="space-y-4">
								{menuItems?.length > 0 && menuItems?.slice(0, 8)?.map((link: any, linkIndex: any) => (
									<li key={linkIndex}>
										<Link href={"/" + (link?.uri?.replace(/^\/|\/$/g, '')?.split('/')?.pop() ?? "")} className="text-gray-400 text-[15px] hover:text-[#ffa125] hover:underline hover:underline-offset-4 transition-colors">
											{link?.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
						<div>
							<h4 className="text-white font-semibold mb-4">Categories</h4>
							<ul className="space-y-4">
								{menuItems?.length > 8 && menuItems?.slice(8, 20)?.map((link: any, linkIndex: any) => (
									<li key={linkIndex}>
										<Link href={"/" + (link?.uri?.replace(/^\/|\/$/g, '')?.split('/')?.pop() ?? "/")} className="text-gray-400 text-[15px] hover:text-[#ffa125] hover:underline hover:underline-offset-4 transition-colors">
											{link?.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
						<div>
							<h4 className="text-white font-semibold mb-4">About</h4>
							<ul className="space-y-4">
								{about_links.map((link: any, linkIndex: any) => (
									<li key={linkIndex}>
										<Link href={"/" + (link?.slug ?? "/")} className="text-gray-400 text-[15px] hover:text-[#ffa125] hover:underline hover:underline-offset-4 transition-colors">
											{link?.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="mt-16 pt-8 border-t border-gray-800">
					<div className="grid md:grid-cols-2 gap-8 items-center">
						{/* Copyright */}
						<div className="text-sm text-gray-400">
							Amazon, Amazon Prime, the Amazon logo and Amazon Prime logo are trademarks of Amazon.com, Inc. or its affiliates Copyright © 2024 BestReviewsRadar. All rights reserved.
						</div>

						{/* Trust Badges */}
						<div className="flex items-center justify-center gap-6">
							<div className="flex items-center gap-2">
								<Shield className="w-5 h-5 text-blue-500" />
								<span className="text-sm">Verified Reviews</span>
							</div>
							<div className="flex items-center gap-2">
								<Globe className="w-5 h-5 text-blue-500" />
								<span className="text-sm">Global Coverage</span>
							</div>
							<div className="flex items-center gap-2">
								<Heart className="w-5 h-5 text-blue-500" />
								<span className="text-sm">User Trusted</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
