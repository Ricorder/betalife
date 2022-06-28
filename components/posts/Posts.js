import { useEffect, useState } from 'react'

import settings from 'core/settings'
import { dateformat } from 'core/utils/general'
import { Link } from 'components/common'

export default function Posts({ category, posts }) {
	const [records, setRecords] = useState(posts || [])
	// if (!posts.length > 0) return

	useEffect(() => {
		setRecords(posts)
	}, [posts])

	return (
		<div className="row posts">
			{records.length > 0 &&
				records?.map((item) => {
					return (
						<div key={item.slug} className="item">
							<div className="image">
								{item?.tags?.length > 0 && (
									<div className="tags">
										{item.tags.map((a) => (
											<span key={a.slug}>#{a.name}</span>
										))}
									</div>
								)}
								<div className="place">{item?.media?.file && <img src={`${settings.apiupl}/580x580_${item.media.file}`} />}</div>
								<Link href="/[taxonomy]/[post]" as={`/${category}/${item.slug}`}>
									<a className="button">Читать</a>
								</Link>
							</div>
							{item.createdAt && <span className="date">{dateformat(item.createdAt)}</span>}
							<h3>
								<Link href="/[taxonomy]/[post]" as={`/${category}/${item.slug}`}>
									<a>{item.title}</a>
								</Link>
							</h3>
							{item.excerpt && <div className="desc" dangerouslySetInnerHTML={{ __html: item.excerpt }} />}
						</div>
					)
				})}
		</div>
	)
}
