import { FC } from 'react'
import { useThemeMode } from '@/hooks/useThemeMode'
import { FragmentType } from '@/__generated__'
import { NC_PRIMARY_MENU_QUERY_FRAGMENT } from '@/fragments/menu'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import MainNav1 from '@/components/Header/MainNav1'
import { createGlobalState } from 'react-hooks-global-state'

const headerStyle = NC_SITE_SETTINGS.site_header?.desktop_header?.header_style
const initialState = { headerStyle }
export const { useGlobalState: useGlobalStateHeaderStyle } =
	createGlobalState(initialState)

interface Props {
	menuItems: any
	siteTitle?: string | null
	siteDescription?: string | null
}

const SiteHeader: FC<Props> = ({ menuItems, siteDescription, siteTitle }) => {
	//
	useThemeMode()
	const [headerStyle] = useGlobalStateHeaderStyle('headerStyle')

	//

	const renderHeader = () => {
		switch (headerStyle) {
			case 'style1':
				return (
					<MainNav1
						menuItems={menuItems}
						title={siteTitle}
						description={siteDescription}
					/>
				)
			case 'style2':
				return (
					<MainNav1
						menuItems={menuItems}
						title={siteTitle}
						description={siteDescription}
					/>
				)

			default:
				return (
					<MainNav1
						menuItems={menuItems}
						title={siteTitle}
						description={siteDescription}
					/>
				)
		}
	}

	return (
		<>
			<div className="w-full">{renderHeader()}</div>
		</>
	)
}

export default SiteHeader
