import useAction from 'core/api'
import { PageLayout } from 'components/layouts'
import { Section, Link } from 'components/common'
import { Question } from 'components/forms'

const ServicesPage = ({ data }) => {
	return (
		<PageLayout data={data}>
			<Section className="services">
				{data?.title && <h1 className="hide">{data?.title}</h1>}

				<div className="row">
					<div className="column left">
						<div className="row library">
							<div className="block about">
								<div className="head">
									<div className="title">Информационные материалы «Библиотека РС»</div>
									<div className="desc">Цикл брошюр для пациентов с рассеянным склерозом и членов их семей.</div>
								</div>
								<Link href="/services/library">
									<a className="button">Смотреть онлайн</a>
								</Link>
							</div>

							<div className="block list">
								<div className="title">Интернет портал BETALIFE</div>
								<ul>
									<li className="i1">Общая информация о различных аспектах заболевания рассеянный склероз и методах терапии</li>
									<li className="i2">Рекомендации по ведению правильного образа жизни</li>
									<li className="i3">Лекции от ведущих специалистов по терапии рассеянного склероза</li>
								</ul>
							</div>
						</div>

						<div className="block mapp">
							<div className="list">
								<div className="title">Мобильное приложение</div>
								<ul>
									<li className="i1">
										<span>Регулярно заполняйте дневники контролируйте: </span>
										<ul>
											<li>Развитие симптомов</li>
											<li>Прием терапии</li>
											<li>Режим питания</li>
											<li>Физическую активность</li>
										</ul>
									</li>
									<li className="i2">Рекомендации по ведению правильного образа жизни</li>
								</ul>

								<div className="download">
									<div className="links">
										<a href="https://play.google.com/store/apps/details?id=com.betalife" className="google" target="_blank" rel="noopener noreferrer" />
										<a href="https://apps.apple.com/ua/app/betalife/id1507787822?l=ru" className="apple" target="_blank" rel="noopener noreferrer" />
									</div>
									<p>Наведите включенную камеру мобильного телефона на QR-код, чтобы скачать приложение</p>
								</div>
							</div>
						</div>

						<div className="block support">
							<div className="title">Круглосуточная горячая линия</div>
							<div className="phone">
								<a href="tel:8 (800) 200-08-16">8 (800) 200-08-16</a>
							</div>
							<div className="desc">
								<p>Консультация пациентов по общим вопросам, касающимся заболевания «Рассеянный склероз» и терапии препаратами BIOCAD.</p>
								<p>При необходимости доступна консультация специалиста по медицинской информации</p>
							</div>
						</div>
					</div>

					<div className="column right">
						<div className="block vk">
							<div className="image">
								<img src="/images/vk.svg" alt="Официальная группа BETALIFE ВКОНТАКТЕ" />
							</div>
							<div className="title">Официальная группа BETALIFE ВКОНТАКТЕ</div>
							<a href="https://vk.com/betaliferu" className="button" target="_blank" rel="noopener noreferrer">
								Перейти
							</a>
						</div>

						<div className="block question">
							<div className="title">Задайте вопрос специалисту</div>
							<div className="row desc">На вопросы отвечает специалист в области РС при поддержке РООИ «Здоровье человека»</div>
							<div className="formbox"></div>
							<Question form="askquestion" />
						</div>
					</div>
				</div>
			</Section>

			<Section className="medical-support">
				<div className="row">
					<div className="column">
						<div className="head">
							<b>Служба медико-информационной поддержки</b>
							<p>организована РООИ «Здоровье человека» при поддержке компании BIOCAD</p>
						</div>
						<div className="medical-support-content">
							<b>Специалисты службы оказывают:</b>
							<p>Консультационную помощь по общим аспектам заболевания рассеянный склероз: подготовки препарата, техники проведения инъекции, хранения и перевозки лекарств.</p>
							<p>
								Информационно-психологическую поддержку: как правильно рассказать о диагнозе своим близким, возможности полноценной жизни, адаптации к новой жизненной ситуации,
								бытовой, общественной и профессиональной жизни.
							</p>
							<b>Уточняйте, как обратиться к специалисту службы в вашем региональном Центре неврологии.</b>
						</div>
					</div>

					<div className="column regions">
						<div className="head">Служба действует в 23 регионах для пациентов получающих препараты Глатирамера ацетат и Терифлуномид</div>
						<div className="row content">
							<ol>
								<li>СПб, Ленинградская обл.</li>
								<li>Москва</li>
								<li>Московская обл.</li>
								<li>Ярославская обл.</li>
								<li>Владимирская обл.</li>
								<li>Ивановская обл.</li>
								<li>Орловская обл.</li>
								<li>Нижегородская обл.</li>
								<li>Тамбовская обл.</li>
								<li>Воронежская обл.</li>
								<li>Пензенская обл.</li>
								<li>Ростовская обл.</li>
								<li>Краснодарский край</li>
								<li>Республика Татарстан</li>
								<li>Самарская обл.</li>
								<li>Свердловская обл.</li>
								<li>Челябинская обл.</li>
								<li>Тюменская обл.</li>
								<li>Новосибирская обл.</li>
								<li>Кемеровская обл.</li>
								<li>Вологодская обл.</li>
								<li>Липецкая обл.</li>
							</ol>
						</div>
					</div>
				</div>
			</Section>

			<Section className="additionals">
				<div className="row">
					<div className="block additional">
						<span className="icon map" />
						<p className="title">
							Карта медицинских <br />
							учреждений
						</p>
						<p>Центры рассеянного склероза</p>
						<Link href="/services/hospitals">
							<a className="button outline">Перейти</a>
						</Link>
					</div>

					<div className="block additional">
						<span className="icon control" />
						<p className="title">Фармаконадзор</p>
						<p>Возможность сообщить о нежелательной реакции</p>
						<Link href="/services/farmakonadzor">
							<a className="button outline">Перейти</a>
						</Link>
					</div>

					<div className="block additional">
						<span className="icon control" />
						<p className="title">Ответы на вопросы</p>
						<p>Общие рекомендации и информация</p>
						<Link href="/question-answer">
							<a className="button outline">Перейти</a>
						</Link>
					</div>

					<div className="block additional">
						<span className="icon map" />
						<p className="title">О BIOCAD</p>
						<p>Краткая информация о компании</p>
						<Link href="/services/biocad">
							<a className="button outline">Перейти</a>
						</Link>
					</div>
				</div>
			</Section>
		</PageLayout>
	)
}

export async function getStaticProps() {
	const data = await useAction.get(`pages/services`)
	return { props: { data }, revalidate: 3600 }
}

export default ServicesPage
