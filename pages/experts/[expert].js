import { useEffect, useState } from 'react'

import { Collapse } from 'antd'
const { Panel } = Collapse

import useAction from 'core/api'
import settings from 'core/settings'

import { Link, HeadSeo, Section } from 'components/common'
import { styleRemove } from 'core/utils/general'

const ExpertSinglePage = ({ data }) => {
	const [content, setContent] = useState([])

	useEffect(() => {
		data?.content && onSlipet(data.content)
	}, [])
	const onSlipet = (cont) => {
		const arrContent = cont.split(`<h2>`)
		const result = []
		arrContent.map((item) => {
			const el = item.split('</h2>')
			el.length > 1 ? result.push({ title: el[0], desc: el[1] }) : result.push({ title: '', desc: el[0] })
		})
		setContent(result)
	}

	const { slug, title, seo, fields, media } = data
	const { wpost, foreword } = fields

	const getPicture = () => media?.file && <img src={`${settings.apiupl}/${media.file}`} alt={media?.title || title} />

	// const username = title.replaceAll(' ', '<br />')

	return (
		<div className="page page-expert-single">
			<HeadSeo {...seo} />

			<Section className="expert-single">
				{/* Examples 2 Column Layout with Sidebar & Content */}
				<div className="sc-row">
					<div className="side">
						<div className="item-expert">
							<div className="picture">{getPicture()}</div>

							<div className="person">
								<h2>{data.title}</h2>
								{fields?.wpost && <div className="wpost" dangerouslySetInnerHTML={{ __html: fields.wpost }} />}
								<Link href="/experts">
									<a className="button">К выбору эксперта</a>
								</Link>
							</div>
						</div>
					</div>

					<div className="content">
						<div className="wbox quote" dangerouslySetInnerHTML={{ __html: fields.foreword }} />

						<Collapse defaultActiveKey={['1']} bordered={false} ghost>
							{content.map((item, i) =>
								item?.title ? (
									<Panel className="wbox" header={<h2 dangerouslySetInnerHTML={{ __html: item.title }} className="wb-title" />} key={i} showArrow={false}>
										<div dangerouslySetInnerHTML={{ __html: styleRemove(item.desc) }} className="wb-content" />
									</Panel>
								) : (
									<div key={i} dangerouslySetInnerHTML={{ __html: styleRemove(item.desc) }} />
								)
							)}
						</Collapse>

						{/* <div className="wbox">
							<div className="wb-title">Лечебная физкультура при рассеянном склерозе</div>
						</div>

						<div className="wbox">
							<div className="wb-title">ЛФК при рассеянном склерозе — от теории к практике</div>
						</div>

						<div className="wbox">
							<div className="wb-title">Комплекс упражнений на устранение спастичности нижних конечностей</div>
							<div className="wb-content active">
								<p>
									Повышение мышечного тонуса по спастическому типу — характерный симптом рассеянного склероза. Лечение спастичности включает как медикаментозную терапию, так
									лечебную физкультуру и физическую реабилитацию. Спастика в ногах затрудняет передвижение и может изменять походку. Обычно этот симптом сопровождается неприятными
									ощущениями, которые отвлекают на себя внимание. Они мешают человеку не только во время движения, но и в покое, могут стать причиной нарушения сна.
								</p>
								<p>
									Приведенная ниже группа упражнений направлена на уменьшение спастики в ногах. Комплекс может помочь снять общее и локальное мышечное напряжение, уменьшить болевой
									синдром.
								</p>
								<p>
									Для выполнения комплекса вам понадобятся дополнительные материалы: валик и фитнес-резинка. Можно вместо них использовать полотенце. Упражнения производятся лежа
									или стоя на гимнастическом коврике, лежа на кровати или кушетке, сидя на стуле. Для упражнений стоя на коврике возможно использовать опору, например, стул.
								</p>

								<div className="video"></div>

								<h3>1. Растяжение мышц бедер</h3>
								<p>
									Примите положение лежа на спине. Ладони плотно прижаты к коврику. Если это не вызывает неприятных ощущений, расположите руки по бокам коврика, так, чтобы
									положение тела напоминало букву «Т». Стопы стоят на полу, колени комфортно согнуты.
								</p>

								<p>
									Скручивайте бедра в одну сторону, а затем в другую. В крайнем положении можно задержаться на 30 секунд, сохраняя ровное дыхание. По возможности удерживайте колени
									вместе. Помните, что цель упражнения — не положить колени на пол, а растянуть бедра.
								</p>

								<p>
									<i>Повторите упражнение от 5 до 10 раз на каждую сторону.</i>
								</p>

								<h3>2. Растяжение сгибателей бедер</h3>
								<p>
									Примите положение лежа на спине на кровати или кушетке. Колени должны свисать с края кушетки. Расслабьте тело. Почувствуйте, как происходит растяжение в местах
									прикрепления мышц бедер. Сохраняйте ровное дыхание и максимально расслабленное тело.
								</p>

								<p>
									<b>
										<i>Постарайтесь удерживать это положение от 30 до 60 секунд.</i>
									</b>
								</p>

								<h3>3. Растяжение икр</h3>
								<p>
									Вам понадобится валик. Можно использовать скатанное полотенце. Поставьте на него носок одной ноги, пяткой попытайтесь дотянуться до пола. Эта нога опорная. Другой
									ногой, свободной, делаем выпад вперед. Глубина выпада комфортная. Делайте такую амплитуду, какую вам позволяет тело. Вес должен оставаться на опорной ноге.
									Возвращаемся и меняем ногу.
								</p>

								<p>
									<b>
										<i>Выполняйте упражнение 30 секунд, по 15 с. на каждую ногу.</i>
									</b>
								</p>

								<h3>4. Упражнение на растяжение лодыжек</h3>
								<p>Примите положение сидя на стуле с прямой спиной. Возьмите резинку или полотенце. Зацепите за одну из стоп и потяните обеими руками на себя и наверх.</p>

								<p>
									<b>
										<i>Удерживайте такое положение от 20 до 30 секунд. Затем повторите на другую ногу.</i>
									</b>
								</p>

								<h3>5. Вращение стоп</h3>
								<p>
									Выберите опорную ногу. Стоя на ней, согните в колене другую ногу и поднимите ее на комфортную высоту. Начните вращать стопу поднятой ноги в одну из сторон.
									Опорная нога должна быть устойчивой. Если вам неудобно, вы можете взяться за опору, например, за стул.
								</p>

								<p>
									<b>Вращайте стопу от 15 до 30 раз в одну сторону, а затем в другую столько же раз. Поменяйте ногу и повторите упражнение.</b>
								</p>

								<p>
									Вращение стопы с использованием небольшого резинового мяча, лежащего на полу, может уменьшить спастичность, улучшить баланс и подвижность в голеностопном суставе,
									особенно при слабости в стопах.
								</p>
							</div>
						</div>

						<div className="wbox">
							<div className="wb-title">Упражнения на контроль за мочевым пузырем</div>
						</div>

						<div className="wbox">
							<div className="wb-title">Упражнения на улучшение координации</div>
						</div> */}
					</div>
				</div>
			</Section>
		</div>
	)
}
export async function getStaticPaths() {
	const paths = await useAction.get(`terms/experts`, { limit: 1000 }).then((res) => res?.records.map((a) => ({ params: { expert: a.slug } })))
	return { paths: paths, fallback: false }
}

export async function getStaticProps({ params }) {
	const data = await useAction.get(`posts/${params.expert}`)
	if (!data || data.error) return { notFound: true }
	return { props: { data }, revalidate: 60 }
}

export default ExpertSinglePage
