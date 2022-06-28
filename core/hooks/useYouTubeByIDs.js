import fetch from 'isomorphic-unfetch'
import queryString from 'query-string'
import { useEffect, useState } from 'react'

const apiQuery = (id) => {
	const queryParams = {
		key: 'AIzaSyDhy9rHOOd6ERIPMCJvGCRaKZ2qQ1VR92Y', //process.env.BIOCADLESS_YOUTUBE_API,
		part: `snippet,status`,
		id
	}
	return `https://www.googleapis.com/youtube/v3/videos?${queryString.stringify(queryParams)}`
}

const getVideosByIDs = async (ids) => {
	const url = apiQuery(ids)

	return await fetch(url)
		.then((res) => res.json())
		.then((res) => {
			if (!res.items.length) return []

			const result = res.items
				.filter((v) => v?.status?.privacyStatus === 'public')
				?.map((v) => ({
					id: v.id,
					title: v.snippet.title,
					desc: v.snippet.description,
					image: v.snippet.thumbnails,
					date: v.snippet.publishedAt,
					tags: v.snippet.tags
				}))

			return result
		})
}

const useYouTube = (ids) => {
	const [status, setStatus] = useState('loaded')
	const [videos, setVideos] = useState([])

	useEffect(() => {
		loadData()
	}, [ids])

	const loadData = async () => {
		if (!ids.length) return
		setStatus('loading')
		setVideos([])

		await getVideosByIDs(ids).then((res) => {
			setVideos(res)
		})

		setStatus('loaded')
	}

	return { videos, status }
}

export default useYouTube
