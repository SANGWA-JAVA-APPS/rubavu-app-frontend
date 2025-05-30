import {
    GET_ACCOUNT_AUDIT_LOGS_REQUEST,
    GET_ACCOUNT_AUDIT_LOGS_SUCCESS,
    GET_ACCOUNT_AUDIT_LOGS_FAIL,
} from '../constants/accountConstants';

const initialState = {
    auditLogs: [
        {
            id: 1,
            username: 'john.doe',
            email: 'john.doe@example.com',
            status: 'Active',
            action: 'CREATE',
            timestamp: '2024-03-15T10:30:00',
            changes: {
                email: 'john.doe@example.com',
                status: 'Active'
            }
        },
        {
            id: 2,
            username: 'jane.smith',
            email: 'jane.smith@example.com',
            status: 'Inactive',
            action: 'UPDATE',
            timestamp: '2024-03-15T11:45:00',
            changes: {
                status: 'Inactive'
            }
        },
        {
            id: 3,
            username: 'admin',
            email: 'admin@example.com',
            status: 'Active',
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

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ACCOUNT_AUDIT_LOGS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_ACCOUNT_AUDIT_LOGS_SUCCESS:
            return {
                ...state,
                loading: false,
                auditLogs: action.payload,
            };
        case GET_ACCOUNT_AUDIT_LOGS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default accountReducer; 