import { FaustPage } from "@faustwp/core";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Page: FaustPage<{}> = () => {
    const router = useRouter();

    return <div>
        <h1>Privacy Policy</h1>
        <p className="date">Last updated: March 2024</p>

        <section>
            <p>BestReviewsRadar including its subsidiaries and affiliates (collectively, "Company", "us", "our" or "we"), values your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, store, disclose, and process Personal Information about individuals using our products, services, websites, and features (collectively, the "Services").</p>
        </section>

        <section>
            <h2>Welcome</h2>
            <p>This Privacy Policy governs how we handle your Personal Information. "Personal Information" (under US privacy laws) or "Personal Data" (under GDPR) refers to any information that can identify a natural person, directly or indirectly, including name, location data, origin, online identifiers, and economic, cultural, or social identity factors.</p>

            <div className="contact-info">
                <p>For questions about this Privacy Policy, contact us at: <a href="mailto:privacy@bestreviewsradar.com">privacy@bestreviewsradar.com</a></p>
                <p>View our Terms of Use at: <a href="https://ww.bestreviewsradar.com/terms/">https://ww.bestreviewsradar.com/terms</a></p>
            </div>
        </section>

        <section>
            <h2>1. Types of Personal Information We Collect</h2>

            <h3>1.1 Contact Information</h3>
            <p>When you interact with our website through contact forms or partnership inquiries, you may provide your name, company name, business email, telephone number, and other details. We process this data to provide our Services, ensure security, and communicate with you, including sending newsletters and promotional offers.</p>

            <h3>1.2 Recruitment Information</h3>
            <p>When you submit your resume, we collect information to assess your skills and suitability for positions. This may include your name, email, phone number, work experience, education, profile photo, LinkedIn URL, references, certifications, and other relevant information.</p>

            <h3>1.3 Third-Party Information</h3>
            <p>We may receive Personal Information from sources like LinkedIn profiles, recruitment agencies, headhunters, and referrals. We also collect data about your interaction with our ads or Services through third-party properties.</p>

            <h3>1.4 Communication Records</h3>
            <p>We retain communications with us to process inquiries, respond to requests, and improve our Services. You'll be asked to opt-in for newsletters and promotional communications, with the option to unsubscribe at any time.</p>

            <h3>1.5 Technical Data</h3>
            <p>We automatically collect information about your browser, including IP address, geolocation data, browser identifiers, internet service provider, connection speed, search history, and device attributes. This helps us understand usage trends and enhance our Services.</p>

            <h3>1.6 Legal and Compliance Data</h3>
            <p>We use Personal Information to prevent prohibited activities, enforce our rights, protect our databases, and comply with legal obligations.</p>
        </section>

        <section>
            <h2>2. Legal Bases for Processing</h2>
            <p>We process your Personal Information based on:</p>
            <p>- Your explicit consent</p>
            <p>- Contract performance necessity</p>
            <p>- Our legitimate interests</p>
            <p>- Legal obligations</p>
        </section>

        <section>
            <h2>3. Information Sharing</h2>
            <p>We may share your Personal Information within our group and with third-party service providers who help maintain and improve our Services. All data processing complies with this Privacy Policy and applicable laws, with appropriate security safeguards in place.</p>
        </section>

        <section>
            <h2>3. Information Sharing</h2>

            <h3>3.1 Entities Within the Company's Group</h3>
            <p>We share Personal Information internally within our Company's Group for administrative, management, and business-related purposes to operate and improve our Services.</p>

            <h3>3.2 Service Providers</h3>
            <p>We may share data with third parties that provide services including hosting, storage, analytics, advertising, marketing, database management, user engagement, and cybersecurity. This includes our business, legal, and financial advisors.</p>

            <h3>3.3 Advertisers</h3>
            <p>We partner with third-party advertisers to display relevant advertising on our Services and other platforms. These partnerships involve tracking technologies to customize advertising based on your browsing activities and interests.</p>

            <h3>3.4 Legal and Regulatory Entities</h3>
            <p>We may disclose Personal Information when legally required or to protect our rights, investigate potential violations, or respond to legal and regulatory authorities' verified requests.</p>

            <h3>3.5 Mergers and Acquisitions</h3>
            <p>Personal Information may be disclosed during corporate transactions, including mergers, sales, transfers, investments, acquisitions, or similar events.</p>
        </section>

        <section>
            <h2>4. Security and Data Retention</h2>

            <h3>4.1 Retention Policy</h3>
            <p>We retain Personal Information as long as necessary for the original purpose of collection or to comply with legal requirements. Once no longer needed, data is deleted or anonymized.</p>

            <div className="warning-text">
                <h3>4.2 Security Measures</h3>
                <p>While we implement industry-standard security measures, no Internet transmission is 100% secure. We encourage discretion in sharing Personal Information through our Services.</p>
            </div>
        </section>

        <section>
            <h2>5. International Data Transfers</h2>
            <p>Our Services may process data internationally, with servers located worldwide. We ensure appropriate safeguards through mechanisms like EC approved standard contractual clauses or the EU-US Data Privacy Framework. For transfers outside the EEA or UK, we implement adequate data protection measures.</p>
            <p>Reference: <a href="https://eur-lex.europa.eu/eli/dec_impl/2021/914/oj">Standard Contractual Clauses</a></p>
        </section>

        <section>
            <h2>6. Your Rights</h2>
            <div className="rights-section">
                <h3>6.1 Access and Rectification</h3>
                <p>You can access, review, and correct your Personal Information.</p>

                <h3>6.2 Deletion and Restriction</h3>
                <p>You may request deletion or restriction of your Personal Information processing.</p>

                <h3>6.3 Consent Withdrawal</h3>
                <p>You can withdraw previously given consent at any time.</p>

                <h3>6.4 Data Portability</h3>
                <p>Request transfer of your Personal Information where technically feasible.</p>

                <h3>6.5 Advertising Opt-Out</h3>
                <p>Opt-out of cross-contextual behavioral advertising.</p>

                <h3>6.6 Non-Discrimination</h3>
                <p>Exercise your rights without fear of unlawful discrimination.</p>
            </div>

            <p className="warning-text">EU/UK Residents: You have the right to lodge complaints with your local data protection authority.</p>
        </section>

        <section>
            <h2>7. Cookies</h2>
            <p>We use temporary and persistent cookies to enhance and personalize your experience. You can manage cookie preferences through your browser settings. For detailed information, see our <a href="https://ww.bestreviewsradar.com/cookies">Cookie Policy</a>.</p>
            <p>We also use web beacons for various purposes, including:</p>
            <p>- Cookie delivery</p>
            <p>- Visit counting</p>
            <p>- Email engagement tracking</p>
        </section>

        <section>
            <h2>8. Minors</h2>
            <div className="warning-box">
                <p>We do not knowingly collect or process Personal Information from individuals under the age of majority ("Minors") without parental or legal guardian consent. By using our Services, you confirm that you are at least the age of majority in your jurisdiction.</p>
                <p>If you believe a Minor's Personal Information has been provided to us without proper consent, please contact us immediately for data removal.</p>
            </div>
        </section>

        <section>
            <h2>9. Third-Party Websites and Services</h2>
            <div className="info-box">
                <p>Our Services may contain links to other websites or services. We are not responsible for their privacy practices. Please review the privacy policies of any third-party services you interact with.</p>
                <p>This Privacy Policy applies exclusively to our Services.</p>
            </div>
        </section>

        <section className="us-residents">
            <h2>10. Additional Disclosures to U.S. Residents</h2>
            <p>The following rights and obligations apply to U.S. residents according to applicable state privacy laws.</p>

            <h3>A. Collection, Disclosure and Sharing of Personal Information</h3>
            <p>In the preceding 12 months, we have collected the following Personal Information:</p>

            <table>
                <thead>
                    <tr>
                        <th>Categories of Personal Information</th>
                        <th>Data Types</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Identifiers</td>
                        <td>IP address, name, surname, email, phone number</td>
                    </tr>
                    <tr>
                        <td>California Customer Records Information</td>
                        <td>Name, address, telephone number, education and employment information (from business partners and candidates)</td>
                    </tr>
                    <tr>
                        <td>Internet or Network Activity</td>
                        <td>Service interactions, IP addresses, device identifiers, operating system, browser version, page visits, advertisement interactions, geographic location, log data</td>
                    </tr>
                    <tr>
                        <td>Geolocation Data</td>
                        <td>IP address and geographic location</td>
                    </tr>
                    <tr>
                        <td>Professional Information</td>
                        <td>Business partners: title, profession, employer; Candidates: current and past job history</td>
                    </tr>
                    <tr>
                        <td>Inferences</td>
                        <td>User profiles reflecting preferences and interactions (age, gender, income level, interests)</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section className="us-residents">
            <h3>Sources of Information</h3>
            <div className="sources-list">
                <p>In the preceding 12 months, we have collected Personal Information from:</p>
                <ol>
                    <li>Direct sources: Through forms and activities on our Services</li>
                    <li>Indirect sources: Tracking your internet activities and interactions with content</li>
                    <li>Third-party sources: Advertisers, service providers, analytics providers, social networks, recruitment agencies, and data brokers</li>
                </ol>
            </div>

            <h3>Information Sharing Practices</h3>
            <p>While we don't "Sell" Personal Information, we do "Share" it as defined under US Privacy Laws.</p>

            <table>
                <thead>
                    <tr>
                        <th>Category of Recipient</th>
                        <th>Type of Data</th>
                        <th>Disclosed or Shared</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Advertisers</td>
                        <td>Unique identifiers, IP address, user activity data</td>
                        <td>Shared</td>
                    </tr>
                    <tr>
                        <td>Service Providers</td>
                        <td>All types of Personal Information</td>
                        <td rowspan="4">Disclosed</td>
                    </tr>
                    <tr>
                        <td>Business Acquirers</td>
                        <td>All types of Personal Information</td>
                    </tr>
                    <tr>
                        <td>Company Group Entities</td>
                        <td>All types of Personal Information</td>
                    </tr>
                    <tr>
                        <td>Legal/Regulatory Entities</td>
                        <td>As required by law enforcement</td>
                    </tr>
                </tbody>
            </table>

            <h3>Collection and Use Purposes</h3>
            <div className="sources-list">
                <ol>
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

            <h3>Request Metrics</h3>
            <div className="metrics-table">
                <table>
                    <thead>
                        <tr>
                            <th>Request Type</th>
                            <th>Requests Received</th>
                            <th>Requests Complied</th>
                            <th>Requests Denied</th>
                            <th>Average Response Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Deletion requests</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>Information requests</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>Opt-out requests</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>Limitation requests</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3>Do Not Track Notices</h3>
            <div className="info-box">
                <p>California residents can request information about our disclosure of Personal Information to third parties for direct marketing purposes. Please note that we do not respond to "Do Not Track" signals.</p>
            </div>
        </section>

        <section className="final-sections">
            <h2>12. Changes to Privacy Policy</h2>
            <p>We reserve the right to update this Privacy Policy. Significant changes will be communicated via email or prominent notice on our Services. We recommend periodic review of this policy.</p>

            <h2>13. Contact Information</h2>
            <div className="contact-section">
                <p>For questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
                <p><a href="mailto:privacy@bestreviewsradar.com">privacy@bestreviewsradar.com</a></p>
            </div>
        </section>
    </div>;
};

// export const getStaticPaths: GetStaticPaths = () => {
//     return {
//         paths: [],
//         fallback: "blocking",
//     };
// };

export function getStaticProps(ctx: GetStaticPropsContext) {
    return {
        props: {},
        revalidate: false,
    };
}

export default Page;
