import PropTypes from 'prop-types'
import { Link } from 'components/common'

export const TaxonomiesWidget = ({ type, data, title, ...props }) => {
	return (
		data?.length > 0 && (
			<div className={`cbox qa-rubric ${type}`}>
				<div className="cb-place">
					<div className="cb-inner">
						<div className="row cb-title">
							<i className="cb-icon" />
							<h2>Рубрики</h2>
						</div>
						<ul className="tabmenu">
							{data?.map((item) => (
								<li key={item.slug} className="cat-item cat-item-16">
									<Link href="/question-answer/[taxonomy]" as={`/question-answer/${item.slug}`}>
										<a title={item.name}>{item.name}</a>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		)
	)
}

TaxonomiesWidget.propTypes = {
	data: PropTypes.array.isRequired,
	type: PropTypes.oneOf(['category', 'tag']),
	title: PropTypes.string
}
TaxonomiesWidget.defaultProps = {
	type: 'category',
	title: 'Рубрики'
}

const Sidebar = ({ categories, tags }) => {
	return (
		<div className="column side">
			{/*  Support */}
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

			{tags && <TaxonomiesWidget type="tag" data={tags} />}

			{categories && <TaxonomiesWidget type="category" data={categories} />}
		</div>
	)
}
export default Sidebar
