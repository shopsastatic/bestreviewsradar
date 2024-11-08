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

const AuthorPostsChild: FaustPage<any> = props => {
	const { user } = props.data || {}
	const [activeTab, setActiveTab] = useState('articles');

	// Example data for author
	const authorData = {
		name: user?.name,
		role: "Senior Technology Editor",
		image: user?.ncUserMeta?.featuredImage?.node?.sourceUrl,
		bio: user?.ncBio,
		expertise: [
			"Smartphones & Mobile Devices",
			"Laptops & Computing",
			"Smart Home Technology",
			"Consumer Electronics",
			"Photography Equipment"
		],
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
		featuredArticles: [
			{
				id: 1,
				title: "The Ultimate iPhone 15 Pro Max vs Samsung S24 Ultra Comparison",
				category: "Smartphones",
				image: "/api/placeholder/600/300",
				date: "2 days ago",
				views: "125K",
				rating: 4.8,
				featured: true,
				excerpt: "A comprehensive comparison of 2024's most powerful flagship smartphones, covering everything from camera capabilities to battery life."
			},
			{
				id: 2,
				title: "Best Laptops for Professionals in 2024",
				category: "Laptops",
				image: "/api/placeholder/600/300",
				date: "1 week ago",
				views: "98K",
				rating: 4.9,
				excerpt: "An in-depth guide to choosing the perfect laptop for professional work, comparing top models from leading manufacturers."
			},
			{
				id: 3,
				title: "Smart Home Hub Comparison: 2024 Edition",
				category: "Smart Home",
				image: "/api/placeholder/600/300",
				date: "2 weeks ago",
				views: "85K",
				rating: 4.7,
				excerpt: "Everything you need to know about the latest smart home hubs and how they can transform your living space."
			}
		],
		recentArticles: [
			{
				id: 4,
				title: "MacBook Pro M3 Max Review: The Ultimate Creator's Laptop?",
				category: "Laptops",
				image: "https://images.unsplash.com/photo-1484807352052-23338990c6c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				date: "3 days ago",
				rating: 4.9,
				views: "45K"
			},
			{
				id: 5,
				title: "Top 5 Wireless Earbuds for Every Budget",
				category: "Audio",
				image: "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				date: "5 days ago",
				rating: 4.7,
				views: "38K"
			}
		],
		categories: [
			{ name: "Smartphones", count: 120 },
			{ name: "Laptops", count: 85 },
			{ name: "Smart Home", count: 65 },
			{ name: "Audio", count: 45 },
			{ name: "Accessories", count: 95 }
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
				pageFeaturedImageUrl={
					getImageDataFromImageFragment(ncUserMeta?.featuredImage?.node)
						?.sourceUrl || null
				}
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
										<img
											src={authorData.image}
											alt={authorData.name}
											className="w-24 h-24 rounded-full object-cover"
										/>
										<div>
											<h1 className="text-3xl font-bold mb-2">{authorData.name}</h1>
											<p className="text-gray-300">{authorData.role}</p>
										</div>
									</div>

									<p className="text-gray-300">{authorData.bio}</p>

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
									{authorData.featuredArticles.map((article) => (
										<div
											key={article.id}
											className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
										>
											<div className="p-6">
												<div className="flex justify-between items-start mb-4">
													<div>
														<span className="text-sm text-blue-500 mb-2 block">
															{article.category}
														</span>
														<h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">
															{article.title}
														</h3>
													</div>
													{article.featured && (
														<span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
															Featured
														</span>
													)}
												</div>
												<p className="text-gray-600 mb-4">{article.excerpt}</p>
												<div className="flex items-center justify-between text-sm text-gray-500">
													<div className="flex items-center gap-4">
														<div className="flex items-center gap-1">
															<Clock className="w-4 h-4" />
															<span>{article.date}</span>
														</div>
														<div className="flex items-center gap-1">
															<Eye className="w-4 h-4" />
															<span>{article.views}</span>
														</div>
													</div>
													<div className="flex items-center gap-1">
														<Star className="w-4 h-4 text-yellow-400 fill-current" />
														<span>{article.rating}</span>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>

								{/* Recent Articles Grid */}
								<div className="grid md:grid-cols-2 gap-6">
									{authorData.recentArticles.map((article) => (
										<div
											key={article.id}
											className="bg-white rounded-xl overflow-hidden p-4 flex gap-6"
										>
											<img
												src={article.image}
												alt={article.title}
												className="w-32 h-24 object-cover rounded-lg"
											/>
											<div className="flex-1">
												<span className="text-sm text-blue-500 mb-1 block">
													{article.category}
												</span>
												<h3 className="font-bold mb-2 hover:text-blue-600 transition-colors">
													{article.title}
												</h3>
												<div className="flex items-center justify-between text-sm text-gray-500">
													<div className="flex items-center gap-2">
														<Clock className="w-4 h-4" />
														<span>{article.date}</span>
													</div>
													<div className="flex items-center gap-1">
														<Star className="w-4 h-4 text-yellow-400 fill-current" />
														<span>{article.rating}</span>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Sidebar */}
							<div className="md:w-80">
								{/* Expertise */}
								<div className="bg-white rounded-xl p-6 mb-6">
									<h3 className="font-bold text-lg mb-4">Areas of Expertise</h3>
									<div className="space-y-2">
										{authorData.expertise.map((item, index) => (
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

								{/* Categories */}
								<div className="bg-white rounded-xl p-6">
									<h3 className="font-bold text-lg mb-4">Top Categories</h3>
									<div className="space-y-3">
										{authorData.categories.map((category) => (
											<div
												key={category.name}
												className="flex items-center justify-between text-gray-600"
											>
												<span>{category.name}</span>
												<span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
													{category.count} articles
												</span>
											</div>
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
