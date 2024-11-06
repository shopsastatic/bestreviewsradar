import { gql } from '@/__generated__'
import { FaustPage, getNextStaticProps } from '@faustwp/core'
import PageLayout from '@/container/PageLayout'
import {
    GetReadingListPageQuery,
    NcgeneralSettingsFieldsFragmentFragment,
} from '@/__generated__/graphql'
import { FOOTER_LOCATION, PRIMARY_LOCATION } from '@/contains/menu'
import { GetStaticPropsContext } from 'next'

import {
    Shield,
    Lock,
    Mail,
    ArrowDown,
    ExternalLink,
    PrinterIcon,
    FileText
} from 'lucide-react';

const Page: FaustPage<GetReadingListPageQuery> = props => {
    return (
        <PageLayout
            headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
            footerMenuItems={props.data?.footerMenuItems?.nodes || []}
            pageFeaturedImageUrl={null}
            pageTitle="Affiliate Disclosure"
            generalSettings={
                props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
            }
        >
            <div className="bg-gray-50">
                {/* Header */}
                <div className="bg-gray-900 text-white">
                    <div className="max-w-3xl mx-auto px-6 py-20">
                        <div className="flex items-center gap-6 mb-8">
                            <FileText className="w-10 h-10 text-blue-400" />
                            <h1 className="text-4xl font-bold">Affiliate Disclosure</h1>
                        </div>
                        <p className="text-xl text-gray-300">
                            Last updated: January 15, 2024
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-3xl mx-auto px-6 py-12">
                    <div className="space-y-12">
                        <div className="section">
                            <h2 className="text-2xl font-bold mb-4">Our Commitment to Transparency</h2>
                            <p className="mb-6">We believe in complete transparency with our readers. This disclosure explains how we make money while maintaining our commitment to providing honest, unbiased product recommendations.</p>

                            <div className="bg-white rounded-lg p-5 shadow-sm mb-8">
                                <p><strong>Please Note:</strong> Some links on BestReviewsRadar are affiliate links. This means we may earn a commission if you click on these links and make a purchase, at no additional cost to you.</p>
                            </div>
                        </div>

                        <div className="section">
                            <h2 className="text-2xl font-bold mb-4">How We Work</h2>
                            <p className="mb-6">Our website specializes in detailed product analysis, comparisons, reviews, ratings, and comprehensive buying guides. We research and address common problems, concerns, questions, and needs related to various products. When you use our links to make purchases from our partner retailers, we may earn a commission.</p>

                            <p className="mb-4">Our primary affiliate partnerships include:</p>
                            <div className="partners-list flex items-center justify-between gap-5">
                                <div className="partners-list flex items-center justify-between gap-5">
                                    <div style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }} className="py-2 px-4 rounded-lg">
                                        Amazon Associates Program
                                    </div>
                                    <div style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }} className="py-2 px-4 rounded-lg">
                                        Walmart Affiliate Program
                                    </div>
                                    <div style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }} className="py-2 px-4 rounded-lg">
                                        eBay Partner Network
                                    </div>
                                    <div style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }} className="py-2 px-4 rounded-lg">
                                        Other Retail Partners
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="section">
                            <h2 className="text-2xl font-bold mb-4">Our Editorial Independence</h2>
                            <p className="mb-4">We want to emphasize that:</p>
                            <ul className="space-y-2 mb-6">
                                <li>• All our product recommendations are based on thorough research and analysis</li>
                                <li>• Affiliate relationships never influence our product evaluations or recommendations</li>
                                <li>• We maintain complete editorial independence in our reviews and comparisons</li>
                                <li>• Our primary goal is helping readers make informed purchasing decisions</li>
                                <li>• We only recommend products we believe will provide value to our readers</li>
                            </ul>
                        </div>

                        <div className="section">
                            <h2 className="text-2xl font-bold mb-4">How We Choose Products</h2>
                            <p className="mb-4">Our product recommendations are based on:</p>
                            <ul className="space-y-2 mb-6">
                                <li>• Extensive product research and analysis</li>
                                <li>• Real user experiences and feedback</li>
                                <li>• Product specifications and features</li>
                                <li>• Price comparisons and value assessment</li>
                                <li>• Quality and reliability factors</li>
                            </ul>
                        </div>

                        <div className="section">
                            <h2 className="text-2xl font-bold mb-4">Your Trust Matters</h2>
                            <p className="mb-6">We understand that your trust is essential. While affiliate commissions help support our research and content creation, our primary commitment is to you, our readers. We always strive to provide accurate, honest, and helpful information to assist in your purchasing decisions.</p>
                        </div>

                        <div className="section">
                            <h2 className="text-2xl font-bold mb-4">Questions?</h2>
                            <p>If you have any questions about our affiliate relationships or how we create our content, please don't hesitate to <a href="/contact" className="text-blue-600 hover:text-blue-800">contact us</a>. We're always happy to provide additional information and maintain transparency with our readers.</p>
                        </div>
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
    }
}

Page.query = gql(`
  query GetReadingListPage($headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!) {
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
  }
`)

export function getStaticProps(ctx: GetStaticPropsContext) {
    return getNextStaticProps(ctx, {
        Page,
        revalidate: 900,
    })
}

export default Page