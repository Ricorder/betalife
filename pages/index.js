import useAction from 'core/api'

import { HeadSeo } from 'components/common'
import { Slider, Questions, Status, Video } from 'components/main'

const Main = ({ data, questions }) => {
	return (
		<div className="main">
			<HeadSeo {...data?.seo} />
			<h1 className="hidden">Портал для пациентов с рассеянным склерозом</h1>

			<Slider />

			<Status />

			<Video picture="/images/main-video-preview.jpg" video="P-9LDXcSUyI" />

			<Questions data={questions} />
		</div>
	)
}

export async function getStaticProps() {
	const data = await useAction.get(`pages/main`)
	const questions = await useAction.get(`terms/qa`, { limit: 100 }).then((res) => res?.records || [])
	return { props: { data, questions }, revalidate: 3600 }
}

export default Main
