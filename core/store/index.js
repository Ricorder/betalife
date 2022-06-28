import Cookie from 'js-cookie'
import Router from 'next/router'

import { ConfigProvider } from 'antd'
import { createContext, useContext, useEffect, useState } from 'react'
import ru_RU from 'antd/lib/locale/ru_RU'

// import config from '../../config'
// import useAction from 'core/api'

const StoreContext = createContext({})

export const StoreProvider = ({ children }) => {
	const [swipeSlider, setSwipeSlider] = useState(false)
	const [loading, setLoading] = useState(true)
	const [message, setMessage] = useState('')
	const [store, setStore] = useState({ user: '', statusbar: true, statuses: [], curstatus: '' })
	const { user, statusbar, statuses, curstatus } = store

	// useEffect(() => {}, [])

	const onStatusbar = (status) => {
		setStore({ ...store, statusbar: status })
	}

	return (
		<ConfigProvider locale={ru_RU} componentSize="large">
			<StoreContext.Provider value={{ loading, message, store, setStore, onStatusbar, swipeSlider, setSwipeSlider }}>{children}</StoreContext.Provider>
		</ConfigProvider>
	)
}

export default function useStore() {
	return useContext(StoreContext)
}
