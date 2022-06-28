import { nl2br, classNames } from 'core/utils/general'
import { HeadSeo, Breadcrumbs, Section } from 'components/common'

export default function TaxonomyLayout({ head, data, className, children, ...props }) {
	const { type = 'category', slug, name, excerpt, seo } = data

	const meta = {
		slug,
		...seo,
		title: seo?.title || name,
		description: seo?.description || excerpt
	}

	return (
		data && (
			<div className={classNames(`taxonomy layout-taxonomy`, `taxonomy-${type}`, `${type}-${slug}`, className)}>
				<HeadSeo {...meta} />

				<Breadcrumbs {...data} />

				{head && (
					<section className="container page-head" id="head">
						<div className="row ps container-inner">
							<div className="column">
								<h1>{name}</h1>
								<div className="desc">{nl2br(excerpt)}</div>
								{/* <div className="desc" dangerouslySetInnerHTML={{ __html:  }} /> */}
							</div>
						</div>
					</section>
				)}

				<Section>{children}</Section>
			</div>
		)
	)
}
