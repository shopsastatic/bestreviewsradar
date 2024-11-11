import React, { useState } from 'react';
import {
    Search,
    Filter,
    Book,
    DollarSign,
    Star,
    Clock,
    ChevronRight,
    CheckCircle,
    AlertCircle,
    BarChart,
    Eye,
    ThumbsUp
} from 'lucide-react';
import PageLayout from '@/container/PageLayout';

const BuyersGuidePage = (props: any) => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'All Guides' },
        { id: 'tech', name: 'Tech & Electronics', count: 45 },
        { id: 'home', name: 'Home & Kitchen', count: 32 },
        { id: 'audio', name: 'Audio & Headphones', count: 28 },
        { id: 'smart-home', name: 'Smart Home', count: 24 }
    ];

    const featuredGuides = [
        {
            id: 1,
            title: "How to Choose the Perfect 4K TV - Complete Guide",
            category: "Tech & Electronics",
            image: "/api/placeholder/800/400",
            author: {
                name: "David Wilson",
                role: "TV & Display Expert",
                guides: "45+"
            },
            lastUpdated: "2 days ago",
            readTime: "18 min read",
            views: "125K",
            keyTopics: [
                "Display Technology Types",
                "Size Selection Guide",
                "HDR Formats Explained",
                "Smart Features Comparison"
            ],
            priceRanges: [
                {
                    range: "Budget ($300-$500)",
                    recommendation: "TCL 5-Series",
                    features: ["4K Resolution", "Basic HDR", "Smart Features"]
                },
                {
                    range: "Mid-Range ($500-$1000)",
                    recommendation: "Samsung Q60B",
                    features: ["QLED", "Enhanced HDR", "Gaming Features"]
                },
                {
                    range: "Premium ($1000+)",
                    recommendation: "LG C3 OLED",
                    features: ["OLED", "Premium HDR", "Advanced Gaming"]
                }
            ],
            considerations: [
                "Room Lighting",
                "Viewing Distance",
                "Use Case (Movies/Gaming)",
                "Sound System Integration"
            ]
        },
        {
            id: 2,
            title: "Robot Vacuum Buying Guide 2024",
            category: "Home & Kitchen",
            image: "/api/placeholder/800/400",
            author: {
                name: "Sarah Johnson",
                role: "Smart Home Expert",
                guides: "38+"
            },
            lastUpdated: "3 days ago",
            readTime: "15 min read",
            views: "98K",
            keyTopics: [
                "Navigation Technologies",
                "Suction Power Guide",
                "Smart Features Overview",
                "Maintenance Requirements"
            ],
            priceRanges: [
                {
                    range: "Entry Level ($200-$400)",
                    recommendation: "Eufy RoboVac",
                    features: ["Basic Navigation", "Good Suction", "App Control"]
                },
                {
                    range: "Mid-Range ($400-$700)",
                    recommendation: "Roborock Q5+",
                    features: ["LIDAR Navigation", "Auto-Empty", "Advanced Mapping"]
                },
                {
                    range: "High-End ($700+)",
                    recommendation: "Roomba j9+",
                    features: ["AI Navigation", "Auto-Empty", "Advanced Features"]
                }
            ],
            considerations: [
                "Floor Type Analysis",
                "Home Layout",
                "Pet Considerations",
                "Maintenance Costs"
            ]
        }
    ];

    const latestGuides = [
        {
            id: 3,
            title: "Wireless Earbuds Buying Guide",
            category: "Audio & Headphones",
            image: "/api/placeholder/400/300",
            author: {
                name: "Michael Chen",
                role: "Audio Expert"
            },
            lastUpdated: "4 days ago",
            readTime: "14 min read",
            keyPoints: [
                "Sound Quality Factors",
                "Battery Life Guide",
                "Fit & Comfort Tips",
                "Feature Comparison"
            ],
            priceGuide: "Budget ($50-$300)"
        },
        {
            id: 4,
            title: "Smart Home Hub Selection Guide",
            category: "Smart Home",
            image: "/api/placeholder/400/300",
            author: {
                name: "Emily Parker",
                role: "IoT Expert"
            },
            lastUpdated: "5 days ago",
            readTime: "16 min read",
            keyPoints: [
                "Ecosystem Compatibility",
                "Device Support",
                "Privacy Features",
                "Setup Process"
            ],
            priceGuide: "Mid-Range ($50-$200)"
        }
    ];

    const buyingTips = [
        {
            id: 1,
            title: "Understanding Price History",
            description: "How to track prices and find the best time to buy",
            topics: ["Price Tracking Tools", "Seasonal Trends", "Deal Alerts"]
        },
        {
            id: 2,
            title: "Feature vs Price Analysis",
            description: "Balancing features with budget constraints",
            topics: ["Essential Features", "Premium Features", "Value Assessment"]
        },
        {
            id: 3,
            title: "Warranty & Support",
            description: "What to look for in product support",
            topics: ["Warranty Types", "Support Quality", "Return Policies"]
        }
    ];

    return (
        <PageLayout
            headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
            footerMenuItems={props.data?.footerMenuItems?.nodes || []}
            pageFeaturedImageUrl={null}
            pageTitle="Buyers Guide"
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
                            <h1 className="text-4xl font-bold mb-4">Complete Buyer's Guides</h1>
                            <p className="text-xl text-gray-300">
                                Expert advice to help you make informed purchasing decisions
                            </p>
                        </div>

                        {/* Search */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search buyer's guides..."
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Categories */}
                    <div className="flex gap-4 mb-12 overflow-x-auto pb-2">
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
                                            <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
                                                Featured Guide
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Side */}
                                    <div className="space-y-6">
                                        <div>
                                            <div className="text-blue-500 mb-2">{guide.category}</div>
                                            <h2 className="text-2xl font-bold mb-2">{guide.title}</h2>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <div>By {guide.author.name}</div>
                                                <div>{guide.author.role}</div>
                                                <div>{guide.author.guides} guides</div>
                                            </div>
                                        </div>

                                        {/* Key Topics */}
                                        <div>
                                            <h3 className="font-medium mb-3">What You'll Learn</h3>
                                            <div className="grid grid-cols-2 gap-3">
                                                {guide.keyTopics.map((topic, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-2 text-sm text-gray-600"
                                                    >
                                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                                        <span>{topic}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Price Ranges */}
                                        <div>
                                            <h3 className="font-medium mb-3">Price Guide</h3>
                                            <div className="space-y-3">
                                                {guide.priceRanges.map((price, index) => (
                                                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="font-medium">{price.range}</span>
                                                            <span className="text-sm text-blue-500">
                                                                {price.recommendation}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {price.features.map((feature, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="text-xs text-gray-600 bg-gray-200 px-2 py-1 rounded-full"
                                                                >
                                                                    {feature}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-4 text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {guide.lastUpdated}
                                                </div>
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

                    {/* Latest Guides Grid */}
                    <h2 className="text-2xl font-bold mb-6">Latest Buying Guides</h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {latestGuides.map((guide) => (
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
                                            <h3 className="font-bold mb-2">{guide.title}</h3>
                                            <div className="text-sm text-gray-500 mb-4">
                                                By {guide.author.name} • {guide.author.role}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t">
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            {guide.keyPoints.map((point, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2 text-sm text-gray-600"
                                                >
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                    <span>{point}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-4 text-gray-500">
                                                <span>{guide.lastUpdated}</span>
                                                <span>{guide.readTime}</span>
                                            </div>
                                            <span className="text-blue-500">{guide.priceGuide}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Buying Tips */}
                    <h2 className="text-2xl font-bold mb-6">Essential Buying Tips</h2>
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {buyingTips.map((tip) => (
                            <div key={tip.id} className="bg-white rounded-xl shadow-sm p-6">
                                <h3 className="font-bold mb-3">{tip.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{tip.description}</p>
                                <div className="space-y-2">
                                    {tip.topics.map((topic, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 text-sm text-gray-600"
                                        >
                                            <ChevronRight className="w-4 h-4 text-blue-500" />
                                            <span>{topic}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Research Process */}
                    <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-4">Our Research Process</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                How we create comprehensive and unbiased buying guides
                            </p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-8">
                            {[
                                {
                                    icon: <BarChart className="w-6 h-6 text-blue-500" />,
                                    title: "Market Analysis",
                                    description: "Research all available options in the market"
                                },
                                {
                                    icon: <Star className="w-6 h-6 text-blue-500" />,
                                    title: "Expert Testing",
                                    description: "Hands-on testing of key products"
                                },
                                {
                                    icon: <DollarSign className="w-6 h-6 text-blue-500" />,
                                    title: "Price Research",
                                    description: "Analysis of price-to-feature ratio"
                                },
                                {
                                    icon: <ThumbsUp className="w-6 h-6 text-blue-500" />,
                                    title: "User Feedback",
                                    description: "Real-world user experience analysis"
                                }
                            ].map((step, index) => (
                                <div key={index} className="text-center">
                                    <div className="inline-flex p-3 bg-blue-50 rounded-xl mb-4">
                                        {step.icon}
                                    </div>
                                    <h3 className="font-bold mb-2">{step.title}</h3>
                                    <p className="text-sm text-gray-600">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Expert Tips Section */}
                    <div className="bg-gray-900 rounded-xl text-white p-8 mb-12">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Get Personalized Buying Advice</h2>
                                <p className="text-gray-300 mb-6">
                                    Not sure which product is right for you? Our experts can help you make the best choice for your needs and budget.
                                </p>
                                <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                    Ask Our Experts
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-800 p-4 rounded-xl">
                                    <div className="text-2xl font-bold text-blue-400 mb-2">50+</div>
                                    <div className="text-sm text-gray-400">Expert Writers</div>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-xl">
                                    <div className="text-2xl font-bold text-blue-400 mb-2">24/7</div>
                                    <div className="text-sm text-gray-400">Expert Support</div>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-xl">
                                    <div className="text-2xl font-bold text-blue-400 mb-2">100+</div>
                                    <div className="text-sm text-gray-400">Categories Covered</div>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-xl">
                                    <div className="text-2xl font-bold text-blue-400 mb-2">98%</div>
                                    <div className="text-sm text-gray-400">Satisfaction Rate</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Resources */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Price History Tools",
                                description: "Track prices and find the best time to buy",
                                links: [
                                    "Price tracking basics",
                                    "Setting price alerts",
                                    "Understanding price patterns"
                                ]
                            },
                            {
                                title: "Comparison Tools",
                                description: "Easy ways to compare products side by side",
                                links: [
                                    "Feature comparison",
                                    "Price comparison",
                                    "Brand comparison"
                                ]
                            },
                            {
                                title: "Buying Checklists",
                                description: "Essential factors to consider before buying",
                                links: [
                                    "Pre-purchase checklist",
                                    "Warranty guide",
                                    "Return policy guide"
                                ]
                            }
                        ].map((resource, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                                <h3 className="font-bold mb-3">{resource.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                                <ul className="space-y-2">
                                    {resource.links.map((link, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm">
                                            <ChevronRight className="w-4 h-4 text-blue-500" />
                                            <a href="#" className="text-blue-500 hover:text-blue-600">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default BuyersGuidePage;