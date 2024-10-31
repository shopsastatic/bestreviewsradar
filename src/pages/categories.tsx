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
import getTrans from '@/utils/getTrans'
import Heading from '@/components/Heading/Heading'
import { FOOTER_LOCATION, PRIMARY_LOCATION } from '@/contains/menu'
import { GetStaticPropsContext } from 'next'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import MyImage from '@/components/MyImage'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { useMutation } from '@apollo/client'
import { MUTATION_ADD_CONTACT_MESS_TO_WP } from '@/fragments/mutations'
import toast from 'react-hot-toast'
import Page404Content from '@/container/404Content'
import Error from '@/components/Error'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

const Page: FaustPage<GetReadingListPageQuery> = props => {
    return (
        <PageLayout
            headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
            footerMenuItems={props.data?.footerMenuItems?.nodes || []}
            pageFeaturedImageUrl={null}
            pageTitle={NC_SITE_SETTINGS.contact_page?.title}
            generalSettings={
                props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
            }
        >
            <div className='categpries'>
                
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
        revalidate: 900,
    })
}

export default Page
