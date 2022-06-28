import { Link, Loader } from 'components/common'

const Answers = ({ loading, records }) => {
	return (
		records?.length && (
			<div className="qa-list">
				<h2>Ответы на вопросы от пользователей</h2>

				{records?.map((item, i) => (
					<div key={i} className="cbox qa-item">
						<div className="cb-place">
							<div className="cb-inner">
								<div className="row pse qa-item-title">
									<h3>{item.title}</h3>
								</div>
								<div className="qa-item-answer pse">{item.excerpt && <div className="qa-item-content" dangerouslySetInnerHTML={{ __html: item.excerpt }} />}</div>
								{item?.tags && (
									<div className="qa-item-tags">
										{item?.tags?.map((item) => (
											<Link key={item.slug} href="/question-answer/[tag]" as={`/question-answer/${item.slug}`}>
												<a title={item.name}>{item.name}</a>
											</Link>
										))}
									</div>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		)
	)
}

export default Answers
