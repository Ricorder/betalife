import { useEffect } from 'react'
import { useRouter } from 'next/router'

import NextNprogress from 'nextjs-progressbar'

import settings from 'core/settings'
import { useSticky } from 'core/hooks'
import { StoreProvider } from 'core/store'
import { pageview } from 'core/utils/metrics'

import { HeadApp } from 'components/common'
import { MainLayout } from 'components/layouts'

import 'antd/dist/antd.css'
import '../assets/scss/main.scss'

const { title, description, background_color, theme_color, metrics } = settings

const webApp = ({ Component, pageProps }) => {
	const router = useRouter()
	const Layout = Component.Layout || MainLayout
	const { isSticky, element } = useSticky()

	useEffect(() => {
		router.events.on('routeChangeComplete', pageview)
		return () => {
			router.events.off('routeChangeComplete', pageview)
		}
	}, [router.events])

	return (
		<>
			<HeadApp title={title} description={description} bgcolor={background_color} theme={theme_color} gtm={metrics?.gtm} />

			<NextNprogress color="#ff8900" options={{ easing: 'ease', speed: 200, startPosition: '0.3', stopDelayMs: 0, height: 3 }} />

			<StoreProvider>
				<Layout sticky={isSticky} element={element}>
					<Component {...pageProps} />
				</Layout>
			</StoreProvider>
		</>
	)
}

export default webApp
