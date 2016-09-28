//import axios from 'axios';
import {config, resolveUrl} from '../service/ConfigService'
import {getToken} from '../service/LoginService'
import ajax from '../util/Ajax'

import logger from '../util/Logger'

function getChicken(doOnSuccess, doOnError){
	logger('Try to get chicken')
	ajax({
	  url: '/ListOfChicken',
	  success: (data) => {
		logger('getChicken Response data: '+ JSON.stringify(data.list))
		doOnSuccess(data.list)
	  },
	  error: doOnError 	
	})
}

function getChick(id, doOnSuccess, doOnError){
	logger('Try to get chick id='+id)
	ajax({
	  url: '/Chick',
	  data: {id: id},
	  success: (data) => {
		logger('getChick Response data: '+ JSON.stringify(data))
		doOnSuccess(data)
	  },
	  error: doOnError 	
	})
}

function saveChick(c, doOnSuccess, doOnError){
	logger('Try to saveChick ='+JSON.stringify(c))
	ajax({
	  url: '/Chick',
	  method: 'POST',
	  contentType: 'application/json',
	  data: c,
	  success: (data) => {
		logger('saveChick Response data: '+ JSON.stringify(data))
		doOnSuccess(data)
	  },
	  error: doOnError 	
	})
}

function deleteChick(id, doOnSuccess, doOnError){
	logger('Try to deleteChick id='+id)
	ajax({
	  url: '/Chick',
	  method: 'DELETE',
	  data: {id: id},
	  success: (data) => {
		logger('deleteChick Response data: '+ JSON.stringify(data))
		doOnSuccess(data)
	  },
	  error: doOnError 	
	})
}


export { getChicken, getChick, saveChick, deleteChick }