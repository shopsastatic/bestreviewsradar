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
	Mail,
	MessageCircle,
	Phone,
	MapPin,
	Clock,
	Send,
	Facebook,
	Twitter,
	Linkedin,
	Instagram,
	HelpCircle,
	FileText,
	Users,
	Building
} from 'lucide-react';
import { useState } from 'react'

const Page: FaustPage<GetReadingListPageQuery> = (props: any) => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		subject: 'General Inquiry',
		message: ''
	});

	const [loading, setLoading] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<{
		type: 'success' | 'error' | null;
		message: string;
	}>({ type: null, message: '' });
	const contactMethods = [
		{
			icon: <Mail className="w-6 h-6" />,
			title: "Email Us",
			description: "Send us your queries anytime",
			availability: "Response within 24 hours",
			action: "Send Email",
			isPrimary: false
		},
	];

	const faqs = [
		{
			question: "How do you select products for review?",
			answer: "We choose products based on market demand, innovation, and consumer interest. Our selection process involves thorough market research and user feedback."
		},
		{
			question: "Can I suggest a product for review?",
			answer: "Yes! We welcome product suggestions from our community. Use our suggestion form to submit products you'd like us to review."
		},
		{
			question: "How often do you update reviews?",
			answer: "We regularly update our reviews to reflect new product releases, market changes, and long-term testing results."
		}
	];

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setSubmitStatus({ type: null, message: '' });

		try {
			const response = await fetch('${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/custom/v1/contact-form', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (data.status === 'success') {
				setSubmitStatus({
					type: 'success',
					message: 'Thank you for your message. We will contact you soon!'
				});
				setFormData({
					firstName: '',
					lastName: '',
					email: '',
					subject: 'General Inquiry',
					message: ''
				});
			} else {
				throw new Error(data.message);
			}
		} catch (error) {
			setSubmitStatus({
				type: 'error',
				message: 'Sorry, there was an error sending your message. Please try again later.' + error
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<PageLayout
			headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
			footerMenuItems={props.data?.footerMenuItems?.nodes || []}
			pageFeaturedImageUrl={null}
			pageTitle="Contact"
			generalSettings={
				props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
			}
		>
			<div className="bg-gray-50">
				{/* Hero Section */}
				<div className="relative bg-gray-900 text-white">
					<div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-purple-500/20" />
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
						<div className="text-center">
							<h1 className="text-4xl md:text-5xl font-bold mb-6">
								We're Here to
								<span className="text-blue-400"> Help You</span>
							</h1>
							<p className="text-xl text-gray-300 max-w-2xl mx-auto">
								Have questions about our reviews or need help finding the right product? Our team is here to assist you.
							</p>
						</div>
					</div>
				</div>

				{/* Contact Methods */}
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
					<div className="grid grid-cols-1 gap-6 max-w-[420px] m-auto">
						{contactMethods.map((method, index) => (
							<div key={index} className="bg-white rounded-xl shadow-sm p-6">
								<div className="flex flex-col items-center text-center">
									<div className={`p-3 rounded-xl mb-4 ${method.isPrimary ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
										}`}>
										{method.icon}
									</div>
									<h3 className="text-xl font-bold mb-2">{method.title}</h3>
									<p className="text-gray-600 mb-2">{method.description}</p>
									<div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
										<Clock className="w-4 h-4" />
										<span>{method.availability}</span>
									</div>
									{/* <button className={`px-6 py-2 rounded-lg transition-colors ${method.isPrimary
										? 'bg-blue-500 text-white hover:bg-blue-600'
										: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
										}`}>
										{method.action}
									</button> */}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Contact Form Section */}
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
					<div className="grid lg:grid-cols-2 gap-12">
						{/* Form */}
						<div className="bg-white rounded-xl shadow-sm p-8">
							<h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											First Name
										</label>
										<input
											type="text"
											name="firstName"
											value={formData.firstName}
											onChange={handleInputChange}
											required
											className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Last Name
										</label>
										<input
											type="text"
											name="lastName"
											value={formData.lastName}
											onChange={handleInputChange}
											required
											className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
										/>
									</div>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Email Address
									</label>
									<input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleInputChange}
										required
										className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Subject
									</label>
									<select
										name="subject"
										value={formData.subject}
										onChange={handleInputChange}
										className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
									>
										<option>General Inquiry</option>
										<option>Product Review Request</option>
										<option>Partnership Opportunity</option>
										<option>Technical Support</option>
										<option>Other</option>
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Message
									</label>
									<textarea
										name="message"
										value={formData.message}
										onChange={handleInputChange}
										required
										rows={4}
										className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
									></textarea>
								</div>

								{submitStatus.type && (
									<div className={`p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
										}`}>
										{submitStatus.message}
									</div>
								)}

								<button
									type="submit"
									disabled={loading}
									className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
								>
									{loading ? (
										<>
											<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
											<span>Sending...</span>
										</>
									) : (
										<>
											<Send className="w-4 h-4" />
											<span>Send Message</span>
										</>
									)}
								</button>
							</form>
						</div>

						{/* Info & FAQs */}
						<div className="space-y-8">
							{/* Company Info */}
							{/* <div className="bg-white rounded-xl shadow-sm p-8">
								<h3 className="text-xl font-bold mb-6">Company Information</h3>
								<div className="space-y-4">
									<div className="flex items-start gap-4">
										<div className="p-2 bg-gray-100 rounded-lg">
											<Building className="w-5 h-5 text-gray-600" />
										</div>
										<div>
											<h4 className="font-medium">Office Address</h4>
											<p className="text-gray-600">123 Review Street, Tech City, TC 12345</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<div className="p-2 bg-gray-100 rounded-lg">
											<Clock className="w-5 h-5 text-gray-600" />
										</div>
										<div>
											<h4 className="font-medium">Business Hours</h4>
											<p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
										</div>
									</div>
								</div>


								<div className="mt-6 pt-6 border-t">
									<h4 className="font-medium mb-4">Follow Us</h4>
									<div className="flex gap-4">
										{[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
											<a
												key={index}
												href="#"
												className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors"
											>
												<Icon className="w-5 h-5" />
											</a>
										))}
									</div>
								</div>
							</div> */}

							{/* FAQs */}
							<div className="bg-white rounded-xl shadow-sm p-8">
								<h3 className="text-xl font-bold mb-6">Frequently Asked Questions</h3>
								<div className="space-y-6">
									{faqs.map((faq, index) => (
										<div key={index}>
											<h4 className="font-medium flex items-center gap-2 mb-2">
												<HelpCircle className="w-5 h-5 text-blue-500" />
												{faq.question}
											</h4>
											<p className="text-gray-600 ml-7">{faq.answer}</p>
										</div>
									))}
								</div>
							</div>
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

// Note***: tat ca cac query trong cac page deu phai co generalSettings, no duoc su dung o compoent Wrap
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
