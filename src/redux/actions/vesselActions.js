import {
    GET_VESSEL_AUDIT_LOGS_REQUEST,
    GET_VESSEL_AUDIT_LOGS_SUCCESS,
    GET_VESSEL_AUDIT_LOGS_FAIL,
} from '../constants/vesselConstants';

export const getVesselAuditLogs = (filters = {}) => async (dispatch) => {
    try {
        dispatch({ type: GET_VESSEL_AUDIT_LOGS_REQUEST });
        
        // Simulate API call with dummy data
        const dummyData = [
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

        dispatch({ type: GET_VESSEL_AUDIT_LOGS_SUCCESS, payload: filteredData });
    } catch (error) {
        dispatch({ type: GET_VESSEL_AUDIT_LOGS_FAIL, payload: error.message });
    }
}; 