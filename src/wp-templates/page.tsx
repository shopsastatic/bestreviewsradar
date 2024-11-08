export const runtime = "edge"
import { gql } from "@/__generated__";
import React, { useState } from 'react';
import {
  Search, ChevronRight, Star, Award, Clock, ThumbsUp, TrendingUp, ArrowRight,
  Shield, Database, BarChart2, Users, LineChart, Target, CheckCircle, Newspaper, Calendar, BookOpen, Linkedin, Twitter, Mail,
  Lightbulb, Tag, Eye,
  Smartphone,
  Laptop,
  Camera,
  Headphones,
  Tv,
  HomeIcon,
  Settings,
  Speaker,
  ArrowLeft
} from 'lucide-react';
import EntryHeader from "../components/entry-header";
import {
  GetPageQuery,
  NcgeneralSettingsFieldsFragmentFragment,
} from "../__generated__/graphql";
import { FaustTemplate, flatListToHierarchical } from "@faustwp/core";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import PageLayout from "@/container/PageLayout";
import MyWordPressBlockViewer from "@/components/MyWordPressBlockViewer";
import Link from "next/link";

const Page: FaustTemplate<GetPageQuery> = (props: any) => {
  const [activeStep, setActiveStep] = useState('research');
  const [activeTab, setActiveTab] = useState('popular');
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [activeView, setActiveView] = useState('trending');
  if (props.loading) {
    return <>Loading...</>;
  }

  // for this page
  const { title, editorBlocks, featuredImage } =
    props.data?.page as any || {};

  const isGutenbergPage =
    !!props.__SEED_NODE__?.isFrontPage || "";

  const blocks = flatListToHierarchical(editorBlocks as any, {
    idKey: "clientId",
    parentKey: "parentClientId",
  });

  if (props.__SEED_NODE__?.isFrontPage) {
    const title = "Homepage";
    const categories = [
      { name: 'Technology', href: '#', icon: <Star size={14} /> },
      { name: 'Home & Living', href: '#', icon: <Award size={14} /> },
      { name: 'Health', href: '#', icon: <ThumbsUp size={14} /> },
      { name: 'Sports', href: '#', icon: <Clock size={14} /> }
    ];

    const comparisons = [
      {
        id: 1,
        title: 'Best Gaming Laptops 2024',
        description: 'In-depth comparison of top gaming laptops, featuring the latest GPUs and processors',
        image: 'https://images.unsplash.com/photo-1684127987312-43455fd95925?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Technology',
        trending: true,
        metrics: {
          reviews: '250+',
          updated: 'Weekly',
          score: '9.8/10'
        }
      },
      {
        id: 2,
        title: 'Smart Home Security',
        description: 'Compare leading home security systems with AI-powered features',
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Home & Living',
        featured: true,
        metrics: {
          reviews: '180+',
          updated: 'Monthly',
          score: '9.5/10'
        }
      },
      {
        id: 3,
        title: 'Premium Headphones',
        description: 'Expert analysis of noise-cancelling and sound quality performance',
        image: 'https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Technology',
        metrics: {
          reviews: '150+',
          updated: 'Weekly',
          score: '9.3/10'
        }
      },
      {
        id: 4,
        title: 'Fitness Trackers',
        description: 'Comprehensive guide to the latest health monitoring devices',
        image: 'https://plus.unsplash.com/premium_photo-1681433386259-1ea114ca923d?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Health',
        featured: true,
        metrics: {
          reviews: '200+',
          updated: 'Monthly',
          score: '9.4/10'
        }
      }
    ];

    const comparisons1 = [
      {
        id: 1,
        title: 'Top Travel Photography Tips 2024',
        description: 'Professional photography techniques for capturing stunning travel moments and landscapes',
        image: 'https://images.unsplash.com/photo-1684127987312-43455fd95925?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Photography',
        trending: true,
        metrics: {
          reviews: '180+',
          updated: 'Weekly',
          score: '9.7/10'
        }
      },
      {
        id: 2,
        title: 'Sustainable Garden Design',
        description: 'Create an eco-friendly garden with water-saving and native plant techniques',
        image: 'https://plus.unsplash.com/premium_photo-1668930508685-af79c83e23af?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Gardening',
        featured: true,
        metrics: {
          reviews: '165+',
          updated: 'Monthly',
          score: '9.4/10'
        }
      },
      {
        id: 3,
        title: 'Gourmet Coffee Brewing Guide',
        description: 'Master the art of brewing perfect coffee with expert barista techniques',
        image: 'https://images.unsplash.com/photo-1495774856032-8b90bbb32b32?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Food & Beverage',
        metrics: {
          reviews: '220+',
          updated: 'Weekly',
          score: '9.6/10'
        }
      },
      {
        id: 4,
        title: 'Indoor Rock Climbing Essentials',
        description: 'Complete guide to getting started with indoor climbing and bouldering',
        image: 'https://plus.unsplash.com/premium_photo-1663956122265-2671aa5c955f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Sports',
        featured: true,
        metrics: {
          reviews: '175+',
          updated: 'Monthly',
          score: '9.3/10'
        }
      }
    ];

    const steps = [
      {
        id: 'research',
        title: 'Research & Analysis',
        icon: <Search className="w-5 h-5" />,
        color: 'bg-blue-500'
      },
      {
        id: 'evaluation',
        title: 'Expert Evaluation',
        icon: <Shield className="w-5 h-5" />,
        color: 'bg-purple-500'
      },
      {
        id: 'selection',
        title: 'Selection Process',
        icon: <Target className="w-5 h-5" />,
        color: 'bg-green-500'
      }
    ] as any;

    const stepContent = {
      research: {
        title: "Research & Analysis",
        description: "Comprehensive data collection and analysis of market products",
        features: [
          {
            icon: <Database className="w-6 h-6 text-blue-500" />,
            title: "Database of 100,000+ products reviewed",
            description: "Extensive product database covering multiple categories and brands"
          },
          {
            icon: <BarChart2 className="w-6 h-6 text-blue-500" />,
            title: "50+ quality parameters evaluated",
            description: "In-depth analysis of product specifications and features"
          },
          {
            icon: <Users className="w-6 h-6 text-blue-500" />,
            title: "Real user feedback analysis",
            description: "Collection and analysis of genuine customer reviews and ratings"
          },
          {
            icon: <LineChart className="w-6 h-6 text-blue-500" />,
            title: "Price history tracking",
            description: "Monitoring price changes and historical pricing data"
          },
          {
            icon: <TrendingUp className="w-6 h-6 text-blue-500" />,
            title: "Market trend monitoring",
            description: "Staying updated with latest market trends and innovations"
          }
        ],
        image: "/api/placeholder/600/400"
      },
      evaluation: {
        title: "Expert Evaluation",
        description: "Professional assessment by industry experts",
        features: [
          {
            icon: <CheckCircle className="w-6 h-6 text-purple-500" />,
            title: "Expert team review",
            description: "Thorough evaluation by certified product specialists"
          },
          {
            icon: <Shield className="w-6 h-6 text-purple-500" />,
            title: "Quality assurance checks",
            description: "Rigorous testing of product quality and durability"
          },
          {
            icon: <BarChart2 className="w-6 h-6 text-purple-500" />,
            title: "Performance benchmarking",
            description: "Comparative analysis against industry standards"
          },
          {
            icon: <Users className="w-6 h-6 text-purple-500" />,
            title: "User experience assessment",
            description: "Evaluation of user interface and experience"
          },
          {
            icon: <Database className="w-6 h-6 text-purple-500" />,
            title: "Technical specification verification",
            description: "Validation of manufacturer claims and specifications"
          }
        ],
        image: "/api/placeholder/600/400"
      },
      selection: {
        title: "Selection Process",
        description: "Data-driven product recommendations",
        features: [
          {
            icon: <Target className="w-6 h-6 text-green-500" />,
            title: "Personalized matching",
            description: "Tailored recommendations based on user preferences"
          },
          {
            icon: <BarChart2 className="w-6 h-6 text-green-500" />,
            title: "Value assessment",
            description: "Analysis of price-to-performance ratio"
          },
          {
            icon: <TrendingUp className="w-6 h-6 text-green-500" />,
            title: "Competitive comparison",
            description: "Side-by-side comparison with similar products"
          },
          {
            icon: <Users className="w-6 h-6 text-green-500" />,
            title: "User satisfaction metrics",
            description: "Integration of customer satisfaction data"
          },
          {
            icon: <CheckCircle className="w-6 h-6 text-green-500" />,
            title: "Final recommendation",
            description: "Clear, data-backed product suggestions"
          }
        ],
        image: "/api/placeholder/600/400"
      }
    } as any;

    const metrics = [
      {
        label: 'Active Users',
        value: '2M+',
        description: 'Monthly active users trust our reviews',
        icon: <Users className="w-6 h-6 text-blue-500" />
      },
      {
        label: 'Products Reviewed',
        value: '100K+',
        description: 'Detailed product reviews and comparisons',
        icon: <Star className="w-6 h-6 text-blue-500" />
      },
      {
        label: 'Years Experience',
        value: '10+',
        description: 'Years of product testing expertise',
        icon: <Clock className="w-6 h-6 text-blue-500" />
      },
      {
        label: 'Expert Reviewers',
        value: '50+',
        description: 'Professional product specialists',
        icon: <Award className="w-6 h-6 text-blue-500" />
      }
    ];

    const trustFactors = [
      {
        title: 'Independent Reviews',
        description: 'Our reviews are completely independent and unbiased. We never accept payment for positive reviews.',
        icon: <Shield className="w-8 h-8" />,
        stats: [
          { label: 'Unbiased Reviews', value: '25,000+' },
          { label: 'Products Tested', value: '8,500+' }
        ]
      },
      {
        title: 'Data-Driven Analysis',
        description: 'Every review is backed by extensive data analysis and real-world testing metrics.',
        icon: <BarChart2 className="w-8 h-8" />,
        stats: [
          { label: 'Data Points', value: '1M+' },
          { label: 'Testing Hours', value: '50,000+' }
        ]
      },
      {
        title: 'Community Verified',
        description: 'Our recommendations are validated by a large community of real users and experts.',
        icon: <ThumbsUp className="w-8 h-8" />,
        stats: [
          { label: 'User Reviews', value: '150,000+' },
          { label: 'Community Size', value: '500K+' }
        ]
      },
      {
        title: 'Continuous Monitoring',
        description: 'We continuously track prices and update our reviews to reflect the latest market changes.',
        icon: <LineChart className="w-8 h-8" />,
        stats: [
          { label: 'Price Updates', value: 'Daily' },
          { label: 'Review Updates', value: 'Weekly' }
        ]
      }
    ];

    const tabs = [
      {
        id: 'popular',
        label: 'Popular Reviews',
        icon: <TrendingUp className="w-4 h-4" />
      },
      {
        id: 'guides',
        label: 'Buying Guides',
        icon: <BookOpen className="w-4 h-4" />
      },
      {
        id: 'latest',
        label: 'Latest Updates',
        icon: <Clock className="w-4 h-4" />
      }
    ];

    const content = {
      popular: [
        {
          id: 1,
          title: "Best Gaming Laptops of 2024",
          category: "Technology",
          image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1957&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          rating: 4.8,
          reviewCount: 1250,
          badges: ['Editor\'s Choice', 'Best Value'],
          summary: "Comprehensive comparison of top gaming laptops with the latest GPUs and processors",
          lastUpdated: "2 days ago",
          readTime: "15 min read"
        },
        {
          id: 2,
          title: "Top Rated Air Purifiers",
          category: "Home",
          image: "https://plus.unsplash.com/premium_photo-1690291494818-068ed0f63c42?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          rating: 4.9,
          reviewCount: 980,
          badges: ['Best Seller', 'Most Reviewed'],
          summary: "In-depth analysis of the most effective air purifiers for different room sizes",
          lastUpdated: "1 week ago",
          readTime: "12 min read"
        },
        {
          id: 3,
          title: "Premium Noise-Cancelling Headphones",
          category: "Audio",
          image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          rating: 4.7,
          reviewCount: 856,
          badges: ['Premium Pick'],
          summary: "Detailed comparison of high-end noise-cancelling headphones with sound quality tests",
          lastUpdated: "3 days ago",
          readTime: "18 min read"
        }
      ],
      guides: [
        {
          id: 4,
          title: "How to Choose the Perfect Coffee Machine",
          category: "Kitchen",
          image: "https://plus.unsplash.com/premium_photo-1661281243564-5acf9a1797ed?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          readCount: "125K",
          badges: ['Beginner Friendly'],
          summary: "Everything you need to know about different types of coffee makers and brewing methods",
          lastUpdated: "1 day ago",
          readTime: "20 min read"
        },
        {
          id: 5,
          title: "Smart Home Security Buying Guide",
          category: "Home Security",
          image: "https://images.unsplash.com/photo-1716789340025-4eb6813bc8cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          readCount: "98K",
          badges: ['Expert Guide'],
          summary: "Complete guide to choosing and setting up your smart home security system",
          lastUpdated: "4 days ago",
          readTime: "25 min read"
        },
        {
          id: 6,
          title: "Understanding 4K TV Technologies",
          category: "Electronics",
          image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          readCount: "156K",
          badges: ['Technical Guide'],
          summary: "Detailed explanation of different TV technologies and how to choose the right one",
          lastUpdated: "1 week ago",
          readTime: "22 min read"
        }
      ],
      latest: [
        {
          id: 7,
          title: "2024 Smartphone Comparison",
          category: "Mobile",
          image: "https://images.unsplash.com/photo-1722710682945-76bc77e18db2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          rating: 4.9,
          badges: ['New', 'Trending'],
          summary: "Latest comparison of flagship smartphones with camera and performance tests",
          lastUpdated: "Today",
          readTime: "16 min read"
        },
        {
          id: 8,
          title: "Best Robot Vacuums Updated",
          category: "Smart Home",
          image: "https://plus.unsplash.com/premium_photo-1726916921674-a1c318ad465e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          rating: 4.8,
          badges: ['Updated', 'Price Drop Alert'],
          summary: "Newly updated comparison with the latest models and price changes",
          lastUpdated: "Yesterday",
          readTime: "14 min read"
        },
        {
          id: 9,
          title: "Gaming Monitor Roundup",
          category: "Gaming",
          image: "https://images.unsplash.com/photo-1725274041617-b1c998bb5b9c?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          rating: 4.7,
          badges: ['New Models Added'],
          summary: "Updated review including the latest gaming monitors with HDMI 2.1",
          lastUpdated: "2 days ago",
          readTime: "19 min read"
        }
      ]
    } as any;

    const CategoryBadge = ({ category }: any) => (
      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
        {category}
      </span>
    );

    const ContentBadge = ({ text }: any) => (
      <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">
        {text}
      </span>
    );

    const experts = [
      {
        id: 1,
        name: "Sarah Johnson",
        role: "Senior Tech Reviewer",
        image: "/api/placeholder/300/300",
        specialties: ["Smartphones", "Laptops", "Wearables"],
        experience: "8+ years",
        reviews: 450,
        awards: ["Best Tech Reviewer 2023", "Industry Expert Award"],
        education: "M.S. Computer Science",
        stats: {
          publishedReviews: 450,
          readerCount: "2.5M+",
          accuracy: "98%"
        },
        recentWork: [
          {
            title: "iPhone 15 Pro vs Samsung S24 Ultra",
            date: "2 days ago",
            reads: "125K"
          },
          {
            title: "Best Gaming Laptops of 2024",
            date: "1 week ago",
            reads: "250K"
          }
        ],
        bio: "Specializing in mobile technology and laptops, Sarah brings deep technical knowledge and real-world testing experience to help consumers make informed decisions."
      },
      {
        id: 2,
        name: "David Chen",
        role: "Home Tech Expert",
        image: "/api/placeholder/300/300",
        specialties: ["Smart Home", "Audio Systems", "Security"],
        experience: "10+ years",
        reviews: 380,
        awards: ["Smart Home Authority 2023"],
        education: "B.E. Electronics",
        stats: {
          publishedReviews: 380,
          readerCount: "1.8M+",
          accuracy: "96%"
        },
        recentWork: [
          {
            title: "Ultimate Smart Home Security Guide",
            date: "3 days ago",
            reads: "98K"
          },
          {
            title: "Best Mesh WiFi Systems Compared",
            date: "2 weeks ago",
            reads: "180K"
          }
        ],
        bio: "David's passion for smart home technology and automation helps readers transform their homes with the latest and most reliable tech solutions."
      },
      {
        id: 3,
        name: "Emily Martinez",
        role: "Photography Expert",
        image: "/api/placeholder/300/300",
        specialties: ["Cameras", "Lenses", "Photography Gear"],
        experience: "12+ years",
        reviews: 290,
        awards: ["Photography Expert 2023", "Technical Excellence"],
        education: "BFA Photography",
        stats: {
          publishedReviews: 290,
          readerCount: "1.2M+",
          accuracy: "97%"
        },
        recentWork: [
          {
            title: "Professional Camera Roundup 2024",
            date: "1 week ago",
            reads: "85K"
          },
          {
            title: "Ultimate Lens Buying Guide",
            date: "3 weeks ago",
            reads: "150K"
          }
        ],
        bio: "With over a decade of professional photography experience, Emily provides in-depth analysis of cameras and photography equipment for all skill levels."
      },
      {
        id: 4,
        name: "Michael Roberts",
        role: "Gaming Hardware Specialist",
        image: "/api/placeholder/300/300",
        specialties: ["Gaming PCs", "Consoles", "Gaming Peripherals"],
        experience: "7+ years",
        reviews: 320,
        awards: ["Gaming Tech Expert 2023"],
        education: "B.S. Computer Engineering",
        stats: {
          publishedReviews: 320,
          readerCount: "2.1M+",
          accuracy: "95%"
        },
        recentWork: [
          {
            title: "Best Gaming Monitors 2024",
            date: "4 days ago",
            reads: "178K"
          },
          {
            title: "Gaming Keyboard Showdown",
            date: "2 weeks ago",
            reads: "145K"
          }
        ],
        bio: "Michael combines his engineering background with gaming passion to deliver thorough analysis of gaming hardware and peripherals."
      }
    ];

    const ExpertCard = ({ expert, isExpanded, onClick }: any) => (
      <div
        className={`bg-white rounded-xl shadow-sm transition-all ${isExpanded ? 'col-span-2 md:col-span-4' : ''
          }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Basic Info */}
          <div className={`p-6 ${isExpanded ? 'md:col-span-1 bg-gray-50' : ''}`}>
            <div className="flex flex-col items-center text-center">
              <img
                src={expert.image}
                alt={expert.name}
                className="w-32 h-32 rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-bold mb-1">{expert.name}</h3>
              <p className="text-gray-600 mb-3">{expert.role}</p>
              <div className="flex gap-2 mb-4">
                {expert.specialties.slice(0, 2).map((specialty: any, index: any) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              {!isExpanded && (
                <button
                  onClick={onClick}
                  className="mt-2 text-blue-500 hover:text-blue-600 flex items-center gap-1"
                >
                  <span>View Profile</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="md:col-span-3 p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Stats */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Expert Stats</h4>
                    <div className="grid gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-500">
                          {expert.stats.publishedReviews}
                        </div>
                        <div className="text-sm text-gray-600">Published Reviews</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-500">
                          {expert.stats.readerCount}
                        </div>
                        <div className="text-sm text-gray-600">Total Readers</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-500">
                          {expert.stats.accuracy}
                        </div>
                        <div className="text-sm text-gray-600">Review Accuracy</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Work */}
                <div>
                  <h4 className="font-semibold mb-3">Recent Reviews</h4>
                  <div className="space-y-4">
                    {expert.recentWork.map((work: any, index: any) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">{work.title}</h5>
                        <div className="flex justify-between text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{work.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{work.reads} reads</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bio & Credentials */}
                <div>
                  <h4 className="font-semibold mb-3">About</h4>
                  <p className="text-gray-600 mb-4">{expert.bio}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">{expert.experience} Experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">{expert.education}</span>
                    </div>
                  </div>
                  {/* Social Links */}
                  <div className="flex gap-3 mt-4">
                    <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                      <Linkedin className="w-5 h-5 text-gray-600" />
                    </a>
                    <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                      <Twitter className="w-5 h-5 text-gray-600" />
                    </a>
                    <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                      <Mail className="w-5 h-5 text-gray-600" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="mt-6 text-right">
                <button
                  onClick={() => setSelectedExpert(null)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Close Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );

    const [activeTab2, setActiveTab2] = useState('news');

    const tabs2 = [
      {
        id: 'news',
        label: 'Latest News',
        icon: <Newspaper className="w-5 h-5" />
      },
      {
        id: 'tips',
        label: 'Buying Tips',
        icon: <Lightbulb className="w-5 h-5" />
      }
    ] as any;

    const content2 = {
      news: [
        {
          id: 1,
          title: "What to Expect from Apple's Next MacBook Pro Release",
          category: "Tech News",
          image: "https://images.unsplash.com/photo-1504691342899-4d92b50853e1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          date: "2 hours ago",
          readTime: "5 min read",
          author: {
            name: "Sarah Johnson",
            role: "Senior Tech Reviewer",
            image: "/api/placeholder/100/100"
          },
          excerpt: "Latest leaks suggest significant performance improvements and new display technology in upcoming MacBook Pro models.",
          tags: ["Apple", "MacBook", "Laptops"],
          engagement: {
            comments: 28,
            shares: 156
          }
        },
        {
          id: 2,
          title: "Samsung Introduces Revolutionary Battery Technology",
          category: "Innovation",
          image: "https://images.unsplash.com/photo-1480694313141-fce5e697ee25?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          date: "1 day ago",
          readTime: "4 min read",
          author: {
            name: "David Chen",
            role: "Tech Analyst",
            image: "/api/placeholder/100/100"
          },
          excerpt: "New battery technology promises to double smartphone battery life while reducing charging time by 60%.",
          tags: ["Samsung", "Battery Tech", "Innovation"],
          engagement: {
            comments: 45,
            shares: 234
          }
        },
        {
          id: 3,
          title: "The Impact of AI on Next-Gen Gaming Consoles",
          category: "Gaming",
          image: "https://images.unsplash.com/photo-1656662961786-b04873ceb4b9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          date: "2 days ago",
          readTime: "6 min read",
          author: {
            name: "Michael Roberts",
            role: "Gaming Expert",
            image: "/api/placeholder/100/100"
          },
          excerpt: "How artificial intelligence is revolutionizing gaming experiences in upcoming console generations.",
          tags: ["Gaming", "AI", "Consoles"],
          engagement: {
            comments: 32,
            shares: 178
          }
        }
      ],
      tips: [
        {
          id: 4,
          title: "Essential Features to Consider When Buying a 4K TV",
          category: "Buying Guide",
          image: "https://plus.unsplash.com/premium_photo-1681236323432-3df82be0c1b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          date: "1 day ago",
          readTime: "8 min read",
          author: {
            name: "Emily Martinez",
            role: "Home Entertainment Expert",
            image: "/api/placeholder/100/100"
          },
          excerpt: "A comprehensive guide to help you understand what really matters when choosing your next 4K TV.",
          tags: ["TV", "4K", "Buying Guide"],
          engagement: {
            comments: 56,
            shares: 289
          },
          highlights: [
            "Understanding HDR standards",
            "Smart platform comparison",
            "Panel technology differences"
          ]
        },
        {
          id: 5,
          title: "How to Choose the Perfect Wireless Earbuds",
          category: "Tips & Tricks",
          image: "https://images.unsplash.com/photo-1598371611276-1bc503a270a4?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          date: "3 days ago",
          readTime: "7 min read",
          author: {
            name: "Alex Wong",
            role: "Audio Specialist",
            image: "/api/placeholder/100/100"
          },
          excerpt: "Key factors to consider when selecting wireless earbuds, from sound quality to battery life.",
          tags: ["Audio", "Earbuds", "Wireless"],
          engagement: {
            comments: 42,
            shares: 198
          },
          highlights: [
            "Battery life considerations",
            "Audio codec support",
            "Fit and comfort factors"
          ]
        },
        {
          id: 6,
          title: "Smartphone Photography: Pro Tips for Better Photos",
          category: "Photography",
          image: "https://images.unsplash.com/photo-1625816615190-6270e61891ad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          date: "4 days ago",
          readTime: "10 min read",
          author: {
            name: "Jessica Lee",
            role: "Photography Expert",
            image: "/api/placeholder/100/100"
          },
          excerpt: "Expert tips to maximize your smartphone's camera capabilities and take professional-quality photos.",
          tags: ["Photography", "Smartphone", "Tips"],
          engagement: {
            comments: 67,
            shares: 345
          },
          highlights: [
            "Composition techniques",
            "Advanced camera settings",
            "Editing tips"
          ]
        }
      ]
    } as any;

    const ArticleCard = ({ article, showHighlights = false }: any) => (
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        <div className="relative">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
              {article.category}
            </span>
          </div>
        </div>

        <div className="p-6">
          {/* Author Info */}
          {/* <div className="flex items-center gap-3 mb-4">
            <img
              src={article.author.image}
              alt={article.author.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="font-medium">{article.author.name}</div>
              <div className="text-sm text-gray-600">{article.author.role}</div>
            </div>
          </div> */}

          {/* Article Content */}
          <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-600 mb-4">{article.excerpt}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag: any, index: any) => (
              <span
                key={index}
                className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    const categories2 = [
      {
        icon: <Smartphone className="w-5 h-5" />,
        name: "Smartphones",
        count: "2.5k+ reviews",
        trending: true,
        featured: true,
        subcategories: ["Apple", "Samsung", "Google", "OnePlus"]
      },
      {
        icon: <Laptop className="w-5 h-5" />,
        name: "Laptops & PCs",
        count: "3k+ reviews",
        trending: true,
        subcategories: ["Gaming", "Business", "Chromebooks", "MacBooks"]
      },
      {
        icon: <Camera className="w-5 h-5" />,
        name: "Cameras",
        count: "1.2k+ reviews",
        featured: true,
        subcategories: ["DSLR", "Mirrorless", "Action Cams", "Drones"]
      },
      {
        icon: <Headphones className="w-5 h-5" />,
        name: "Audio",
        count: "1.8k+ reviews",
        trending: true,
        subcategories: ["Headphones", "Earbuds", "Speakers", "Soundbars"]
      },
      {
        icon: <Tv className="w-5 h-5" />,
        name: "TVs & Displays",
        count: "950+ reviews",
        subcategories: ["4K TVs", "OLED", "Gaming Monitors", "Projectors"]
      },
      {
        icon: <HomeIcon className="w-5 h-5" />,
        name: "Smart Home",
        count: "1.5k+ reviews",
        trending: true,
        subcategories: ["Security", "Automation", "Lighting", "Climate"]
      }
    ];

    const trendingTopics = [
      {
        title: "iPhone 15 Pro vs Samsung S24 Ultra",
        views: "125K",
        rating: 4.8,
        category: "Smartphones",
        date: "Updated today"
      },
      {
        title: "Best Gaming Laptops of 2024",
        views: "98K",
        rating: 4.9,
        category: "Laptops",
        date: "2 days ago"
      },
      {
        title: "Top Wireless Earbuds Compared",
        views: "86K",
        rating: 4.7,
        category: "Audio",
        date: "1 day ago"
      }
    ];

    const featuredCollections = [
      {
        icon: <Settings className="w-6 h-6" />,
        title: "Tech Essentials",
        description: "Must-have gadgets for 2024",
        color: "from-blue-500/20 to-purple-500/20"
      },
      {
        icon: <Speaker className="w-6 h-6" />,
        title: "Audio Guide",
        description: "Ultimate sound comparison",
        color: "from-green-500/20 to-blue-500/20"
      }
    ];

    return (
      <PageLayout
        headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
        footerMenuItems={props.data?.footerMenuItems?.nodes || []}
        pageFeaturedImageUrl={featuredImage?.node?.sourceUrl}
        pageTitle={title}
        generalSettings={
          props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
        }
      >
        <div className="min-h-screen bg-gray-50">
          <div className="relative bg-gray-900 overflow-hidden">
            {/* Background elements remain the same */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTQgNGg0NFY0OEg0VjR6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] bg-repeat" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-purple-500/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-gray-900" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                      Make Confident <br />
                      <span className="text-blue-400">Product Decisions</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-lg">
                      Join millions of tech enthusiasts who trust our expert reviews and comparisons to find their perfect products.
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <button className="px-8 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors flex items-center gap-2">
                      <span className="font-medium">Explore Reviews</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveView(activeView === 'trending' ? 'categories' : 'trending')}
                      className="px-8 py-4 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-colors"
                    >
                      <span className="font-medium">
                        {activeView === 'trending' ? 'Popular Categories' : 'Trending Reviews'}
                      </span>
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6">
                    <div className="px-4 py-3 rounded-xl bg-gray-800/50 backdrop-blur-sm">
                      <div className="text-2xl font-bold text-white">50K+</div>
                      <div className="text-sm text-gray-400">Expert Reviews</div>
                    </div>
                    <div className="px-4 py-3 rounded-xl bg-gray-800/50 backdrop-blur-sm">
                      <div className="text-2xl font-bold text-white">2M+</div>
                      <div className="text-sm text-gray-400">Monthly Readers</div>
                    </div>
                    <div className="px-4 py-3 rounded-xl bg-gray-800/50 backdrop-blur-sm">
                      <div className="text-2xl font-bold text-white">98%</div>
                      <div className="text-sm text-gray-400">User Trust Score</div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Toggle between Trending and Categories */}
                <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-3 md:p-6 border border-gray-700">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      {activeView === 'trending' ? (
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                      ) : (
                        <Settings className="w-5 h-5 text-blue-400" />
                      )}
                      <h2 className="text-xl font-bold text-white">
                        {activeView === 'trending' ? 'Trending Now' : 'Popular Categories'}
                      </h2>
                    </div>
                    {activeView === 'categories' && (
                      <button
                        onClick={() => setActiveView('trending')}
                        className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Trending</span>
                      </button>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    {activeView === 'trending' ? (
                      /* Trending Topics */
                      trendingTopics.map((topic, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <div className="text-sm text-blue-400 mb-1">{topic.category}</div>
                              <h3 className="font-medium text-white">{topic.title}</h3>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{topic.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>{topic.views} views</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{topic.date}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      /* Categories */
                      <div className="space-y-4">
                        {/* Main Categories */}
                        <div className="grid gap-3">
                          {categories.map((category: any, index: any) => (
                            <a
                              key={index}
                              href="#"
                              className="flex items-center justify-between p-3 rounded-xl bg-gray-700/50 hover:bg-gray-700 transition-colors group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-gray-600 text-blue-400 group-hover:text-blue-300">
                                  {category.icon}
                                </div>
                                <div>
                                  <div className="text-white font-medium">{category.name}</div>
                                  <div className="text-sm text-gray-400">{category.count}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                {category.trending && (
                                  <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs">
                                    Trending
                                  </span>
                                )}
                                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-gray-300" />
                              </div>
                            </a>
                          ))}
                        </div>

                        {/* Featured Collections */}
                        <div className="mt-6 pt-6 border-t border-gray-700">
                          <h3 className="text-lg font-semibold text-white mb-4">Featured Collections</h3>
                          <div className="grid grid-cols-2 gap-4">
                            {featuredCollections.map((collection, index) => (
                              <div
                                key={index}
                                className={`p-4 rounded-xl bg-gradient-to-br ${collection.color} border border-gray-700 cursor-pointer hover:border-gray-600 transition-colors`}
                              >
                                <div className="text-blue-400 mb-2">
                                  {collection.icon}
                                </div>
                                <h4 className="font-medium text-white mb-1">{collection.title}</h4>
                                <p className="text-sm text-gray-400">{collection.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col space-y-8">
              {/* Header Section */}
              <div className="flex flex-col lg:flex-row justify-between items-center">
                <h1 className="text-2xl font-bold text-center md:text-start">Expert Product Reviews</h1>
                <div className="flex gap-2 flex-wrap justify-center md:justify-start mt-3 md:mt-0">
                  {categories.map((category) => (
                    <a
                      key={category.name}
                      href={category.href}
                      className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-sm"
                    >
                      {category.icon}
                      {category.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Comparisons Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {comparisons1.slice(1).map((comparison) => (
                  <div key={comparison.id} className="bg-gray-50 rounded-xl p-0 md:p-4">
                    <div className="flex flex-col space-y-3">
                      <div className="relative rounded-lg overflow-hidden">
                        <img
                          src={comparison.image}
                          alt={comparison.title}
                          className="w-full h-36 object-cover"
                        />
                        {comparison.featured && (
                          <div className="absolute top-2 right-2">
                            <div className="flex items-center space-x-1 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs">
                              <Star size={12} />
                              <span>Featured</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-blue-600">{comparison.category}</span>
                        <h3 className="text-lg font-bold mt-1">{comparison.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{comparison.description}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <div className="text-center">
                          <div className="text-sm font-semibold">{comparison.metrics.updated}</div>
                          <div className="text-xs text-gray-500">Updates</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-semibold">{comparison.metrics.score}</div>
                          <div className="text-xs text-gray-500">Score</div>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                      >
                        <span>View details</span>
                        <ArrowRight size={16} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Comparisons Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {comparisons.slice(1).map((comparison) => (
                  <div key={comparison.id} className="bg-gray-50 rounded-xl p-0 md:p-4">
                    <div className="flex flex-col space-y-3">
                      <div className="relative rounded-lg overflow-hidden">
                        <img
                          src={comparison.image}
                          alt={comparison.title}
                          className="w-full h-36 object-cover"
                        />
                        {comparison.featured && (
                          <div className="absolute top-2 right-2">
                            <div className="flex items-center space-x-1 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs">
                              <Star size={12} />
                              <span>Featured</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-blue-600">{comparison.category}</span>
                        <h3 className="text-lg font-bold mt-1">{comparison.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{comparison.description}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <div className="text-center">
                          <div className="text-sm font-semibold">{comparison.metrics.updated}</div>
                          <div className="text-xs text-gray-500">Updates</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-semibold">{comparison.metrics.score}</div>
                          <div className="text-xs text-gray-500">Score</div>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                      >
                        <span>View details</span>
                        <ArrowRight size={16} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-8 bg-blue-500"></div>
                  <h2 className="text-3xl font-bold">Our process</h2>
                </div>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl">
                  Our Process Is To Make Data-Driven Decisions To Help You Find The Perfect Product Match
                </p>
              </div>

              {/* Process Steps */}
              <div className="grid lg:grid-cols-3 gap-4 mb-12">
                {steps.map((step: any) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`flex items-center p-6 rounded-xl transition-all ${activeStep === step.id
                      ? `${step.color} text-white shadow-lg`
                      : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${activeStep === step.id ? 'bg-white/20' : 'bg-white'
                        }`}>
                        {step.icon}
                      </div>
                      <span className="font-semibold">{step.title}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="bg-gray-50 rounded-2xl p-5 md:p-8">
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Left side - Features */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">
                        {stepContent[activeStep].title}
                      </h3>
                      <p className="text-gray-600">
                        {stepContent[activeStep].description}
                      </p>
                    </div>
                    <div className="space-y-6">
                      {stepContent[activeStep].features.map((feature: any, index: any) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0 p-2 bg-white rounded-lg">
                            {feature.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">{feature.title}</h4>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right side - Image */}
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Process illustration"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Why Trust Our Reviews?</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  We combine expert knowledge with data-driven analysis to deliver the most reliable product recommendations
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid md:grid-cols-4 gap-8 mb-16">
                {metrics.map((metric, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        {metric.icon}
                      </div>
                    </div>
                    <div className="text-3xl font-bold mb-2">{metric.value}</div>
                    <div className="text-lg font-semibold mb-1">{metric.label}</div>
                    <div className="text-sm text-gray-600">{metric.description}</div>
                  </div>
                ))}
              </div>

              {/* Trust Factors */}
              <div className="grid md:grid-cols-2 gap-8">
                {trustFactors.map((factor, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-5 md:p-8">
                    <div className="flex items-start gap-6">
                      <div className="p-4 bg-blue-100 rounded-xl">
                        {factor.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{factor.title}</h3>
                        <p className="text-gray-600 mb-6">{factor.description}</p>
                        <div className="grid grid-cols-2 gap-4">
                          {factor.stats.map((stat, statIndex) => (
                            <div key={statIndex} className="bg-white rounded-lg p-4">
                              <div className="text-lg font-bold text-blue-500">{stat.value}</div>
                              <div className="text-sm text-gray-600">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-16 text-center">
                <div className="inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-full hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="font-semibold">Start Reading Our Reviews</span>
                  <ThumbsUp className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Featured Reviews & Guides</h2>
                  <p className="text-gray-600">Discover our most popular product reviews and buying guides</p>
                </div>
                {/* Tab Navigation */}
                <div className="hidden md:flex gap-2 bg-white p-1 rounded-lg shadow-sm">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === tab.id
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      {tab.icon}
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </div>

                <div className="flex md:hidden gap-2 bg-white p-1 rounded-lg shadow-sm">
                  {tabs.slice(0, 2).map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === tab.id
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      {tab.icon}
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid md:grid-cols-3 gap-8">
                {content[activeTab]?.map((item: any) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {/* Image */}
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <CategoryBadge category={item.category} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item?.badges?.map((badge: any, index: any) => (
                          <ContentBadge key={index} text={badge} />
                        ))}
                      </div>

                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{item.summary}</p>

                      {/* Metrics */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {item.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{item.rating}/5.0</span>
                          </div>
                        )}
                        {item.readCount && (
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{item.readCount} reads</span>
                          </div>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{item.lastUpdated}</span>
                          <span>•</span>
                          <span>{item.readTime}</span>
                        </div>
                        <a
                          href="#"
                          className="flex items-center gap-1 text-blue-500 hover:text-blue-600 font-medium"
                        >
                          <span>Read more</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All CTA */}
              <div className="mt-12 text-center">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <span className="font-medium">View All Reviews</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Latest News & Tips</h2>
                  <p className="text-gray-600">Stay updated with the latest tech news and expert buying advice</p>
                </div>
                <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm">
                  {tabs2.map((tab: any) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab2(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab2 === tab.id
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      {tab.icon}
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid md:grid-cols-3 gap-8">
                {content2[activeTab2]?.map((article: any) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    showHighlights={activeTab2 === 'tips'}
                  />
                ))}
              </div>

              {/* View All CTA */}
              <div className="mt-12 text-center">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <span>View All {activeTab2 === 'news' ? 'News' : 'Tips'}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </PageLayout>
    )
  }

  return (
    <>
      <PageLayout
        headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
        footerMenuItems={props.data?.footerMenuItems?.nodes || []}
        pageFeaturedImageUrl={featuredImage?.node?.sourceUrl}
        pageTitle={title}
        generalSettings={
          props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
        }
      >
        <div
          className={`container ${isGutenbergPage ? "" : "pb-20 pt-5 sm:pt-10"
            }`}
        >
          <main
            className={`prose max-w-full lg:prose-lg dark:prose-invert mx-auto ${isGutenbergPage ? "max-w-none" : ""
              }`}
          >
            {title && !isGutenbergPage && (
              <>
                <EntryHeader title={title} />
                <hr />
              </>
            )}

            {<MyWordPressBlockViewer blocks={blocks} />}
          </main>
        </div>
      </PageLayout>
    </>
  );
};

Page.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
    headerLocation: PRIMARY_LOCATION,
    footerLocation: FOOTER_LOCATION,
  };
};

// Note***: tat ca cac query trong cac page deu phai co generalSettings, no duoc su dung o compoent Wrap
Page.query = gql(`
  query GetPage($databaseId: ID!, $asPreview: Boolean = false, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      featuredImage {
        node {
          altText
          sourceUrl
        }
      }
    }
    # common query for all page 
    generalSettings {
      ...NcgeneralSettingsFieldsFragment
    }
    primaryMenuItems: menuItems(where: { location:  $headerLocation  }, first: 80) {
      nodes {
        ...NcPrimaryMenuFieldsFragment
      }
    }
    footerMenuItems: menuItems(where: { location:  $footerLocation  }, first: 40) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
  }
`);

export default Page;
