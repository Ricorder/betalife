import { Link, BoxWrap, Loader } from 'components/common'

const ListPosts = ({ loading = false, taxonomy, posts, active, onChange }) => {
	if (!posts.length) return <></>
	return (
		<BoxWrap>
			{!loading && posts?.length > 0 && (
				<ul>
					{posts?.map((item) => (
						<li key={item.slug} className={item.slug === active?.slug ? 'active' : null}>
							<Link href="/[taxonomy]/[post]" as={`/${taxonomy}/${item.slug}`}>
								<a title={item.title} onClick={onChange(item.slug)}>
									{item.title}
								</a>
							</Link>
						</li>
					))}
				</ul>
			)}
			{loading && <Loader />}
		</BoxWrap>
	)
}

export default ListPosts
