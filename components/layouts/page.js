import { styleRemove, classNames } from 'core/utils/general'
import { HeadSeo, Breadcrumbs, Section } from 'components/common'

const PageLayout = ({ container = true, data, className, children, ...props }) => {
	const { slug, title, excerpt, content, seo } = data
	return (
		data && (
			<div className={classNames(`layout-post layout-page`, `page-${slug}`, className)}>
				<HeadSeo slug={slug} {...seo} />

				<Breadcrumbs {...data} />

				{container ? (
					<Section>
						{title && (
							<div className="ps-head">
								<i className="ps-icon" />
								<div className="ps-excerpt">
									<h1>{title}</h1>
								</div>
							</div>
						)}
						{children ? children : content && <div className="ps-content" dangerouslySetInnerHTML={{ __html: styleRemove(content) }} />}

						{/* <Section><pre>{JSON.stringify(data, null, 2)}</pre></Section> */}
					</Section>
				) : (
					children
				)}
			</div>
		)
	)
}

export default PageLayout
