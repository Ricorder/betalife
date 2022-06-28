import classNames from 'classnames'
import { useRef } from 'react'
import { useSwipeable } from 'react-swipeable'

import useStore from 'core/store'
import { Carousel, Link } from 'components/common'
import { Subscribe } from 'components/forms'

const data = [
	{
		title: `Портал для пациентов с рассеянным склерозом и членов их семей`,
		desc: `Все о рассеянном склерозе, образе жизни и контроле заболевания`,
		img: { src: '04.svg', alt: 'Портал для пациентов с рассеянным склерозом и членов их семей', className: 'w-430' }
	},
	{
		title: `Приложение <span>BETA</span>LIFE`,
		desc: `<b>Возьмите рассеянный склероз под контроль!</b><br> Скачивайте BETALIFE. Ведите дневник симптомов. Отмечайте свои ежедневные активности и питание. Следите за статистикой, система напоминаний уведомит о времени приема препарата.`,
		link: { name: 'Узнать больше', url: { href: '/app' } },
		img: { src: '02.png', alt: `Приложение BETALIFE`, className: 'phone' }
	},
	{
		title: `Подписывайся <br />на новости <span>BETA</span>LIFE`,
		desc: `Подписывайся на новости и получай первым информацию о вебинарах и новые материалы.`,
		form: true
	},
	{
		title: `Сервисная программа поддержки пациентов <br /><span>BETA</span>LIFE`,
		desc: `Людям с заболеванием рассеянный склероз и членам их семей доступны все материалы информационного портала BETALIFE.RU, мобильное приложение BETALIFE APP, круглосуточная горячая линия, цикл электронных брошюр «Библиотека рассеянного склероза`,
		link: { name: 'Узнать больше', url: { href: '/services' } },
		img: { src: 'bird.svg', alt: 'Сервисная программа поддержки пациентов BETALIFE' }
	},
	{
		title: `Лекторий для пациентов`,
		desc: `Видео-лекции ведущих специалистов, занимающихся лечением РС и психологической поддержкой пациентов`,
		link: { name: 'Узнать больше', url: { href: '/events/terapiya-pitrs-v-usloviyah-pandemii-covid-19-klyuchevye-aspekty' } },
		img: { src: 'events.svg', alt: 'Лекторий для пациентов', className: 'w-430' }
	}
]

const CarouselItem = ({ title, desc, link, img, form }) => {
	return (
		<div className="item">
			<div className="flex row item-inner">
				<div className="flex column desc">
					{title && <h2 dangerouslySetInnerHTML={{ __html: title }} />}
					{desc && <p dangerouslySetInnerHTML={{ __html: desc }} />}
					{link?.url && (
						<Link {...link.url}>
							<a className="button bl">{link.name}</a>
						</Link>
					)}
				</div>
				<div className={classNames('flex column', { image: img, 'form-block': form })}>
					{img?.src && <img src={`/main-slider/${img.src}`} alt={img?.alt} className={img?.className} />}
					{form && (
						<>
							<div className="head">
								<div className="title">Заполните форму</div>
								<p>и будьте вкурсе всех самых свежих обновлений на сайте</p>
							</div>
							<Subscribe form="subscribe" />
						</>
					)}
				</div>
			</div>
		</div>
	)
}

const SwipeSlider = (props) => {
	const { setSwipeSlider } = useStore()

	const handlers = useSwipeable({ onSwiped: () => setSwipeSlider(true) })
	const swipeRef = useRef()
	const refPassthrough = (el) => {
		handlers.ref(el)
		swipeRef.current = el
	}

	return (
		<section className="main-slider" {...handlers} ref={refPassthrough}>
			<div className="container-inner">
				<Carousel autoplay autoplaySpeed={5000} data={data} renderItem={CarouselItem} />
			</div>
		</section>
	)
}

export default SwipeSlider
