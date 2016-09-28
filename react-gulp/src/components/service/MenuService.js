//import axios from 'axios';
import ajax from '../util/Ajax'

import {config, resolveUrl} from '../service/ConfigService'
import {getToken} from '../service/LoginService'

import logger from '../util/Logger'

function getMenu(doOnSuccess, doOnError){
	logger('Try to get menu')
	ajax({
	  url: '/Menu',
	  success: (data) => {
		logger('getMenu Response data: '+ JSON.stringify(data.children))
		doOnSuccess(data.children)
	  },
	  error: doOnError
	})
}

export { getMenu }