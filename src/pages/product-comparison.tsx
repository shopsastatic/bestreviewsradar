import React from 'react';
import {
    BarChart,
    ThumbsUp,
    ThumbsDown,
    Star,
    CheckCircle,
    XCircle,
    Award,
    DollarSign,
    Battery,
    Zap,
    Settings,
    ArrowRight
} from 'lucide-react';
import PageLayout from '@/container/PageLayout';

const ProductComparisonPage = (props: any) => {
    const comparisonCategories = [
        {
            title: "Flagship Smartphones 2024",
            type: "Head-to-Head",
            products: [
                {
                    name: "iPhone 15 Pro Max",
                    brand: "Apple",
                    image: "/api/placeholder/300/300",
                    price: 1199,
                    rating: 4.8,
                    score: 94,
                    bestFor: "Overall Performance",
                    pros: [
                        "Superior camera system",
                        "Best-in-class performance",
                        "Premium build quality"
                    ],
                    cons: [
                        "High price",
                        "Limited customization"
                    ]
                },
                {
                    name: "Samsung S24 Ultra",
                    brand: "Samsung",
                    image: "/api/placeholder/300/300",
                    price: 1299,
                    rating: 4.7,
                    score: 92,
                    bestFor: "Feature Set",
                    pros: [
                        "Versatile camera setup",
                        "S-Pen functionality",
                        "Large display"
                    ],
                    cons: [
                        "Premium pricing",
                        "Large form factor"
                    ]
                }
            ],
            comparisonPoints: [
                {
                    category: "Performance",
                    metrics: [
                        {
                            name: "CPU Benchmark",
                            scores: [
                                { value: 95, details: "A17 Pro" },
                                { value: 92, details: "Snapdragon 8 Gen 3" }
                            ]
                        },
                        {
                            name: "GPU Performance",
                            scores: [
                                { value: 94, details: "Strong gaming" },
                                { value: 96, details: "Best-in-class" }
                            ]
                        },
                        {
                            name: "RAM Management",
                            scores: [
                                { value: 90, details: "8GB" },
                                { value: 95, details: "12GB" }
                            ]
                        }
                    ]
                },
                {
                    category: "Camera",
                    metrics: [
                        {
                            name: "Main Sensor",
                            scores: [
                                { value: 96, details: "48MP" },
                                { value: 94, details: "200MP" }
                            ]
                        },
                        {
                            name: "Zoom Capability",
                            scores: [
                                { value: 88, details: "5x optical" },
                                { value: 92, details: "10x optical" }
                            ]
                        },
                        {
                            name: "Night Mode",
                            scores: [
                                { value: 95, details: "Excellent" },
                                { value: 94, details: "Very good" }
                            ]
                        }
                    ]
                },
                {
                    category: "Battery & Charging",
                    metrics: [
                        {
                            name: "Battery Life",
                            scores: [
                                { value: 88, details: "4441mAh" },
                                { value: 92, details: "5000mAh" }
                            ]
                        },
                        {
                            name: "Charging Speed",
                            scores: [
                                { value: 85, details: "20W" },
                                { value: 92, details: "45W" }
                            ]
                        }
                    ]
                }
            ],
            valueVerdict: {
                overall: "Both phones represent the pinnacle of smartphone technology in 2024",
                recommendation: "iPhone 15 Pro Max is better for iOS users and photography enthusiasts, while S24 Ultra excels for Android power users and those who want the S-Pen functionality.",
                priceAnalysis: "The price difference is minimal, making the choice more about ecosystem preference than value."
            }
        }
    ];

    return (
        <PageLayout
            headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
            footerMenuItems={props.data?.footerMenuItems?.nodes || []}
            pageFeaturedImageUrl={null}
            pageTitle="Product Comparison"
            metaRobots="noindex, nofollow"
            generalSettings={
                props.data?.generalSettings as any
            }
        >
            <div className="bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <h1 className="text-4xl font-bold mb-4">Flagship Smartphone Comparison</h1>
                        <p className="text-xl text-gray-300">
                            Detailed head-to-head comparison with expert analysis
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Product Overview Cards */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        {comparisonCategories[0].products.map((product, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="p-6">
                                    {/* Product Header */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <span className="text-sm text-gray-500">{product.brand}</span>
                                            <h2 className="text-2xl font-bold">{product.name}</h2>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                            <span className="font-bold">{product.rating}</span>
                                        </div>
                                    </div>

                                    {/* Product Image */}
                                    <div className="relative mb-6">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-64 object-cover rounded-lg"
                                        />
                                        <div className="absolute top-4 right-4">
                                            <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                                                Score: {product.score}/100
                                            </div>
                                        </div>
                                    </div>

                                    {/* Best For */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <Award className="w-5 h-5 text-blue-500" />
                                        <span className="font-medium">Best for: {product.bestFor}</span>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center gap-2 mb-6">
                                        <DollarSign className="w-5 h-5 text-green-500" />
                                        <span className="text-2xl font-bold">${product.price}</span>
                                    </div>

                                    {/* Pros & Cons */}
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-medium mb-2">Pros</h3>
                                            <ul className="space-y-2">
                                                {product.pros.map((pro, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-gray-600">
                                                        <ThumbsUp className="w-4 h-4 text-green-500" />
                                                        <span>{pro}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-medium mb-2">Cons</h3>
                                            <ul className="space-y-2">
                                                {product.cons.map((con, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-gray-600">
                                                        <ThumbsDown className="w-4 h-4 text-red-500" />
                                                        <span>{con}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Detailed Comparison */}
                    <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
                        <h2 className="text-2xl font-bold mb-8">Detailed Comparison</h2>

                        {comparisonCategories[0].comparisonPoints.map((point, index) => (
                            <div key={index} className="mb-8">
                                <h3 className="font-bold text-lg mb-4">{point.category}</h3>

                                <div className="space-y-6">
                                    {point.metrics.map((metric, idx) => (
                                        <div key={idx} className="bg-gray-50 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-medium">{metric.name}</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                {metric.scores.map((score, scoreIdx) => (
                                                    <div key={scoreIdx}>
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-sm text-gray-600">{score.details}</span>
                                                            <span className="font-medium">{score.value}/100</span>
                                                        </div>
                                                        <div className="h-2 bg-gray-200 rounded-full">
                                                            <div
                                                                className="h-2 bg-blue-500 rounded-full"
                                                                style={{ width: `${score.value}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Value Verdict */}
                    <div className="bg-gray-900 text-white rounded-xl p-8 mb-12">
                        <h2 className="text-2xl font-bold mb-6">Value Verdict</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-medium mb-2">Overall Analysis</h3>
                                <p className="text-gray-300">
                                    {comparisonCategories[0].valueVerdict.overall}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">Recommendation</h3>
                                <p className="text-gray-300">
                                    {comparisonCategories[0].valueVerdict.recommendation}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">Price Analysis</h3>
                                <p className="text-gray-300">
                                    {comparisonCategories[0].valueVerdict.priceAnalysis}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Testing Methodology */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Performance Testing",
                                icon: <Zap className="w-6 h-6 text-blue-500" />,
                                points: [
                                    "Benchmark scores",
                                    "Real-world performance",
                                    "Stress testing"
                                ]
                            },
                            {
                                title: "Battery Analysis",
                                icon: <Battery className="w-6 h-6 text-blue-500" />,
                                points: [
                                    "Battery life tests",
                                    "Charging speed",
                                    "Power efficiency"
                                ]
                            },
                            {
                                title: "Feature Comparison",
                                icon: <Settings className="w-6 h-6 text-blue-500" />,
                                points: [
                                    "Feature set analysis",
                                    "Ecosystem comparison",
                                    "Software evaluation"
                                ]
                            }
                        ].map((section, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        {section.icon}
                                    </div>
                                    <h3 className="font-bold">{section.title}</h3>
                                </div>
                                <ul className="space-y-2">
                                    {section.points.map((point, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-gray-600">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            <span>{point}</span>
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

export default ProductComparisonPage;