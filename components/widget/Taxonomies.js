import PropTypes from 'prop-types'
import WidgetLayout from './Widget'
import Link from '../common/Link'

const Taxonomies = ({ type, list, title, children, ...props }) => {
	return (
		<WidgetLayout title={title} className={type}>
			<ul className="tabmenu">
				{list?.map((item) => (
					<li key={item.slug} className="cat-item cat-item-16">
						<Link href={`/question-answer/[${type}]`} as={`/question-answer/${item.slug}`}>
							<a title={item.name}>{item.name}</a>
						</Link>
					</li>
				))}
			</ul>
			{children}
		</WidgetLayout>
	)
}

Taxonomies.propTypes = {
	list: PropTypes.array.isRequired,
	type: PropTypes.oneOf(['category', 'tag']),
	title: PropTypes.string
}

Taxonomies.defaultProps = {
	type: 'category',
	title: 'Рубрики'
}

export default Taxonomies
