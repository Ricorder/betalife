import { Section, VideoPlayer } from 'components/common'

const Video = ({ picture = '', video = '' }) => {
	return (
		<Section className="main-video">
			<div className="row inner">
				<div className="column lside column-video">
					<VideoPlayer pattern mode="youtube" preview={picture} video={video} />
				</div>
				<div className="row rside">
					<h2>Приветственное слово</h2>
					<p className="author">Бойко Алексей Николаевич</p>
					<p className="desc">
						Президент РОКИРС, доктор медицинских наук, профессор кафедры неврологии, нейрохерургии и медицинской генетики ГБОУ ВПО РНИМУ имени Н.И. Пирогова Минздрава России
					</p>
				</div>
			</div>
		</Section>
	)
}

export default Video
