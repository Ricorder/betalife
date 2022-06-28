import { useState } from 'react'

import useAction from 'core/api'
import glossary from 'core/context/glossary'

import { PageLayout } from 'components/layouts'
import { Section, BoxWrap } from 'components/common'

const GlossaryPage = ({ data }) => {
	const [current, setCurrent] = useState('А')

	const showAlphabetLetters = () => {
		// prettier-ignore
		const alphabet = ["А","Б","В","Г","Д","Е","Ё","Ж","З","И","Й","К","Л","М","Н","О","П","Р","С","Т","У","Ф","Х","Ц","Ч","Ш","Щ","Ъ","Ы","Ь","Э","Ю","Я"]

		// const letterActive = alphabet.filter((a) => !exclude.some((e) => e === a))
		const letterActive = alphabet.filter((a) => glossary.some((s) => s.name[0].toUpperCase() === a))
		return (
			<BoxWrap title="Глоссарий" className="alphabet" excerpt="Словарь узкоспециализированных терминов по заболеванию.">
				<p>
					<b>Фильтрация «По буквам»:</b>
				</p>
				{letterActive && (
					<div className="row letters">
						{letterActive?.map((a) => (
							<span key={a} className={a === current ? 'active' : null} onClick={() => setCurrent(a)}>
								{a.toUpperCase()}
							</span>
						))}
					</div>
				)}
			</BoxWrap>
		)
	}

	const showLetterContent = () => {
		return (
			<BoxWrap className="alphabet-letter">
				<div className="itab">
					<h2>{current}</h2>
					{current &&
						glossary
							.filter((a) => a.name[0].toUpperCase() == current)
							.map((a, i) => (
								<p key={i}>
									<b>{a.name} — </b> {a.desc}
								</p>
							))}
				</div>
			</BoxWrap>
		)
	}

	return (
		<PageLayout data={data}>
			<Section>
				<div className="sc-row middle">
					<div className="side">{showAlphabetLetters()}</div>
					<div className="content">{showLetterContent()}</div>
				</div>
			</Section>
		</PageLayout>
	)
}
export async function getStaticProps() {
	const data = await useAction.get(`pages/glossary`)
	// const term = await useAction.get(`terms/glossary`)
	return { props: { data }, revalidate: 60 }
}

export default GlossaryPage
