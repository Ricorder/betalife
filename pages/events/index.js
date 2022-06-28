import Head from 'next/head'
import Script from 'next/script'
import { useState } from 'react'

import useAction from 'core/api'
import { HeadSeo } from 'components/common'
import SingleEvent from 'components/events/SingleEvent'

const EventsPage = ({ term, records, active }) => {
	const [stripe, setStripe] = useState(null)

	return (
		<>
			{/* <Script src="https://platform.dataforum.pro/client/master-v2.js" />
			<Script strategy="lazyOnload">
				{`var script2 = new EventClass({ serverUrl: 'https://platform.dataforum.pro/', eventSlug: 'biocad', room_id: 116, language: 'ru', block: 'eventblock1' })`}
			</Script> */}

			{/* <Script
				id="dataforum"
				src="https://platform.dataforum.pro/client/master-v2.js"
				onLoad={() => {
					setStripe({
						stripe: setTimeout(
							() => new EventClass({ serverUrl: 'https://platform.dataforum.pro/', eventSlug: 'biocad', room_id: 116, language: 'ru', block: 'eventblock1' }),
							1000
						)
					})

					// const strLoad = () => {
					// 	var script2 = new EventClass({ serverUrl: 'https://platform.dataforum.pro/', eventSlug: 'biocad', room_id: 116, language: 'ru', block: 'eventblock1' })
					// }
					// strLoad()
				}}
			/> */}
			<Head>
				<link rel="stylesheet" href="https://online.dataforum.pro/client/css/biocad.css?v2" />
			</Head>
			<div className="term-event">
				<HeadSeo {...term?.seo} />

				<div className="eventblock1" />
				{active && <SingleEvent {...active} />}
			</div>
		</>
	)
}

export async function getStaticProps(context) {
	const data = await useAction.get(`terms/events`, { skip: 0, limit: 40 })
	if (!data || data.error) return { notFound: true }

	const active = data?.records?.find((a) => a.fields.active)
	return { props: { ...data, active }, revalidate: 60 }
}

export default EventsPage
