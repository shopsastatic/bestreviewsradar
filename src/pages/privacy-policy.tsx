import { gql } from '@/__generated__'
import { FaustPage, getNextStaticProps } from '@faustwp/core'
import PageLayout from '@/container/PageLayout'
import {
    GetPrivacyPageQuery,
    NcgeneralSettingsFieldsFragmentFragment,
} from '@/__generated__/graphql'
import Heading from '@/components/Heading/Heading'
import { FOOTER_LOCATION, PRIMARY_LOCATION, SIDEBAR_LOCATION } from '@/contains/menu'
import { GetStaticPropsContext } from 'next'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import {
    Shield,
    Lock,
    Mail,
    ArrowDown,
    ExternalLink,
    PrinterIcon
} from 'lucide-react';

const Page: FaustPage<GetPrivacyPageQuery> = (props: any) => {

    return (
        <PageLayout
            headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
            footerMenuItems={props.data?.footerMenuItems?.nodes || []}
            sidebarMenuItems={props.data?.sidebarMenuItems?.nodes || []}
            pageFeaturedImageUrl={null}
            pageTitle="Privacy Policy"
            generalSettings={
                props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
            }
        >
            <div className="bg-gray-50">
                {/* Header */}
                <div className="bg-gray-900 text-white">
                    <div className="max-w-3xl mx-auto px-6 py-20">
                        <div className="flex items-center gap-6 mb-8">
                            <Lock className="w-10 h-10 text-blue-400" />
                            <h1 className="text-4xl font-bold">Privacy Policy</h1>
                        </div>
                        <p className="text-xl text-gray-300">
                            Last updated: January 15, 2024
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-3xl mx-auto px-6 py-12">
                    <div className="space-y-16">
                        {/* Overview */}
                        <section id="overview">
                            <h2 className="text-3xl font-bold mb-6">Overview</h2>
                            <p className="text-lg leading-relaxed text-gray-600">
                                We are committed to protecting your privacy and ensuring the security of your personal information. This policy explains how we collect, use, and safeguard your data.
                            </p>
                        </section>

                        {/* Information We Collect */}
                        <section id="information-collected">
                            <h2 className="text-3xl font-bold mb-6">Information We Collect</h2>
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold mb-4">Personal Information:</h3>
                                    <ul className="list-disc list-inside text-gray-600 space-y-3 text-lg ml-4">
                                        <li>Name and email address when you create an account</li>
                                        <li>Contact information when you submit inquiries</li>
                                        <li>Profile preferences and settings</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4">Usage Information:</h3>
                                    <ul className="list-disc list-inside text-gray-600 space-y-3 text-lg ml-4">
                                        <li>Browser type and version</li>
                                        <li>Operating system</li>
                                        <li>Pages visited and features used</li>
                                        <li>Time spent on our platform</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* How We Use Your Information */}
                        <section id="use-information">
                            <h2 className="text-3xl font-bold mb-6">How We Use Your Information</h2>
                            <div className="space-y-6">
                                <p className="text-lg leading-relaxed text-gray-600">We use your information for the following purposes:</p>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-xl font-bold mb-4">Service Improvement</h3>
                                        <ul className="list-disc list-inside text-gray-600 space-y-3 text-lg ml-4">
                                            <li>Deliver personalized recommendations</li>
                                            <li>Enhance user experience</li>
                                            <li>Develop new features</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-4">Communication</h3>
                                        <ul className="list-disc list-inside text-gray-600 space-y-3 text-lg ml-4">
                                            <li>Send important updates</li>
                                            <li>Respond to inquiries</li>
                                            <li>Share product information</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <p className="text-lg leading-relaxed text-gray-600">
                                BestReviewsRadar including its subsidiaries and affiliates (collectively, "Company", "us", "our" or "we"), values your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, store, disclose, and process Personal Information about individuals using our products, services, websites, and features (collectively, the "Services").
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6">1. Types of Personal Information We Collect</h2>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold mb-4">1.1 Contact Information</h3>
                                    <p className="text-lg leading-relaxed text-gray-600">
                                        When you interact with our website through contact forms or partnership inquiries, you may provide your name, company name, business email, telephone number, and other details. We process this data to provide our Services, ensure security, and communicate with you, including sending newsletters and promotional offers.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4">1.2 Recruitment Information</h3>
                                    <p className="text-lg leading-relaxed text-gray-600">
                                        When you submit your resume, we collect information to assess your skills and suitability for positions. This may include your name, email, phone number, work experience, education, profile photo, LinkedIn URL, references, certifications, and other relevant information.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4">1.3 Third-Party Information</h3>
                                    <p className="text-lg leading-relaxed text-gray-600">
                                        We may receive Personal Information from sources like LinkedIn profiles, recruitment agencies, headhunters, and referrals. We also collect data about your interaction with our ads or Services through third-party properties.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4">1.4 Communication Records</h3>
                                    <p className="text-lg leading-relaxed text-gray-600">
                                        We retain communications with us to process inquiries, respond to requests, and improve our Services. You'll be asked to opt-in for newsletters and promotional communications, with the option to unsubscribe at any time.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4">1.5 Technical Data</h3>
                                    <p className="text-lg leading-relaxed text-gray-600">
                                        We automatically collect information about your browser, including IP address, geolocation data, browser identifiers, internet service provider, connection speed, search history, and device attributes. This helps us understand usage trends and enhance our Services.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4">1.6 Legal and Compliance Data</h3>
                                    <p className="text-lg leading-relaxed text-gray-600">
                                        We use Personal Information to prevent prohibited activities, enforce our rights, protect our databases, and comply with legal obligations.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6">2. Legal Bases for Processing</h2>
                            <p className="text-lg leading-relaxed text-gray-600 mb-4">We process your Personal Information based on:</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-3 text-lg ml-4">
                                <li>Your explicit consent</li>
                                <li>Contract performance necessity</li>
                                <li>Our legitimate interests</li>
                                <li>Legal obligations</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6">3. Information Sharing</h2>
                            <p className="text-lg leading-relaxed text-gray-600">
                                We may share your Personal Information within our group and with third-party service providers who help maintain and improve our Services. All data processing complies with this Privacy Policy and applicable laws, with appropriate security safeguards in place.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6">3. Information Sharing</h2>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold mb-4">3.1 Entities Within the Company's Group</h3>
                                    <p className="text-lg leading-relaxed text-gray-600">
                                        We share Personal Information internally within our Company's Group for administrative, management, and business-related purposes to operate and improve our Services.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4">3.2 Service Providers</h3>
                                    <p className="text-lg leading-relaxed text-gray-600">
                                        We may share data with third parties that provide services including hosting, storage, analytics, advertising, marketing, database management, user engagement, and cybersecurity. This includes our business, legal, and financial advisors.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4">3.3 Advertisers</h3>
                                    <p className="text-lg leading-relaxed text-gray-600">
                                        We partner with third-party advertisers to display relevant advertising on our Services and other platforms. These partnerships involve tracking technologies to customize advertising based on your browsing activities and interests.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4">3.4 Legal and Regulatory Entities</h3>
                                    <p className="text-lg leading-relaxed text-gray-600">
                                        We may disclose Personal Information when legally required or to protect our rights, investigate potential violations, or respond to legal and regulatory authorities' verified requests.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4">3.5 Mergers and Acquisitions</h3>
                                    <p className="text-lg leading-relaxed text-gray-600">
                                        Personal Information may be disclosed during corporate transactions, including mergers, sales, transfers, investments, acquisitions, or similar events.
                                    </p>
                                </div>
                            </div>
                        </section>
                        <section>
                            <h2 className="text-3xl font-bold mb-6">4. Security and Data Retention</h2>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold mb-4">4.1 Retention Policy</h3>
                                    <p className="text-lg leading-relaxed text-gray-600">
                                        We retain Personal Information as long as necessary for the original purpose of collection or to comply with legal requirements. Once no longer needed, data is deleted or anonymized.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4">4.2 Security Measures</h3>
                                    <p className="text-lg leading-relaxed text-gray-600">
                                        While we implement industry-standard security measures, no Internet transmission is 100% secure. We encourage discretion in sharing Personal Information through our Services.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6">5. International Data Transfers</h2>
                            <p className="text-lg leading-relaxed text-gray-600 mb-4">
                                Our Services may process data internationally, with servers located worldwide. We ensure appropriate safeguards through mechanisms like EC approved standard contractual clauses or the EU-US Data Privacy Framework. For transfers outside the EEA or UK, we implement adequate data protection measures.
                            </p>
                            <p className="text-lg leading-relaxed text-gray-600">
                                Reference: <a href="https://eur-lex.europa.eu/eli/dec_impl/2021/914/oj" className="text-blue-600 hover:text-blue-800">Standard Contractual Clauses</a>
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6">6. Your Rights</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold mb-4">6.1 Access and Rectification</h3>
                                    <p className="text-lg leading-relaxed text-gray-600">You can access, review, and correct your Personal Information.</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4">6.2 Deletion and Restriction</h3>
                                    <p className="text-lg leading-relaxed text-gray-600">You may request deletion or restriction of your Personal Information processing.</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4">6.3 Consent Withdrawal</h3>
                                    <p className="text-lg leading-relaxed text-gray-600">You can withdraw previously given consent at any time.</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4">6.4 Data Portability</h3>
                                    <p className="text-lg leading-relaxed text-gray-600">Request transfer of your Personal Information where technically feasible.</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4">6.5 Advertising Opt-Out</h3>
                                    <p className="text-lg leading-relaxed text-gray-600">Opt-out of cross-contextual behavioral advertising.</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4">6.6 Non-Discrimination</h3>
                                    <p className="text-lg leading-relaxed text-gray-600">Exercise your rights without fear of unlawful discrimination.</p>
                                </div>

                                <div className="mt-8">
                                    <p className="text-lg leading-relaxed text-gray-600">EU/UK Residents: You have the right to lodge complaints with your local data protection authority.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6">7. Cookies</h2>
                            <p className="text-lg leading-relaxed text-gray-600 mb-6">
                                We use temporary and persistent cookies to enhance and personalize your experience. You can manage cookie preferences through your browser settings. For detailed information, see our <a href="https://ww.bestreviewsradar.com/cookies" className="text-blue-600 hover:text-blue-800">Cookie Policy</a>.
                            </p>
                            <p className="text-lg leading-relaxed text-gray-600 mb-4">We also use web beacons for various purposes, including:</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-3 text-lg ml-4">
                                <li>Cookie delivery</li>
                                <li>Visit counting</li>
                                <li>Email engagement tracking</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6">8. Minors</h2>
                            <p className="text-lg leading-relaxed text-gray-600 mb-6">
                                We do not knowingly collect or process Personal Information from individuals under the age of majority ("Minors") without parental or legal guardian consent. By using our Services, you confirm that you are at least the age of majority in your jurisdiction.
                            </p>
                            <p className="text-lg leading-relaxed text-gray-600">
                                If you believe a Minor's Personal Information has been provided to us without proper consent, please contact us immediately for data removal.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6">9. Third-Party Websites and Services</h2>
                            <p className="text-lg leading-relaxed text-gray-600 mb-6">
                                Our Services may contain links to other websites or services. We are not responsible for their privacy practices. Please review the privacy policies of any third-party services you interact with.
                            </p>
                            <p className="text-lg leading-relaxed text-gray-600">
                                This Privacy Policy applies exclusively to our Services.
                            </p>
                        </section>

                        <section className="us-residents">
                            <h2 className="text-3xl font-bold mb-6">10. Additional Disclosures to U.S. Residents</h2>
                            <p className="text-lg leading-relaxed text-gray-600 mb-8">
                                The following rights and obligations apply to U.S. residents according to applicable state privacy laws.
                            </p>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold mb-6">A. Collection, Disclosure and Sharing of Personal Information</h3>
                                    <p className="text-lg leading-relaxed text-gray-600 mb-4">
                                        In the preceding 12 months, we have collected the following Personal Information:
                                    </p>

                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-gray-200">
                                                    <th className="text-left py-4 pr-4 font-bold text-gray-700">Categories of Personal Information</th>
                                                    <th className="text-left py-4 pl-4 font-bold text-gray-700">Data Types</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                <tr>
                                                    <td className="py-4 pr-4">Identifiers</td>
                                                    <td className="py-4 pl-4">IP address, name, surname, email, phone number</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-4 pr-4">California Customer Records Information</td>
                                                    <td className="py-4 pl-4">Name, address, telephone number, education and employment information</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-4 pr-4">Internet or Network Activity</td>
                                                    <td className="py-4 pl-4">Service interactions, IP addresses, device identifiers, operating system, browser version</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-4 pr-4">Geolocation Data</td>
                                                    <td className="py-4 pl-4">IP address and geographic location</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-4 pr-4">Professional Information</td>
                                                    <td className="py-4 pl-4">Business partners: title, profession, employer; Candidates: current and past job history</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold mb-4">Sources of Information</h3>
                                    <p className="text-lg leading-relaxed text-gray-600 mb-4">In the preceding 12 months, we have collected Personal Information from:</p>
                                    <ol className="list-decimal list-inside space-y-3 text-lg text-gray-600 ml-4">
                                        <li>Direct sources: Through forms and activities on our Services</li>
                                        <li>Indirect sources: Tracking your internet activities and interactions with content</li>
                                        <li>Third-party sources: Advertisers, service providers, analytics providers, social networks</li>
                                    </ol>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold mb-4">Information Sharing Practices</h3>
                                    <p className="text-lg leading-relaxed text-gray-600 mb-6">
                                        While we don't "Sell" Personal Information, we do "Share" it as defined under US Privacy Laws.
                                    </p>

                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-gray-200">
                                                    <th className="text-left py-4 pr-4 font-bold text-gray-700">Category of Recipient</th>
                                                    <th className="text-left py-4 px-4 font-bold text-gray-700">Type of Data</th>
                                                    <th className="text-left py-4 pl-4 font-bold text-gray-700">Disclosed or Shared</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                <tr>
                                                    <td className="py-4 pr-4">Advertisers</td>
                                                    <td className="py-4 px-4">Unique identifiers, IP address, user activity data</td>
                                                    <td className="py-4 pl-4">Shared</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-4 pr-4">Service Providers</td>
                                                    <td className="py-4 px-4">All types of Personal Information</td>
                                                    <td className="py-4 pl-4" rowSpan={4}>Disclosed</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-4 pr-4">Business Acquirers</td>
                                                    <td className="py-4 px-4">All types of Personal Information</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-4 pr-4">Company Group Entities</td>
                                                    <td className="py-4 px-4">All types of Personal Information</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-4 pr-4">Legal/Regulatory Entities</td>
                                                    <td className="py-4 px-4">As required by law enforcement</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold mb-4">Collection and Use Purposes</h3>
                                    <ol className="list-decimal list-inside space-y-3 text-lg text-gray-600 ml-4">
                                        <li>Interaction auditing</li>
                                        <li>Legal compliance</li>
                                        <li>Security and fraud prevention</li>
                                        <li>Debugging</li>
                                        <li>Service performance</li>
                                        <li>Technical improvement research</li>
                                        <li>Internal operations</li>
                                        <li>Service maintenance and improvement</li>
                                        <li>Short-term, transient use</li>
                                    </ol>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold mb-4">Request Metrics</h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-gray-200">
                                                    <th className="text-left py-4 pr-4 font-bold text-gray-700">Request Type</th>
                                                    <th className="text-left py-4 px-4 font-bold text-gray-700">Requests Received</th>
                                                    <th className="text-left py-4 px-4 font-bold text-gray-700">Requests Complied</th>
                                                    <th className="text-left py-4 px-4 font-bold text-gray-700">Requests Denied</th>
                                                    <th className="text-left py-4 pl-4 font-bold text-gray-700">Average Response Time</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                <tr>
                                                    <td className="py-4 pr-4">Deletion requests</td>
                                                    <td className="py-4 px-4">-</td>
                                                    <td className="py-4 px-4">-</td>
                                                    <td className="py-4 px-4">-</td>
                                                    <td className="py-4 pl-4">-</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-4 pr-4">Information requests</td>
                                                    <td className="py-4 px-4">-</td>
                                                    <td className="py-4 px-4">-</td>
                                                    <td className="py-4 px-4">-</td>
                                                    <td className="py-4 pl-4">-</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-4 pr-4">Opt-out requests</td>
                                                    <td className="py-4 px-4">-</td>
                                                    <td className="py-4 px-4">-</td>
                                                    <td className="py-4 px-4">-</td>
                                                    <td className="py-4 pl-4">-</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-4 pr-4">Limitation requests</td>
                                                    <td className="py-4 px-4">-</td>
                                                    <td className="py-4 px-4">-</td>
                                                    <td className="py-4 px-4">-</td>
                                                    <td className="py-4 pl-4">-</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4">Do Not Track Notices</h3>
                                    <p className="text-lg leading-relaxed text-gray-600">
                                        California residents can request information about our disclosure of Personal Information to third parties for direct marketing purposes. Please note that we do not respond to "Do Not Track" signals.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6">12. Changes to Privacy Policy</h2>
                            <p className="text-lg leading-relaxed text-gray-600">
                                We reserve the right to update this Privacy Policy. Significant changes will be communicated via email or prominent notice on our Services. We recommend periodic review of this policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6">13. Contact Information</h2>
                            <div className="space-y-4">
                                <p className="text-lg leading-relaxed text-gray-600">
                                    For questions or concerns about this Privacy Policy or our data practices, please contact us at:
                                </p>
                                <p>
                                    <a href="mailto:privacy@bestreviewsradar.com" className="text-lg text-blue-600 hover:text-blue-800">
                                        privacy@bestreviewsradar.com
                                    </a>
                                </p>
                            </div>
                        </section>
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

Page.query = gql(`
  query GetPrivacyPage($headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!, $sidebarLocation: MenuLocationEnum!) {
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
    sidebarMenuItems: menuItems(where: {location:$sidebarLocation}, first: 200) {
      nodes {
        ...sidebarMenuFieldsFragment
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