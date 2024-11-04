import { gql } from '@/__generated__'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import Input from '@/components/Input/Input'
import Label from '@/components/Label/Label'
import Textarea from '@/components/Textarea/Textarea'
import { FaustPage, getNextStaticProps } from '@faustwp/core'
import PageLayout from '@/container/PageLayout'
import {
  GetReadingListPageQuery,
  NcgeneralSettingsFieldsFragmentFragment,
} from '@/__generated__/graphql'
import { FOOTER_LOCATION, PRIMARY_LOCATION } from '@/contains/menu'
import { GetStaticPropsContext } from 'next'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import {
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
  ArrowRight,
  ChevronRight,
  Star,
  TrendingUp,
  Scissors,
  BookOpen,
  Music,
  Palette,
  Settings,
  Activity,
  Laptop
} from 'lucide-react';
import Link from 'next/link'

const Page: FaustPage<GetReadingListPageQuery> = (props: any) => {
  const topCategories = [
    {
      id: 'electronics',
      name: 'Electronics',
      slug: 'electronics',
      icon: <Smartphone className="w-6 h-6" />,
      subCategories: [
        { name: 'Accessories & Supplies', slug: 'accessories-supplies' },
        { name: 'Camera & Photo', slug: 'camera-photo' },
        { name: 'Cell Phones & Accessories', slug: 'cell-phones-accessories' },
        { name: 'Computers & Accessories', slug: 'computers-accessories' },
        { name: 'TV & Video', slug: 'tv-video' },
        { name: 'Audio & Home Theater', slug: 'audio-home-theater' }
      ],
      trending: true,
      featured: true
    },
    {
      id: 'computers',
      name: 'Computers',
      slug: 'computers',
      icon: <Monitor className="w-6 h-6" />,
      subCategories: [
        { name: 'Computer Components', slug: 'computer-components' },
        { name: 'Computers & Tablets', slug: 'computers-tablets' },
        { name: 'Laptop Accessories', slug: 'laptop-accessories' },
        { name: 'Monitors', slug: 'monitors' },
        { name: 'Printers', slug: 'printers' },
        { name: 'Storage & Hard Drives', slug: 'storage-hard-drives' }
      ],
      trending: true,
      featured: true
    },
    {
      id: 'home-kitchen',
      name: 'Home & Kitchen',
      slug: 'home-kitchen',
      icon: <Home className="w-6 h-6" />,
      subCategories: [
        { name: 'Kitchen & Dining', slug: 'kitchen-dining' },
        { name: 'Smart Home Devices', slug: 'smart-home-devices' },
        { name: 'Appliances', slug: 'appliances' },
        { name: 'Lighting & Ceiling Fans', slug: 'lighting-ceiling-fans' },
        { name: 'Storage & Organization', slug: 'storage-organization' },
        { name: 'Furniture', slug: 'furniture' }
      ],
      featured: true
    },
    {
      id: 'tools',
      name: 'Tools & Improvement',
      slug: 'tools-improvement',
      icon: <Wrench className="w-6 h-6" />,
      subCategories: [
        { name: 'Power Tools', slug: 'power-tools' },
        { name: 'Hand Tools', slug: 'hand-tools' },
        { name: 'Smart Home & Security', slug: 'smart-home-security' },
        { name: 'Electrical', slug: 'electrical' },
        { name: 'Storage & Organization', slug: 'storage-organization' },
        { name: 'Safety Equipment', slug: 'safety-equipment' }
      ],
      trending: true
    },
    {
      id: 'health',
      name: 'Health & Household',
      slug: 'health-household',
      icon: <Heart className="w-6 h-6" />,
      subCategories: [
        { name: 'Vitamins & Supplements', slug: 'vitamins-supplements' },
        { name: 'Medical Devices', slug: 'medical-devices' },
        { name: 'Health Monitors', slug: 'health-monitors' },
        { name: 'Personal Care', slug: 'personal-care' },
        { name: 'Wellness Equipment', slug: 'wellness-equipment' },
        { name: 'First Aid', slug: 'first-aid' }
      ],
      featured: true
    },
    {
      id: 'beauty',
      name: 'Beauty & Care',
      slug: 'beauty-care',
      icon: <Sparkles className="w-6 h-6" />,
      subCategories: [
        { name: 'Luxury Beauty', slug: 'luxury-beauty' },
        { name: 'Professional Beauty Tools', slug: 'professional-beauty-tools' },
        { name: 'Skincare', slug: 'skincare' },
        { name: 'Premium Haircare', slug: 'premium-haircare' },
        { name: 'Fragrances', slug: 'fragrances' },
        { name: 'Electric Beauty Devices', slug: 'electric-beauty-devices' }
      ],
      trending: true
    },
    {
      id: 'office',
      name: 'Office Products',
      slug: 'office-products',
      icon: <Briefcase className="w-6 h-6" />,
      subCategories: [
        { name: 'Office Electronics', slug: 'office-electronics' },
        { name: 'Printers & Supplies', slug: 'printers-supplies' },
        { name: 'Office Furniture', slug: 'office-furniture' },
        { name: 'Writing Supplies', slug: 'writing-supplies' },
        { name: 'Organization & Storage', slug: 'organization-storage' },
        { name: 'Business Basics', slug: 'business-basics' }
      ]
    },
    {
      id: 'garden',
      name: 'Lawn & Garden',
      slug: 'lawn-garden',
      icon: <Flower className="w-6 h-6" />,
      subCategories: [
        { name: 'Outdoor Power Tools', slug: 'outdoor-power-tools' },
        { name: 'Grills & Outdoor Cooking', slug: 'grills-outdoor-cooking' },
        { name: 'Patio Furniture', slug: 'patio-furniture' },
        { name: 'Garden Tools', slug: 'garden-tools' },
        { name: 'Smart Irrigation', slug: 'smart-irrigation' },
        { name: 'Outdoor Décor', slug: 'outdoor-decor' }
      ]
    },
    {
      id: 'sports',
      name: 'Sports & Outdoors',
      slug: 'sports-outdoors',
      icon: <Dumbbell className="w-6 h-6" />,
      subCategories: [
        { name: 'Exercise Equipment', slug: 'exercise-equipment' },
        { name: 'Athletic Clothing', slug: 'athletic-clothing' },
        { name: 'Sports Electronics', slug: 'sports-electronics' },
        { name: 'Camping Gear', slug: 'camping-gear' },
        { name: 'Outdoor Recreation', slug: 'outdoor-recreation' },
        { name: 'Sports Technology', slug: 'sports-technology' }
      ],
      trending: true
    },
    {
      id: 'musical',
      name: 'Musical Instruments',
      slug: 'musical-instruments',
      icon: <Music2 className="w-6 h-6" />,
      subCategories: [
        { name: 'Recording Equipment', slug: 'recording-equipment' },
        { name: 'Electric Guitars', slug: 'electric-guitars' },
        { name: 'Digital Pianos', slug: 'digital-pianos' },
        { name: 'Studio Gear', slug: 'studio-gear' },
        { name: 'DJ Equipment', slug: 'dj-equipment' },
        { name: 'Pro Audio', slug: 'pro-audio' }
      ]
    },
    {
      id: 'arts-crafts',
      name: 'Arts, Crafts & Sewing',
      slug: 'arts-crafts-sewing',
      icon: <Scissors className="w-6 h-6" />,
      subCategories: [
        { name: 'Craft Machines', slug: 'craft-machines' },
        { name: 'Professional Art Supplies', slug: 'professional-art-supplies' },
        { name: 'Sewing Machines', slug: 'sewing-machines' },
        { name: 'Organization & Storage', slug: 'organization-storage' },
        { name: 'Digital Art Tools', slug: 'digital-art-tools' },
        { name: 'Crafting Electronics', slug: 'crafting-electronics' }
      ],
      featured: true
    },
    {
      id: 'books',
      name: 'Books',
      slug: 'books',
      icon: <BookOpen className="w-6 h-6" />,
      subCategories: [
        { name: 'Technology & Engineering', slug: 'technology-engineering' },
        { name: 'Business & Money', slug: 'business-money' },
        { name: 'Computer Science', slug: 'computer-science' },
        { name: 'Professional Development', slug: 'professional-development' },
        { name: 'Technical Manuals', slug: 'technical-manuals' },
        { name: 'Digital Learning', slug: 'digital-learning' }
      ]
    },
    {
      id: 'music',
      name: 'CDs & Vinyl',
      slug: 'cds-vinyl',
      icon: <Music className="w-6 h-6" />,
      subCategories: [
        { name: 'Premium Audio Collections', slug: 'premium-audio-collections' },
        { name: 'Limited Editions', slug: 'limited-editions' },
        { name: 'Vinyl Equipment', slug: 'vinyl-equipment' },
        { name: "Collector's Items", slug: 'collectors-items' }
      ]
    },
    {
      id: 'handmade',
      name: 'Handmade Products',
      slug: 'handmade-products',
      icon: <Palette className="w-6 h-6" />,
      subCategories: [
        { name: 'Custom Electronics', slug: 'custom-electronics' },
        { name: 'Personalized Tech', slug: 'personalized-tech' },
        { name: 'Smart Home Decor', slug: 'smart-home-decor' },
        { name: 'Custom Lighting', slug: 'custom-lighting' },
        { name: 'Tech Accessories', slug: 'tech-accessories' }
      ]
    },
    {
      id: 'industrial',
      name: 'Industrial & Scientific',
      slug: 'industrial-scientific',
      icon: <Settings className="w-6 h-6" />,
      subCategories: [
        { name: 'Lab Equipment', slug: 'lab-equipment' },
        { name: 'Safety Products', slug: 'safety-products' },
        { name: 'Professional Tools', slug: 'professional-tools' },
        { name: 'Test Equipment', slug: 'test-equipment' },
        { name: 'Industrial Power Tools', slug: 'industrial-power-tools' },
        { name: 'Material Handling', slug: 'material-handling' }
      ],
      trending: true
    },
    {
      id: 'health-home',
      name: 'Health and Home',
      slug: 'health-and-home',
      icon: <Activity className="w-6 h-6" />,
      subCategories: [
        { name: 'Smart Health Devices', slug: 'smart-health-devices' },
        { name: 'Air Treatment', slug: 'air-treatment' },
        { name: 'Home Medical Equipment', slug: 'home-medical-equipment' },
        { name: 'Sleep Technology', slug: 'sleep-technology' },
        { name: 'Health Monitors', slug: 'health-monitors' },
        { name: 'Wellness Tech', slug: 'wellness-tech' }
      ],
      trending: true,
      featured: true
    },
    {
      id: 'software',
      name: 'Software',
      slug: 'software',
      icon: <Laptop className="w-6 h-6" />,
      subCategories: [
        { name: 'Security Software', slug: 'security-software' },
        { name: 'Business Software', slug: 'business-software' },
        { name: 'Design Software', slug: 'design-software' },
        { name: 'Development Tools', slug: 'development-tools' },
        { name: 'Education Software', slug: 'education-software' }
      ]
    },
    {
      id: 'office-supplies',
      name: 'Office Supplies',
      slug: 'office-supplies',
      icon: <Briefcase className="w-6 h-6" />,
      subCategories: [
        { name: 'Writing Supplies', slug: 'writing-supplies' },
        { name: 'Paper Products', slug: 'paper-products' },
        { name: 'Office Organization', slug: 'office-organization' },
        { name: 'Desk Accessories', slug: 'desk-accessories' },
        { name: 'Printing Supplies', slug: 'printing-supplies' },
        { name: 'Office Storage', slug: 'office-storage' }
      ]
    },
    {
      id: 'patio-garden',
      name: 'Patio & Garden',
      slug: 'patio-garden',
      icon: <Flower className="w-6 h-6" />,
      subCategories: [
        { name: 'Garden Tools', slug: 'garden-tools' },
        { name: 'Outdoor Décor', slug: 'outdoor-decor' },
        { name: 'Plants & Seeds', slug: 'plants-seeds' },
        { name: 'Patio Furniture', slug: 'patio-furniture' },
        { name: 'Outdoor Lighting', slug: 'outdoor-lighting' },
        { name: 'Garden Storage', slug: 'garden-storage' }
      ]
    },
    {
      id: 'health-household',
      name: 'Health & Household',
      slug: 'health-household',
      icon: <Heart className="w-6 h-6" />,
      subCategories: [
        { name: 'Vitamins & Supplements', slug: 'vitamins-supplements' },
        { name: 'Personal Care', slug: 'personal-care' },
        { name: 'Household Supplies', slug: 'household-supplies' },
        { name: 'Health Care', slug: 'health-care' },
        { name: 'Baby & Child Care', slug: 'baby-child-care' },
        { name: 'Sports Nutrition', slug: 'sports-nutrition' }
      ],
      trending: true
    },
    {
      id: 'software-video-games',
      name: 'Software & Games',
      slug: 'software-games',
      icon: <Monitor className="w-6 h-6" />,
      subCategories: [
        { name: 'PC Software', slug: 'pc-software' },
        { name: 'Business Software', slug: 'business-software' },
        { name: 'Antivirus & Security', slug: 'antivirus-security' },
        { name: 'Design Software', slug: 'design-software' },
        { name: 'Education Software', slug: 'education-software' },
        { name: 'Gaming Software', slug: 'gaming-software' }
      ]
    }
  ];


  return (
    <PageLayout
      headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
      footerMenuItems={props.data?.footerMenuItems?.nodes || []}
      pageFeaturedImageUrl={null}
      pageTitle="Categories"
      generalSettings={
        props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
      }
    >
      <div className="bg-gray-50 min-h-screen">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold mb-4">
                Product Categories
              </h1>
              <p className="text-gray-300 text-lg">
                Explore our comprehensive collection of product categories, featuring expert reviews and detailed comparisons.
              </p>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Card Header */}
                <div className="p-6 pb-0">
                  <div className="flex items-start justify-between mb-4">
                    <Link className="flex items-start gap-3" href={category?.slug}>
                      <div className={`p-2 rounded-lg ${category.featured ? 'bg-blue-50 text-blue-500' : 'bg-blue-50 text-blue-500'
                        }`}>
                        {category.icon}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">{category.name}</h2>
                      </div>
                    </Link>
                    {category.trending && (
                      <span className="flex items-center gap-1 text-sm text-blue-500 bg-blue-50 px-2 py-1 rounded-full">
                        <TrendingUp className="w-4 h-4" />
                        <span>Trending</span>
                      </span>
                    )}
                  </div>

                </div>

                {/* Sub Categories */}
                <div className="p-6 pt-3">
                  <div className="space-y-3">
                    {category.subCategories.map((sub, index) => (
                      <Link
                        key={index}
                        href={sub?.slug}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                        <span>{sub?.name}</span>
                      </Link>
                    ))}
                  </div>

                  {/* View All Button */}
                  <Link href={category?.slug}>
                    <button className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                      <span>Show More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
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
  query GetReadingListData($headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!) {
    # common query for all page 
    generalSettings {
      ...NcgeneralSettingsFieldsFragment
    }
    primaryMenuItems: menuItems(where: { location: $headerLocation }, first: 80) {
      nodes {
        ...NcPrimaryMenuFieldsFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }, first: 50) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
    # thêm truy vấn để lấy danh mục cha
    categories(where: { parent: null }, first: 50) {
      nodes {
        id
        name
        slug
        ... on Category {
          children {
            nodes {
              id
              name
              slug
            }
          }
        }
      }
    }
  }
`)


export function getStaticProps(ctx: GetStaticPropsContext) {
  return getNextStaticProps(ctx, {
    Page,
    revalidate: 900,
  })
}

export default Page
