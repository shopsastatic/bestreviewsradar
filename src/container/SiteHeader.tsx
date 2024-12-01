import { FC } from 'react'
import { useThemeMode } from '@/hooks/useThemeMode'
import MainNav1 from '@/components/Header/MainNav1'

interface Props {
	menuItems: any
	siteTitle?: string | null
	siteDescription?: string | null
	sidebarMenuItems: any
}

const SiteHeader: FC<Props> = ({ menuItems, siteDescription, siteTitle, sidebarMenuItems }) => {
	//
	useThemeMode()

	//

	const renderHeader = () => {
		return (
			<MainNav1
				menuItems={menuItems}
				sidebarMenuItems={sidebarMenuItems}
				title={siteTitle}
				description={siteDescription}
			/>
		)
	}

	return (
		<>
			<div className="w-full">{renderHeader()}</div>
		</>
	)
}

export default SiteHeader
