import { useState } from 'react'

import useAction from 'core/api'
import settings from 'core/settings'
import { Link, HeadSeo, Breadcrumbs, BoxWrap, Section } from 'components/common'

const StatusesPage = ({ term, records, paginate }) => {
	const [termData, setTermData] = useState(term || {})
	const [posts, setPosts] = useState(records || [])
	const [pagination, setPagination] = useState(paginate || {})
	const { skip, limit, size, total } = pagination

	return (
		<div className={`page page-term page-term-${term?.slug}`}>
			<HeadSeo {...termData?.seo} />

			<Section className="pagehead">
				<div className="content">
					<h1>{term.name}</h1>
					<div className="desc">
						<p dangerouslySetInnerHTML={{ __html: term.desc }} />
					</div>
				</div>
				<div className="picture">{/* <img src="/images/head/experts-main.png" alt="Колонка экспертов" /> */}</div>
			</Section>

			<Section>
				{records?.length > 0 && (
					<div className="list-experts">
						{records?.map((item) => {
							const { slug, title, excerpt, media } = item
							return (
								<div key={item.slug} className="row item-expert">
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
										<h2 dangerouslySetInnerHTML={{ __html: title }} />
										<Link href="/experts/[expert]" as={`/experts/${slug}`}>
											<a className="button">Читать колонку</a>
										</Link>
									</div>
									<div className="excerpt" dangerouslySetInnerHTML={{ __html: excerpt }} />
								</div>
							)
						})}
					</div>
				)}
			</Section>
		</div>
	)
}

export async function getStaticProps() {
	const data = await useAction.get(`terms/statuses`)
	return { props: { ...data }, revalidate: 60 }
}

export default StatusesPage
