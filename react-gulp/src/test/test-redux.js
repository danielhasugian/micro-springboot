var Redux = require('redux');

var userReducer = function(state, action) {
	if (state === undefined) {
		state = [];
	}
	switch(action.type){
		case 'ADD_USER' : state.push(action.user); break;
		case 'REMOVE_USER' : state.pop(); break;
	}
	return state;
}

var custReducer = function(state, action) {
	if (state === undefined) {
		state = [];
	}
	switch(action.type){
		case 'ADD_CUST' : state.push(action.cust); break;
		case 'REMOVE_CUST' : state.pop(); break;
	}
	return state;
}

var reducers = Redux.combineReducers({userState: userReducer, custState: custReducer });

var store = Redux.createStore(reducers);

console.log()
//Dispatch our first action to express an intent to change the state
store.dispatch({
  type: 'ADD_USER',
  user: {name: 'Dan'}
});

store.dispatch({
	type: 'ADD_CUST',
	cust: {name: 'Customer King'}
})

console.log(store.getState());

store.dispatch({
	  type: 'REMOVE_USER',
	});

store.dispatch({
	  type: 'ADD_CUST',
	  cust: {name: 'Customer Queen'}
	});

console.log(store.getState());
