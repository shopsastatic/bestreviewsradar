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
    Shield,
    Lock,
    Mail,
    ArrowDown,
    ExternalLink,
    PrinterIcon,
    Scale
} from 'lucide-react';

const Page: FaustPage<GetReadingListPageQuery> = (props: any) => {
    return (
        <PageLayout
            headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
            footerMenuItems={props.data?.footerMenuItems?.nodes || []}
            pageFeaturedImageUrl={null}
            pageTitle="Terms Of Service"
            generalSettings={
                props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
            }
        >
            <div className="bg-gray-50">
                {/* Header */}
                <div className="bg-gray-900 text-white">
                    <div className="max-w-3xl mx-auto px-6 py-20">
                        <div className="flex items-center gap-6 mb-8">
                            <Scale className="w-10 h-10 text-blue-400" />
                            <h1 className="text-4xl font-bold">Terms Of Service</h1>
                        </div>
                        <p className="text-xl text-gray-300">
                            Last updated: January 15, 2024
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-3xl mx-auto px-6 py-12">
                    <div className="space-y-16">
                        <section>
                            <h2 className="text-3xl font-bold mb-6">General Terms</h2>
                            <p className="text-lg leading-relaxed text-gray-600">
                                These Terms of Service ("Terms") constitute a legally binding agreement between you and BestReviewsRadar ("we," "us," or "our"). By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of these terms, please do not use our website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6">Acceptance of Terms</h2>
                            <p className="text-lg leading-relaxed text-gray-600">
                                By accessing our website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. These Terms apply to all visitors, users, and others who access or use our website and services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6">User Registration</h2>
                            <div className="space-y-4">
                                <p className="text-lg leading-relaxed text-gray-600">
                                    To access certain features of our website, you may be required to register for an account. When registering, you must provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                                </p>
                                <p className="text-lg leading-relaxed text-gray-600">
                                    Each account is for a single user only. You must not share your account credentials with others or allow multiple users to access the website using the same account.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6">Acceptable Use</h2>
                            <div className="space-y-4">
                                <p className="text-lg leading-relaxed text-gray-600">When using our website, you agree not to:</p>
                                <ul className="list-disc list-inside text-gray-600 space-y-3 text-lg ml-4">
                                    <li>Use the website in any way that violates applicable laws or regulations</li>
                                    <li>Engage in unauthorized data collection, including scraping or data mining</li>
                                    <li>Attempt to interfere with the proper functioning of the website</li>
                                    <li>Upload or transmit viruses, malware, or other malicious code</li>
                                    <li>Impersonate others or misrepresent your affiliation with any person or entity</li>
                                    <li>Use the website for any unauthorized commercial purposes</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6">Intellectual Property</h2>
                            <p className="text-lg leading-relaxed text-gray-600">
                                The website content, including but not limited to text, graphics, logos, images, and software, is our property and is protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works of our content without explicit permission.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6">User Submissions</h2>
                            <div className="space-y-6">
                                <p className="text-lg leading-relaxed text-gray-600">
                                    Any content you submit to our website, including but not limited to comments, ratings, text, videos, pictures, or other multimedia files ("User Submissions"), is subject to the following terms:
                                </p>
                                <p className="text-lg leading-relaxed text-gray-600">
                                    While you retain all proprietary rights to your submissions, you grant us a universal, worldwide, non-exclusive, royalty-free, transferable license to use, reproduce, perform, modify, display, and distribute your User Submissions. This license is perpetual and irrevocable, except for content that you delete from our website.
                                </p>
                                <div>
                                    <p className="text-lg leading-relaxed text-gray-600 mb-4">You acknowledge and warrant that your User Submissions:</p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-3 text-lg ml-4">
                                        <li>Do not infringe upon any copyright, intellectual property right, or other proprietary rights</li>
                                        <li>Comply with all applicable laws and regulations</li>
                                        <li>Do not contain defamatory, harmful, or inappropriate content</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6">Content Moderation</h2>
                            <p className="text-lg leading-relaxed text-gray-600">
                                We reserve the right, but not the obligation, to review, monitor, and remove User Submissions at our sole discretion. We may conduct investigations into user behavior when we believe there may be a violation of these Terms of Service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6">Account Termination</h2>
                            <div className="space-y-4">
                                <p className="text-lg leading-relaxed text-gray-600">We may suspend or terminate your account and access to our services if:</p>
                                <ul className="list-disc list-inside text-gray-600 space-y-3 text-lg ml-4">
                                    <li>You violate these Terms of Service</li>
                                    <li>You engage in repeated infractions</li>
                                    <li>We are required to do so by law</li>
                                    <li>We believe such action is necessary to protect our rights or the rights of others</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6">Anti-Solicitation</h2>
                            <div className="space-y-4">
                                <p className="text-lg leading-relaxed text-gray-600">Users shall not engage in:</p>
                                <ul className="list-disc list-inside text-gray-600 space-y-3 text-lg ml-4">
                                    <li>Soliciting our employees, officers, directors, agents, or consultants to terminate their relationship with us</li>
                                    <li>Encouraging existing or potential customers to cease using our services</li>
                                    <li>Promoting competitive services to our users</li>
                                    <li>Making defamatory statements about our company or representatives</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6">Third-Party Services</h2>
                            <p className="text-lg leading-relaxed text-gray-600">
                                Our service may include social media buttons or plugins from third-party services. When sharing content from our website on third-party platforms, proper attribution through hyperlinks is required. We are not responsible for the performance or content of third-party services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6">Payment and Orders</h2>
                            <p className="text-lg leading-relaxed text-gray-600">
                                We use secure third-party billing protocols to process purchases. Order confirmation may be provided electronically via email or through our website. Contract formation occurs upon receipt of order confirmation from our service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6">Disclaimer</h2>
                            <div className="space-y-6">
                                <p className="text-lg leading-relaxed text-gray-600">
                                    Our website, content, and services are provided "as is" without any express or implied warranties. To the maximum extent permitted by law, we shall not be liable for any:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-3 text-lg ml-4">
                                    <li>Direct, indirect, special, or consequential losses</li>
                                    <li>Business losses, including loss of income, profits, or contracts</li>
                                    <li>Loss of goodwill or reputation</li>
                                    <li>Data corruption</li>
                                    <li>Personal losses</li>
                                </ul>
                                <p className="text-lg leading-relaxed text-gray-600">
                                    This limitation of liability applies unless explicitly voided in a specific contract or agreement.
                                </p>
                            </div>
                        </section>

                        {/* Continue with remaining sections... */}
                        {/* Các section còn lại sẽ follow cùng pattern tương tự */}

                        <section>
                            <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                            <div className="space-y-4">
                                <p className="text-lg leading-relaxed text-gray-600">
                                    For questions or concerns about these Terms of Service, please contact us at:
                                </p>
                                <p className="text-lg text-blue-600 hover:text-blue-800">
                                    <a href="mailto:support@bestreviewsradar.com">support@bestreviewsradar.com</a>
                                </p>
                            </div>
                        </section>

                        <div className="border-t border-gray-200 pt-8 text-center">
                            <p className="text-gray-600">Copyright © 2024 BestReviewsRadar. All rights reserved.</p>
                            <p className="text-gray-500 text-sm mt-2">Last Updated: January 15, 2024</p>
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
    # common query for all page 
    generalSettings {
      ...NcgeneralSettingsFieldsFragment
    }
    primaryMenuItems: menuItems(where: { location:  $headerLocation  }, first: 80) {
      nodes {
        ...NcPrimaryMenuFieldsFragment
      }
    }
    footerMenuItems: menuItems(where: { location:  $footerLocation  }, first: 50) {
      nodes {
        ...NcFooterMenuFieldsFragment
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