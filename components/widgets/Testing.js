import { useState } from 'react'
import { BoxWrap } from 'components/common'
import { Radio } from 'antd'

const testing = {
	age: ['12 - 17', '18 - 25', '26 - 40', '41 +'],
	gender: ['мужской', 'женский'],
	result: `Спасибо за ответы! <br />Вы помогаете делать <br />портал лучше!`
}

const Testing = ({ children, ...props }) => {
	const [values, setTestValues] = useState({ age: '', gende: '' })
	const { age, gender } = values

	const onChangeRadio = (name) => (e) => name && setTestValues({ ...values, [name]: e.target.value })

	return (
		<BoxWrap className="widget testing" icon="testing" title="Пройдите тест">
			{!age ? (
				<div className="step">
					<h4>1. Укажите Ваш возраст</h4>
					<Radio.Group options={testing.age} onChange={onChangeRadio('age')} value={age} />
				</div>
			) : !gender ? (
				<div className="step">
					<h4>2. Укажите ваш пол</h4>
					<Radio.Group options={testing.gender} onChange={onChangeRadio('gender')} value={gender} />
				</div>
			) : (
				<div className="result" dangerouslySetInnerHTML={{ __html: testing.result }} />
			)}
		</BoxWrap>
	)
}

export default Testing
