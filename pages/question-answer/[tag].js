import useAction from 'core/api'
import { Answers, Formbox, Layout } from 'components/qa'

const TaxonomiesPage = ({ taxonomy, tags, records, paginate }) => {
	return (
		<Layout data={taxonomy} tags={tags}>
			<Answers loading={false} records={records} />
		</Layout>
	)
}

export async function getStaticPaths() {
	const paths = await useAction.get('terms/qa/paths', { type: 'tag' }).then((result) => result?.tags)
	return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
	const tags = await useAction.get(`terms/qa`, { skip: 0, limit: 6 }).then((res) => res?.term?.tags)
	const data = await useAction.get(`taxonomies/${params.tag}`, { skip: 0, limit: 100, typespost: 'term' })

	if (!data || data.error) return { notFound: true }
	return { props: { ...data, tags }, revalidate: 60 }
}

export default TaxonomiesPage
