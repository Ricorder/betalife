import useAction from 'core/api'
import { PageLayout } from 'components/layouts'

const TermsPage = ({ data }) => <PageLayout data={data} />

export async function getStaticProps() {
	const data = await useAction.get(`pages/user-agreement`)
	return { props: { data }, revalidate: 60 }
}

export default TermsPage
