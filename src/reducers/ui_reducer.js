import { combineReducers } from 'redux';
import ErrorsReducer from './errors_reducer';
import SessionReducer from './sessions_reducer';
import LoadingReducer from './loading_reducer';

const UIReducer = combineReducers({
  errors: ErrorsReducer,
  session: SessionReducer,
  loading: LoadingReducer
});
