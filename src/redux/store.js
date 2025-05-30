import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './reducers/accountReducer';
import truckReducer from './reducers/truckReducer';
import vesselReducer from './reducers/vesselReducer';

const store = configureStore({
    reducer: {
        account: accountReducer,
        truck: truckReducer,
        vessel: vesselReducer
    }
});

export default store; 