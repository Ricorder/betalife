import { useState, useEffect } from 'react'

import useAction from 'core/api'
import { gtmevent } from 'core/utils/metrics'
import { dataKeys, getFields, onSendForm } from 'core/utils/form'
import { FormControl } from './particles'
import { Message } from 'components/common'

const SubscribeForm = ({ form }) => {
	const [dataform, setDataForm] = useState({})
	const [message, setMessage] = useState({})
	const [values, setValues] = useState({ ...dataKeys.state })
	const { loading, topic, subject, email, name, msg, agree_service, agree_personal, providers, requireds, formData } = values

	useEffect(() => {
		setValues({ ...values, formData: new FormData() })
		initForm()
	}, [])

	const initForm = async () => {
		setValues({ ...values, loading: true })
		if (form) {
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

		if (requireds.find((a) => !values[a].length)) {
			return setMessage({ type: 'error', msg: 'Поля отмеченные * - обязательны для заполнения' })
		}
		if (!agree_service || !agree_personal) {
			return setMessage({ type: 'error', msg: 'Вы не согласились с правилами сайта' })
		}
		formData.set('agree_mailing', true)

		setValues({ ...values, loading: true })
		await useAction.post(`forms/${form}`, formData).then((data) => {
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
		<form className="formbox subsc" onSubmit={onSubmitForm}>
			<FormControl required type="text" name="name" value={name} placeholder="Имя *" onChange={onChangeInput} onValid={onCheckValid} />

			<FormControl required type="text" name="email" value={email} placeholder="Укажите свой e-mail *" onChange={onChangeInput} onValid={onCheckValid} />

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
			</div>

			<div className="row row-buttons">
				{loading != 'true' && (
					<button type="submit" className="button bl" onSubmit={onSubmitForm}>
						Подписаться
					</button>
				)}
				<Message {...message} />
			</div>
		</form>
	)
}

export default SubscribeForm
