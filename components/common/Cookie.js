import CookieConsent from 'react-cookie-consent'

const Cookie = (props) => {
	return (
		<CookieConsent
			expires={150}
			location="bottom"
			disableStyles={true}
			enableDeclineButton={true}
			declineButtonClasses="close"
			declineButtonText=""
			cookieName="cookieAccept"
			containerClasses="cookie"
			contentClasses="cookie_inner"
			buttonClasses="button cookie-accept"
			buttonText="Я согласен на передачу файлов cookie">
			<div className="cookie_text">
				Мы используем cookie <br />
				для персонализации сервисов и удобства пользователей. <br />
				Вы можете запретить сохранение cookie в настройках своего браузера.{' '}
				<a href="/user-agreement/cookie" target="_blank">
					Подробнее
				</a>
			</div>
		</CookieConsent>
	)
}

export default Cookie
