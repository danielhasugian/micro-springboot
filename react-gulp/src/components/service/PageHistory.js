/*
We wrap react-router history object here to enable history mode changes without changing many places
*/
import { hashHistory, browserHistory } from 'react-router'

const pageHistory = hashHistory

export { pageHistory }
