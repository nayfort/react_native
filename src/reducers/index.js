import { combineReducers } from 'redux';

import knots from './knots';
import language from './language';
import dimensions from './dimensions';

export default combineReducers({
  knots,
  language,
  dimensions,
});
