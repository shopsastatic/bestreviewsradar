import React, { useState, useEffect } from 'react'
import { ChevronRight, ChevronLeft, X } from 'lucide-react';
import Link from 'next/link';

export interface NavMobileProps {
	menuItems: any
	onClickClose?: () => void
}

const NavMobile: React.FC<NavMobileProps> = ({
	menuItems,
	onClickClose,
}) => {
	const [selectedMenu, setSelectedMenu] = useState(null);
	const [menuDirection, setMenuDirection] = useState('forward');
	const [loading, setLoading] = useState(!menuItems || menuItems.length === 0);

	useEffect(() => {
		// Set loading to false if menuItems is already populated
		if (menuItems && menuItems.length > 0) {
			setLoading(false);
		}
	}, [menuItems]);

	const handleMenuSelect = (menuId: any) => {
		setMenuDirection('forward');
		setSelectedMenu(menuId);
	};

	const handleBack = () => {
		setMenuDirection('backward');
		setTimeout(() => setSelectedMenu(null), 300);
	};

	function transformMenuItems(items: any) {
		const parentItems = items.filter((item: any) => !item.parentId);

		return parentItems.map((parent: any) => {
			const children = items.filter((item: any) => item.parentId === parent.id);
			return {
				id: parent.id,
				name: parent.label,
				uri: parent.uri,
				...(children.length > 0 && {
					subCategories: children.map((child: any) => ({
						name: child.label,
						slug: getLastPath(child.uri),
						id: child.id
					}))
				})
			};
		});
	}

	const mainMenus = transformMenuItems(menuItems);

	function getLastPath(url: any) {
		const cleanUrl = url.replace(/\/$/, '');
		return cleanUrl.split('/').pop() + '/';
	}

	return (
		<div>
			<div className="fixed left-0 top-0 bottom-0 w-96 bg-white text-gray-900 shadow-xl overflow-hidden max-w-full">
				<div className="relative h-full">
					{/* Main Menu */}
					<div
						className={`absolute inset-0 w-full transform transition-transform duration-300 ${selectedMenu
							? menuDirection === 'forward'
								? '-translate-x-full'
								: 'translate-x-0'
							: 'translate-x-0'
							}`}
					>
						<div className="h-full flex flex-col">
							<div className="p-4 border-b flex items-center justify-between bg-gray-50">
								<h2 className="font-semibold text-xl">All Categories</h2>
								<button
									onClick={onClickClose}
									className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
								>
									<X className="w-5 h-5" />
								</button>
							</div>

							<div className="flex-1 overflow-y-auto">
								{loading ? (
									<SkeletonMenu />
								) : (
									mainMenus.map((menu: any) => (
										<button
											key={menu.id}
											onClick={() => handleMenuSelect(menu.id)}
											className="w-full p-4 flex items-center justify-between hover:bg-gray-50 border-b transition-colors"
										>
											<div className="flex items-center gap-3">
												<div className="text-gray-600">{menu.icon}</div>
												<span>{menu.name}</span>
											</div>
											<ChevronRight className="w-5 h-5 text-gray-600" />
										</button>
									))
								)}
							</div>
						</div>
					</div>

					{/* Sub Menu */}
					<div
						className={`absolute inset-0 w-full transform transition-transform duration-300 ${selectedMenu
							? menuDirection === 'forward'
								? 'translate-x-0'
								: 'translate-x-full'
							: 'translate-x-full'
							}`}
					>
						{selectedMenu && (
							<div className="h-full flex flex-col">
								<div className="p-4 border-b flex items-center gap-4 bg-gray-50">
									<button
										onClick={handleBack}
										className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
									>
										<ChevronLeft className="w-5 h-5" />
									</button>
									<div className="flex items-center gap-2">
										{mainMenus.find((m: any) => m.id === selectedMenu)?.icon}
										<span className="font-semibold">
											{mainMenus.find((m: any) => m.id === selectedMenu)?.name}
										</span>
									</div>
								</div>

								<div className="flex-1 overflow-y-auto">
									<div className="p-4 space-y-4">
										{mainMenus
											.find((m: any) => m.id === selectedMenu)
											?.subCategories?.map((subCategory: any, index: any) => (
												<Link
													key={index}
													href={subCategory.slug ?? "/"}
													className="block py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
												>
													<div className="flex items-center justify-between">
														<span>{subCategory.name}</span>
														<ChevronRight className="w-5 h-5 text-gray-600" />
													</div>
												</Link>
											))}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

const SkeletonMenu = () => (
	<div className="space-y-2 p-4">
		{Array.from({ length: 6 }).map((_, i) => (
			<div key={i} className="flex items-center justify-between p-4 bg-gray-200 rounded-lg animate-pulse">
				<div className="flex items-center gap-3">
					<div className="w-5 h-5 bg-gray-300 rounded-full"></div>
					<div className="w-2/3 h-4 bg-gray-300 rounded-md"></div>
				</div>
				<div className="w-5 h-5 bg-gray-300 rounded-full"></div>
			</div>
		))}
	</div>
);

export default NavMobile;
