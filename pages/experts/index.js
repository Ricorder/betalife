import { useEffect, useState } from 'react'

import settings from 'core/settings'
import useAction from 'core/api'
import { Link, HeadSeo, Breadcrumbs, BoxWrap, Section } from 'components/common'

const ExpertsPage = ({ term, records, paginate }) => {
	const [termData, setTermData] = useState(term || {})
	const [pagination, setPagination] = useState(paginate || {})
	const [posts, setPosts] = useState(records || [])

	const { skip, limit, size, total } = pagination

	const [values, setValues] = useState({ loading: false, reload: false, formData: '' })
	const { loading, reload, formData } = values

	useEffect(() => {
		setValues({ ...values, formData: new FormData() })
		loadData()
	}, [])

	const loadData = async () => {
		setValues({ ...values, loading: true })
		await useAction.get('terms/experts', { limit: 5 }).then((res) => {
			if (res && !res?.error) {
				res?.term && setTermData(res.term)
				res?.records && setPosts(res.records)
				res?.paginate && setPagination(res.paginate)
			}
			setValues({ ...values, loading: false })
		})
	}

	return (
		<div className={`page page-term page-term-${termData?.slug}`}>
			<HeadSeo {...termData?.seo} />

			<Section className="pagehead">
				<div className="row pagehead-inner">
					<div className="content">
						<h1>Колонка экспертов</h1>
						<div className="desc">
							<p dangerouslySetInnerHTML={{ __html: termData?.desc }} />
						</div>
						<Link href="/experts#list">
							<a className="button">Выбрать эксперта</a>
						</Link>
					</div>
					<div className="picture">
						<img src="/images/head/experts-main.png" alt="Колонка экспертов" />
					</div>
				</div>
			</Section>

			<Section>
				{records?.length > 0 && (
					<div className="list-experts" id="list">
						{records?.map((item) => {
							const { slug, title, media, fields } = item
							const { wpost, foreword } = fields
							const username = title.replaceAll(' ', '<br />')
							return (
								<div key={slug} className="row item-expert">
									<div className="picture">
										{media?.file && (
											<Link href="/experts/[expert]" as={`/experts/${slug}`}>
												<a>
													<img src={`${settings.apiupl}/${media.file}`} alt={media?.title || title} />
												</a>
											</Link>
										)}
									</div>
									<div className="row person">
										<h2 dangerouslySetInnerHTML={{ __html: username }} />
										{wpost && <div className="wpost" dangerouslySetInnerHTML={{ __html: wpost }} />}
										<Link href="/experts/[expert]" as={`/experts/${slug}`}>
											<a className="button">Читать колонку</a>
										</Link>
									</div>
									<div className="excerpt" dangerouslySetInnerHTML={{ __html: foreword }} />
								</div>
							)
						})}
					</div>
				)}
			</Section>

			{/* <Breadcrumbs current={termData?.name} /> */}
		</div>
	)
}

export async function getStaticProps(context) {
	const page = await useAction.get(`terms/experts`).then((res) => res)
	if (!page || page.error) return { notFound: true }
	return { props: { ...page }, revalidate: 60 }
}

export default ExpertsPage
