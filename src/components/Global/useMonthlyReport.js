import { useState, useEffect, useCallback, useRef, useContext } from 'react';
import StockRepository from '../services/StockServices/StockRepository';
import { useAuthHeader } from 'react-auth-kit';
import { DateRangeContext } from '../globalcomponents/ButtonContext';

const useMonthlyReport = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(null);
  const [lastFetchDateRange, setLastFetchDateRange] = useState(null);
  const getAuthHeader = useAuthHeader();
  
  // Get dates from context
  const dateContext = useContext(DateRangeContext);
  const { startDate, endDate } = dateContext || {};
  
  // Cache duration: 5 minutes (300000 ms)
  const CACHE_DURATION = 5 * 60 * 1000;
  
  // Ref to track if initial fetch has been done
  const hasInitialFetch = useRef(false);

  const fetchMonthlyReport = useCallback(async (customStartDate = null, customEndDate = null, forceRefresh = false) => {
    // Use custom dates if provided, otherwise use context dates, otherwise default to current year
    let actualStartDate = customStartDate || startDate;
    let actualEndDate = customEndDate || endDate;
    
    // Default to current year if no dates provided
    if (!actualStartDate || !actualEndDate) {
      const currentYear = new Date().getFullYear();
      actualStartDate = `${currentYear}-01-01`;
      actualEndDate = `${currentYear}-12-31`;
    }
    
    const dateRangeKey = `${actualStartDate}_${actualEndDate}`;
    
    // Check if we have cached data for the same date range that's still fresh
    const now = Date.now();
    const isCacheValid = lastFetchTime && 
                        lastFetchDateRange === dateRangeKey && 
                        (now - lastFetchTime) < CACHE_DURATION;
    
    if (!forceRefresh && isCacheValid && monthlyData.length > 0) {
      console.log('Using cached monthly report data for date range:', actualStartDate, 'to', actualEndDate);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching monthly report for date range:', actualStartDate, 'to', actualEndDate);
      const authHeader = getAuthHeader();
      
      const searchByDateRange = {
        startDate: actualStartDate,
        endDate: actualEndDate
      };
      
      // StockRepository is exported as a singleton instance, not a class
      const response = await StockRepository.findMonthlyReport(searchByDateRange, authHeader);
      
      console.log('Monthly report response:', response);
      
      if (response && response.data) {
        setMonthlyData(response.data);
        setLastFetchTime(now);
        setLastFetchDateRange(dateRangeKey);
      } else {
        console.warn('No data received from monthly report');
        setMonthlyData([]);
      }
    } catch (error) {
      console.error('Error fetching monthly report:', error);
      setError(error);
      setMonthlyData([]);
    } finally {
      setLoading(false);
    }
  }, [getAuthHeader, startDate, endDate, lastFetchTime, lastFetchDateRange, monthlyData.length, CACHE_DURATION]);

  // Fetch data when context dates change
  useEffect(() => {
    if (startDate && endDate && !hasInitialFetch.current) {
      hasInitialFetch.current = true;
      fetchMonthlyReport();
    }
  }, [startDate, endDate, fetchMonthlyReport]);

  // Manual refresh function that bypasses cache
  const refreshMonthlyReport = useCallback((customStartDate = null, customEndDate = null) => {
    return fetchMonthlyReport(customStartDate, customEndDate, true);
  }, [fetchMonthlyReport]);

  return {
    monthlyData,
    loading,
    error,
    fetchMonthlyReport,
    refreshMonthlyReport,
    isDataStale: lastFetchTime && (Date.now() - lastFetchTime) > CACHE_DURATION,
    // Expose current date range being used
    currentDateRange: { startDate, endDate }
  };
};

export default useMonthlyReport;
