import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useState } from 'react'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

const Arrow = ({ disabled, left, onClick, ...props }) => {
	return (
		<span onClick={onClick} className={classNames('cn-arrow', { prev: left, next: !left, disabled: disabled })}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				{left ? <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" /> : <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
			</svg>
		</span>
	)
}

const CarouselNav = ({ slider, current }) => {
	return (
		<div className="carousel-nav">
			<Arrow left onClick={(e) => e.stopPropagation() || slider.current?.prev()} disabled={current === 0} />
			<Arrow onClick={(e) => e.stopPropagation() || slider.current?.next()} disabled={current === slider.current.track.details.slides.length - 1} />
		</div>
	)
}

const CarouselDots = ({ slider, current }) => {
	return (
		<div className="carousel-dots">
			{[...Array(slider.current.track.details.slides.length).keys()].map((idx) => (
				<button key={idx} type="button" aria-label={`Слайд ${idx}`} className={classNames('cn-dot', { active: current === idx })} onClick={() => slider.current?.moveToIdx(idx)} />
			))}
		</div>
	)
}

const CarouselNavigation = ({ nav = true, dots = true, loaded, slider, current, ...props }) => {
	return (
		loaded &&
		slider?.current && (
			<>
				{nav && <CarouselNav loaded={loaded} slider={slider} current={current} />}
				{dots && <CarouselDots loaded={loaded} slider={slider} current={current} />}
			</>
		)
	)
}

const onAutoPlay = (autoplay, autoplaySpeed) => (slider) => {
	if (autoplay) {
		let timeout
		let mouseOver = false
		const clearNextTimeout = () => {
			clearTimeout(timeout)
		}
		const nextTimeout = () => {
			clearTimeout(timeout)
			if (mouseOver) return
			timeout = setTimeout(() => {
				slider.next()
			}, autoplaySpeed)
		}
		slider.on('created', () => {
			slider.container.addEventListener('mouseover', () => {
				mouseOver = true
				clearNextTimeout()
			})
			slider.container.addEventListener('mouseout', () => {
				mouseOver = false
				nextTimeout()
			})
			nextTimeout()
		})
		slider.on('dragStarted', clearNextTimeout)
		slider.on('animationEnded', nextTimeout)
		slider.on('updated', nextTimeout)
	}
}



const Carousel = ({ data, nav, dots, anim, autoplay, autoplaySpeed, slider, renderItem, ...props }) => {
	const [size, setSize] = useState(0)
	const [current, setСurrent] = useState(0)
	const [details, setDetails] = useState(0)
	const [loaded, setLoaded] = useState(false)

	const [sliderRef, instanceRef] = useKeenSlider(
		{
			initial: 2,
			loop: true,
			selector: null,
			slides: data.length,
			slideChanged(s) {
				setСurrent(s.track.details.rel)
			},
			detailsChanged(s) {
				setSize(s.size)
				setDetails(s.track.details)
			},
			created() {
				setLoaded(true)
			}
		},
		[onAutoPlay(autoplay, autoplaySpeed)]
	)

	const animFade = (idx) => {
		if (!details) return {}
		const slide = details.slides[idx]
		return {
			opacity: `${slide.portion}`
		}
	}

	const animZoomOut = (idx) => {
		if (!details) return {}
		const position = details.slides[idx]
		const x = size * position.distance
		const scaleSize = 0.7
		const scale = 1 - (scaleSize - scaleSize * position.portion)
		return {
			transform: `translate3d(${x}px, 0px, 0px) scale(${scale})`,
			WebkitTransform: `translate3d(${x}px, 0px, 0px) scale(${scale})`
		}
	}

	const itemProps = (i) => ({
		style: anim === 'fade' ? animFade(i) : animZoomOut(i),
		className: classNames('slide', { 'slide-fade-out': anim === 'fade', 'slide-zoom-out': anim === 'zoom' })
	})

	return (
		<div className="slider">
			<div ref={sliderRef} className="keen-slider zoom-out">
				{data.map((item, i) => (
					<div key={i} {...itemProps(i)}>
						{renderItem && renderItem({ index: i, ...item })}
					</div>
				))}
			</div>

			<CarouselNavigation nav={nav} dots={dots} loaded={loaded} slider={instanceRef} current={current} />
		</div>
	)
}

Carousel.propTypes = {
	data: PropTypes.array,
	nav: PropTypes.bool,
	dots: PropTypes.bool,
	anim: PropTypes.string,
	autoplay: PropTypes.bool,
	autoplaySpeed: PropTypes.number,
	renderItem: PropTypes.func
}

Carousel.defaultProps = {
	data: [],
	nav: true,
	dots: true,
	anim: 'zoom',
	autoplay: false,
	autoplaySpeed: 2000,
	renderItem: null
}

export default Carousel
