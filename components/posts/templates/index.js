import React from 'react'

import RuleLife from './RuleLife' // Управляй жизнью с рассеянным склерозом
import PatientPath from './PatientPath' // Путь пациента с рассеянным склерозом
import LiveConfidently from './LiveConfidently' // Живи уверенно
import QuestionsDoctors from './QuestionsDoctors' // Вопросы врачу

const templates = {
	'zhivi-uverenno': LiveConfidently,
	'voprosy-vrachu': QuestionsDoctors,
	'put-pacienta-s-rasseyannym-sklerozom': PatientPath,
	'upravlyaj-zhiznyu-s-rasseyannym-sklerozom': RuleLife
}

export const checkTemplate = (slug) => typeof templates[slug] !== 'undefined'

export const PostTemplate = ({ slug }) => {
	return slug && typeof templates[slug] !== 'undefined' && React.createElement(templates[slug], {})
}
