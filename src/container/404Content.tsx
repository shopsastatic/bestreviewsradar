import SEO from '@/components/SEO/SEO'
import Link from 'next/link'

export default function Page404Content() {
	return (
		<div className="">
			<SEO
				title={'This page does not exist (404)'}
				description={'Sorry, we couldn’t find the page you’re looking for.'}
			/>

			<main className="mx-auto w-full max-w-7xl h-screen flex justify-center items-center">
				<div className="mx-auto max-w-2xl text-center">
					<h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
						Page not found
					</h1>
					<p className="mt-4 text-base leading-7 text-gray-600 dark:text-neutral-400">
						Sorry, we couldn’t find the page you’re looking for.
					</p>
					<div className="mt-10 flex justify-center">
						<Link
							href="/"
							className="text-sm font-semibold leading-7 text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500"
						>
							<span className="me-2 rtl:rotate-180" aria-hidden="true">
								&larr;
							</span>
							Back to home
						</Link>
					</div>
				</div>
			</main>
		</div>
	)
}
