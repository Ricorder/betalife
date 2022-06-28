import useAction from 'core/api'
import { PageLayout } from 'components/layouts'

const SubPage = ({ data }) => <PageLayout data={data} />

export async function getStaticPaths() {
	const paths = await useAction.get(`pages/user-agreement`).then((res) => res?.children?.map((a) => ({ params: { slug: a.slug } })))
	return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
	const data = await useAction.get(`pages/${params.slug}`).then((res) => res)
	return { props: { data }, revalidate: 60 }
}

export default SubPage
