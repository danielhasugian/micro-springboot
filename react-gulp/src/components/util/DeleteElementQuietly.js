function deleteElementQuietly(obj, field){
	if (obj && obj[field]){
		delete obj[field]
	}
}

export default deleteElementQuietly