import { FaustPage } from '@faustwp/core'
import { useFragment } from '@/__generated__'
import {
	GetAuthorWithPostsQuery,
	NcgeneralSettingsFieldsFragmentFragment,
} from '@/__generated__/graphql'
import useHandleGetPostsArchivePage from '@/hooks/useHandleGetPostsArchivePage'
import { NC_USER_FULL_FIELDS_FRAGMENT } from '@/fragments'
import PageLayout from '@/container/PageLayout'
import { getImageDataFromImageFragment } from '@/utils/getImageDataFromImageFragment'
import { PostDataFragmentType } from '@/data/types'
import AuthorLayout from '@/container/AuthorPageLayout'
import React, { useState } from 'react';
import {
	Star,
	Clock,
	Eye,
	TrendingUp,
	Award,
	BarChart,
	BookOpen,
	MessageSquare,
	Mail,
	Linkedin,
	Twitter,
	ThumbsUp,
	Filter
} from 'lucide-react';
import Link from 'next/link'

const AuthorPostsChild: FaustPage<any> = props => {
	const { user } = props.data || {}
	const [activeTab, setActiveTab] = useState('articles');

	const expertise = user?.expert?.areasOfExpertise?.split("\r\n")

	// Example data for author
	const authorData = {
		bio: user?.ncBio,
		metrics: {
			articles: "450+",
			reviews: "280+",
			monthlyReaders: "1.2M+",
			expertRating: "4.9"
		},
		badges: [
			{ name: "Top Reviewer 2024", icon: <Award className="w-5 h-5" /> },
			{ name: "Tech Expert", icon: <BarChart className="w-5 h-5" /> },
			{ name: "Community Leader", icon: <MessageSquare className="w-5 h-5" /> }
		],
		categories: [
			{ name: "Electronics", slug: "electronics"},
			{ name: "Home & Kitchen", slug: "home-kitchen"},
			{ name: "Computers", slug: "computers-accessories-277298"},
			{ name: "Health & HouseHold", slug: "health-household"},
			{ name: "Baby Products", slug: "baby-products"}
		]
	};

	const posts = user?.posts as any
	const { databaseId, id, name, ncUserMeta } = useFragment(
		NC_USER_FULL_FIELDS_FRAGMENT,
		user || {},
	)
	//

	const {
		currentPosts,
		handleChangeFilterPosts,
		handleClickShowMore,
		hasNextPage,
		loading,
	} = useHandleGetPostsArchivePage({
		initPosts: (posts?.nodes as PostDataFragmentType[]) || [],
		initPostsPageInfo: posts?.pageInfo || null,
		authorDatabaseId: databaseId,
	})

	return (
		<>
			<PageLayout
				headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
				footerMenuItems={props.data?.footerMenuItems?.nodes || []}
				pageTitle={name}
				generalSettings={
					props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
				}
			>
				<div className="bg-gray-50 min-h-screen">
					{/* Author Header */}
					<div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
							<div className="grid md:grid-cols-2 gap-12 items-center">
								{/* Author Info */}
								<div className="space-y-6">
									<div className="flex items-center gap-6">
										<div>
											<h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
											<p className="text-gray-300">{user?.ncUserMeta?.ncBio}</p>
										</div>
									</div>

									<p className="text-gray-300">{user?.description}</p>

									{/* Badges */}
									<div className="flex flex-wrap gap-4">
										{authorData.badges.map((badge, index) => (
											<div
												key={index}
												className="flex items-center gap-2 bg-gray-800/50 rounded-full px-4 py-2"
											>
												{badge.icon}
												<span className="text-sm">{badge.name}</span>
											</div>
										))}
									</div>

									{/* Social Links */}
									<div className="flex gap-4">
										{[Mail, Linkedin, Twitter].map((Icon, index) => (
											<a
												key={index}
												href="#"
												className="p-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50 transition-colors"
											>
												<Icon className="w-5 h-5" />
											</a>
										))}
									</div>
								</div>

								{/* Author Stats */}
								<div className="bg-gray-800/50 rounded-xl p-8">
									<div className="grid grid-cols-2 gap-8">
										{Object.entries(authorData.metrics).map(([key, value]) => (
											<div key={key} className="text-center">
												<div className="text-3xl font-bold text-blue-400 mb-1">{value}</div>
												<div className="text-sm text-gray-400 capitalize">
													{key.replace(/([A-Z])/g, ' $1').trim()}
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Content Section */}
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
						<div className="flex flex-col md:flex-row gap-8">
							{/* Main Content */}
							<div className="flex-1">
								{/* Content Navigation */}
								<div className="flex gap-2 md:gap-4 mb-8">
									{['articles', 'reviews', 'guides'].map((tab) => (
										<button
											key={tab}
											onClick={() => setActiveTab(tab)}
											className={`px-4 py-2 rounded-lg transition-colors ${activeTab === tab
												? 'bg-blue-500 text-white'
												: 'bg-white text-gray-600 hover:bg-gray-100'
												}`}
										>
											{tab.charAt(0).toUpperCase() + tab.slice(1)}
										</button>
									))}
								</div>

								{/* Featured Articles */}
								<div className="space-y-8 mb-12">
									{user?.posts?.nodes?.length > 0 && user?.posts?.nodes?.slice(0, 3)?.map((article: any, index: any) => (
										<Link
											href={article?.uri ?? "/"}
											key={index}
											className="block w-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
										>
											<div className="p-6">
												<div className="flex justify-between items-start mb-4 relative">
													<div>
														<span className="text-sm text-blue-500 mb-2 block mt-8 md:mt-0">
															{article?.categories?.nodes?.[article.categories.nodes.length - 1].name}
														</span>
														<h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">
															{article.title}
														</h3>
													</div>
													{index == 1 && (
														<span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs md:text-sm absolute left-0 md:left-auto md:right-0 -top-1">
															Most Reviewed
														</span>
													)}
													{index != 1 && (
														<span className="flex items-center min-w-[100px] gap-2 bg-[#facc15] text-yellow-900 px-3 py-1 rounded-full text-xs md:text-sm absolute left-0 md:left-auto md:right-0 -top-1">
															<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
																<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
															</svg>
															Featured
														</span>
													)}

												</div>
												<p className="text-gray-600 mb-4">{article.excerpt}</p>
												<div className="flex justify-between text-sm text-gray-500">
													<div className="flex gap-4">
														<div className="flex gap-1">
															<Clock className="w-4 h-4" />
															<span>{index == 0 ? "1 days ago" : "2 days ago"}</span>
														</div>
													</div>
													<div className="flex items-center gap-1 mt-2">
														<img className='max-w-24' src={article?.featuredImage?.node?.sourceUrl} alt="" />
													</div>
												</div>
											</div>
										</Link>
									))}
								</div>

								{/* Recent Articles Grid */}
								<div className="grid lg:grid-cols-2 gap-6">
									{user?.posts?.nodes?.length > 0 && user?.posts?.nodes?.slice(3, 5)?.map((article: any, index: any) => (
										<Link
											href={article?.uri ?? "/"}
											key={index}
											className="bg-white rounded-xl overflow-hidden p-4 flex gap-6"
										>
											<img
												src={article.featuredImage?.node?.sourceUrl}
												alt={article.featuredImage?.node?.altText}
												className="w-28 md:w-32 h-24 object-cover rounded-lg"
											/>
											<div className="flex-1">
												<span className="text-sm text-blue-500 mb-1 block">
													{article.category}
												</span>
												<h4 className="font-bold mb-2 hover:text-blue-600 transition-colors">
													{article.title}
												</h4>
												<div className="flex items-center justify-between text-sm text-gray-500">
													<div className="flex items-center gap-2">
														<Clock className="w-4 h-4" />
														<span>1w ago</span>
													</div>
												</div>
											</div>
										</Link>
									))}
								</div>
							</div>

							{/* Sidebar */}
							<div className="md:w-80">
								{/* Expertise */}
								{expertise?.length > 0 && (
									<div className="bg-white rounded-xl p-6 mb-6">
										<h3 className="font-bold text-lg mb-4">Areas of Expertise</h3>
										<div className="space-y-2">
											{expertise.map((item: any, index: any) => (
												<div
													key={index}
													className="flex items-center gap-2 text-gray-600"
												>
													<ThumbsUp className="w-4 h-4 text-blue-500" />
													<span>{item}</span>
												</div>
											))}
										</div>
									</div>
								)}

								{/* Categories */}
								<div className="bg-white rounded-xl p-6">
									<h3 className="font-bold text-lg mb-4">Top Categories</h3>
									<div className="space-y-3">
										{authorData.categories.map((category) => (
											<Link
												href={('/'+category?.slug)}
												key={category.name}
												className="flex items-center justify-between text-gray-600"
											>
												<span>{category.name}</span>
											</Link>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</PageLayout>
		</>
	)
}

export default AuthorPostsChild
