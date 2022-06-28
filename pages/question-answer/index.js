import { useState } from 'react'

import useAction from 'core/api'
import { Layout, Answers, Formbox } from 'components/qa'

const QaPage = ({ term, records, paginate }) => {
	const [posts, setPosts] = useState(records || [])
	const [pagination, setPagination] = useState(paginate)
	const { skip, limit, size, total } = pagination

	const [values, setValues] = useState({ loading: false, reload: false, action: '', accepts: [], selectedTags: [] })
	const { loading, reload, action, accepts, selectedTags } = values

	const loadMore = async (e) => {
		e.preventDefault()

		setValues({ ...values, loading: true, action: 'loadmore' })
		const params = { limit, skip: skip + limit, action: 'loadmore', term_slug: [term.slug], tags: selectedTags }

		await useAction.post(`posts/filter`, params, 'json').then((data) => {
			if (!data?.error && data.records) {
				setPosts([...posts, ...data.records])
				setPagination({ ...pagination, ...data.paginate })
			}
			setValues({ ...values, reload: false, loading: false, error: false, success: true, message: '' })
		})
	}

	const loadMoreButton = () => {
		return (
			total > posts.length && (
				<div className="loadmore">
					<button onClick={loadMore} className="button round">
						Загрузить еще
					</button>
				</div>
			)
		)
	}

	return (
		<Layout data={term} tags={term?.tags} categories={term?.categories}>
			<Answers loading={loading} records={posts} />
			{loadMoreButton()}
		</Layout>
	)
}

export async function getStaticProps() {
	const data = await useAction.get(`terms/qa`, { skip: 0, limit: 6 })
	if (!data || data?.error) return { notFound: true }
	return { props: { ...data }, revalidate: 300 }
}

export default QaPage
