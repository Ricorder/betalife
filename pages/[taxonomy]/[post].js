import useAction from 'core/api'
import { PostLayout } from 'components/layouts'

const PostSinglePage = ({ data }) => <PostLayout data={data} />

export async function getStaticPaths() {
	const paths = await useAction.get('paths/taxonomies', { type: 'category', posts: true }).then((res) => res.filter((a) => a.params.post))
	return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
	const data = await useAction.get(`posts/${params.post}`)
	return { props: { data }, revalidate: 60 }
}

export default PostSinglePage
