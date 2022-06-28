import settings from 'core/settings'
import { styleRemove, classNames } from 'core/utils/general'
import { checkTemplate, PostTemplate } from 'components/posts'
import { HeadSeo, Breadcrumbs, Section, Sources } from 'components/common'

const PostLayout = ({ data, className, children, ...props }) => {
	const { type, slug, title, excerpt, content, sources, seo, tags, categories, media, fields, published } = data

	const picture = {
		url: media?.file ? `${settings.apiupl}/${media.file}` : '',
		title: media?.title ? media.title : title
	}

	return (
		data && (
			<div className={classNames('layout-post', `post-${slug}`, className)}>
				<HeadSeo slug={slug} {...seo} />

				<Breadcrumbs {...data} />

				<Section>
					{checkTemplate(slug) ? (
						<PostTemplate slug={slug} />
					) : (
						<>
							{title && (
								<div className="row ps-head">
									<i className="ps-icon" />
									<div className="ps-excerpt">
										<h1>{title}</h1>
										{type === 'post' && excerpt && <div className="ps-desc" dangerouslySetInnerHTML={{ __html: excerpt }} />}
									</div>
								</div>
							)}

							{picture.url && (
								<div className="posthead">
									<div className="cover">{picture.url && <img src={picture.url} alt={picture.title} />}</div>
								</div>
							)}

							<div className="row ps-body">
								{content && <div className="ps-content" dangerouslySetInnerHTML={{ __html: styleRemove(content) }} />}
								{/* <SocialShare title={title} image={media?.file} url={`${category}/${slug}`} desc={seo?.description ?? excerpt} /> */}
							</div>

							{sources && <Sources mode="text">{sources}</Sources>}
						</>
					)}
				</Section>
			</div>
		)
	)
}

export default PostLayout
