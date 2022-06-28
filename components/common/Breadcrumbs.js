import { useRouter } from 'next/router'
import { Link, Section } from 'components/common'

// const categories = [
// 	{ name: 'Новости', slug: 'news' },
// 	{ name: 'Терапия РС', slug: 'therapy' },
// 	{ name: 'Образ жизни', slug: 'lifestyle' },
// 	{ name: 'Энциклопедия', slug: 'encyclopedia' },
// 	{ name: 'Воспроизведенные ПИТРС', slug: 'vosproizvedennye-pitrs' },
// 	{ name: 'У ребенка РС', slug: 'u-rebenka-rs', term: { name: 'Вопрос-ответ', slug: 'question-answer' } },
// 	{ name: 'Близкий больного', slug: 'blizkij-bolnogo', term: { name: 'Вопрос-ответ', slug: 'question-answer' } },
// 	{ name: 'Подозрение на РС', slug: 'podozrenie-na-rs', term: { name: 'Вопрос-ответ', slug: 'question-answer' } },
// 	{ name: 'Диагностирован РС', slug: 'diagnostirovan-rs', term: { name: 'Вопрос-ответ', slug: 'question-answer' } },
// 	{ name: 'Пациент со стажем', slug: 'pacient-so-stazhem', term: { name: 'Вопрос-ответ', slug: 'question-answer' } },
// 	{ name: 'Назначили терапию', slug: 'naznachili-terapiyu', term: { name: 'Вопрос-ответ', slug: 'question-answer' } }
// ]

const Breadcrumbs = ({ type, parent, slug, title, name, categories, ...props }) => {
	const router = useRouter()

	// console.log(`breadcrumbs:`, JSON.stringify({ type, parent, slug, title, name, categories }, null, 2))

	const showPostCategory = () => {
		return (
			type === 'post' &&
			categories?.length > 0 && (
				<>
					<Link href={`/[taxonomy]`} as={`/${categories[0]?.slug}`}>
						<a>{categories[0]?.name}</a>
					</Link>
					<span className="sep">→</span>
				</>
			)
		)
	}

	const showParent = () => {
		return (
			parent?.slug &&
			parent?.title && (
				<>
					<Link href={`/${parent?.slug}`}>
						<a>{parent?.title}</a>
					</Link>
					<span className="sep">→</span>
				</>
			)
		)
	}

	const showCurrent = () => <span>{name ? name : title}</span>

	return (
		<Section className="breadcrumbs">
			<Link href="/">
				<a>Главная</a>
			</Link>
			<span className="sep">→</span>

			{/* {tag && (<><Link href="/status"><a>Статусы</a></Link><span className="sep">→</span></>)} */}

			{parent ? showParent() : showPostCategory()}

			{showCurrent()}
		</Section>
	)
}

export default Breadcrumbs
