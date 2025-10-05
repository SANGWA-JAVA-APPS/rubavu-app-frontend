import { useState, useRef, useContext, useEffect, useCallback } from "react";
import { Row, Col, Card, Alert, Spinner, Button, Badge } from "react-bootstrap";
import { TitleSmallDesc } from "../../../globalcomponents/TitleSmallDesc";
import ListToolBar, { SearchformAnimation } from "../../../Global/ListToolBar";
import SearchBox from "../../../Global/SearchBox";
import CurrentDate from "../../../Global/CurrentDate";
import { useReactToPrint } from "react-to-print";
import { DateRangeContext } from "../../../globalcomponents/ButtonContext";
import Reporting from "../../../services/StockServices/Reporting";
import { ColItemContext } from "../../../Global/GlobalDataContentx";
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function OverviewTab() {
  // Header component states
  const [searchHeight, setSearchHeight] = useState(0);
  const [height, setHeight] = useState(0);
  const { setStartDate, setendDate, startDate, endDate } = useContext(DateRangeContext);
  const { userRole } = useContext(ColItemContext);
  
  // API data states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [useSampleData, setUseSampleData] = useState(true);
  const [dataComparison, setDataComparison] = useState(null);
  
  const getCommonSearchByDate = (date1, date2) => {
    setStartDate(date1);
    setendDate(date2);
  };

  // Create comparison between sample and API data
  const createDataComparison = useCallback((apiChartData) => {
    const sampleTotalRevenue = 32424001 + 31472000 + 15565000; // Sample total
    const apiTotalRevenue = apiChartData.summaryStats ? 
      parseInt(apiChartData.summaryStats.total_revenue || '0') : 0;
    
    return {
      revenue: {
        sample: sampleTotalRevenue,
        api: apiTotalRevenue,
        difference: apiTotalRevenue - sampleTotalRevenue,
        percentChange: sampleTotalRevenue > 0 ? 
          ((apiTotalRevenue - sampleTotalRevenue) / sampleTotalRevenue * 100).toFixed(2) : 0
      },
      transactions: {
        sample: 3522, // Sample total transactions
        api: apiChartData.summaryStats ? apiChartData.summaryStats.total_transactions || 0 : 0
      },
      dataSource: useSampleData ? 'Sample Data' : 'Live API Data',
      lastUpdated: new Date().toLocaleString()
    };
  }, [useSampleData]);

  // Fetch dashboard data from API
  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Debug: Check the incoming date values
      console.log('Debug - startDate type and value:', typeof startDate, startDate);
      console.log('Debug - endDate type and value:', typeof endDate, endDate);
      
      // Safe date formatting with proper validation
      const formatDate = (date) => {
        if (!date) return null;
        
        // If it's already a string in YYYY-MM-DD format, return it
        if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
          return date;
        }
        
        // Convert to Date object if it's not already
        const dateObj = date instanceof Date ? date : new Date(date);
        
        // Check if it's a valid date
        if (isNaN(dateObj.getTime())) {
          console.warn('Invalid date provided:', date);
          return null;
        }
        
        return dateObj.toISOString().split('T')[0];
      };
      
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);
      
      console.log('Fetching dashboard data for period:', formattedStartDate, 'to', formattedEndDate);
      
      const chartData = await Reporting.getFormattedChartData(
        formattedStartDate, 
        formattedEndDate, 
        userRole?.token
      );
      
      if (chartData) {
        setApiData(chartData);
        console.log('API Data loaded successfully:', chartData);
        
        // Create comparison data
        const comparison = createDataComparison(chartData);
        setDataComparison(comparison);
      } else {
        throw new Error('No data received from API');
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate, userRole?.token, createDataComparison]);

  // Load data on component mount and when date range changes
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Toggle between sample and API data
  const toggleDataSource = () => {
    setUseSampleData(!useSampleData);
  };

  // Refresh data manually
  const refreshData = () => {
    fetchDashboardData();
  };
  
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "overview-report",
  });

  // Sample data for charts (retained for comparison with API data)
  const sampleData = {
    // 1. Revenue Distribution Doughnut Chart
    revenueDistribution: {
      labels: ['Cargo Revenue', 'Vessel Revenue', 'Truck Revenue'],
      datasets: [{
        data: [32424001, 31472000, 15565000],
        backgroundColor: ['#28a745', '#007bff', '#ffc107'],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },

    // 2. Vessel Revenue Breakdown Doughnut Chart
    vesselBreakdown: {
      labels: ['Wharfage Charges', 'Berthing Charges'],
      datasets: [{
        data: [22050000, 9422000],
        backgroundColor: ['#17a2b8', '#6f42c1'],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },

    // 3. Monthly Revenue Trend Bar Chart
    monthlyTrends: {
      labels: ['April', 'May', 'June', 'July', 'August', 'September'],
      datasets: [
        {
          label: 'Vessel Revenue',
          data: [7098000, 9366000, 5614000, 3164000, 1778000, 980000],
          backgroundColor: '#007bff',
          borderRadius: 4,
        },
        {
          label: 'Truck Revenue', 
          data: [5460000, 4370000, 2400000, 1535000, 635000, 1165000],
          backgroundColor: '#ffc107',
          borderRadius: 4,
        },
        {
          label: 'Cargo Revenue',
          data: [11586747, 10759062, 3670374, 3035970, 1834820, 1537030],
          backgroundColor: '#28a745',
          borderRadius: 4,
        }
      ]
    },

    // 4. Cargo Types Distribution Doughnut Chart
    cargoTypes: {
      labels: ['Other Cargo', 'Steel & Metals', 'General Cargo', 'Construction Materials', 'Beverages', 'Food Products', 'Food Grains'],
      datasets: [{
        data: [3778718460, 970490058, 358969089, 64410607, 13720139, 7929541, 3387875],
        backgroundColor: ['#6c757d', '#dc3545', '#fd7e14', '#795548', '#e91e63', '#ff5722', '#8bc34a'],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },

    // 5. Transaction Volume Bar Chart
    transactionVolume: {
      labels: ['Truck Parking', 'Cargo Handling', 'Vessel Services'],
      datasets: [{
        label: 'Number of Transactions',
        data: [1918, 1478, 126],
        backgroundColor: ['#ffc107', '#28a745', '#007bff'],
        borderRadius: 4,
      }]
    },

    // Summary statistics
    summaryStats: {
      total_revenue: '79461001',
      total_transactions: 3522,
      average_vessel_revenue: '249000',
      total_cargo_weight: '5197426869'
    }
  };

  // Get current data source (sample or API)
  const getCurrentData = () => {
    if (useSampleData || !apiData) {
      return sampleData;
    }
    return apiData;
  };

  const currentData = getCurrentData();

  // Format summary statistics for display
  const formatSummaryStats = (stats) => {
    if (!stats) return { totalRevenue: '0', totalTransactions: '0', avgVesselRevenue: '0', totalCargoWeight: '0' };
    
    const totalRevenue = parseInt(stats.total_revenue || '0');
    const totalTransactions = stats.total_transactions || 0;
    const avgVesselRevenue = parseInt(stats.average_vessel_revenue || '0');
    const totalCargoWeight = parseInt(stats.total_cargo_weight || '0');
    
    return {
      totalRevenue: totalRevenue >= 1000000 ? `RWF ${(totalRevenue / 1000000).toFixed(1)}M` : `RWF ${totalRevenue.toLocaleString()}`,
      totalTransactions: totalTransactions.toLocaleString(),
      avgVesselRevenue: avgVesselRevenue >= 1000 ? `RWF ${(avgVesselRevenue / 1000).toFixed(0)}K` : `RWF ${avgVesselRevenue.toLocaleString()}`,
      totalCargoWeight: totalCargoWeight >= 1000000000 ? `${(totalCargoWeight / 1000000000).toFixed(1)}B KG` : `${(totalCargoWeight / 1000000).toFixed(1)}M KG`
    };
  };
  
  const formattedStats = formatSummaryStats(currentData.summaryStats);

  // Chart options
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          fontSize: 12,
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.parsed;
            return `${context.label}: RWF ${value.toLocaleString()}`;
          }
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.parsed.y;
            return `${context.dataset.label}: RWF ${value.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false
        }
      },
      y: {
        stacked: true,
        ticks: {
          callback: function(value) {
            return 'RWF ' + (value / 1000000).toFixed(1) + 'M';
          }
        }
      }
    }
  };

  const volumeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.parsed.y;
            return `Transactions: ${value.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return value.toLocaleString();
          }
        }
      }
    }
  };

  return (
    <div ref={componentRef}>
      <TitleSmallDesc
        title={`Revenue Overview Report on ${CurrentDate.todaydate()} `}
        moreclass="showOnPrint"
      />
      <ListToolBar
        hideSaveBtn={true}
        height={height}
        entity="Revenue overview"
        changeFormHeightClick={() => setHeight(height === 0 ? "auto" : 0)}
        changeSearchheight={() =>
          setSearchHeight(searchHeight === 0 ? "auto" : 0)
        }
        handlePrint={handlePrint}
        searchHeight={searchHeight}
      />
      <SearchformAnimation searchHeight={searchHeight}>
        <SearchBox getCommonSearchByDate={getCommonSearchByDate} />
      </SearchformAnimation>

      {/* Data Source Controls and Status */}
      <Row className="mb-3">
        <Col md={8}>
          <div className="d-flex align-items-center gap-3">
            <Button 
              variant={useSampleData ? "warning" : "success"}
              size="sm"
              onClick={toggleDataSource}
              disabled={loading}
            >
              {useSampleData ? "📊 Sample Data" : "🔴 Live Data"}
            </Button>
            <Button 
              variant="outline-primary"
              size="sm"
              onClick={refreshData}
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "🔄"} Refresh
            </Button>
            <Badge bg={useSampleData ? "warning" : apiData ? "success" : "secondary"}>
              {useSampleData ? "Sample" : apiData ? "Live" : "No Data"}
            </Badge>
          </div>
        </Col>
        <Col md={4} className="text-end">
          {dataComparison && (
            <small className="text-muted">
              Last Updated: {dataComparison.lastUpdated}
            </small>
          )}
        </Col>
      </Row>

      {/* Error Display */}
      {error && (
        <Alert variant="danger" className="mb-3">
          <Alert.Heading>⚠️ Data Loading Error</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" size="sm" onClick={refreshData}>
            Try Again
          </Button>
        </Alert>
      )}

      {/* Data Comparison Alert */}
      {dataComparison && !useSampleData && (
        <Alert variant="info" className="mb-3">
          <Alert.Heading>📊 Data Comparison</Alert.Heading>
          <Row>
            <Col md={6}>
              <strong>Revenue Comparison:</strong><br />
              Sample Data: RWF {dataComparison.revenue.sample.toLocaleString()}<br />
              Live Data: RWF {dataComparison.revenue.api.toLocaleString()}<br />
              <Badge bg={dataComparison.revenue.difference >= 0 ? "success" : "danger"}>
                {dataComparison.revenue.difference >= 0 ? "↗️" : "↘️"} {dataComparison.revenue.percentChange}%
              </Badge>
            </Col>
            <Col md={6}>
              <strong>Transaction Comparison:</strong><br />
              Sample: {dataComparison.transactions.sample.toLocaleString()}<br />
              Live: {dataComparison.transactions.api.toLocaleString()}
            </Col>
          </Row>
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center mb-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading dashboard data...</span>
          </Spinner>
          <p className="mt-2">Loading dashboard data...</p>
        </div>
      )}

      {/* Revenue Charts Grid */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Header className="bg-primary text-white">
              <h6 className="mb-0">📊 Revenue Distribution</h6>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '300px' }}>
                <Doughnut data={currentData.revenueDistribution} options={doughnutOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Header className="bg-info text-white">
              <h6 className="mb-0">🚢 Vessel Services Breakdown</h6>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '300px' }}>
                <Doughnut data={currentData.vesselBreakdown} options={doughnutOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Header className="bg-success text-white">
              <h6 className="mb-0">📈 Monthly Revenue Trends (2025)</h6>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '400px' }}>
                <Bar data={currentData.monthlyTrends} options={barOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Header className="bg-secondary text-white">
              <h6 className="mb-0">📦 Cargo Types Distribution</h6>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '300px' }}>
                <Doughnut data={currentData.cargoTypes} options={{
                  ...doughnutOptions,
                  plugins: {
                    ...doughnutOptions.plugins,
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          const value = context.parsed;
                          return `${context.label}: ${(value / 1000000).toFixed(1)}M KG`;
                        }
                      }
                    }
                  }
                }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Header className="bg-warning text-dark">
              <h6 className="mb-0">📊 Transaction Volume</h6>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '300px' }}>
                <Bar data={currentData.transactionVolume} options={volumeOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Summary Statistics */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center bg-light">
            <Card.Body>
              <h5 className="text-primary">{formattedStats.totalRevenue}</h5>
              <p className="mb-0 text-muted">Total Revenue</p>
              {!useSampleData && (
                <Badge bg="success" size="sm">Live</Badge>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center bg-light">
            <Card.Body>
              <h5 className="text-success">{formattedStats.totalTransactions}</h5>
              <p className="mb-0 text-muted">Total Transactions</p>
              {!useSampleData && (
                <Badge bg="success" size="sm">Live</Badge>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center bg-light">
            <Card.Body>
              <h5 className="text-info">{formattedStats.avgVesselRevenue}</h5>
              <p className="mb-0 text-muted">Avg. Vessel Revenue</p>
              {!useSampleData && (
                <Badge bg="success" size="sm">Live</Badge>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center bg-light">
            <Card.Body>
              <h5 className="text-warning">{formattedStats.totalCargoWeight}</h5>
              <p className="mb-0 text-muted">Total Cargo Volume</p>
              {!useSampleData && (
                <Badge bg="success" size="sm">Live</Badge>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}