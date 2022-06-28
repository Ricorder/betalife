import PropTypes from 'prop-types'
import { useRef } from 'react'
import { Carousel as AntdCarousel } from 'antd'

const defaultSettings = {
	infinite: true,
	initialSlide: 0,
	slidesToShow: 1,
	slidesToScroll: 1,
	adaptiveHeight: false
}

const Carousel = ({ data, nav, settings, renderItem, ...props }) => {
	const slider = useRef(null)
	const reSettings = {
		...defaultSettings,
		...settings
	}

	return (
		data?.length > 0 && (
			<div className="widget-carousel">
				{nav && (
					<div className="row head">
						{/* {title && <span className="stitle">{title}</span>} */}
						<div className="row carousel-nav">
							<div className="prev" onClick={() => slider.current.prev()}>
								<i className="fa-solid fa-arrow-left" />
							</div>
							<div className="next" onClick={() => slider.current.next()}>
								<i className="fa-solid fa-arrow-right" />
							</div>
						</div>
					</div>
				)}

				<div className="carousel slider">
					<AntdCarousel ref={slider} {...reSettings}>
						{data.map((item, i) => (
							<div key={i} {...item}>
								{renderItem && renderItem({ index: i, ...item })}
							</div>
						))}
					</AntdCarousel>
				</div>
			</div>
		)
	)
}

Carousel.propTypes = {
	nav: PropTypes.bool,
	data: PropTypes.array,
	settings: PropTypes.object,
	renderItem: PropTypes.func
}
Carousel.defaultProps = {
	data: null,
	nav: false,
	settings: {}
}

export default Carousel
