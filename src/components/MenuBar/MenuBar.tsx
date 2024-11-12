'use client'
import { useState, Fragment, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import NavMobile from '@/components/Navigation/NavMobile'
import { usePathname } from 'next/navigation'
import { FragmentType, gql } from '@/__generated__'
import { NC_PRIMARY_MENU_QUERY_FRAGMENT } from '@/fragments/menu'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { useQuery } from '@apollo/client'
export interface MenuBarProps {
  menuItems?: any
  className?: string
}

const MENU_QUERY = gql(`
  query GetMenuSideBar {
    sidebarMenuItems: menuItems(where: { location: MAIN_MENU }, first: 40) {
      nodes {
        ...NcSideBarMenuFieldsFragment
      }
    }
  }
`)

const MenuBar: React.FC<MenuBarProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()
  
  // Use the useQuery hook to fetch data
  const { data, loading, error } = useQuery(MENU_QUERY)

  useEffect(() => {
    setIsVisible(false)
  }, [pathname])

  const handleOpenMenu = () => setIsVisible(true)
  const handleCloseMenu = () => setIsVisible(false)

  // Handle error state
  if (error) {
    console.error('Error fetching menu data:', error)
    return <div>Error loading menu</div>
  }

  const renderContent = () => {
    return (
      <Transition show={isVisible} as={Fragment}>
        <div className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black bg-opacity-70"
              onClick={handleCloseMenu}
            />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition duration-100 transform"
            enterFrom="opacity-0 -translate-x-14 rtl:translate-x-14"
            enterTo="opacity-100 translate-x-0"
            leave="transition duration-150 transform"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 -translate-x-14 rtl:translate-x-14"
          >
            <div className="fixed inset-y-0 start-0 z-50 w-screen max-w-sm overflow-y-auto">
              <div className="flex min-h-full">
                <div className="w-full max-w-sm overflow-hidden transition-all">
                  <NavMobile
                    menuItems={data?.sidebarMenuItems?.nodes || []}
                    onClickClose={handleCloseMenu}
                  />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Transition>
    )
  }

  return (
    <div>
      <button
        type='button'
        aria-label='menu-mobile'
        onClick={() => {
          setIsVisible(!isVisible)
        }}
        className={`flex items-center justify-center rounded-lg p-2.5 pl-0 pr-0 md:pr-2.5 md:pl-2.5 text-neutral-700 focus:outline-none ml-0 md:ml-10 ${className}`}
      >
        <Bars3Icon className="h-7 w-7 lg:h-8 lg:w-8 text-white" />
        <p className="hidden md:block text-white pl-3 text-lg">Menu</p>
      </button>

      {renderContent()}
    </div>
  )
}

export default MenuBar