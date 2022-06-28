import { useState, useEffect } from 'react'

import useAction from 'core/api'
import { gtmevent } from 'core/utils/metrics'
import { dataKeys, getFields, onSendForm } from 'core/utils/form'
import { Message } from 'components/common'
import { FormControl } from './particles'

const QuestionForm = ({ form }) => {
	const [dataform, setDataForm] = useState('')
	const [message, setMessage] = useState('')
	const [values, setValues] = useState({ ...dataKeys.state })
	const { loading, subject, email, name, msg, agree_service, agree_personal, agree_mailing, agree_qa, providers, requireds, formData } = values

	useEffect(() => {
		initForm()
	}, [])

	const initForm = async () => {
		setValues({ ...values, loading: true, formData: new FormData() })

		if (form && !dataform) {
			await useAction.get(`forms/${form}`).then((data) => {
				if (!data || data.error) return setValues({ ...values, loading: false })

				// const _agrees = data?.providers?.salesforce && getKeys(dataKeys?.agree, data.providers?.salesforce)
				// console.log(`_agrees:`, _agrees)

				const fields = getFields(data)
				setValues({ ...fields, loading: false, formData: new FormData() })
				setDataForm(fields)
				setMessage('')
			})
		}
	}

	const onChangeInput = (type, name) => (e) => {
		const value = type === 'checkbox' ? e.target.checked : e.target.value
		const nname = name === 'msg' ? 'message' : name
		formData.set(nname, value)
		setValues({ ...values, [name]: value, formData })
	}

	const onSubmitForm = async (e) => {
		e.preventDefault()

		if (requireds.find((a) => !values[a]?.length)) {
			return setMessage({ type: 'error', msg: 'Поля отмеченные * - обязательны для заполнения' })
		}
		if (!agree_qa || !agree_service || !agree_personal) {
			return setMessage({ type: 'error', msg: 'Вы не согласились с правилами сайта' })
		}

		
		formData.set('subject', 'Задать вопрос специалисту')

		setValues({ ...values, loading: true })
		await useAction.post(`forms/${form}`).then((data) => {
			setValues({ ...values, loading: false })
			if (!data) return setMessage({ type: 'error', msg: `Ошибка сервера` })
			if (data?.error) return setMessage({ type: 'error', msg: data.error })

			setValues({ ...dataform, formData: new FormData() })
			setMessage({ type: 'success', msg: 'Спасибо, Ваше сообщение успешно отправлено' })
			setTimeout(() => setMessage(''), 3000)
		})

		// Google Tag Manager Event
		if (typeof providers['gtmevent']['event'] !== 'undefined') {
			gtmevent(providers['gtmevent']['event'])
		}
		
	}

	const onCheckValid = (key) => (message?.type === 'error' && !values[key]?.length ? 'error' : 'success')

	return (
		<form onSubmit={onSubmitForm}>
			<h2>Задать вопрос специалисту</h2>
			<div className="desc">
				На вопросы отвечает специалист в области РС при <br />
				поддержке РООИ «Здоровье человека»
			</div>
			<br />
			<div className="formbox">
				<FormControl required type="text" name="name" value={name} placeholder="Ваше Имя *" onChange={onChangeInput} onValid={onCheckValid} />

				<FormControl required type="text" name="email" value={email} placeholder="Ваш адрес электронной почты *" onChange={onChangeInput} onValid={onCheckValid} />

				<FormControl required type="textarea" name="msg" value={msg} placeholder="Текст вопроса *" onChange={onChangeInput} onValid={onCheckValid} />

				<div className="acceptance">
					<FormControl required type="checkbox" name="agree_qa" value={agree_qa} onChange={onChangeInput} onValid={onCheckValid}>
						{`Я согласен на опубликование моего имени, вопроса и ответа на него в разделе `}
						<a href="/question-answer" target="_blank">
							«Ответы на вопросы»
						</a>
						<i className="req" />
					</FormControl>

					<FormControl required type="checkbox" name="agree_service" value={agree_service} onChange={onChangeInput} onValid={onCheckValid}>
						{`Я ознакомился и согласен с `}
						<a href="/user-agreement/usloviya-ispolzovaniya-servisa-vopros-otvet" target="_blank">
							Условиями использования Сервиса
						</a>
						{` и `}
						<a href="/user-agreement">Условиями использования Сайта</a>
						<sup>*</sup>
					</FormControl>

					<FormControl required type="checkbox" name="agree_personal" value={agree_personal} onChange={onChangeInput} onValid={onCheckValid}>
						{'Я согласен на '}
						<a href="/user-agreement/soglasie-na-obrabotku-personalnyh-dannyh-polzovatelej-servisa-zadat-vopros" target="_blank">
							обработку персональных данных
						</a>
						<sup>*</sup>
					</FormControl>
				</div>

				<div className="row row-buttons">
					{loading != 'true' && (
						<button type="submit" className="button submit" onClick={onSubmitForm}>
							Отправить вопрос
						</button>
					)}
					<Message {...message} />
				</div>
			</div>
		</form>
	)
}

export default QuestionForm
