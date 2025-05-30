import {
    GET_TRUCK_AUDIT_LOGS_REQUEST,
    GET_TRUCK_AUDIT_LOGS_SUCCESS,
    GET_TRUCK_AUDIT_LOGS_FAIL,
} from '../constants/truckConstants';

const initialState = {
    auditLogs: [
        {
            id: 1,
            username: 'john.doe',
            plateNumber: 'ABC123',
            status: 'Active',
            action: 'CREATE',
            timestamp: '2024-03-15T10:30:00',
            changes: {
                plateNumber: 'ABC123',
                status: 'Active',
                driverId: 'DRV001'
            }
        },
        {
            id: 2,
            username: 'jane.smith',
            plateNumber: 'XYZ789',
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
            plateNumber: 'DEF456',
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

const truckReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRUCK_AUDIT_LOGS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_TRUCK_AUDIT_LOGS_SUCCESS:
            return {
                ...state,
                loading: false,
                auditLogs: action.payload,
            };
        case GET_TRUCK_AUDIT_LOGS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default truckReducer; 