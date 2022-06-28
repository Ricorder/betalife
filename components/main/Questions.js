import { useState, useEffect } from 'react'

import useAction from 'core/api'
import { random } from 'core/utils/general'
import { Link } from 'components/common'

const QuestionsCarousel = ({ data }) => {
	const [records, setRecords] = useState(data || [])
	const [item, setItem] = useState(data && data[0])

	useEffect(() => {
		if (!records.length && !data.length) {
			loadData()
		} else {
			showRandom()
		}
	}, [])

	const loadData = async () => {
		await useAction.get(`terms/qa`, { limit: 20 }).then((data) => {
			if (!data?.error && data?.records?.length > 0) {
				setRecords(data.records)
				return showRandom()
			}
		})
	}

	const showRandom = () => records?.length > 0 && setItem(random(records))

	return (
		<section className="container main-questions">
			<div className="container-inner">
				<div className="row questions-inner">
					<div className="column heading">
						<h2>
							Ответы <br />
							на вопросы
						</h2>
						<p>Вы можете задать любой, интересующий вас вопрос и ознакомиться с уже заданными</p>
						<Link href="/question-answer#newquestion">
							<a className="button">Задать вопрос</a>
						</Link>
					</div>
					<div className="column list">
						<div className="inner carousel">
							{item && (
								<div className="item">
									<div className="item-inner">
										<div className="item-heading">
											<h3>{item.title}</h3>
										</div>
										<div className="desc">{item.excerpt && <div className="desc-inner" dangerouslySetInnerHTML={{ __html: item.excerpt }} />}</div>
										<ul className="tags flex">
											{item?.categories?.map((category, k) => (
												<li key={k}>
													<Link href="/question-answer/[taxonomy]" as={`/question-answer/${category.slug}`}>
														<a title={category.name}>{category.name}</a>
													</Link>
												</li>
											))}
										</ul>
									</div>
								</div>
							)}
							{records.length > 0 && (
								<Link href="/question-answer">
									<a className="button button-more">Показать еще</a>
								</Link>
							)}
							{/* {records.length > 0 && <button className="button button-more" onClick={showRandom}>Показать еще</button>} */}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default QuestionsCarousel
