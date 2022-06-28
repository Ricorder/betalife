import fetch from 'isomorphic-unfetch'
import queryString from 'query-string'
import { useEffect, useState } from 'react'

const youtube = {
	apikey: process.env.BIOCADLESS_YOUTUBE_API,
	channel: 'UUKMEWSPB6zOCik0wVYXkWzQ',
	playlists: [''],
	part: `snippet,contentDetails,status`,
	max: '50'
}

const apiUrl = (idp) => {
	if (!idp) return
	const queryParams = { key: youtube.apikey, playlistId: idp, part: youtube.part, maxResults: youtube.max }
	const apiurl = `https://www.googleapis.com/youtube/v3/playlistItems?`
	const queryUri = queryString.stringify(queryParams)
	return apiurl + queryUri
}

const getVideoStats = async (videos) => {
	if (!videos.length) return
	const ids = videos.map((item) => item.videoId).join(',')
	const query = queryString.stringify({ key: youtube.apikey, id: ids, part: 'statistics' })
	const apiurl = `https://www.googleapis.com/youtube/v3/videos?${query}`

	return await fetch(apiurl)
		.then((res) => res.json())
		.then((res) => res?.items.map((a) => ({ id: a.id, stats: a.statistics })))
}

const getPlaylistVideos = async (idp) => {
	if (!idp) return
	const url = apiUrl(idp)

	const pvideos = await fetch(url)
		.then((res) => res.json())
		.then((res) => {
			if (!res.items.length) return []

			return res?.items?.map((item) => ({
				id: item.id,
				title: item.snippet.title,
				desc: item.snippet.description,
				videoId: item.snippet.resourceId.videoId,
				playlistId: item.snippet.playlistId,
				image: item.snippet.thumbnails,
				date: item.snippet.publishedAt
			}))
		})

	if (!pvideos.length) return

	const stats = await getVideoStats(pvideos)

	return pvideos.map((item) => {
		const stat = stats?.find((s) => s.id === item.videoId)?.stats
		return { ...item, stat }
	})
}

const useYouTube = (playlists) => {
	const [load, setLoading] = useState(false)
	const [videos, setVideos] = useState([])

	useEffect(() => {
		loadData()
	}, [playlists])

	const loadData = async () => {
		if (!playlists.length) return
		setLoading(true)
		setVideos([])

		const requests = playlists.map((a) => getPlaylistVideos(a))

		Promise.allSettled(requests)
			.then((results) => {
				const aresult = results
					.filter((p) => p.status === 'fulfilled')
					.map((p) => p.value)
					.flat()

				const allres = aresult
					.filter((a) => a.stat)
					.map((a) => {
						const { medium, high, standard, maxres } = a?.image

						a.id = a.videoId
						a.image = {
							default: a?.image?.default?.url,
							medium: medium?.url,
							high: high?.url,
							standard: standard?.url,
							maxres: maxres?.url
						}

						a.playlist = a.playlistId

						delete a.videoId
						delete a.playlistId

						return a
					})
				setVideos(allres)
			})
			.finally(() => setLoading(false))
	}

	return { load, videos }
}

export default useYouTube

/* 
  use preview hook
	const { load, videos } = useYouTube([
    'PLQqAxi0kaiIsZeSk-LqyTzCOYMH2dyJjp', 
    'PLQqAxi0kaiItxrMkR4JJxW9MKJIdkAAXL'
  ])
	{load ? 'Loading...' : <pre>{JSON.stringify(videos, null, 2)}</pre>}
*/
