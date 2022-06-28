import settings from 'core/settings'
import { Link, BoxWrap } from 'components/common'

export default function PostSingle({ taxonomy, ...props }) {
	const { slug, title, excerpt, media, categories, readingtime } = props

	const postslug = () => {
		const href = categories?.length > 0 ? `/[taxonomy]/[post]` : `/[post]`
		const as = categories?.length > 0 ? `/${categories[0].slug}/${slug}` : `/${slug}`
		return { href, as }
	}
	return (
		<BoxWrap className="article">
			<div className="row article-inner">
				<div className="aside">
					<div className="image">
						{media?.file && (
							<Link {...postslug()}>
								<a title={title}>
									<img src={`${settings.apiupl}/580x580_${media.file}`} alt={media.title || title} />
								</a>
							</Link>
						)}
					</div>
					{readingtime && (
						<div className="meta">
							<span className="time">среднее время прочтения - {readingtime} минут(ы)</span>
						</div>
					)}
				</div>
				<div className="desc">
					<h3>
						<Link {...postslug()}>
							<a title={title}>{title}</a>
						</Link>
					</h3>
					<div className="excerpt" dangerouslySetInnerHTML={{ __html: excerpt }} />
				</div>
			</div>
		</BoxWrap>
	)
}
