import settings from 'core/settings'
import { Section, Link } from 'components/common'

const Events = ({ records, ...props }) => {
	return (
		records?.length > 0 && (
			<Section>
				<div className="list-experts">
					{records?.map((item) => {
						const { wpost, foreword } = item?.fields
						const picture = item?.media?.file && `${settings.apiupl}/${item.media.file}`
						const username = item.title.replaceAll(' ', '<br />')
						return (
							<div key={item.slug} className="row item-expert">
								<div className="picture">
									<Link href="/events/[expert]" as={`/events/${item.slug}`}>
										<a>{picture && <img src={picture} alt={item.title} />}</a>
									</Link>
								</div>
								<div className="row person">
									<h2 dangerouslySetInnerHTML={{ __html: username }} />
									{wpost && <div className="wpost" dangerouslySetInnerHTML={{ __html: wpost }} />}
									<Link href="/events/[expert]" as={`/events/${item.slug}`}>
										<a className="button">Читать колонку</a>
									</Link>
								</div>
								<div className="excerpt" dangerouslySetInnerHTML={{ __html: foreword }} />
							</div>
						)
					})}
				</div>
			</Section>
		)
	)
}
export default Events
