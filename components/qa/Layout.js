import { HeadSeo } from '../common'
import { TaxonomiesWidget } from '../widget'
import Formbox from './Formbox'

export default function Layout({ data, tags, categories, children, ...props }) {
	return (
		<section className="qa-layout">
			<HeadSeo {...data?.seo} />

			<div className={`page page-term page-term-qa ${data.slug}`}>
				{/* <Section className="qa-main"></Section> */}
				<section className="container qa-main">
					<div className="container-inner row">
						<div className="column side">
							<div className="cbox qa-support">
								<div className="cb-place">
									<div className="cb-inner">
										<div className="row cb-title">
											<i className="cb-icon" />
											<h2>Горячая линия</h2>
										</div>
										<p>Если Вам были назначены препараты компании BIOCAD и Вам нужна поддержка, пожалуйста, звоните по номеру горячей линии:</p>
										<div className="phone">8 800 200 08 16</div>
									</div>
								</div>
							</div>

							{tags && <TaxonomiesWidget type="tag" title="Теги" list={tags} />}
							{/* {categories && <TaxonomiesWidget type="category" title="Рубрики" list={categories} />} */}
						</div>

						<div className="column content">
							<Formbox />

							{children}
						</div>
					</div>
				</section>
			</div>
		</section>
	)
}
