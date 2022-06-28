import { useState } from 'react'
import { classNames } from 'core/utils/general'
import { Tooltip } from 'antd'

const data = [
	{
		key: 's1',
		title: `<b>Первичное обращение к неврологу.</b> Постановка предварительного диагноза РС`,
		items: [
			{ desc: '<b>Первичное обращение к неврологу.</b> Постановка предварительного диагноза РС' },
			{ desc: '<b>Первичное обращение к неврологу.</b> Постановка предварительного диагноза РС' },
			{ desc: '<b>Первичное обращение к неврологу.</b> Постановка предварительного диагноза РС' },
			{ desc: '<b>Первичное обращение к неврологу.</b> Постановка предварительного диагноза РС' }
		]
	},
	{
		key: 's2',
		title: `Посещение центра рассеянного склероза. <b>Постановка окончательно диагноза</b>`,
		items: [
			{
				desc: `Врач-невролог в центре рассеянного склероза(ЦРС) подтверждает или уточняет диагноз. В ряде случаев может потребоваться выполнение дополнительных обследований.`
			},
			{
				desc: `В случае подтверждения диагноза рассеянный склероз врач выдает пациенту экспертное заключение для получения терапии ПИТРС с указанием наименования лекарственного вещества.`
			}
		]
	},
	{
		key: 's3',
		title: `<b>Получение рецепта</b> на лекарственный препарат`,
		items: [
			{
				desc: `Пациент с заключением из ЦРС обращается к врачу-неврологу в медицинскую организацию по месту жительства (поликлиника), который выдает пациенту рецепт на получение лекарственного вещества в аптеке.`,
				tooltip: `Получение рецепта на препарат 1 раз в месяц.`
			}
		]
	},
	{
		key: 's4',
		title: `<b>Получение препарата</b> в аптеке`,
		items: [{ desc: 'Пациент обращается в аптеку, где в соответствии с рецептом получает назначенный препарат.' }]
	},
	{
		key: 's5',
		title: `Последующее <b>наблюдение</b>`,
		items: [
			{
				desc: `Повторные осмотры у невролога в ЦРС назначаются индивидуально в каждом случае, но как правило, не реже 1 раза в 6 месяцев, а также в случае возникновения новых/усиления существующих симптомов.`
			},
			{
				desc: `Коррекция терапии осуществляется только по назначению лечащего врача ЦРС.`,
				tooltip: `МРТ рекомендуется выполнять не реже 1 раза в год`
			}
		]
	}
]

export default function PatientPath() {
	const [tooltip, setTooltip] = useState({})

	const onToggleTooltip = (key) => setTooltip({ ...tooltip, [key]: !tooltip[key] })

	return (
		<div className="patient-path">
			<div className="row ps-head">
				<i className="ps-icon" />
				<div className="ps-excerpt">
					<h1>Путь пациента с рассеянным склерозом</h1>
				</div>
			</div>

			<div className="way">
				{data.map((item, i) => (
					<div key={i} className={`row step r${i + 1}`}>
						<div className="cbox">
							<div className="cb-place">
								<div className="cb-inner">
									<i className="cb-icon w1" />
									<p dangerouslySetInnerHTML={{ __html: item.title }} />
								</div>
							</div>
						</div>
						<div className={`row items c${item.items.length}`}>
							{item.items.map((sub, k) => (
								<div key={i + k} className="item ps">
									<div className="item-inner">
										<p dangerouslySetInnerHTML={{ __html: sub.desc }} />
										{/* {sub?.tooltip && <Popover placement="leftTop" title={false} content={sub.tooltip} trigger="click"><span className="item-info-btn" /></Popover>} */}
										{sub?.tooltip && (
											<Tooltip placement="leftTop" title={sub.tooltip}>
												<span className="item-info-btn" />
											</Tooltip>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}