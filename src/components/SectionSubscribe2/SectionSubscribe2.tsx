import { FC } from 'react'
import Badge from '@/components/Badge/Badge'
import MyImage from '../MyImage'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import AddSubscriberForm from '../AddSubscriberForm'

export interface SectionSubscribe2Props {
	className?: string
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = '' }) => {
	if (NC_SITE_SETTINGS.newsletter_section?.enable === false) {
		return null
	}

	return (
		<div className="flex-shrink-0 lg:w-2/5 m-auto">
			<h2 className="text-4xl font-semibold text-center">
				{NC_SITE_SETTINGS.newsletter_section?.title}
			</h2>
			<span className="mt-6 block text-neutral-500 dark:text-neutral-400">
				{NC_SITE_SETTINGS.newsletter_section?.description}
			</span>
			<AddSubscriberForm className="relative mt-10 max-w-sm" />
		</div>
	)
}

export default SectionSubscribe2
