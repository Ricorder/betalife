import useAction from 'core/api'
import { PageLayout } from 'components/layouts'
import { Section, BoxWrap } from 'components/common'

const FarmakonadzorPage = ({ data }) => {
	return (
		<PageLayout data={data}>
			<Section>
				<BoxWrap className="farmakonadzor">
					<div className="row">
						<div className="cb-title">
							<i className="cb-icon" />
							<h1>Фармаконадзор</h1>
							<p>
								Сообщить <span>о нежелательной</span> реакции
							</p>
							<a href="https://biocad.ru/farmakonadzor" className="button" target="_blank" rel="noreferrer noopener">
								Сообщить
							</a>
						</div>
						<div className="cb-content">
							<p>
								<strong>Миссия компания BIOCAD —</strong> улучшение и продление жизни людей посредством предоставления эффективных, безопасных и доступных комплексных решений в
								области наук о жизни. В связи с этим компания уделяет особое внимание контролю безопасности лекарственных средств.
							</p>
							<p>
								В соответствии с российским законодательством, международными стандартами и политикой компании в области качества, BIOCAD осуществляет мониторинг безопасности и
								качества производимых лекарственных препаратов в целях защиты интересов пациентов.
								<br />
								Мы будем благодарны вам за любые дополнительные сведения о переносимости наших препаратов.
							</p>
							<p>
								Обращаем внимание, что в случае развития у вас нежелательных реакций при применении препаратов производства BIOCAD, вам необходимо обратиться к вашему лечащему
								врачу. Тактику лечения в каждом индивидуальном случае определяет только врач.
							</p>
						</div>
					</div>
				</BoxWrap>

				{/* <div className="ps-content" dangerouslySetInnerHTML={{ __html: styleRemove(page.content) }} /> */}
			</Section>
		</PageLayout>
	)
}

export async function getStaticProps(context) {
	const data = await useAction.get(`pages/farmakonadzor`)
	return { props: { data }, revalidate: 3600 }
}

export default FarmakonadzorPage
