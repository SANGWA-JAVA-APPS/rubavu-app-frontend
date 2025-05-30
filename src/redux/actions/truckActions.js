import {
    GET_TRUCK_AUDIT_LOGS_REQUEST,
    GET_TRUCK_AUDIT_LOGS_SUCCESS,
    GET_TRUCK_AUDIT_LOGS_FAIL,
} from '../constants/truckConstants';

export const getTruckAuditLogs = (filters = {}) => async (dispatch) => {
    try {
        dispatch({ type: GET_TRUCK_AUDIT_LOGS_REQUEST });
        
        // Simulate API call with dummy data
        const dummyData = [
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
        ];

        // Simulate filtering
        let filteredData = dummyData;
        if (filters.startDate) {
            filteredData = filteredData.filter(log => new Date(log.timestamp) >= new Date(filters.startDate));
        }
        if (filters.endDate) {
            filteredData = filteredData.filter(log => new Date(log.timestamp) <= new Date(filters.endDate));
        }
        if (filters.username) {
            filteredData = filteredData.filter(log => 
                log.username.toLowerCase().includes(filters.username.toLowerCase())
            );
        }

        dispatch({ type: GET_TRUCK_AUDIT_LOGS_SUCCESS, payload: filteredData });
    } catch (error) {
        dispatch({ type: GET_TRUCK_AUDIT_LOGS_FAIL, payload: error.message });
    }
}; 