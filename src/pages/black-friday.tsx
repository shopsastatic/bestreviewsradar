import React, { useState } from 'react';
import {
    Clock,
    Award,
    TrendingUp,
    Search,
    Filter,
    Star,
    DollarSign,
    BarChart,
    ChevronRight,
    Eye,
    ThumbsUp
} from 'lucide-react';
import PageLayout from '@/container/PageLayout';
import { FOOTER_LOCATION, PRIMARY_LOCATION } from '@/contains/menu';
import { gql } from '@/__generated__';
import { GetStaticPropsContext } from 'next';
import { getNextStaticProps } from '@faustwp/core';

const BlackFridayGuides = (props: any) => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'All Guides', count: 85 },
        { id: 'tech', name: 'Tech & Electronics', count: 32 },
        { id: 'home', name: 'Home & Kitchen', count: 28 },
        { id: 'smart-home', name: 'Smart Home', count: 15 },
        { id: 'gaming', name: 'Gaming', count: 10 }
    ];

    const priceRanges = [
        'Under $100',
        'Under $500',
        'Under $1000',
        'Premium Picks'
    ];

    const featuredGuides = [
        {
            id: 1,
            title: "Best Black Friday TV Deals 2024",
            subtitle: "Top 4K & OLED Deals Ranked",
            category: "Tech & Electronics",
            image: "/api/placeholder/800/400",
            author: {
                name: "David Wilson",
                role: "TV & Display Expert"
            },
            stats: {
                dealsAnalyzed: 85,
                averageSaving: "45%",
                topDealSaving: "$800+"
            },
            lastUpdated: "1 hour ago",
            readTime: "12 min read",
            views: "85K",
            highlights: [
                "Lowest prices of the year",
                "Early deals available now",
                "Price history analysis",
                "Stock predictions"
            ],
            recommendations: {
                bestOverall: "LG C3 OLED",
                bestValue: "TCL 6-Series",
                bestBudget: "Hisense U6K"
            }
        },
        {
            id: 2,
            title: "Top Black Friday Laptop Deals",
            subtitle: "Gaming & Professional Laptops Compared",
            category: "Tech & Electronics",
            image: "/api/placeholder/800/400",
            author: {
                name: "Sarah Chen",
                role: "Computer Hardware Expert"
            },
            stats: {
                dealsAnalyzed: 92,
                averageSaving: "38%",
                topDealSaving: "$500+"
            },
            lastUpdated: "2 hours ago",
            readTime: "15 min read",
            views: "92K",
            highlights: [
                "Gaming laptop deals",
                "MacBook discounts",
                "Business laptop sales",
                "Student specials"
            ],
            recommendations: {
                bestOverall: "MacBook Pro M3",
                bestGaming: "Razer Blade 14",
                bestBudget: "Lenovo IdeaPad"
            }
        }
    ];

    const topGuides = [
        {
            id: 3,
            title: "Black Friday Robot Vacuum Deals",
            subtitle: "Best Deals on Top-Rated Models",
            category: "Home & Kitchen",
            image: "/api/placeholder/400/300",
            lastUpdated: "3 hours ago",
            readTime: "10 min read",
            dealsAnalyzed: 45,
            averageSaving: "42%",
            topPicks: [
                "Roomba j7+",
                "Roborock Q5+",
                "Ecovacs T9+"
            ]
        },
        {
            id: 4,
            title: "Headphones & Earbuds Deals Guide",
            subtitle: "Ranked by Price & Features",
            category: "Tech & Electronics",
            image: "/api/placeholder/400/300",
            lastUpdated: "4 hours ago",
            readTime: "8 min read",
            dealsAnalyzed: 60,
            averageSaving: "35%",
            topPicks: [
                "Sony WH-1000XM5",
                "AirPods Pro 2",
                "Jabra Elite 8"
            ]
        }
    ];

    const budgetGuides = [
        {
            id: 5,
            title: "Best Black Friday Tech Under $100",
            subtitle: "Budget-Friendly Gadget Deals",
            category: "Tech & Electronics",
            image: "/api/placeholder/400/300",
            lastUpdated: "5 hours ago",
            readTime: "8 min read",
            dealsAnalyzed: 75,
            priceRange: "Under $100",
            highlights: [
                "Smart home devices",
                "Wireless earbuds",
                "Phone accessories"
            ]
        },
        {
            id: 6,
            title: "Kitchen Appliance Deals Under $200",
            subtitle: "Best Value Kitchen Upgrades",
            category: "Home & Kitchen",
            image: "/api/placeholder/400/300",
            lastUpdated: "6 hours ago",
            readTime: "9 min read",
            dealsAnalyzed: 55,
            priceRange: "Under $200",
            highlights: [
                "Air fryers",
                "Coffee makers",
                "Food processors"
            ]
        }
    ];

    return (
        <PageLayout
            headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
            footerMenuItems={props.data?.footerMenuItems?.nodes || []}
            sidebarMenuItems={props.data?.sidebarMenuItems?.nodes || []}
            pageFeaturedImageUrl={null}
            pageTitle="Black Friday"
            metaRobots="noindex, nofollow"
            generalSettings={
                props.data?.generalSettings as any
            }
        >
            <div className="bg-gray-50 min-h-screen">
                {/* Header with Countdown */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold mb-4">Black Friday 2024 Buying Guides</h1>
                            <p className="text-xl text-gray-300">
                                Expert-curated deals and rankings updated hourly
                            </p>
                        </div>

                        {/* Countdown Timer */}
                        <div className="flex justify-center gap-8 mb-12">
                            <div className="text-center">
                                <div className="text-3xl font-bold">24</div>
                                <div className="text-sm text-gray-400">Days</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">18</div>
                                <div className="text-sm text-gray-400">Hours</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">45</div>
                                <div className="text-sm text-gray-400">Minutes</div>
                            </div>
                        </div>

                        {/* Search & Filters */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search Black Friday guides and rankings..."
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Categories & Filters */}
                    <div className="flex flex-wrap gap-4 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-lg ${selectedCategory === category.id
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {category.name}
                                <span className="ml-2 text-sm opacity-75">({category.count})</span>
                            </button>
                        ))}
                    </div>

                    {/* Featured Guides */}
                    <div className="space-y-8 mb-12">
                        {featuredGuides.map((guide) => (
                            <div key={guide.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="grid md:grid-cols-2 gap-8 p-6">
                                    {/* Image Side */}
                                    <div className="relative">
                                        <img
                                            src={guide.image}
                                            alt={guide.title}
                                            className="w-full h-[300px] object-cover rounded-lg"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm">
                                                Black Friday Guide
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Side */}
                                    <div className="space-y-6">
                                        <div>
                                            <div className="text-blue-500 mb-2">{guide.category}</div>
                                            <h2 className="text-2xl font-bold mb-1">{guide.title}</h2>
                                            <div className="text-lg text-gray-600">{guide.subtitle}</div>
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                                <div className="text-lg font-bold text-blue-500">
                                                    {guide.stats.dealsAnalyzed}
                                                </div>
                                                <div className="text-sm text-gray-500">Deals Analyzed</div>
                                            </div>
                                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                                <div className="text-lg font-bold text-green-500">
                                                    {guide.stats.averageSaving}
                                                </div>
                                                <div className="text-sm text-gray-500">Avg. Saving</div>
                                            </div>
                                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                                <div className="text-lg font-bold text-green-500">
                                                    {guide.stats.topDealSaving}
                                                </div>
                                                <div className="text-sm text-gray-500">Top Saving</div>
                                            </div>
                                        </div>

                                        {/* Highlights */}
                                        <div className="grid grid-cols-2 gap-3">
                                            {guide.highlights.map((highlight, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2 text-sm text-gray-600"
                                                >
                                                    <ThumbsUp className="w-4 h-4 text-blue-500" />
                                                    <span>{highlight}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Top Picks */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Best Overall:</span>
                                                <span className="font-medium">{guide.recommendations.bestOverall}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Best Value:</span>
                                                <span className="font-medium">{guide.recommendations.bestValue}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Best Budget:</span>
                                                <span className="font-medium">{guide.recommendations.bestBudget}</span>
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-4 text-gray-500">
                                                <span>Updated {guide.lastUpdated}</span>
                                                <span>{guide.readTime}</span>
                                            </div>
                                            <button className="flex items-center gap-1 text-blue-500 hover:text-blue-600">
                                                <span>Read Guide</span>
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Top Guides Grid */}
                    <h2 className="text-2xl font-bold mb-6">Latest Deal Guides</h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {topGuides.map((guide) => (
                            <div key={guide.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="p-6">
                                    <div className="flex gap-6">
                                        <img
                                            src={guide.image}
                                            alt={guide.title}
                                            className="w-40 h-32 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <div className="text-blue-500 text-sm mb-2">{guide.category}</div>
                                            <h3 className="font-bold mb-1">{guide.title}</h3>
                                            <p className="text-gray-600 text-sm mb-3">{guide.subtitle}</p>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span>{guide.lastUpdated}</span>
                                                <span>{guide.readTime}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="text-sm text-gray-600">
                                                Analyzed {guide.dealsAnalyzed} deals
                                            </div>
                                            <div className="text-sm text-green-500">
                                                Save up to {guide.averageSaving}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            {guide.topPicks.map((pick, index) => (
                                                <div key={index} className="text-sm flex items-center gap-2">
                                                    <Award className={`w-4 h-4 ${index === 0 ? 'text-yellow-400' :
                                                        index === 1 ? 'text-gray-400' :
                                                            'text-bronze-400'
                                                        }`} />
                                                    <span>{pick}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Budget Guides */}

                    {/* Budget Guides */}
                    <h2 className="text-2xl font-bold mb-6">Budget-Friendly Black Friday Guides</h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {budgetGuides.map((guide) => (
                            <div key={guide.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="p-6">
                                    <div className="flex gap-6">
                                        <img
                                            src={guide.image}
                                            alt={guide.title}
                                            className="w-40 h-32 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <div className="text-blue-500 text-sm mb-2">{guide.category}</div>
                                            <h3 className="font-bold mb-1">{guide.title}</h3>
                                            <p className="text-gray-600 text-sm mb-2">{guide.subtitle}</p>
                                            <div className="flex items-center gap-2 mb-3">
                                                <DollarSign className="w-4 h-4 text-green-500" />
                                                <span className="text-sm text-green-500">{guide.priceRange}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t">
                                        <div className="grid grid-cols-3 gap-2">
                                            {guide.highlights.map((highlight, index) => (
                                                <div
                                                    key={index}
                                                    className="text-center p-2 bg-gray-50 rounded-lg text-sm text-gray-600"
                                                >
                                                    {highlight}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between mt-4 text-sm">
                                            <div className="text-gray-500">
                                                {guide.dealsAnalyzed} deals analyzed
                                            </div>
                                            <button className="text-blue-500 hover:text-blue-600 flex items-center gap-1">
                                                Read Guide
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Deal Alert Info */}
                    <div className="bg-gray-900 rounded-xl text-white p-8 mb-12">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Get Black Friday Deal Alerts</h2>
                                <p className="text-gray-300 mb-6">
                                    Stay updated with the latest Black Friday guides and price drops on your favorite products.
                                </p>
                                <div className="flex gap-4">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                        Get Alerts
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-blue-400" />
                                    <div>
                                        <div className="font-medium">Real-time Updates</div>
                                        <div className="text-sm text-gray-400">Guides updated hourly during Black Friday</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <DollarSign className="w-5 h-5 text-blue-400" />
                                    <div>
                                        <div className="font-medium">Price Drop Alerts</div>
                                        <div className="text-sm text-gray-400">Get notified when prices hit new lows</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Award className="w-5 h-5 text-blue-400" />
                                    <div>
                                        <div className="font-medium">Expert Recommendations</div>
                                        <div className="text-sm text-gray-400">Curated picks from our experts</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Our Methodology */}
                    <div className="bg-white rounded-xl shadow-sm p-8">
                        <h2 className="text-2xl font-bold mb-8 text-center">How We Rank Black Friday Deals</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <BarChart className="w-6 h-6 text-blue-500" />,
                                    title: "Price History Analysis",
                                    description: "We track prices year-round to verify true discounts"
                                },
                                {
                                    icon: <Star className="w-6 h-6 text-blue-500" />,
                                    title: "Quality Assessment",
                                    description: "Only top-rated products make our rankings"
                                },
                                {
                                    icon: <TrendingUp className="w-6 h-6 text-blue-500" />,
                                    title: "Deal Score",
                                    description: "Proprietary algorithm rates deal quality"
                                }
                            ].map((item, index) => (
                                <div key={index} className="text-center">
                                    <div className="inline-flex p-3 bg-blue-50 rounded-xl mb-4">
                                        {item.icon}
                                    </div>
                                    <h3 className="font-bold mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

BlackFridayGuides.variables = () => {
    return {
      headerLocation: PRIMARY_LOCATION,
      footerLocation: FOOTER_LOCATION,
    }
  }
  
  // Note***: tat ca cac query trong cac page deu phai co generalSettings, no duoc su dung o compoent Wrap
  BlackFridayGuides.query = gql(`
    query GetReadingListData($headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!) {
      # common query for all page 
      generalSettings {
        ...NcgeneralSettingsFieldsFragment
      }
      primaryMenuItems: menuItems(where: { location: $headerLocation }, first: 80) {
        nodes {
          ...NcPrimaryMenuFieldsFragment
        }
      }
      footerMenuItems: menuItems(where: { location: $footerLocation }, first: 50) {
        nodes {
          ...NcFooterMenuFieldsFragment
        }
      }
    sidebarMenuItems: menuItems(where: { location: MAIN_MENU }, first: 40) {
      nodes {
        ...NcSideBarMenuFieldsFragment
      }
    }
      # thêm truy vấn để lấy danh mục cha
      categories(where: { parent: null }, first: 50) {
        nodes {
          id
          name
          slug
          ... on Category {
            children {
              nodes {
                id
                name
                slug
              }
            }
          }
        }
      }
    }
  `)
  
  

export default BlackFridayGuides;