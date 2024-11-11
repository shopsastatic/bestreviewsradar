import React, { useState } from 'react';
import {
    Search,
    Filter,
    TrendingUp,
    Star,
    Clock,
    Eye,
    Award,
    ChevronRight,
    BarChart,
    DollarSign
} from 'lucide-react';
import PageLayout from '@/container/PageLayout';

const TopDealsPage = (props: any) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedType, setSelectedType] = useState('all');

    const categories = [
        { id: 'all', name: 'All Categories' },
        { id: 'tech', name: 'Tech & Electronics', count: 52 },
        { id: 'home', name: 'Home & Kitchen', count: 38 },
        { id: 'audio', name: 'Audio & Headphones', count: 25 },
        { id: 'smart-home', name: 'Smart Home', count: 20 },
        { id: 'gaming', name: 'Gaming', count: 18 }
    ];

    const articleTypes = [
        { id: 'all', name: 'All Types' },
        { id: 'best', name: 'Best Of Rankings' },
        { id: 'budget', name: 'Budget Picks' },
        { id: 'compared', name: 'Product Comparisons' }
    ];

    const featuredArticles = [
        {
            id: 1,
            title: "Best Robot Vacuums 2024 - Expert Tested and Ranked",
            category: "Home & Kitchen",
            type: "Best Of Rankings",
            image: "/api/placeholder/800/400",
            author: {
                name: "Sarah Johnson",
                role: "Smart Home Expert",
                reviews: "120+"
            },
            stats: {
                productsCompared: 25,
                hoursOfTesting: 120,
                expertScore: 95
            },
            lastUpdated: "1 day ago",
            readTime: "15 min read",
            views: "125K",
            keyPoints: [
                "In-depth carpet cleaning tests",
                "Battery life comparisons",
                "Navigation capabilities",
                "Smart features evaluation"
            ],
            topPicks: [
                "Best Overall: Roomba j9+",
                "Best Value: Roborock Q5+",
                "Best Budget: Eufy RoboVac"
            ],
            priceRange: "$200 - $1000",
            isFeatured: true
        },
        {
            id: 2,
            title: "Wireless Earbuds Under $100 - Budget-Friendly Ranked",
            category: "Audio & Headphones",
            type: "Budget Picks",
            image: "/api/placeholder/800/400",
            author: {
                name: "Michael Chen",
                role: "Audio Expert",
                reviews: "85+"
            },
            stats: {
                productsCompared: 18,
                hoursOfTesting: 80,
                expertScore: 92
            },
            lastUpdated: "2 days ago",
            readTime: "12 min read",
            views: "98K",
            keyPoints: [
                "Sound quality analysis",
                "Battery tests",
                "Comfort evaluation",
                "Feature comparison"
            ],
            topPicks: [
                "Best Overall: Jabra Elite 4",
                "Best Value: Soundcore Space A40",
                "Best Battery: JLab Go Air Pop"
            ],
            priceRange: "Under $100",
            isFeatured: true
        }
    ];

    const latestArticles = [
        {
            id: 3,
            title: "Best Gaming Monitors 2024 - Top 10 Expert Picks",
            category: "Tech & Electronics",
            type: "Best Of Rankings",
            image: "/api/placeholder/400/300",
            author: {
                name: "David Wilson",
                role: "Display Expert"
            },
            lastUpdated: "3 days ago",
            readTime: "18 min read",
            productsCompared: 22,
            topPicks: [
                "Best Overall: LG 27GP950-B",
                "Best 4K: Samsung Odyssey Neo G8",
                "Best Value: Dell S2721DGF"
            ],
            priceRange: "$300 - $1500"
        },
        {
            id: 4,
            title: "Best 4K TVs Under $500 - Budget Models Compared",
            category: "Tech & Electronics",
            type: "Budget Picks",
            image: "/api/placeholder/400/300",
            author: {
                name: "Emily Parker",
                role: "TV Expert"
            },
            lastUpdated: "4 days ago",
            readTime: "14 min read",
            productsCompared: 15,
            topPicks: [
                "Best Overall: TCL 5-Series",
                "Best Picture: Hisense U6K",
                "Best Value: Vizio M-Series"
            ],
            priceRange: "Under $500"
        }
    ];

    const productComparisons = [
        {
            id: 5,
            title: "MacBook Air vs Pro M3 - Which Should You Buy?",
            category: "Tech & Electronics",
            type: "Product Comparisons",
            image: "/api/placeholder/400/300",
            author: {
                name: "Alex Thompson",
                role: "Tech Editor"
            },
            lastUpdated: "2 days ago",
            readTime: "16 min read",
            comparisonPoints: [
                "Performance benchmarks",
                "Battery life tests",
                "Display quality",
                "Value analysis"
            ],
            verdict: "MacBook Air better for most users"
        }
    ];

    return (
        <PageLayout
            headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
            footerMenuItems={props.data?.footerMenuItems?.nodes || []}
            pageFeaturedImageUrl={null}
            pageTitle="Top Deal Rankings"
            metaRobots="noindex, nofollow"
            generalSettings={
                props.data?.generalSettings as any
            }
        >
            <div className="bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold mb-4">Expert Product Rankings & Reviews</h1>
                            <p className="text-xl text-gray-300">
                                In-depth comparisons and rankings based on hands-on testing
                            </p>
                        </div>

                        {/* Search */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search product rankings and guides..."
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-6 mb-12">
                        {/* Categories */}
                        <div className="flex gap-2 overflow-x-auto">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-4 py-2 rounded-lg whitespace-nowrap ${selectedCategory === category.id
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {category.name}
                                    {category.count && (
                                        <span className="ml-2 text-sm opacity-75">({category.count})</span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Article Types */}
                        <div className="flex gap-2">
                            {articleTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setSelectedType(type.id)}
                                    className={`px-4 py-2 rounded-lg ${selectedType === type.id
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {type.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Featured Articles */}
                    <div className="space-y-8 mb-12">
                        {featuredArticles.map((article) => (
                            <div key={article.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="grid md:grid-cols-2 gap-8 p-6">
                                    {/* Image Side */}
                                    <div className="relative">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-[300px] object-cover rounded-lg"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
                                                Featured Article
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Side */}
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-blue-500">{article.category}</span>
                                                <span className="text-sm text-gray-500">{article.type}</span>
                                            </div>
                                            <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
                                        </div>

                                        {/* Author */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium">{article.author.name}</div>
                                                <div className="text-sm text-gray-500">{article.author.role}</div>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {article.author.reviews} reviews
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                                <div className="text-lg font-bold text-blue-500">
                                                    {article.stats.productsCompared}
                                                </div>
                                                <div className="text-sm text-gray-500">Products Tested</div>
                                            </div>
                                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                                <div className="text-lg font-bold text-blue-500">
                                                    {article.stats.hoursOfTesting}h
                                                </div>
                                                <div className="text-sm text-gray-500">Testing Time</div>
                                            </div>
                                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                                <div className="text-lg font-bold text-blue-500">
                                                    {article.stats.expertScore}
                                                </div>
                                                <div className="text-sm text-gray-500">Expert Score</div>
                                            </div>
                                        </div>

                                        {/* Key Points */}
                                        <div className="grid grid-cols-2 gap-3">
                                            {article.keyPoints.map((point, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2 text-sm text-gray-600"
                                                >
                                                    <Star className="w-4 h-4 text-yellow-400" />
                                                    <span>{point}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Top Picks */}
                                        <div className="space-y-2">
                                            {article.topPicks.map((pick, index) => (
                                                <div key={index} className="text-sm">
                                                    <Award className={`w-4 h-4 inline mr-2 ${index === 0 ? 'text-yellow-400' :
                                                            index === 1 ? 'text-gray-400' :
                                                                'text-bronze-400'
                                                        }`} />
                                                    {pick}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-4 text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {article.lastUpdated}
                                                </div>
                                                <span>{article.readTime}</span>
                                            </div>
                                            <button className="flex items-center gap-1 text-blue-500 hover:text-blue-600">
                                                <span>Read Article</span>
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Latest Articles Grid */}
                    <h2 className="text-2xl font-bold mb-6">Latest Rankings</h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {latestArticles.map((article) => (
                            <div key={article.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="p-6">
                                    <div className="flex gap-6">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-40 h-32 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-blue-500">{article.category}</span>
                                                <span className="text-sm text-gray-500">{article.type}</span>
                                            </div>
                                            <h3 className="font-bold mb-2">{article.title}</h3>
                                            <div className="text-sm text-gray-500 mb-2">
                                                By {article.author.name} • {article.author.role}
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span>{article.lastUpdated}</span>
                                                <span>{article.readTime}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t">
                                        <div className="space-y-2">
                                            {article.topPicks.map((pick, index) => (
                                                <div key={index} className="text-sm">
                                                    <Award className={`w-4 h-4 inline mr-2 ${index === 0 ? 'text-yellow-400' :
                                                            index === 1 ? 'text-gray-400' :
                                                                'text-bronze-400'
                                                        }`} />
                                                    {pick}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between mt-4">
                                            <span className="text-sm text-gray-500">
                                                {article.productsCompared} products compared
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="w-4 h-4 text-green-500" />
                                                <span className="text-sm text-gray-600">{article.priceRange}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Product Comparisons */}
                    <h2 className="text-2xl font-bold mb-6">Head-to-Head Comparisons</h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {productComparisons.map((comparison) => (
                            <div key={comparison.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="p-6">
                                    <div className="flex gap-6">
                                        <img
                                            src={comparison.image}
                                            alt={comparison.title}
                                            className="w-40 h-32 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <div className="text-blue-500 text-sm mb-2">{comparison.category}</div>
                                            <h3 className="font-bold mb-2">{comparison.title}</h3>
                                            <div className="text-sm text-gray-500 mb-4">
                                                By {comparison.author.name} • {comparison.author.role}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t">
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            {comparison.comparisonPoints.map((point, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2 text-sm text-gray-600"
                                                >
                                                    <BarChart className="w-4 h-4 text-blue-500" />
                                                    <span>{point}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-4 text-gray-500">
                                                <span>{comparison.lastUpdated}</span>
                                                <span>{comparison.readTime}</span>
                                            </div>
                                            <div className="text-green-600 font-medium">
                                                Verdict: {comparison.verdict}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Our Testing Process */}
                    <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-4">Our Testing Process</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Every product ranking is based on extensive hands-on testing and expert analysis
                            </p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-8">
                            {[
                                {
                                    icon: <BarChart className="w-6 h-6 text-blue-500" />,
                                    title: "Rigorous Testing",
                                    description: "Each product undergoes 20+ hours of hands-on testing"
                                },
                                {
                                    icon: <Star className="w-6 h-6 text-blue-500" />,
                                    title: "Expert Analysis",
                                    description: "Reviews by certified professionals in each field"
                                },
                                {
                                    icon: <DollarSign className="w-6 h-6 text-blue-500" />,
                                    title: "Value Assessment",
                                    description: "Price analysis and value-for-money ratings"
                                },
                                {
                                    icon: <Clock className="w-6 h-6 text-blue-500" />,
                                    title: "Regular Updates",
                                    description: "Rankings updated monthly with new products"
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

                    {/* Expert Team */}
                    <div className="bg-gray-900 rounded-xl text-white p-8">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Meet Our Expert Team</h2>
                                <p className="text-gray-300 mb-6">
                                    Our rankings come from a team of experts with years of industry experience
                                </p>
                                <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                    View Expert Profiles
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-800 p-4 rounded-xl">
                                    <div className="text-2xl font-bold text-blue-400 mb-2">15+</div>
                                    <div className="text-sm text-gray-400">Product Categories</div>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-xl">
                                    <div className="text-2xl font-bold text-blue-400 mb-2">50+</div>
                                    <div className="text-sm text-gray-400">Expert Writers</div>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-xl">
                                    <div className="text-2xl font-bold text-blue-400 mb-2">1000+</div>
                                    <div className="text-sm text-gray-400">Products Reviewed</div>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-xl">
                                    <div className="text-2xl font-bold text-blue-400 mb-2">98%</div>
                                    <div className="text-sm text-gray-400">Reader Trust Score</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>

    );
};

export default TopDealsPage;