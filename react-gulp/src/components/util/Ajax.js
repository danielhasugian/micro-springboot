import {getToken} from '../service/LoginService'
import {config, resolveUrl} from '../service/ConfigService'

import logger from '../util/Logger'

function toUrlQueryString(url, a){
  if (!url){
    url = ''
  }
  let addAndAtBegin = true
  if (url.indexOf('?') < 0){
    url = url + '?'
    addAndAtBegin = false
  }
  let begin = true
  for (let i in a){
    if (begin){
      if (addAndAtBegin){
        url += '&'
      }
      begin=false
    } else {
      url += '&'
    }
    url += i+'='+a[i]
    
  }
  return url
}

function ajax(cfg){
	if (!cfg){
		cfg = {url:'/'}
	}
	
	cfg.url = resolveUrl(cfg.url)
	if (cfg.dataType){
		cfg.dataType = 'json'
	}
	if (!cfg.cache){
		cfg.cache = false
	}
	if (cfg.method === 'DELETE' && cfg.data){
		cfg.url = toUrlQueryString(cfg.url, cfg.data)
	} else {
		if (cfg.contentType === 'json' || cfg.contentType === 'JSON' || cfg.contentType === 'application/json'){
			cfg.contentType = 'application/json'
			if (cfg.data && typeof cfg.data !== 'string'){
				cfg.data = JSON.stringify(cfg.data)
			}
		}
	}
	if (!cfg.login){
		/*
		 *Assign token for non-login requests
		 */
		let token = getToken().value
		logger('Token = '+token)
		if (cfg.headers){
			cfg.headers['X-Token'] = token 
		} else {
			cfg.headers = {'X-Token':token}
		}
	}
	
	const originalError = cfg.error
	
	cfg.error = (xhr, status, err) => {
		if (xhr && xhr.responseJSON){
			logger('Error response (use xhr) : '+ xhr.responseJSON)
			originalError(xhr.responseJSON)
			return
		}
		let errorStr = ''
		if (err){
			logger('Error response (use err): '+ err)
			errorStr = errorStr+err
		}
		if (status){
			logger('Error response (use status): '+ status)
			errorStr = errorStr.length > 0 ? (errorStr+' '+status) : status
		}
		originalError(errorStr.length > 0 ? errorStr : 'Failed HTTP request')
	  }
	logger('Ajax call url='+cfg.url)
	return $.ajax(cfg)
}

export default ajax