import React, { useState } from 'react';
import { 
  Star, 
  Clock, 
  TrendingUp,
  Filter,
  Search,
  Award,
  DollarSign,
  ThumbsUp,
  Eye,
  BarChart,
  ChevronRight
} from 'lucide-react';

const TopRankingsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'tech', name: 'Tech & Electronics', count: 45 },
    { id: 'home', name: 'Home & Kitchen', count: 38 },
    { id: 'audio', name: 'Audio & Headphones', count: 32 },
    { id: 'smart-home', name: 'Smart Home', count: 28 }
  ];

  const priceRanges = [
    'Under $100',
    'Under $200',
    '$200 - $500',
    '$500+'
  ];

  const featuredArticles = [
    {
      id: 1,
      title: "Best Robot Vacuums for Carpets 2024",
      subtitle: "Expert Tested & Ranked",
      category: "Home & Kitchen",
      image: "/api/placeholder/800/400",
      author: {
        name: "Sarah Johnson",
        role: "Home Tech Expert"
      },
      stats: {
        productsCompared: 28,
        hoursTestingTime: 120,
        expertScore: 92
      },
      lastUpdated: "2 days ago",
      readTime: "15 min read",
      views: "125K",
      highlights: [
        "In-depth carpet cleaning tests",
        "Battery life comparison",
        "Noise level analysis",
        "Smart features evaluation"
      ],
      priceRange: "$200 - $800",
      topPick: "Roomba j7+",
      bestValue: "Roborock Q5+"
    },
    {
      id: 2,
      title: "Best Wireless Earbuds 2024",
      subtitle: "Top 10 Expert Picks",
      category: "Audio & Headphones",
      image: "/api/placeholder/800/400",
      author: {
        name: "Michael Chen",
        role: "Audio Expert"
      },
      stats: {
        productsCompared: 35,
        hoursTestingTime: 150,
        expertScore: 95
      },
      lastUpdated: "1 week ago",
      readTime: "18 min read",
      views: "180K",
      highlights: [
        "Sound quality tests",
        "ANC performance",
        "Battery life tests",
        "Comfort evaluation"
      ],
      priceRange: "$100 - $400",
      topPick: "Sony WF-1000XM5",
      bestValue: "Jabra Elite 5"
    }
  ];

  const topArticles = [
    {
      id: 3,
      title: "Best Budget 4K TVs Under $500",
      category: "Tech & Electronics",
      image: "/api/placeholder/400/300",
      lastUpdated: "3 days ago",
      readTime: "12 min read",
      productsCompared: 15,
      priceRange: "Under $500",
      topPick: "TCL 5-Series"
    },
    {
      id: 4,
      title: "Top Smart Home Security Systems",
      category: "Smart Home",
      image: "/api/placeholder/400/300",
      lastUpdated: "1 week ago",
      readTime: "14 min read",
      productsCompared: 12,
      priceRange: "$100 - $500",
      topPick: "Ring Alarm Pro"
    }
  ];

  const budgetGuides = [
    {
      id: 5,
      title: "Wireless Earbuds Under $100",
      category: "Audio & Headphones",
      image: "/api/placeholder/400/300",
      lastUpdated: "5 days ago",
      readTime: "10 min read",
      productsCompared: 18,
      priceRange: "Under $100",
      topPick: "SoundPEATS Air3"
    },
    {
      id: 6,
      title: "Best Coffee Makers Under $200",
      category: "Home & Kitchen",
      image: "/api/placeholder/400/300",
      lastUpdated: "1 week ago",
      readTime: "11 min read",
      productsCompared: 14,
      priceRange: "Under $200",
      topPick: "Ninja CE251"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold mb-4">Expert Product Rankings & Guides</h1>
          <p className="text-xl text-gray-300 mb-8">
            In-depth comparisons and rankings based on hands-on testing and expert analysis
          </p>

          {/* Search & Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search product rankings and guides..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories & Price Ranges */}
        <div className="flex flex-wrap gap-4 mb-12">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  selectedCategory === category.id
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
          <div className="flex gap-2">
            {priceRanges.map((range, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50"
              >
                {range}
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
                      Featured Guide
                    </span>
                  </div>
                </div>

                {/* Content Side */}
                <div className="space-y-6">
                  <div>
                    <div className="text-blue-500 mb-2">{article.category}</div>
                    <h2 className="text-2xl font-bold mb-1">{article.title}</h2>
                    <div className="text-lg text-gray-600">{article.subtitle}</div>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="font-medium">{article.author.name}</div>
                      <div className="text-sm text-gray-500">{article.author.role}</div>
                    </div>
                  </div>

                  {/* Testing Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-500">
                        {article.stats.productsCompared}
                      </div>
                      <div className="text-sm text-gray-500">Products Tested</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-500">
                        {article.stats.hoursTestingTime}h
                      </div>
                      <div className="text-sm text-gray-500">Testing Time</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-500">
                        {article.stats.expertScore}/100
                      </div>
                      <div className="text-sm text-gray-500">Expert Score</div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="grid grid-cols-2 gap-3">
                    {article.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <ThumbsUp className="w-4 h-4 text-blue-500" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price Range & Top Picks */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {article.priceRange}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-yellow-500" />
                        Top Pick: {article.topPick}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {article.views} views
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{article.lastUpdated}</span>
                      <span>{article.readTime}</span>
                    </div>
                    <button className="flex items-center gap-1 text-blue-500 hover:text-blue-600">
                      <span>Read Full Guide</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Top Articles Grid */}
        <h2 className="text-2xl font-bold mb-6">Popular Rankings</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {topArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-start gap-6">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-40 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="text-blue-500 text-sm mb-2">{article.category}</div>
                    <h3 className="font-bold mb-3">{article.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span>{article.lastUpdated}</span>
                      <span>{article.readTime}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <BarChart className="w-4 h-4" />
                        {article.productsCompared} Products
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {article.topPick}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Budget Guides */}
        <h2 className="text-2xl font-bold mb-6">Budget-Friendly Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {budgetGuides.map((article) => (
            <div key={article.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-start gap-6">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-40 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="text-blue-500 text-sm mb-2">{article.category}</div>
                    <h3 className="font-bold mb-3">{article.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span>{article.lastUpdated}</span>
                      <span>{article.readTime}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        {article.priceRange}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-yellow-500" />
                        Best Pick: {article.topPick}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Our Testing Methodology */}
        <div className="mt-16 bg-white rounded-xl shadow-sm p-8">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Testing Methodology</h2>
            <p className="text-gray-600">
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
                icon: <ThumbsUp className="w-6 h-6 text-blue-500" />,
                title: "Expert Analysis",
                description: "Reviews by certified professionals in each field"
              },
              {
                icon: <Eye className="w-6 h-6 text-blue-500" />,
                title: "Real-World Use",
                description: "Products tested in real-life scenarios"
              },
              {
                icon: <TrendingUp className="w-6 h-6 text-blue-500" />,
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

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Performance Tests",
                items: [
                  "Benchmark testing",
                  "Stress testing",
                  "Durability checks",
                  "Battery life tests"
                ]
              },
              {
                title: "User Experience",
                items: [
                  "Ease of use",
                  "Setup process",
                  "Feature evaluation",
                  "Design assessment"
                ]
              },
              {
                title: "Value Analysis",
                items: [
                  "Price comparison",
                  "Feature-to-price ratio",
                  "Long-term value",
                  "Market positioning"
                ]
              }
            ].map((section, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-bold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        {/* Email Signup */}
        <div className="mt-16 bg-gray-900 rounded-xl text-white p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Get Expert Rankings In Your Inbox</h2>
              <p className="text-gray-300 mb-6">
                Receive our latest product rankings and buying guides straight to your inbox.
              </p>
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-blue-400" />
                <div className="text-sm">
                  <div className="font-medium">Expert Reviews</div>
                  <div className="text-gray-400">In-depth analysis from professionals</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <div className="text-sm">
                  <div className="font-medium">Latest Rankings</div>
                  <div className="text-gray-400">Updated product recommendations</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-blue-400" />
                <div className="text-sm">
                  <div className="font-medium">Deal Alerts</div>
                  <div className="text-gray-400">Price drops on top-rated products</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRankingsPage;