import { combineReducers } from 'redux';
import EntitiesReducer from './entities_reducer';
import UIReducer from './ui_reducer';

const RootReducer = combineReducers({
  entities: EntitiesReducer,
  ui: UIReducer
});

export default RootReducer;
