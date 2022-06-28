import { HeadSeo, Section } from 'components/common'
import { Banner, Stream, SignUp, Videos } from './'

const getVideosIDs = (videos) => {
	if (!videos.length) return []
	return typeof videos === 'object' ? videos?.map((a) => a.video).join(',') : videos.split(',')
}

const SingleEvent = ({ term, slug, title, content, seo, fields, media, ...props }) => {
	const { date, video, speaker, position, active, pastevents } = fields

	const vids = getVideosIDs(fields?.pastevents)

	return (
		<div className={`term-event event-${slug}`}>
			<HeadSeo {...seo} />

			<Banner single {...{ slug, title, fields }} />

			<Stream date={fields?.date} video={fields.video} />

			<Section className="ps-content event-content">
				<div className="row sblock">
					<div className="column c1">
						<h2>Спикер</h2>
						<div className="author">
							<div className="pic">
								<img src="/images/lecture_author.png" alt="" />
							</div>
							<p>
								<b>Цикорин Игорь Викторович</b>
							</p>
						</div>
						<h2>Что вы узнаете?</h2>
						<p>Вице-президент Общероссийской общественной организации инвалидов-больных рассеянным склерозом (ОООИБРС)</p>
						<p>На вебинаре Игорь Викторович расскажет о возможностях трудоустройства пациентов с РС и ответит на вопросы слушателей</p>
					</div>

					<div className="column c2">
						<p>В ходе лекции будут обсуждены следующие темы:</p>
						<p>
							<b>Законодательная база:</b>
						</p>
						<ul>
							<li>законы в области трудовых отношений;</li>
							<li>права и обязанности работодателя и работника;</li>
							<li>охрана труда.</li>
						</ul>
						<p>
							<b>Разбор основных ситуаций:</b>
						</p>
						<ul>
							<li>диагноз установлен в процессе трудовой деятельности;</li>
							<li>трудоустройство с диагнозом (смена работы);</li>
							<li>трудоустройство с установленной инвалидностью; </li>
							<li>куда обратиться за консультацией и разъяснением;</li>
							<li>куда обратиться в случае подачи жалобы на действия работодателя.</li>
						</ul>
					</div>
					{/* {event.content && <div className="box" dangerouslySetInnerHTML={{ __html: event.content }} />} */}
				</div>
			</Section>

			{fields?.date?.length && <SignUp date={fields.date} />}

			{vids?.length > 0 && <Videos ids={vids} />}
		</div>
	)
}

export default SingleEvent

/* <Section className="expert-single">
	<div className="sc-row">
		<div className="side">
			<div className="item-expert">
				<div className="picture">{getPicture()}</div>
				<div className="person">
					<h2>{data.title}</h2>
					{fields?.wpost && <div className="wpost" dangerouslySetInnerHTML={{ __html: fields.wpost }} />}
					<Link href="/experts"><a className="button">К выбору эксперта</a></Link>
				</div>
			</div>
		</div>
		<div className="content">Content...</div>
	</div>
</Section> */
