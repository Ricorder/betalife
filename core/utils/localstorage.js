const LocalStorage = {
	/* localStorage: Set */
	set(key, value) {
		return process.browser && localStorage.setItem(key, JSON.stringify(value))
	},
	/* localStorage: Get */
	get(key) {
		return process.browser && localStorage.getItem(key)
	},
	/* localStorage: Remove */
	remove(key) {
		return process.browser && localStorage.removeItem(key)
	}
}

export default LocalStorage
