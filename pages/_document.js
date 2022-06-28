import Document, { Html, Head, Main, NextScript } from 'next/document'
import { TagManager } from 'components/common'
import settings from 'core/settings'
const { metrics } = settings

export default class webDocument extends Document {
	render() {
		return (
			<Html lang={settings.locale}>
				<Head>
					<meta charSet="UTF-8" key="charset" />
					{metrics.yandex && <meta name="yandex-verification" content={metrics.yandex} />}
					{metrics.google && <meta name="google-site-verification" content={metrics.google} />}

					<link rel="dns-prefetch" href="//fonts.gstatic.com" />
					<link rel="dns-prefetch" href="//fonts.googleapis.com" />
					<link rel="dns-prefetch" href="//www.googletagmanager.com" />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

					<link
						href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=optional"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<TagManager type="document" id={metrics?.gtm} />
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
