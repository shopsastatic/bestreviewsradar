'use client'

import React, { useState } from 'react'
import { FragmentType } from '@/__generated__'
import { NC_PRIMARY_MENU_QUERY_FRAGMENT } from '@/fragments/menu'
import Link from 'next/link'
import {
	ChevronRight,
	ChevronLeft,
	Smartphone,
	Monitor,
	Home,
	Wrench,
	Heart,
	Sparkles,
	Briefcase,
	Flower,
	Dumbbell,
	Music2,
	Scissors,
	BookOpen,
	Music,
	Palette,
	Settings,
	Activity,
	Laptop,
	X,

} from 'lucide-react';


export interface NavMobileProps {
	menuItems: any,
	sidebarItems: any,
	onClickClose?: () => void
}

const NavMobile: React.FC<NavMobileProps> = ({
	menuItems: menuItemsProp,
	sidebarItems,
	onClickClose,
}) => {
	const [selectedMenu, setSelectedMenu] = useState(null);
	const [menuDirection, setMenuDirection] = useState('forward');

	const handleMenuSelect = (menuId: any) => {
		setMenuDirection('forward');
		setSelectedMenu(menuId);
	};

	const handleBack = () => {
		setMenuDirection('backward');
		setTimeout(() => setSelectedMenu(null), 300);
	};

	const transformSidebarItems = (items: any[]) => {
		const parentItems = items.filter(item => item.parentId === null);

		const transformedItems = parentItems.map(parent => {
			const children = items.filter(item => item.parentId === parent.id);

			return {
				id: parent.databaseId.toString(),
				name: parent.label,
				icon: <Smartphone className="w-5 h-5" />,
				subCategories: children.map(child => ({
					name: child.label,
					slug: child.uri.replace(/\//g, '')
				}))
			};
		});

		return transformedItems;
	};
	
	const mainMenus = transformSidebarItems(sidebarItems)

	// const mainMenus = [
	// 	{
	// 		id: 'electronics',
	// 		name: 'Electronics',
	// 		icon: <Smartphone className="w-5 h-5" />,
	// 		subCategories: [
	// 			{
	// 				name: 'Accessories & Supplies',
	// 				slug: 'accessories-supplies'
	// 			},
	// 			{
	// 				name: 'Camera & Photo',
	// 				slug: 'camera-photo'
	// 			},
	// 			{
	// 				name: 'Cell Phones & Accessories',
	// 				slug: 'cell-phones-accessories'
	// 			},
	// 			{
	// 				name: 'Computers & Accessories',
	// 				slug: 'computers-accessories'
	// 			},
	// 			{
	// 				name: 'Car & Vehicle Electronics',
	// 				slug: 'car-vehicle-electronics'
	// 			},
	// 			{
	// 				name: 'TV & Video',
	// 				slug: 'tv-video'
	// 			},
	// 			{
	// 				name: 'Audio & Home Theater',
	// 				slug: 'audio-home-theater'
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 'computers',
	// 		name: 'Computers',
	// 		icon: <Monitor className="w-5 h-5" />,
	// 		subCategories: [
	// 			{
	// 				name: 'Computer Components',
	// 				slug: 'computer-components'
	// 			},
	// 			{
	// 				name: 'Computers & Tablets',
	// 				slug: 'computers-tablets'
	// 			},
	// 			{
	// 				name: 'Laptop Accessories',
	// 				slug: 'laptop-accessories'
	// 			},
	// 			{
	// 				name: 'Monitors',
	// 				slug: 'monitors'
	// 			},
	// 			{
	// 				name: 'Printers',
	// 				slug: 'printers'
	// 			},
	// 			{
	// 				name: 'Storage & Hard Drives',
	// 				slug: 'storage-hard-drives'
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 'home-kitchen',
	// 		name: 'Home & Kitchen',
	// 		icon: <Home className="w-5 h-5" />,
	// 		subCategories: [
	// 			{
	// 				name: 'Kitchen & Dining',
	// 				slug: 'kitchen-dining'
	// 			},
	// 			{
	// 				name: 'Smart Home Devices',
	// 				slug: 'smart-home-devices'
	// 			},
	// 			{
	// 				name: 'Appliances',
	// 				slug: 'appliances'
	// 			},
	// 			{
	// 				name: 'Lighting & Ceiling Fans',
	// 				slug: 'lighting-ceiling-fans'
	// 			},
	// 			{
	// 				name: 'Storage & Organization',
	// 				slug: 'storage-organization'
	// 			},
	// 			{
	// 				name: 'Furniture',
	// 				slug: 'furniture'
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 'tools',
	// 		name: 'Tools & Improvement',
	// 		icon: <Wrench className="w-5 h-5" />,
	// 		subCategories: [
	// 			{
	// 				name: 'Power Tools',
	// 				slug: 'power-tools'
	// 			},
	// 			{
	// 				name: 'Hand Tools',
	// 				slug: 'hand-tools'
	// 			},
	// 			{
	// 				name: 'Smart Home & Security',
	// 				slug: 'smart-home-security'
	// 			},
	// 			{
	// 				name: 'Electrical',
	// 				slug: 'electrical'
	// 			},
	// 			{
	// 				name: 'Storage & Organization',
	// 				slug: 'storage-organization'
	// 			},
	// 			{
	// 				name: 'Safety Equipment',
	// 				slug: 'safety-equipment'
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 'health',
	// 		name: 'Health & Household',
	// 		icon: <Heart className="w-5 h-5" />,
	// 		subCategories: [
	// 			{
	// 				name: 'Vitamins & Supplements',
	// 				slug: 'vitamins-supplements'
	// 			},
	// 			{
	// 				name: 'Medical Devices',
	// 				slug: 'medical-devices'
	// 			},
	// 			{
	// 				name: 'Health Monitors',
	// 				slug: 'health-monitors'
	// 			},
	// 			{
	// 				name: 'Personal Care',
	// 				slug: 'personal-care'
	// 			},
	// 			{
	// 				name: 'Wellness Equipment',
	// 				slug: 'wellness-equipment'
	// 			},
	// 			{
	// 				name: 'First Aid',
	// 				slug: 'first-aid'
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 'beauty',
	// 		name: 'Beauty & Care',
	// 		icon: <Sparkles className="w-5 h-5" />,
	// 		subCategories: [
	// 			{
	// 				name: 'Luxury Beauty',
	// 				slug: 'luxury-beauty'
	// 			},
	// 			{
	// 				name: 'Professional Beauty Tools',
	// 				slug: 'professional-beauty-tools'
	// 			},
	// 			{
	// 				name: 'Skincare',
	// 				slug: 'skincare'
	// 			},
	// 			{
	// 				name: 'Premium Haircare',
	// 				slug: 'premium-haircare'
	// 			},
	// 			{
	// 				name: 'Fragrances',
	// 				slug: 'fragrances'
	// 			},
	// 			{
	// 				name: 'Electric Beauty Devices',
	// 				slug: 'electric-beauty-devices'
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 'office',
	// 		name: 'Office Products',
	// 		icon: <Briefcase className="w-5 h-5" />,
	// 		subCategories: [
	// 			{
	// 				name: 'Office Electronics',
	// 				slug: 'office-electronics'
	// 			},
	// 			{
	// 				name: 'Printers & Supplies',
	// 				slug: 'printers-supplies'
	// 			},
	// 			{
	// 				name: 'Office Furniture',
	// 				slug: 'office-furniture'
	// 			},
	// 			{
	// 				name: 'Writing Supplies',
	// 				slug: 'writing-supplies'
	// 			},
	// 			{
	// 				name: 'Organization & Storage',
	// 				slug: 'organization-storage'
	// 			},
	// 			{
	// 				name: 'Business Basics',
	// 				slug: 'business-basics'
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 'garden',
	// 		name: 'Lawn & Garden',
	// 		icon: <Flower className="w-5 h-5" />,
	// 		subCategories: [
	// 			{
	// 				name: 'Outdoor Power Tools',
	// 				slug: 'outdoor-power-tools'
	// 			},
	// 			{
	// 				name: 'Grills & Outdoor Cooking',
	// 				slug: 'grills-outdoor-cooking'
	// 			},
	// 			{
	// 				name: 'Patio Furniture',
	// 				slug: 'patio-furniture'
	// 			},
	// 			{
	// 				name: 'Garden Tools',
	// 				slug: 'garden-tools'
	// 			},
	// 			{
	// 				name: 'Smart Irrigation',
	// 				slug: 'smart-irrigation'
	// 			},
	// 			{
	// 				name: 'Outdoor Décor',
	// 				slug: 'outdoor-decor'
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 'sports',
	// 		name: 'Sports & Outdoors',
	// 		icon: <Dumbbell className="w-5 h-5" />,
	// 		subCategories: [
	// 			{
	// 				name: 'Exercise Equipment',
	// 				slug: 'exercise-equipment'
	// 			},
	// 			{
	// 				name: 'Athletic Clothing',
	// 				slug: 'athletic-clothing'
	// 			},
	// 			{
	// 				name: 'Sports Electronics',
	// 				slug: 'sports-electronics'
	// 			},
	// 			{
	// 				name: 'Camping Gear',
	// 				slug: 'camping-gear'
	// 			},
	// 			{
	// 				name: 'Outdoor Recreation',
	// 				slug: 'outdoor-recreation'
	// 			},
	// 			{
	// 				name: 'Sports Technology',
	// 				slug: 'sports-technology'
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 'musical',
	// 		name: 'Musical Instruments',
	// 		icon: <Music2 className="w-5 h-5" />,
	// 		subCategories: [
	// 			{
	// 				name: 'Recording Equipment',
	// 				slug: 'recording-equipment'
	// 			},
	// 			{
	// 				name: 'Electric Guitars',
	// 				slug: 'electric-guitars'
	// 			},
	// 			{
	// 				name: 'Digital Pianos',
	// 				slug: 'digital-pianos'
	// 			},
	// 			{
	// 				name: 'Studio Gear',
	// 				slug: 'studio-gear'
	// 			},
	// 			{
	// 				name: 'DJ Equipment',
	// 				slug: 'dj-equipment'
	// 			},
	// 			{
	// 				name: 'Pro Audio',
	// 				slug: 'pro-audio'
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 'arts-crafts',
	// 		name: 'Arts, Crafts & Sewing',
	// 		icon: <Scissors className="w-5 h-5" />,
	// 		subCategories: [
	// 			{
	// 				name: 'Craft Machines',
	// 				slug: 'craft-machines'
	// 			},
	// 			{
	// 				name: 'Professional Art Supplies',
	// 				slug: 'professional-art-supplies'
	// 			},
	// 			{
	// 				name: 'Sewing Machines',
	// 				slug: 'sewing-machines'
	// 			},
	// 			{
	// 				name: 'Organization & Storage',
	// 				slug: 'organization-storage'
	// 			},
	// 			{
	// 				name: 'Digital Art Tools',
	// 				slug: 'digital-art-tools'
	// 			},
	// 			{
	// 				name: 'Crafting Electronics',
	// 				slug: 'crafting-electronics'
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 'books',
	// 		name: 'Books',
	// 		icon: <BookOpen className="w-5 h-5" />,
	// 		subCategories: [
	// 			{
	// 				name: 'Technology & Engineering',
	// 				slug: 'technology-engineering'
	// 			},
	// 			{
	// 				name: 'Business & Money',
	// 				slug: 'business-money'
	// 			},
	// 			{
	// 				name: 'Computer Science',
	// 				slug: 'computer-science'
	// 			},
	// 			{
	// 				name: 'Professional Development',
	// 				slug: 'professional-development'
	// 			},
	// 			{
	// 				name: 'Technical Manuals',
	// 				slug: 'technical-manuals'
	// 			},
	// 			{
	// 				name: 'Digital Learning',
	// 				slug: 'digital-learning'
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 'music',
	// 		name: 'CDs & Vinyl',
	// 		icon: <Music className="w-5 h-5" />,
	// 		subCategories: [
	// 			{
	// 				name: 'Premium Audio Collections',
	// 				slug: 'premium-audio-collections'
	// 			},
	// 			{
	// 				name: 'Limited Editions',
	// 				slug: 'limited-editions'
	// 			},
	// 			{
	// 				name: 'Vinyl Equipment',
	// 				slug: 'vinyl-equipment'
	// 			},
	// 			{
	// 				name: "Collector's Items",
	// 				slug: 'collectors-items'
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 'handmade',
	// 		name: 'Handmade Products',
	// 		icon: <Palette className="w-5 h-5" />,
	// 		subCategories: [
	// 			{
	// 				name: 'Custom Electronics',
	// 				slug: 'custom-electronics'
	// 			},
	// 			{
	// 				name: 'Personalized Tech',
	// 				slug: 'personalized-tech'
	// 			},
	// 			{
	// 				name: 'Smart Home Decor',
	// 				slug: 'smart-home-decor'
	// 			},
	// 			{
	// 				name: 'Custom Lighting',
	// 				slug: 'custom-lighting'
	// 			},
	// 			{
	// 				name: 'Tech Accessories',
	// 				slug: 'tech-accessories'
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 'industrial',
	// 		name: 'Industrial & Scientific',
	// 		icon: <Settings className="w-5 h-5" />,
	// 		subCategories: [
	// 			{
	// 				name: 'Lab Equipment',
	// 				slug: 'lab-equipment'
	// 			},
	// 			{
	// 				name: 'Safety Products',
	// 				slug: 'safety-products'
	// 			},
	// 			{
	// 				name: 'Professional Tools',
	// 				slug: 'professional-tools'
	// 			},
	// 			{
	// 				name: 'Test Equipment',
	// 				slug: 'test-equipment'
	// 			},
	// 			{
	// 				name: 'Industrial Power Tools',
	// 				slug: 'industrial-power-tools'
	// 			},
	// 			{
	// 				name: 'Material Handling',
	// 				slug: 'material-handling'
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 'health-home',
	// 		name: 'Health and Home',
	// 		icon: <Activity className="w-5 h-5" />,
	// 		subCategories: [
	// 			{
	// 				name: 'Smart Health Devices',
	// 				slug: 'smart-health-devices'
	// 			},
	// 			{
	// 				name: 'Air Treatment',
	// 				slug: 'air-treatment'
	// 			},
	// 			{
	// 				name: 'Home Medical Equipment',
	// 				slug: 'home-medical-equipment'
	// 			},
	// 			{
	// 				name: 'Sleep Technology',
	// 				slug: 'sleep-technology'
	// 			},
	// 			{
	// 				name: 'Health Monitors',
	// 				slug: 'health-monitors'
	// 			},
	// 			{
	// 				name: 'Wellness Tech',
	// 				slug: 'wellness-tech'
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 'software',
	// 		name: 'Software',
	// 		icon: <Laptop className="w-5 h-5" />,
	// 		subCategories: [
	// 			{
	// 				name: 'Security Software',
	// 				slug: 'security-software'
	// 			},
	// 			{
	// 				name: 'Business Software',
	// 				slug: 'business-software'
	// 			},
	// 			{
	// 				name: 'Design Software',
	// 				slug: 'design-software'
	// 			},
	// 			{
	// 				name: 'Development Tools',
	// 				slug: 'development-tools'
	// 			},
	// 			{
	// 				name: 'Education Software',
	// 				slug: 'education-software'
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 'office-supplies',
	// 		name: 'Office Supplies',
	// 		icon: <Briefcase className="w-5 h-5" />,
	// 		subCategories: [
	// 			{
	// 				name: 'Writing Supplies',
	// 				slug: 'writing-supplies'
	// 			},
	// 			{
	// 				name: 'Paper Products',
	// 				slug: 'paper-products'
	// 			},
	// 			{
	// 				name: 'Office Organization',
	// 				slug: 'office-organization'
	// 			},
	// 			{
	// 				name: 'Desk Accessories',
	// 				slug: 'desk-accessories'
	// 			},
	// 			{
	// 				name: 'Printing Supplies',
	// 				slug: 'printing-supplies'
	// 			},
	// 			{
	// 				name: 'Office Storage',
	// 				slug: 'office-storage'
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 'patio-garden',
	// 		name: 'Patio & Garden',
	// 		icon: <Flower className="w-5 h-5" />,
	// 		subCategories: [
	// 			{
	// 				name: 'Garden Tools',
	// 				slug: 'garden-tools'
	// 			},
	// 			{
	// 				name: 'Outdoor Décor',
	// 				slug: 'outdoor-decor'
	// 			},
	// 			{
	// 				name: 'Plants & Seeds',
	// 				slug: 'plants-seeds'
	// 			},
	// 			{
	// 				name: 'Patio Furniture',
	// 				slug: 'patio-furniture'
	// 			},
	// 			{
	// 				name: 'Outdoor Lighting',
	// 				slug: 'outdoor-lighting'
	// 			},
	// 			{
	// 				name: 'Garden Storage',
	// 				slug: 'garden-storage'
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 'health-household',
	// 		name: 'Health & Household',
	// 		icon: <Heart className="w-5 h-5" />,
	// 		subCategories: [
	// 			{
	// 				name: 'Vitamins & Supplements',
	// 				slug: 'vitamins-supplements'
	// 			},
	// 			{
	// 				name: 'Personal Care',
	// 				slug: 'personal-care'
	// 			},
	// 			{
	// 				name: 'Household Supplies',
	// 				slug: 'household-supplies'
	// 			},
	// 			{
	// 				name: 'Health Care',
	// 				slug: 'health-care'
	// 			},
	// 			{
	// 				name: 'Baby & Child Care',
	// 				slug: 'baby-child-care'
	// 			},
	// 			{
	// 				name: 'Sports Nutrition',
	// 				slug: 'sports-nutrition'
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 'software-games',
	// 		name: 'Software & Games',
	// 		icon: <Laptop className="w-5 h-5" />,
	// 		subCategories: [
	// 			{
	// 				name: 'PC Software',
	// 				slug: 'pc-software'
	// 			},
	// 			{
	// 				name: 'Business Software',
	// 				slug: 'business-software'
	// 			},
	// 			{
	// 				name: 'Antivirus & Security',
	// 				slug: 'antivirus-security'
	// 			},
	// 			{
	// 				name: 'Design Software',
	// 				slug: 'design-software'
	// 			},
	// 			{
	// 				name: 'Education Software',
	// 				slug: 'education-software'
	// 			},
	// 			{
	// 				name: 'Gaming Software',
	// 				slug: 'gaming-software'
	// 			}
	// 		]
	// 	}
	// ];

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50">
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
								{mainMenus.map((menu) => (
									<button
										key={menu.id}
										onClick={() => handleMenuSelect(menu.id)}
										className="w-full p-4 flex items-center justify-between hover:bg-gray-50 border-b transition-colors"
									>
										<div className="flex items-center gap-3">
											<div className="text-gray-600">{menu.icon}</div>
											<span>{menu.name}</span>
										</div>
										<ChevronRight className="w-4 h-4 text-gray-400" />
									</button>
								))}
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
										{mainMenus.find(m => m.id === selectedMenu)?.icon}
										<span className="font-semibold">
											{mainMenus.find(m => m.id === selectedMenu)?.name}
										</span>
									</div>
								</div>

								<div className="flex-1 overflow-y-auto">
									<div className="p-4 space-y-4">
										{mainMenus
											.find(m => m.id === selectedMenu)
											?.subCategories?.map((subCategory, index) => (
												<Link
													key={index}
													href={subCategory.slug ?? "/"}
													className="block py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
												>
													<div className="flex items-center justify-between">
														<span>{subCategory.name}</span>
														<ChevronRight className="w-4 h-4 text-gray-400" />
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
}

export default NavMobile
