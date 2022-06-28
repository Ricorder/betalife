import { useState } from 'react'
import classNames from 'classnames'

import useAction from 'core/api'
import settings from 'core/settings'
import { PageLayout } from 'components/layouts'
import { Section, VideoPlayer, Link } from 'components/common'
import { Carousel } from 'components/antd'

const sliders = [
	{ image: '/app/new-frames/phone_mockup_2.svg' },
	{ image: '/app/new-frames/phone_mockup_3.svg' },
	{ image: '/app/new-frames/phone_mockup_4.svg' },
	{ image: '/app/new-frames/phone_mockup_5.svg' },
	{ image: '/app/new-frames/phone_mockup_6.svg' }
]
const motivation = [
	{ image: '/app/tree/phone_mockup_12.svg' },
	{ image: '/app/tree/phone_mockup_13.svg' },
	{ image: '/app/tree/phone_mockup_14.svg' },
	{ image: '/app/tree/phone_mockup_15.svg' },
	{ image: '/app/tree/phone_mockup_16.svg' },
	{ image: '/app/tree/phone_mockup_17.svg' }
]

const ItemImage = ({ image }) => (
	<div className="item">
		<img src={image} alt="" />
	</div>
)

const CodeQR = () => {
	return (
		<div className="qr-block">
			<p>
				Наведите включенную камеру мобильного <br />
				телефона на QR-код, <br />
				чтобы скачать приложение
			</p>
			<div className="row btns">
				<a href="https://apps.apple.com/ua/app/betalife/id1507787822?l=ru" className="down apple" target="_blank" rel="noreferrer noopener" />
				<a href="https://play.google.com/store/apps/details?id=com.betalife" className="down google" target="_blank" rel="noreferrer noopener" />
			</div>
		</div>
	)
}

const AppPage = ({ data, posts }) => {
	const [state, setState] = useState({ darkmode: false, gender: false })
	const { darkmode, gender } = state

	const onToggle = (name) => () => setState({ ...state, [name]: !state[name] })

	const Switcher = ({ name }) => {
		return (
			<label className={classNames('switch', `${name}-switch`, { active: state[name] })} onClick={onToggle(name)}>
				<span className="slider round" />
			</label>
		)
	}

	return (
		<PageLayout data={data}>
			<Section className="s-main">
				<div className="content three">
					<div className="column c1">
						<div className="btns mobile">
							<a href="https://apps.apple.com/ua/app/betalife/id1507787822?l=ru" className="button down apple" target="_blank" rel="noreferrer noopener">
								<span />
							</a>
							<a href="https://play.google.com/store/apps/details?id=com.betalife" className="button down google" target="_blank" rel="noreferrer noopener">
								<span />
							</a>
						</div>
						<h1 className="row logo-app">
							<i className="icn" />
							<span>BETA</span>LIFE
						</h1>
						<p>
							Мобильное приложение для пациентов <br />с рассеянным склерозом
						</p>
					</div>
					<div className="column c2">
						<div className="frame">
							<img src="/app/new-frames/phone_mockup_1.svg" alt="" />
						</div>
					</div>
					<div className="column c3">
						<CodeQR />
					</div>
				</div>
			</Section>

			<Section className="s-three" id="video">
				<div className="content three">
					<div className="video_wrapper">
						{/* <VideoPlayer mode="youtube" video="BjL8xmi1Goc" /> */}
						<iframe
							src="https://www.youtube.com/embed/BjL8xmi1Goc"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen=""
							frameBorder="0"
						/>
					</div>
				</div>
			</Section>

			<Section className="s-three goldapp" id="goldapp">
				<div className="content two">
					<div className="column">
						<div className="heading">
							<h2>
								Лауреат премии <br />
								«Золотое приложение»
							</h2>
							<p className="orange">в номинации</p>
							<p>
								<b>«Дизайн для всех» (инклюзивность и универсальность)</b>
							</p>
							<a href="http://2020.goldensite.ru/results/" className="button" target="_blank" rel="noreferrer noopener">
								Подробнее
							</a>
						</div>
					</div>
					<div className="column">
						<img src="/app/new-frames/goldapp.svg" alt="" />
					</div>
				</div>
			</Section>

			<Section className="s-two" id="about">
				<div className="heading center">
					<h2>
						<span>Бета</span>лайф
					</h2>
					<div className="text">
						<p>
							Cервисная программа специализированной поддержки пациентов <br />с рассеянным склерозом и членов их семей
						</p>
					</div>
					<a href="/" className="button" target="_blank" rel="noreferrer noopener">
						betalife.ru
					</a>
				</div>
				<div className="content three" id="about_app">
					<div className="column">
						<div className="heading">
							<h2>Возьмите рассеянный склероз под контроль</h2>
							<p className="orange">
								<b>Начните вести дневник</b>
							</p>
						</div>
					</div>
					<div className="column">
						<div className="frame">
							<Carousel data={sliders} renderItem={ItemImage} settings={{ dots: true }} />
						</div>
					</div>
					<div className="column">
						<ul className="list">
							<li>
								<span className="icon i1" />
								<p>
									<b>Дневник симптомов</b>
								</p>
								<p>Наблюдайте за изменениями самочувствия и отслеживайте возникновение симптомов</p>
							</li>
							<li>
								<span className="icon i2" />
								<p>
									<b>Лечение</b>
								</p>
								<p>Вносите информацию о приеме препаратов и дозировке</p>
							</li>
							<li>
								<span className="icon i3" />
								<p>
									<b>Статистика</b>
								</p>
								<p>Наблюдайте за изменениями самочувствия и отслеживайте взаимосвязь симптомов и лечения</p>
							</li>
							<li>
								<span className="icon i4" />
								<p>
									<b>Поиск лечебного учреждения</b>
								</p>
								<p>Найдите ближайшую к вам клинику и получите контактную информацию</p>
							</li>
							<li>
								<span className="icon i8" />
								<p>
									<b>Питание</b>
								</p>
								<p>Вносите данные о питании</p>
							</li>
							<li>
								<span className="icon i9" />
								<p>
									<b>Физическая активность</b>
								</p>
								<p>Указывайте физические упражнения</p>
							</li>
						</ul>
					</div>
				</div>
			</Section>

			<Section className="s-three" id="motivation">
				<div className="content three">
					<div className="column">
						<div className="heading">
							<h2>Не теряйте мотивацию!</h2>
							<p>Регулярно заполняя дневник, вы сможете вырастить интерактивное дерево Betalife</p>
						</div>
					</div>
					<div className="column">
						<div className="frame">
							<Carousel
								data={motivation}
								renderItem={ItemImage}
								settings={{
									speed: 500,
									fade: true,
									dots: false,
									infinite: true,
									slidesToShow: 1,
									slidesToScroll: 1,
									autoplay: true,
									autoplaySpeed: 1000
								}}
							/>
						</div>
					</div>
					<div className="column">
						<div className="notice">
							<span className="icon i6" />
							<p>Используйте скролл на изображении телефона чтобы увидеть процесс роста дерева</p>
						</div>
					</div>
				</div>
			</Section>

			{posts && (
				<Section className="s-media" id="media">
					<div className="heading center">
						<h2>Будьте в курсе</h2>
						<p>
							Читайте новости о рассеянном склерозе и изучайте интересные статьи о диагностике, <br />
							терапии и образе жизни с заболеванием
						</p>
					</div>
					<div className="content three posts">
						{posts?.map((post) => (
							<div key={post._is} className="row item">
								<h3>
									<Link href="/[taxonomy]/[post]" as={`/${post?.categories[0].slug}/${post.slug}`}>
										<a>{post.title}</a>
									</Link>
								</h3>
								{post?.media?.file && (
									<div className="image">
										<img src={`${settings.apiupl}/580x580_${post?.media.file}`} alt={post?.media?.file ?? post.title} />
									</div>
								)}
								{post?.excerpt && <div className="text" dangerouslySetInnerHTML={{ __html: post.excerpt }} />}
							</div>
						))}
					</div>
					<div className="allpost">
						<Link href="/[taxonomy]" as={`/news`}>
							<a className="button">Все новости</a>
						</Link>
					</div>
				</Section>
			)}

			<Section className={classNames('s-theme', { darkmode })} id="darkmode">
				<div className="content three">
					<div className="column">
						<div className="heading">
							<h2>Выбирайте оформление</h2>
							<p>Мы сделали контрастную версию приложения, чтобы его могли использовать люди с нарушениями зрения.</p>
						</div>
					</div>
					<div className="column">
						<div className="frame">
							<img src="https://betalife.ru/wp-content/themes/betalife/assets/images/app-v2/new-frames/phone_mockup_10.svg" className="white" alt="" />
							<img src="https://betalife.ru/wp-content/themes/betalife/assets/images/app-v2/new-frames/phone_mockup_11.svg" className="dark" alt="" />
						</div>
					</div>
					<div className="column">
						<div className="notice">
							<span className="icon i7" />
							<p>Для изменения цветовой схемы используйте переключатель</p>
							<Switcher name="darkmode" />
						</div>
					</div>
				</div>
			</Section>

			<Section className={classNames('s-theme gender', { 'male-mode': gender })} id="gender">
				<div className="content three">
					<div className="column">
						<div className="heading">
							<h2>Выбирайте героя</h2>
							<p>А еще можно выбрать одного из двух героев, который будет сопровождать вас в приложении.</p>
						</div>
					</div>
					<div className="column">
						<div className="frame">
							<img src="https://betalife.ru/wp-content/themes/betalife/assets/images/app-v2/frames/phone-female.svg" className="female" alt="" />
							<img src="https://betalife.ru/wp-content/themes/betalife/assets/images/app-v2/frames/phone-male.svg" className="male" alt="" />
						</div>
					</div>
					<div className="column">
						<div className="notice">
							<span className="icon i7" />
							<p>Для изменения героя используйте переключатель</p>
							<Switcher name="gender" />
						</div>
					</div>
				</div>
			</Section>

			<footer className="footer">
				<div className="container-inner">
					<div className="content contacts">
						<div className="form">
							<CodeQR className="heading" />
						</div>
						<div className="woman" />
					</div>
				</div>

				<div className="buttom">
					<div className="copy">
						<p>
							<b>© 2020. Все права на материалы сайта принадлежат компании ЗАО «БИОКАД»</b>
						</p>
						<p>
							Информация на данном сайте не должна использоваться для самостоятельной диагностики и лечения и не может быть заменой очной консультации врача <br />
							<a href="/user-agreement/" target="_blank" rel="nofollow noopener noreferrer">
								Условия использования сайта
							</a>
							{' | '}
							<a href="/user-agreement/politika-kompanii/" target="_blank" rel="nofollow noopener noreferrer">
								Политика в отношении обработки ПДн
							</a>
							{' | '}
							<a href="/user-agreement/cookies/" target="_blank" rel="nofollow noopener noreferrer">
								Политика Cookies
							</a>
						</p>
					</div>
				</div>
			</footer>
		</PageLayout>
	)
}

export async function getStaticProps() {
	const data = await useAction.get(`pages/app`).then((res) => res)
	const query = {
		limit: 3,
		type: 'post',
		select: '_id title slug excerpt categories tags media',
		ids: '61163c2ea5df77001be4c36a,61154cfce39b9a001bd420c1,6114d298e39b9a001bd37202'
	}
	const records = await useAction.post('posts/filter', query, 'json').then((res) => res?.records || [])
	return { props: { data, records }, revalidate: 3600 }
}

export default AppPage
