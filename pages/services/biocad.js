import useAction from 'core/api'
import { PageLayout } from 'components/layouts'
import { Section, VideoPlayer } from 'components/common'

const BiocadPage = ({ data }) => {
	return (
		<PageLayout data={data}>
			<Section>
				{data?.title && (
					<div className="ps-head">
						<i className="ps-icon" />
						<div className="ps-excerpt">
							<h1>{data.title}</h1>
						</div>
					</div>
				)}
				<div className="ps-content">
					<p>
						Компания BIOCAD создана в 2001 году. Это одна из крупнейших международных инновационных биотехнологических компаний в России, объединившая научно-исследовательские
						центры мирового уровня, современное фармацевтическое и биотехнологическое производство, доклинические и клинические исследования, соответствующие международным
						стандартам.
					</p>
					<p>
						Более 2500 сотрудников занимаются разработками в научных центрах компании, проводят доклинические и клинические исследования, вовлечены в процесс производства
						лекарственных препаратов и поддержку их сбыта.
					</p>

					<VideoPlayer
						preview="/videos/biocad.jpg"
						video={[
							{ src: `/videos/biocad.mp4`, type: 'video/mp4' },
							{ src: `/videos/biocad.webm`, type: 'video/webm' }
						]}
					/>

					<div className="row biocad-stats">
						<div className="box s1">
							<div className="inner">
								<b>Портфель</b>
								<p>
									60 продуктов, <br />
									20 из которых — биологические <br />
									препараты
								</p>
							</div>
						</div>
						<div className="box s2">
							<div className="inner">
								<b>Разработка</b>
								<p>
									Более 40 препаратов <br />
									находятся в разработке
									<br />
									на данный момент
								</p>
							</div>
						</div>
						<div className="box s3">
							<div className="inner">
								<b>Сотрудники</b>
								<p>
									2500 сотрудников, <br />
									30% — научные сотрудники и исследователи
								</p>
							</div>
						</div>
					</div>

					<p>Одно из направлений деятельности компании BIOCAD&nbsp;—&nbsp;разработка препаратов для лечения аутоиммунных заболеваний.</p>
					<p>
						Аутоиммунные (а также&nbsp;иммуновоспалительные&nbsp;и&nbsp;иммуноассоциированные) заболевания связаны с нарушением регуляции иммунной системы человека, в результате
						чего&nbsp;иммунная система начинает воспринимать собственные ткани и клетки как чужеродные, повреждая&nbsp;или уничтожая&nbsp;их,&nbsp;что может проявляться в виде
						хронического аутовоспалительного процесса. В том случае, когда воспалительный процесс выходит за пределы одного органа или участка тела, заболевание становится
						системным. Причины развития аутоиммунных заболеваний разнообразны, на сегодня не определен единый алгоритм и причина их возникновения.&nbsp;&nbsp;Одним из таких
						заболеваний является рассеянный склероз.
					</p>
					<p>
						Уже более 10 лет BIOCAD занимается исследованиями новых возможностей в терапии рассеянного склероза и производит современные лекарственные препараты, помогая пациентам
						продолжать жить привычной жизнью.
					</p>
				</div>
			</Section>
		</PageLayout>
	)
}
export async function getStaticProps() {
	const data = await useAction.get(`pages/biocad`)
	return { props: { data }, revalidate: 3600 }
}

export default BiocadPage
