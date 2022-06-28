import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Question } from 'components/forms'

const Formbox = () => {
	const { asPath } = useRouter()
	const [values, setValues] = useState({ loading: false, descmore: true, showform: false })
	const { loading, descmore, showform } = values

	useEffect(() => {
		setValues({ ...values, showform: asPath?.split('#')[1] === 'newquestion' && true })
	}, [])

	const onToggle = (name) => (e) => {
		if (values.hasOwnProperty(name)) {
			e.target.classList.toggle('active')
			setValues({ ...values, [name]: !values[name] })
		}
	}

	return (
		<>
			<div className="cbox question-desc">
				<div className="cb-place">
					<div className="cb-inner">
						<div className="cb-title">
							<i className="cb-icon" />
							<div className="cb-desc">
								<h2>Задать вопрос специалисту</h2>
								<span>
									На вопросы отвечает специалист в области РС при <br />
									поддержке РООИ «Здоровье человека»
								</span>
								<i className={`toggle ${descmore ? 'active' : ''}`} onClick={onToggle('descmore')} />
							</div>
						</div>

						{descmore && (
							<div className="text">
								<p>Специалист:</p>
								<ol>
									<li>отвечает на вопросы в области изучения и терапии рассеянного склероза;</li>
									<li>предоставляет только общую информацию по заданному вопросу;</li>
									<li>
										не предоставляет заключений по диагнозу и не назначает терапию, но может обозначить круг вопросов, по которым можно проконсультироваться с лечащим врачом с
										учетом особенностей каждого конкретного случая;
									</li>
									<li>
										представляемая информация и ответы на вопросы не являются медицинской рекомендацией, не предназначена для использования в качестве медицинской консультации, и
										не является заменой очной консультации лечащего врача.
									</li>
								</ol>
								<button type="button" className="button button-ask" onClick={onToggle('showform')}>
									Задать вопрос
								</button>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Form add new question */}
			{showform && (
				<div id="newquestion" className="cbox qa-form">
					<div className="cb-place">
						<div className="cb-inner">
							<h3>Задайте вопрос специалисту</h3>
							<Question form="askquestion" />
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Formbox
