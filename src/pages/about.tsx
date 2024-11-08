import { gql } from '@/__generated__'
import { FaustPage, getNextStaticProps } from '@faustwp/core'
import PageLayout from '@/container/PageLayout'
import {
    GetAboutPageDataQuery,
    NcgeneralSettingsFieldsFragmentFragment,
} from '@/__generated__/graphql'
import { FOOTER_LOCATION, PRIMARY_LOCATION, SIDEBAR_LOCATION } from '@/contains/menu'
import { GetStaticPropsContext } from 'next'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import {
    Users,
    Target,
    Award,
    Star,
    TrendingUp,
    Shield,
    CheckCircle,
    Globe,
    Calendar,
    Book
  } from 'lucide-react';

const Page: FaustPage<GetAboutPageDataQuery> = (props: any) => {
    const milestones = [
        {
            year: 2019,
            title: "Company Founded",
            description: "Started with a vision to revolutionize product reviews",
            icon: <Calendar className="w-6 h-6" />
        },
        {
            year: 2020,
            title: "1 Million Users",
            description: "Reached our first major user milestone",
            icon: <Users className="w-6 h-6" />
        },
        {
            year: 2021,
            title: "AI Integration",
            description: "Launched advanced AI-powered review analysis",
            icon: <Target className="w-6 h-6" />
        },
        {
            year: 2022,
            title: "Global Expansion",
            description: "Expanded operations to multiple countries",
            icon: <Globe className="w-6 h-6" />
        }
    ];

    const values = [
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Trust & Transparency",
            description: "We believe in providing honest, unbiased reviews that our readers can trust completely."
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Data-Driven Decisions",
            description: "Our recommendations are backed by thorough research and comprehensive data analysis."
        },
        {
            icon: <CheckCircle className="w-8 h-8" />,
            title: "User-First Approach",
            description: "Every decision we make is centered around providing value to our users."
        },
        {
            icon: <Book className="w-8 h-8" />,
            title: "Educational Focus",
            description: "We aim to educate consumers to make informed purchasing decisions."
        }
    ];

    const stats = [
        { value: "50K+", label: "Product Reviews" },
        { value: "2M+", label: "Monthly Readers" },
        { value: "98%", label: "User Trust Score" },
        { value: "100+", label: "Expert Contributors" }
    ];
    return (
        <PageLayout
            headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
            footerMenuItems={props.data?.footerMenuItems?.nodes || []}
            sidebarMenuItems={props.data?.sidebarMenuItems?.nodes || []}
            pageFeaturedImageUrl={null}
            pageTitle="About"
            generalSettings={
                props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
            }
        >
            <div className="bg-gray-50">
                {/* Hero Section */}
                <div className="relative bg-gray-900 text-white overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-purple-500/20" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
                        <div className="text-center max-w-3xl mx-auto">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                Making Product Research
                                <span className="text-blue-400"> Simple & Trustworthy</span>
                            </h1>
                            <p className="text-xl text-gray-300 mb-8">
                                We help millions of shoppers make confident buying decisions through expert reviews and comprehensive product research.
                            </p>
                            <div className="flex justify-center gap-8 flex-wrap">
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-3xl font-bold text-blue-400">{stat.value}</div>
                                        <div className="text-sm text-gray-400">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Our Story Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold">Our Story</h2>
                            <p className="text-gray-600">
                                Best Reviews Radar was founded in 2019 with a simple mission: to make online shopping decisions easier and more reliable for everyone. We noticed that while the internet was flooded with product reviews, finding trustworthy, comprehensive information was still a challenge.
                            </p>
                            <p className="text-gray-600">
                                Our team of tech enthusiasts, product experts, and data scientists came together to create a platform that combines thorough research, data-driven analysis, and real user experiences to provide the most reliable product recommendations.
                            </p>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Our team at work"
                                className="rounded-xl shadow-lg"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4">
                                <div className="flex items-center gap-2">
                                    <Award className="w-6 h-6 text-blue-500" />
                                    <span className="font-medium">Trusted by millions worldwide</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Our Values */}
                <div className="bg-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                These principles guide everything we do and help us maintain the highest standards in product reviews and recommendations.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-4 gap-8">
                            {values.map((value, index) => (
                                <div key={index} className="text-center">
                                    <div className="inline-block p-4 bg-blue-50 rounded-2xl mb-4">
                                        <div className="text-blue-500">{value.icon}</div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                    <p className="text-gray-600">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Milestones */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Key milestones that have shaped our growth and success.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-5">
                        {milestones.map((milestone, index) => (
                            <div key={index} className="relative">
                                {index < milestones.length - 1 && (
                                    <div className="hidden md:block absolute w-full top-8 left-1/2 border-t-2 border-dashed border-gray-200" />
                                )}
                                <div className="relative bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white rounded-full p-2">
                                        {milestone.icon}
                                    </div>
                                    <div className="pt-4">
                                        <div className="text-2xl font-bold text-blue-500 mb-2">{milestone.year}</div>
                                        <h3 className="font-bold mb-2">{milestone.title}</h3>
                                        <p className="text-gray-600 text-sm">{milestone.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

Page.variables = () => {
    return {
        headerLocation: PRIMARY_LOCATION,
        footerLocation: FOOTER_LOCATION,
        sidebarLocation: SIDEBAR_LOCATION
    }
}

// Note***: tat ca cac query trong cac page deu phai co generalSettings, no duoc su dung o compoent Wrap
Page.query = gql(`
  query GetAboutPageData($headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!, $sidebarLocation: MenuLocationEnum!) {
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
    sidebarMenuItems: menuItems(where: {location:$sidebarLocation}, first: 200) {
      nodes {
        ...sidebarMenuFieldsFragment
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


export function getStaticProps(ctx: GetStaticPropsContext) {
    return getNextStaticProps(ctx, {
        Page,
        revalidate: 3600,
    })
}

export default Page
