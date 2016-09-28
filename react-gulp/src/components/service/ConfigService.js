import config from '../config/app-config.js'

// -------------------do not edit below this line!----------------------------
$.ajaxSetup({
	timeout: config.connectTimeoutMs
})

function resolveUrl(x){
	if (config.url.endsWith('/') || x.startsWith('/')){
		return (config.url+x);
	}
	return (config.url+'/'+x);
}

export {config, resolveUrl}

