import { NcmazFaustBlockCtaFragmentFragment } from '@/__generated__/graphql'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import { gql, useMutation } from '@apollo/client'
import { WordPressBlock } from '@faustwp/blocks'
import React, { useEffect } from 'react'

const NcmazFaustBlockCta: WordPressBlock<
	NcmazFaustBlockCtaFragmentFragment
> = props => {
	const { renderedHtml } = props || {}

	const initErrorMessage = NC_SITE_SETTINGS.subcription_widget?.error_message
	const initSuccessMessage =
		NC_SITE_SETTINGS.subcription_widget?.success_message || 'Thank you!'
	const blockRef = React.useRef<HTMLDivElement>(null)

	return (
		<>
			<div
				ref={blockRef}
				className="not-prose"
				dangerouslySetInnerHTML={{ __html: renderedHtml || '' }}
			/>
		</>
	)
}

export const NcmazFaustBlockCtaFragments = {
	entry: gql`
		fragment NcmazFaustBlockCtaFragment on NcmazFaustBlockCta {
			renderedHtml
		}
	`,
	key: `NcmazFaustBlockCtaFragment`,
}

NcmazFaustBlockCta.displayName = 'NcmazFaustBlockCta'
export default NcmazFaustBlockCta
