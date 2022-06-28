import dynamic from 'next/dynamic'

import useAction from 'core/api'
import { Loader } from 'components/common'
import { PageLayout } from 'components/layouts'

const GoogleMap = dynamic(() => import('components/maps/GoogleMap'), { loading: () => <Loader /> })

const LocationsPage = ({ term, records }) => {
	return (
		<PageLayout container={false} type="term" data={term}>
			<GoogleMap data={records} params={term?.params} title="Карта медицинских учреждений и пациентских организаций" />
		</PageLayout>
	)
}

export async function getStaticProps() {
	const data = await useAction.get(`terms/locations`, { limit: 1000 })
	return { props: { ...data }, revalidate: 60 }
}
export default LocationsPage
