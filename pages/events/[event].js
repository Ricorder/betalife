import useAction from 'core/api'
import { HeadSeo } from 'components/common'
import SingleEvent from 'components/events/SingleEvent'

const EventSinglePage = ({ data }) => {
	return (
		<div className={`term-event event-${data?.slug}`}>
			<HeadSeo {...data?.seo} />
			{data && <SingleEvent {...data} />}
		</div>
	)
}

export async function getStaticPaths() {
	const paths = await useAction.get(`terms/events`, { limit: 100 }).then((res) => res?.records.map((a) => ({ params: { event: a.slug } })))
	return { paths: paths, fallback: false }
}

export async function getStaticProps({ params }) {
	const data = await useAction.get(`posts/${params.event}`)
	if (!data || data.error) return { notFound: true }
	return { props: { data }, revalidate: 60 }
}

export default EventSinglePage
