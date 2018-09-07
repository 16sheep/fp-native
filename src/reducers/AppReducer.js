import { combineReducers } from 'redux';
import NavReducer from './NavReducer';
import FestivalReducer from './FestivalReducer';


const AppReducer = combineReducers({
  nav: NavReducer
});

export default AppReducer;
