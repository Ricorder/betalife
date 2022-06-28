import { useEffect, useState, useRef, useCallback } from 'react'

function useSticky() {
	const [isSticky, setSticky] = useState(false)
	const element = useRef(null)

	const handleScroll = () => {
		if (typeof window === 'undefined') {
			return null
		}
		window.scrollY > element.current.getBoundingClientRect().top ? setSticky(true) : setSticky(false)
	}

	const debounce = (func, wait = 20, immediate = true) => {
		let timeOut
		return () => {
			let context = this,
				args = arguments
			const later = () => {
				timeOut = null
				if (!immediate) func.apply(context, args)
			}
			const callNow = immediate && !timeOut
			clearTimeout(timeOut)
			timeOut = setTimeout(later, wait)
			if (callNow) func.apply(context, args)
		}
	}

	const scrollHandler = useCallback(() => {
		debounce(handleScroll())
	}, [])

	useEffect(() => {
		window.addEventListener('scroll', scrollHandler)
		return () => {
			window.removeEventListener('scroll', scrollHandler)
		}
	}, [debounce, handleScroll])

	// useEffect(() => {
	// 	if (location.pathname === '/') {
	// 	window.addEventListener('scroll', debounce(handleScroll))
	// 	return () => {
	// 		window.removeEventListener('scroll', () => handleScroll)
	// 	}
	// }, [debounce, handleScroll])

	return { isSticky, element }
}

export default useSticky
