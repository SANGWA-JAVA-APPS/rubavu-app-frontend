import { combineReducers } from 'redux';
import { accountReducer } from './accountReducer';
import { truckReducer } from './truckReducer';
import { vesselReducer } from './vesselReducer';

const rootReducer = combineReducers({
    account: accountReducer,
    truck: truckReducer,
    vessel: vesselReducer,
});

export default rootReducer; 