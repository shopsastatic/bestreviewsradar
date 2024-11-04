import { FragmentType } from '@/__generated__'
import { NC_FOOTER_MENU_QUERY_FRAGMENT } from '@/fragments/menu'
import { flatListToHierarchical } from '@faustwp/core'
import { NcFooterMenuFieldsFragmentFragment } from '@/__generated__/graphql'
import Link from 'next/link'
import { ArrowRight, Shield, Globe, Heart, Award } from 'lucide-react'

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

	const quickLinks = [
		{
			title: "Product Reviews",
			links: [
				{name: "Air-Fryers", slug: "air-fryers"},
				{name: "Monitors", slug: "monitors"},
				{name: "Cordless-Vacuums", slug: "cordless-vacuums"},
				{name: "Gaming-Chairs", slug: "gaming-chairs"},
				{name: "Robot-Vacuums", slug: "robot-vacuums"},
				{name: "Baby-Monitors", slug: "baby-monitors"},
				{name: "Wireless-Earbuds", slug: "wireless-earbuds"},
				{name: "Standing-Desks", slug: "standing-desks"},
			]
		},
		{
			title: "Categories",
			links: [
				{name: "Smartphones", slug: "smartphones"},
				{name: "Laptops & Computers", slug: "lapops-computers"},
				{name: "Cameras & Photography", slug: "cameras-photography"},
				{name: "Smart Home", slug: "smart-home"},
				{name: "Audio & Headphones", slug: "audio-headphones"},
				{name: "Gaming", slug: "gaming"},
				{name: "TVs & Entertainment", slug: "tvs-entertaiment"},
				{name: "Wearables", slug: "wearables"},
			]
		},
		{
			title: "About Us",
			links: [
				{name: "Our Story", slug: "about"},
				{name: "Contact Us", slug: "contact"},
				{name: "Terms of Service", slug: "terms-of-service"},
				{name: "Privacy Policy", slug: "privacy-policy"},
				{name: "Affiliate Disclosure", slug: "affiliate-disclosure"},
				{name: "Disclaimer", slug: "disclaimer"},
			]
		}
	];

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
							<form className="flex gap-2 flex-wrap flex-col md:flex-row">
								<input
									type="email"
									placeholder="Enter your email"
									className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								<button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center md:justify-start gap-2">
									<span>Subscribe</span>
									<ArrowRight className="w-4 h-4" />
								</button>
							</form>
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
								<img src="/images/logo-brr.png" width="160" alt="Logo Best Reviews Radar"></img>
							</Link>
							<p className="text-gray-400 mb-6 text-[15px]">
								Your trusted source for in-depth product reviews, comparisons, and buying guides. We help millions make confident purchasing decisions.
							</p>
						</div>

						{/* Contact Info */}
						{/* <div className="space-y-4">
				<div className="flex items-center gap-3">
				  <Mail className="w-5 h-5 text-blue-500" />
				  <span>contact@bestreviewsradar.com</span>
				</div>
				<div className="flex items-center gap-3">
				  <Phone className="w-5 h-5 text-blue-500" />
				  <span>1-800-REVIEWS</span>
				</div>
				<div className="flex items-center gap-3">
				  <MapPin className="w-5 h-5 text-blue-500" />
				  <span>123 Review Street, Tech City, TC 12345</span>
				</div>
			  </div> */}

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
							<img src="/images/us.png" width="30" alt="" />
							<span className="text-[#b6c4d2]">United States</span>
						</div>
					</div>

					{/* Quick Links */}
					<div className="lg:col-span-3 grid md:grid-cols-3 gap-8">
						{quickLinks.map((category, index) => (
							<div key={index}>
								<h4 className="text-white font-semibold mb-4">{category.title}</h4>
								<ul className="space-y-4">
									{category.links.map((link, linkIndex) => (
										<li key={linkIndex}>
											<Link href={link?.slug ?? "/"} className="text-gray-400 text-[15px] hover:text-[#ffa125] hover:underline hover:underline-offset-4 transition-colors">
												{link?.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
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

						{/* Social Links */}
						{/* <div className="flex justify-end gap-4">
				<a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
				  <Facebook className="w-5 h-5" />
				</a>
				<a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
				  <Twitter className="w-5 h-5" />
				</a>
				<a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
				  <Instagram className="w-5 h-5" />
				</a>
				<a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
				  <Linkedin className="w-5 h-5" />
				</a>
				<a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
				  <Youtube className="w-5 h-5" />
				</a>
			  </div> */}
					</div>
				</div>
			</div>
		</footer>
	)
}
