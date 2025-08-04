import { useContext } from 'react';
import { DateRangeContext } from '../../globalcomponents/ButtonContext';
import { useDailyReport } from './useDailyReport';

const DailyReport = () => {
  const { dailyReportData, loading, error } = useDailyReport();
  const { startDate, endDate } = useContext(DateRangeContext);

  if (loading) {
    return <div className="text-center">Loading daily report...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="daily-report">
      <h3>Daily Report</h3>
      <p>Report Period: {startDate} to {endDate}</p>
      
      {dailyReportData ? (
        <div>
          {/* Render your daily report data here */}
          <pre>{JSON.stringify(dailyReportData, null, 2)}</pre>
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default DailyReport;
