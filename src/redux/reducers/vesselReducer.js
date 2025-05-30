import {
    GET_VESSEL_AUDIT_LOGS_REQUEST,
    GET_VESSEL_AUDIT_LOGS_SUCCESS,
    GET_VESSEL_AUDIT_LOGS_FAIL,
} from '../constants/vesselConstants';

const initialState = {
    auditLogs: [
        {
            id: 1,
            username: 'john.doe',
            vesselName: 'Ocean Voyager',
            capacity: '5000 tons',
            action: 'CREATE',
            timestamp: '2024-03-15T10:30:00',
            changes: {
                vesselName: 'Ocean Voyager',
                capacity: '5000 tons',
                ownerOperator: 'Maritime Co.'
            }
        },
        {
            id: 2,
            username: 'jane.smith',
            vesselName: 'Sea Explorer',
            capacity: '3000 tons',
            action: 'UPDATE',
            timestamp: '2024-03-15T11:45:00',
            changes: {
                capacity: '3500 tons'
            }
        },
        {
            id: 3,
            username: 'admin',
            vesselName: 'Harbor Master',
            capacity: '2000 tons',
            action: 'DELETE',
            timestamp: '2024-03-15T14:20:00',
            changes: {
                status: 'Deleted'
            }
        }
    ],
    loading: false,
    error: null,
};

const vesselReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VESSEL_AUDIT_LOGS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_VESSEL_AUDIT_LOGS_SUCCESS:
            return {
                ...state,
                loading: false,
                auditLogs: action.payload,
            };
        case GET_VESSEL_AUDIT_LOGS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default vesselReducer; 