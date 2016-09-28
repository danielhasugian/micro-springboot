function logger(v){
	try {
		if (v && typeof v === 'object') {
			console.log(JSON.stringify(v))
		} else {
			console.log(v)
		}
	} catch (e){
		console.log(e.toString()+', logger v='+v)
	}
}

export {logger }

export default logger