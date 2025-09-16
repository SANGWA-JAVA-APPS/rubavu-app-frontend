import { useContext, useEffect, useState, useCallback } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import StockRepository from '../../services/StockServices/StockRepository';
import { DateRangeContext } from '../../globalcomponents/ButtonContext';
import DateUtils from '../../Global/DateUtils';
import CurrentDate from '../../Global/CurrentDate';

export const useDailyReport = () => {
  const [dailyReportData, setDailyReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const authHeader = useAuthHeader()();
  const dateContext = useContext(DateRangeContext);
  const { startDate, endDate } = dateContext || {};

  const fetchDailyReport = useCallback(async (startDate, endDate) => {
    try {
      setLoading(true);
      setError(null);
      
      // Ensure dates are properly formatted
      const formattedStartDate = DateUtils.validateAndFormat(startDate);
      const formattedEndDate = DateUtils.validateAndFormat(endDate);
      
      const searchByDateOnly = {
        // startDate: formattedStartDate,
        // endDate: formattedEndDate
        startDate: CurrentDate.todaydate(),
        endDate:  CurrentDate.todaydate()
      };
      
      console.log('Daily report hook - formatted dates:', searchByDateOnly);
      
      const response = await StockRepository.findDailyreport(searchByDateOnly, authHeader);
      setDailyReportData(response.data);
      return response.data;
    } catch (err) {
      setError('Failed to fetch daily report');
      console.error('Error fetching daily report:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [authHeader]);

  useEffect(() => {
    if (startDate && endDate) {
      fetchDailyReport(startDate, endDate);
    }
  }, [startDate, endDate, fetchDailyReport]);

  return {
    dailyReportData,
    loading,
    error,
    fetchDailyReport,
    refetch: () => startDate && endDate ? fetchDailyReport(startDate, endDate) : Promise.resolve()
  };
};
