import { useState, useEffect } from 'react'

import useAction from 'core/api'
import { gtmevent } from 'core/utils/metrics'
import { dataKeys, getFields } from 'core/utils/form'
import { FormControl } from './particles'
import { Message } from 'components/common'

const LectureForm = ({ form }) => {
	const [dataform, setDataForm] = useState('')
	const [message, setMessage] = useState({})
	const [values, setValues] = useState({ ...dataKeys.state })
	const { loading, name, email, subject, msg, agree_service, agree_personal, agree_mailing, agree_qa, providers, requireds, formData } = values

	useEffect(() => {
		initForm()
	}, [])

	const initForm = async () => {
		setValues({ ...values, loading: true, formData: new FormData() })
		if (form && !dataform) {
			await useAction.get(`forms/${form}`).then((data) => {
				if (!data || data.error) return setValues({ ...values, loading: false })
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

		if (requireds?.find((a) => typeof values[a] !== 'undefined' && !values[a].length)) {
			return setMessage({ type: 'error', msg: 'Поля отмеченные * обязательны для заполнения' })
		}
		if (!agree_service || !agree_personal) {
			return setMessage({ type: 'error', msg: 'Вы не согласились с правилами сайта' })
		}

		formData.set('subject', 'Регистрация в лекторий')

		setValues({ ...values, loading: true })
		await useAction.post(`forms/${form}`, formData).then((data) => {
			setValues({ ...values, loading: false })
			if (!data) return setMessage({ type: 'error', msg: `Ошибка сервера` })
			if (data.error) return setMessage({ type: 'error', msg: data.error })
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
		<form className="formbox" onSubmit={onSubmitForm}>
			<div className="row-group">
				<FormControl required type="text" name="name" value={name} placeholder="Ваше Имя *" onChange={onChangeInput} onValid={onCheckValid} />

				<FormControl required type="text" name="email" value={email} placeholder="Ваш адрес электронной почты *" onChange={onChangeInput} onValid={onCheckValid} />
			</div>

			<FormControl type="textarea" name="msg" value={msg} onChange={onChangeInput} />

			<div className="acceptance">
				<FormControl required type="checkbox" name="agree_service" value={agree_service} onChange={onChangeInput} onValid={onCheckValid}>
					{'Я ознакомился и согласен с '}
					<a href="/user-agreement/usloviya-ispolzovaniya-servisa-podpishis-na-obnovleniya-proekta" target="_blank">
						Условиями использования Сервиса
					</a>
					{' и '}
					<a href="/user-agreement" target="_blank">
						Условиями использования Сайта.
					</a>
					<sup>*</sup>
				</FormControl>

				<FormControl required type="checkbox" name="agree_personal" value={agree_personal} onChange={onChangeInput} onValid={onCheckValid}>
					{'Я согласен на '}
					<a href="/user-agreement/soglasie-na-obrabotku-personalnyh-dannyh-polzovatelej-servisa-podpishis-na-obnovleniya-proekta" target="_blank">
						обработку персональных данных
					</a>
					<sup>*</sup>
				</FormControl>

				<FormControl required type="checkbox" name="agree_mailing" value={agree_mailing} onChange={onChangeInput} onValid={onCheckValid}>
					Я согласен получать новостную рассылку
				</FormControl>
			</div>

			<div className="row row-buttons">
				{loading != 'true' && (
					<button type="submit" className="button submit" onSubmit={onSubmitForm}>
						Подписаться
					</button>
				)}
				<Message {...message} />
			</div>
		</form>
	)
}

export default LectureForm

{
	/* 

{
					_id: '60d366da7dfb81001b13dc51',
					status: 2,
					recipient: 'yura.web.develop@gmail.com',
					template: '',
					notice: false,
					notice_message: '',
					key: 'writetous',
					title: 'Написать нам',
					fields: [
						{ type: 'string', name: 'subject', label: 'Тема', options: { default: true, required: false } },
						{ type: 'string', name: 'email', label: 'Эл. почта', options: { default: true, required: true } },
						{ type: 'string', name: 'phone', label: 'Тел.', options: { default: true, required: false } },
						{ type: 'string', name: 'name', label: 'Имя', options: { default: true, required: true } },
						{ type: 'string', name: 'msg', label: 'Сообщение', options: { default: true, required: false } }
					],
					providers: [
						{
							key: 'salesforce',
							label: 'SalesForce',
							enable: '1',
							params: [
								{ key: 'status', label: 'Статус', value: 'New', hidden: true, editable: false },
								{ key: 'origin', label: 'Происхождение обращения', hidden: true, value: 'Web', editable: false },
								{ key: 'orgid', label: 'Организации', value: '00D0900000828A5', hidden: false, editable: true },
								{ key: 'reason', label: 'Причина обращения', value: 'Question', hidden: false, editable: true },
								{ key: 'recordType', label: 'Тип записи обращения', value: '01209000000AxgA', hidden: false, editable: true },
								{ key: '00N0900000HTD87', label: 'Сайт', value: 'https://betalife.ru/qa', editable: true },
								{ key: '00N0900000HSaU4', label: 'Согласие на УИС', value: '[agree_service]', hidden: false, editable: true },
								{ key: '00N0900000HSaTz', label: 'Согласие на обработку ПД', value: '[agree_personal]', hidden: false, editable: true },
								{ key: '00N0900000HT5pg', label: 'Согласие на публикацию вопроса и отвата', value: '[agree_qa]', hidden: false, editable: true }
							]
						},
						{ key: 'getresponse', label: 'GetResponse', enable: '0', params: [{ key: 'campaignId', label: 'Выберите форму', value: '', hidden: false, editable: true }] },
						{
							key: 'gtmevent',
							label: 'Google Tag Manager:',
							enable: '1',
							params: [{ key: 'event', label: 'Событие (dataLayer)', value: 'write-to-us', hidden: false, editable: true }]
						}
					],
					sender: '',
					topic: ''
				}}
				schema={{
					subject: 'Регистрация в лекторий',
					email: '',
					name: '',
					msg: '',
					agree_service: false,
					agree_personal: false,
					agree_mailing: false,
					agree_qa: false,
					antdSelect: ''
				}*/
}
