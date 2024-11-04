import { gql } from '@/__generated__'
import { FaustPage, getNextStaticProps } from '@faustwp/core'
import PageLayout from '@/container/PageLayout'
import {
    GetReadingListPageQuery,
    NcgeneralSettingsFieldsFragmentFragment,
} from '@/__generated__/graphql'
import Heading from '@/components/Heading/Heading'
import { FOOTER_LOCATION, PRIMARY_LOCATION } from '@/contains/menu'
import { GetStaticPropsContext } from 'next'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import {
    ShieldAlert
} from 'lucide-react';

const Page: FaustPage<GetReadingListPageQuery> = props => {
    return (
        <PageLayout
            headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
            footerMenuItems={props.data?.footerMenuItems?.nodes || []}
            pageFeaturedImageUrl={null}
            pageTitle="Disclaimer"
            generalSettings={
                props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
            }
        >
            <div className="bg-gray-50">
                {/* Header */}
                <div className="bg-gray-900 text-white">
                    <div className="max-w-3xl mx-auto px-6 py-20">
                        <div className="flex items-center gap-6 mb-8">
                        <ShieldAlert className="w-10 h-10 text-blue-400" />
                            <h1 className="text-4xl font-bold">Disclaimer</h1>
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
                            <h2 className="text-2xl font-bold mb-4">General Information</h2>
                            <p className="mb-6">The information provided on BestReviewsRadar is for general informational purposes only. While we strive to keep the information up to date and accurate, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website.</p>

                            <div className="bg-gray-50 border-l-2 border-gray-800 rounded-lg p-6 mb-8">
                                <p><strong>Important Notice:</strong> Any reliance you place on such information is strictly at your own risk. We recommend always conducting your own research and due diligence before making any purchase decisions.</p>
                            </div>
                        </div>

                        <div className="section">
                            <h2 className="text-2xl font-bold mb-4">Product Reviews and Recommendations</h2>
                            <p className="mb-4">Please be aware that:</p>
                            <ul className="space-y-2 mb-6 list-disc pl-6">
                                <li>Our product reviews and recommendations are based on research, analysis, and publicly available information</li>
                                <li>We do not physically test every product we review</li>
                                <li>Product specifications, prices, and availability can change without notice</li>
                                <li>Your experience with products may differ from others' experiences</li>
                                <li>Our recommendations are based on general use cases and may not fit your specific needs</li>
                            </ul>
                        </div>

                        <div className="section">
                            <h2 className="text-2xl font-bold mb-4">Affiliate Links and Compensation</h2>
                            <p className="mb-6">Our website contains affiliate links. If you click on these links and make a purchase, we may receive a commission. This compensation may impact how and where products appear on this site. However, this does not influence our evaluations and recommendations.</p>

                            <div className="bg-amber-50 border-l-2 border-gray-800 rounded-lg p-6 mb-8">
                                <p><strong>Disclosure:</strong> Please refer to our <a href="/affiliate-disclosure" className="text-blue-600 hover:text-blue-800">Affiliate Disclosure</a> for complete details about our relationship with affiliate partners.</p>
                            </div>
                        </div>

                        <div className="section">
                            <h2 className="text-2xl font-bold mb-4">Third-Party Content and Links</h2>
                            <p className="mb-6">Our website may contain links to external websites or include content from third parties. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorsement of the views expressed within them.</p>
                        </div>

                        <div className="section">
                            <h2 className="text-2xl font-bold mb-4">Price Accuracy</h2>
                            <p className="mb-4">While we make every effort to provide accurate pricing information:</p>
                            <ul className="space-y-2 mb-6 list-disc pl-6">
                                <li>Product prices and availability are subject to change without notice</li>
                                <li>Prices displayed may vary by region or marketplace</li>
                                <li>Special offers and discounts may expire</li>
                                <li>Final pricing will be determined at the point of purchase from the retailer</li>
                            </ul>
                        </div>

                        <div className="section">
                            <h2 className="text-2xl font-bold mb-4">Medical and Professional Advice</h2>
                            <p className="mb-6">The content on this website is not intended to substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified health providers with questions you may have regarding medical conditions or products.</p>
                        </div>

                        <div className="section">
                            <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
                            <p className="mb-6">BestReviewsRadar shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to or use of the website. This includes, but is not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses.</p>
                        </div>

                        <div className="section">
                            <h2 className="text-2xl font-bold mb-4">Updates to This Disclaimer</h2>
                            <p className="mb-6">We reserve the right to update or modify this disclaimer at any time without prior notice. Changes will be effective immediately upon posting to the website. Your continued use of the website following the posting of changes constitutes your acceptance of such changes.</p>
                        </div>

                        <div className="section">
                            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                            <p>If you have any questions about this disclaimer, please <a href="/contact" className="text-blue-600 hover:text-blue-800">contact us</a>.</p>
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