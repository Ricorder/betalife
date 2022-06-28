import { Drawer } from 'antd'
import { useEffect, useState } from 'react'

import { Link, Cookie } from 'components/common'
import { Question } from 'components/forms' // Contacts

const social = [
	{ key: 'vk', title: 'VK', url: 'https://vk.com/betaliferu' },
	{ key: 'yt', title: 'YouTube', url: 'https://www.youtube.com/channel/UCXIAZwlRU34cM6sK-H2hZEQ' },
	{ key: 'yz', title: 'Yandex Dzen', url: 'https://zen.yandex.ru/id/611b842483015850172afdfb' }
]
const menu = {
	qacats: [
		{ name: 'Подозрение на РС', link: { href: '/question-answer/[taxonomy]', as: '/question-answer/podozrenie-na-rs' } },
		{ name: 'Пациент со стажем', link: { href: '/question-answer/[taxonomy]', as: '/question-answer/pacient-so-stazhem' } },
		{ name: 'Назначили терапию', link: { href: '/question-answer/[taxonomy]', as: '/question-answer/naznachili-terapiyu' } },
		{ name: 'Поставлен диагноз', link: { href: '/question-answer/[taxonomy]', as: '/qaquestion-answer/diagnostirovan-rs' } },
		{ name: 'У моего ребенка РС', link: { href: '/question-answer/[taxonomy]', as: '/question-answer/u-rebenka-rs' } },
		{ name: 'Близкий больного', link: { href: '/question-answer/[taxonomy]', as: '/question-answer/blizkij-bolnogo' } }
	],
	extra: [
		{ name: 'Что такое ПИТРС', link: { href: '/[taxonomy]/[post]', as: '/therapy/preparaty-izmenyayushchie-techenie-rasseyannogo-skleroza-pitrs' } },
		{ name: 'Диета и питание', link: { href: '/[taxonomy]/[post]', as: '/lifestyle/dieta-pri-rasseyannom-skleroze-menyu-na-kazhdyj-den' } },
		{ name: 'Симптомы и лечение', link: { href: '/[taxonomy]/[post]', as: '/encyclopedia/pervye-simptomy-rasseyannogo-skleroza' } }
	],
	terms: [
		{ name: 'Условия использования сайта', link: { href: '/user-agreement' } },
		{ name: 'Политика в отношении обработки ПДн', link: { href: '/user-agreement/[slug]', as: '/user-agreement/politika-kompanii' } },
		{ name: 'Политика Cookies', link: { href: '/user-agreement/[slug]', as: '/user-agreement/cookies' } }
	]
}

const Footer = () => {
	const currentYear = new Date().getFullYear()
	const [visible, setVisible] = useState(false)

	/* 
	const [links, setLinks] = useState([])
	useEffect(() => {loadData()}, [])
	const loadData = async () => await useAction.get(`terms/qa`).then((res) => res && !res?.error && res?.categories && setLinks(res.categories))	
	*/

	return (
		<footer className="footer">
			<div className="container-inner">
				<div className="row top stb">
					<Link href="/">
						<a className="logo" title="BETALIFE" aria-label="BETALIFE" />
					</Link>

					<div className="row social">
						{social?.map((a) => (
							<a key={a.key} href={a.url} className={a.key} title={a.title} target="_blank" rel="noreferrer noopener" />
						))}
						<div className="row apps">
							<span>Еще больше полезного в приложении</span>
							<a href="https://apps.apple.com/ua/app/betalife/id1507787822?l=ru" title="Apple Store" className="applestore" target="_blank" rel="noreferrer noopener" />
							<a href="https://play.google.com/store/apps/details?id=com.betalife" title="Google Play" className="googleplay" target="_blank" rel="noreferrer noopener" />
						</div>
					</div>

					<button className="button outline writetous" onClick={() => setVisible(true)}>
						Написать нам
					</button>
				</div>

				{/* <div className="row about">
					<p><a href="https://biocad.ru" target="_blank" rel="noreferrer noopener">Сайт создан при поддержке BIOCAD</a></p>
					<p>198515, Санкт-Петербург, п.Стрельна, ул.Связи, 34-А</p>
					<p>+7 (812) 380-49-33 \ Факс: +7 (812) 380-49-34</p>
				</div> */}

				<div className="bottom stb">
					<div className="row copyright">
						<span>© {currentYear}. Все права на материалы сайта принадлежат компании АО «БИОКАД»</span>

						{menu.terms.length > 0 && (
							<ul className="row terms">
								{menu.terms.map((a, i) => (
									<li key={i}>
										<Link {...a.link}>
											<a title={a.name}>{a.name}</a>
										</Link>
									</li>
								))}
							</ul>
						)}
					</div>
					<div className="legal">
						Информация на данном сайте не должна использоваться для самостоятельной диагностики и лечения и не может быть заменой очной консультации врача
					</div>
				</div>
			</div>

			<Drawer
				closable
				title={null}
				width={false}
				footer={null}
				placement="right"
				visible={visible}
				getContainer={true}
				className="drawer-form"
				onClose={() => setVisible(false)}
				closeIcon={<i className="fas fa-chevron-left" />}>
				{/* <Contacts form="writetous" /> */}
				<Question form="askquestion" />
			</Drawer>

			{/* <Modal footer={null} centered={true} className="modal-writetous" visible={visible} onCancel={() => setVisible(false)}></Modal> */}

			<Cookie data={null} />
		</footer>
	)
}

export default Footer
