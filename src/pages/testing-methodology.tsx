import React from 'react';
import {
    BarChart,
    CheckCircle,
    Microscope,
    ClipboardCheck,
    Timer,
    Scale,
    Star,
    Shield,
    Settings,
    LineChart,
    TrendingUp,
    Users,
    Clock,
    Award
} from 'lucide-react';
import PageLayout from '@/container/PageLayout';

const TestingMethodologyPage = (props: any) => {
    const testingProcess = [
        {
            phase: "Research & Selection",
            icon: <Microscope className="w-6 h-6 text-blue-500" />,
            description: "Comprehensive market analysis and product selection",
            steps: [
                "Market research & trend analysis",
                "Product selection criteria",
                "Sample acquisition process",
                "Testing parameter definition"
            ],
            timeframe: "1-2 weeks",
            keyMetrics: [
                "Market coverage rate",
                "Selection criteria score",
                "Research depth index"
            ]
        },
        {
            phase: "Testing & Evaluation",
            icon: <ClipboardCheck className="w-6 h-6 text-blue-500" />,
            description: "Rigorous testing under controlled conditions",
            steps: [
                "Standardized testing protocols",
                "Performance benchmarking",
                "Durability testing",
                "Real-world usage scenarios"
            ],
            timeframe: "2-4 weeks",
            keyMetrics: [
                "Performance scores",
                "Reliability ratings",
                "Consistency measures"
            ]
        },
        {
            phase: "Data Analysis",
            icon: <BarChart className="w-6 h-6 text-blue-500" />,
            description: "Comprehensive data analysis and scoring",
            steps: [
                "Data compilation & validation",
                "Statistical analysis",
                "Comparative assessment",
                "Score calculation"
            ],
            timeframe: "1-2 weeks",
            keyMetrics: [
                "Statistical confidence",
                "Data validity score",
                "Comparative index"
            ]
        },
        {
            phase: "Expert Review",
            icon: <Star className="w-6 h-6 text-blue-500" />,
            description: "Expert evaluation and validation",
            steps: [
                "Expert panel review",
                "Findings validation",
                "Recommendation formulation",
                "Final scoring"
            ],
            timeframe: "1 week",
            keyMetrics: [
                "Expert consensus rate",
                "Validation score",
                "Recommendation confidence"
            ]
        }
    ];

    const testingFacilities = [
        {
            name: "Performance Lab",
            equipment: [
                "Specialized testing equipment",
                "Performance measurement tools",
                "Calibrated instruments",
                "Environmental controls"
            ],
            capabilities: [
                "Precision measurements",
                "Controlled testing environments",
                "Automated testing sequences"
            ]
        },
        {
            name: "Durability Testing",
            equipment: [
                "Stress testing machines",
                "Environmental chambers",
                "Impact testing equipment",
                "Longevity simulation tools"
            ],
            capabilities: [
                "Accelerated wear testing",
                "Environmental stress testing",
                "Long-term reliability assessment"
            ]
        },
        {
            name: "User Experience Lab",
            equipment: [
                "Usage simulation setup",
                "Recording equipment",
                "Analysis software",
                "User feedback tools"
            ],
            capabilities: [
                "Real-world usage simulation",
                "User interaction analysis",
                "Ergonomic assessment"
            ]
        }
    ];

    const scoringCriteria = [
        {
            category: "Performance",
            weight: 30,
            factors: [
                "Speed and efficiency",
                "Feature effectiveness",
                "Reliability measures",
                "Technical capabilities"
            ],
            metrics: [
                "Benchmark scores",
                "Performance ratios",
                "Efficiency ratings"
            ]
        },
        {
            category: "Build Quality",
            weight: 25,
            factors: [
                "Material quality",
                "Construction integrity",
                "Durability tests",
                "Finish quality"
            ],
            metrics: [
                "Material grades",
                "Stress test results",
                "Longevity projections"
            ]
        },
        {
            category: "User Experience",
            weight: 25,
            factors: [
                "Ease of use",
                "Interface design",
                "Setup process",
                "Daily usability"
            ],
            metrics: [
                "User satisfaction scores",
                "Task completion rates",
                "Learning curve measures"
            ]
        },
        {
            category: "Value",
            weight: 20,
            factors: [
                "Price-to-performance ratio",
                "Market positioning",
                "Feature set value",
                "Long-term value"
            ],
            metrics: [
                "Value index",
                "Cost efficiency ratio",
                "Feature-price analysis"
            ]
        }
    ];

    return (
        <PageLayout
            headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
            footerMenuItems={props.data?.footerMenuItems?.nodes || []}
            pageFeaturedImageUrl={null}
            pageTitle="Testing Methodology"
            metaRobots="noindex, nofollow"
            generalSettings={
                props.data?.generalSettings as any
            }
        >
            <div className="bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold mb-4">Testing & Methodology</h1>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                Our comprehensive approach to product testing and evaluation ensures accurate,
                                unbiased, and reliable recommendations.
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-4 gap-6 mt-12">
                            {[
                                { value: "15+", label: "Testing Facilities" },
                                { value: "50+", label: "Expert Testers" },
                                { value: "1000+", label: "Products Tested" },
                                { value: "98%", label: "Accuracy Rate" }
                            ].map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl font-bold text-blue-400">{stat.value}</div>
                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Testing Process */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-8">Our Testing Process</h2>
                        <div className="space-y-8">
                            {testingProcess.map((phase, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                                    <div className="grid md:grid-cols-4 gap-8">
                                        {/* Phase Info */}
                                        <div>
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-2 bg-blue-50 rounded-lg">
                                                    {phase.icon}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold">{phase.phase}</h3>
                                                    <span className="text-sm text-gray-500">{phase.timeframe}</span>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-sm">{phase.description}</p>
                                        </div>

                                        {/* Steps */}
                                        <div>
                                            <h4 className="font-medium mb-3">Process Steps</h4>
                                            <ul className="space-y-2">
                                                {phase.steps.map((step, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                                        <span>{step}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Key Metrics */}
                                        <div className="col-span-2">
                                            <h4 className="font-medium mb-3">Key Metrics</h4>
                                            <div className="grid grid-cols-3 gap-4">
                                                {phase.keyMetrics.map((metric, idx) => (
                                                    <div key={idx} className="bg-gray-50 rounded-lg p-3 text-center">
                                                        <div className="text-sm text-gray-600">{metric}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Testing Facilities */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-8">Testing Facilities</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {testingFacilities.map((facility, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                                    <h3 className="font-bold mb-4">{facility.name}</h3>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-medium text-sm mb-2">Equipment</h4>
                                            <ul className="space-y-2">
                                                {facility.equipment.map((item, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Settings className="w-4 h-4 text-blue-500" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="font-medium text-sm mb-2">Capabilities</h4>
                                            <ul className="space-y-2">
                                                {facility.capabilities.map((capability, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                                        <span>{capability}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Scoring Criteria */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-8">Scoring Criteria</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {scoringCriteria.map((criteria, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold">{criteria.category}</h3>
                                        <span className="text-sm bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                                            Weight: {criteria.weight}%
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-medium text-sm mb-2">Evaluation Factors</h4>
                                            <ul className="space-y-2">
                                                {criteria.factors.map((factor, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                                        <span>{factor}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="font-medium text-sm mb-2">Key Metrics</h4>
                                            <ul className="space-y-2">
                                                {criteria.metrics.map((metric, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                                        <LineChart className="w-4 h-4 text-blue-500" />
                                                        <span>{metric}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Quality Assurance */}
                    <section className="bg-white rounded-xl shadow-sm p-8 mb-16">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Quality Assurance</h2>
                                <p className="text-gray-600 mb-6">
                                    Our rigorous quality assurance process ensures the accuracy and reliability
                                    of our testing results and recommendations.
                                </p>

                                <div className="space-y-4">
                                    {[
                                        "Multiple testing iterations",
                                        "Cross-validation by different experts",
                                        "Standardized testing protocols",
                                        "Regular equipment calibration",
                                        "Peer review process"
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <Shield className="w-5 h-5 text-blue-500" />
                                            <span className="text-gray-600">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    {
                                        title: "Testing Accuracy",
                                        value: "99.8%",
                                        icon: <TrendingUp className="w-6 h-6" />
                                    },
                                    {
                                        title: "Expert Reviews",
                                        value: "100%",
                                        icon: <Users className="w-6 h-6" />
                                    },
                                    {
                                        title: "Update Frequency",
                                        value: "Monthly",
                                        icon: <Clock className="w-6 h-6" />
                                    },
                                    {
                                        title: "Certification",
                                        value: "ISO 9001",
                                        icon: <Award className="w-6 h-6" />
                                    }
                                ].map((stat, index) => (
                                    <div key={index} className="bg-gray-50 rounded-xl p-4">
                                        <div className="text-blue-500 mb-2">{stat.icon}</div>
                                        <div className="text-2xl font-bold">{stat.value}</div>
                                        <div className="text-sm text-gray-600">{stat.title}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </PageLayout>
    );
};

export default TestingMethodologyPage;