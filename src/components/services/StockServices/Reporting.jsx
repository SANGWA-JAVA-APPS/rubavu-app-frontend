import axios from "axios";

import StockCommons from "./StockCommons";
import StockConn from "./StockConn";

class Reporting {
  static page = (Reporting.page < 1 || Reporting.page == undefined) ? 1 : Reporting.page;
  static size = (Reporting.size < 1) ? 50 : Reporting.size;
  static server = StockConn.wholePath.name;
  // static url = "http://" + Repository.server + ":8089/guru/api"
  getHeaders(authHeader) {
    return StockConn.GetToken(authHeader);
  }
  static headers = StockConn.LoginToken
  static getHeaders = StockConn.GetToken

  revenueReport(startDate, endDate, authHeader) {
    return axios.get(Reporting.server + "/revenuereport/", {
      headers: this.getHeaders(authHeader),
      params: {
        startDate: startDate,
        endDate: endDate
      }
    }).catch(() => { StockCommons.RedirectToLogin() })
  }

  vesselTruckWeightReport(startDate, endDate, authHeader) {
    return axios.get(Reporting.server + "/revenuereport/vesselTrucksWeight", {
      headers: this.getHeaders(authHeader),
      params: {
        startDate: startDate,
        endDate: endDate
      }
    }).catch(() => { StockCommons.RedirectToLogin() })
  }


  allCargoReport(startDate, endDate, authHeader) {
    return axios.get(Reporting.server + "/revenuereport/cargoReport", {
      headers: this.getHeaders(authHeader),
      params: {
        startDate: startDate,
        endDate: endDate
      }
    }).catch(() => { StockCommons.RedirectToLogin() })
  }

  cargoExitReport(startDate, endDate, authHeader) {
    // Try the hwmovement endpoint, fallback to empty data if it fails
    return axios.get(Reporting.server + "/revenuereport/cargoExitBrief/", {
      headers: this.getHeaders(authHeader), params: { startDate: startDate, endDate: endDate }
    }).then(response => {
      console.log('Cargo exit API response:', response);
      return response;
    }).catch((error) => {
      console.error('Cargo exit report error:', error);
      // Instead of redirecting to login, return empty data
      return {
        data: []
      };
    });
  }
  cargoExitDetailedReport(startDate, endDate, authHeader) {
    // Try the hwmovement endpoint, fallback to empty data if it fails
    return axios.get(Reporting.server + "/hwmovement/whmByType/out/", {
      headers: this.getHeaders(authHeader), params: { startDate: startDate, endDate: endDate }
    }).then(response => {
      console.log('Cargo exit API response:', response);
      return response;
    }).catch((error) => {
      console.error('Cargo exit report error:', error);
      // Instead of redirecting to login, return empty data
      return {
        data: []
      };
    });
  }

  inventoryReport(authHeader) {
    return axios.get(Reporting.server + "/codeguru/api/client/allCargInWh", {
      headers: this.getHeaders(authHeader)
    }).then(response => {
      console.log('Inventory API response:', response);
      return response;
    }).catch((error) => {
      console.error('Inventory report error:', error);
      // StockCommons.RedirectToLogin();
    })
  }

  // ============================================================================
  // NEW ANALYTICS API METHODS FOR DASHBOARD REPORTING
  // ============================================================================

  /**
   * Get revenue distribution across different sources (Vessel, Truck, Cargo)
   * Used for: Revenue Distribution Doughnut Chart
   */
  getRevenueDistribution(startDate, endDate, authHeader) {
    return axios.get(Reporting.server + "/revenuereport/analytics/revenue-distribution", {
      headers: this.getHeaders(authHeader),
      params: {
        startDate: startDate,
        endDate: endDate
      }
    }).then(response => {
      console.log('Revenue distribution API response:', response);
      return response;
    }).catch((error) => {
      console.error('Revenue distribution error:', error);
      return {
        data: {
          status: 'error',
          message: error.message || 'Failed to fetch revenue distribution',
          data: []
        }
      };
    });
  }

  /**
   * Get vessel service breakdown (Wharfage vs Berthing charges)
   * Used for: Vessel Services Breakdown Doughnut Chart
   */
  getVesselServiceBreakdown(startDate, endDate, authHeader) {
    return axios.get(Reporting.server + "/revenuereport/analytics/vessel-breakdown", {
      headers: this.getHeaders(authHeader),
      params: {
        startDate: startDate,
        endDate: endDate
      }
    }).then(response => {
      console.log('Vessel service breakdown API response:', response);
      return response;
    }).catch((error) => {
      console.error('Vessel service breakdown error:', error);
      return {
        data: {
          status: 'error',
          message: error.message || 'Failed to fetch vessel service breakdown',
          data: []
        }
      };
    });
  }

  /**
   * Get monthly revenue trends for the last 6 months
   * Used for: Monthly Revenue Trends Stacked Bar Chart
   */
  getMonthlyRevenueTrends(startDate, endDate, authHeader) {
    return axios.get(Reporting.server + "/revenuereport/analytics/monthly-trends", {
      headers: this.getHeaders(authHeader),
      params: {
        startDate: startDate,
        endDate: endDate
      }
    }).then(response => {
      console.log('Monthly revenue trends API response:', response);
      return response;
    }).catch((error) => {
      console.error('Monthly revenue trends error:', error);
      return {
        data: {
          status: 'error',
          message: error.message || 'Failed to fetch monthly revenue trends',
          data: []
        }
      };
    });
  }

  /**
   * Get cargo types distribution by weight and revenue
   * Used for: Cargo Types Distribution Doughnut Chart
   */
  getCargoTypesDistribution(startDate, endDate, authHeader) {
    return axios.get(Reporting.server + "/revenuereport/analytics/cargo-distribution", {
      headers: this.getHeaders(authHeader),
      params: {
        startDate: startDate,
        endDate: endDate
      }
    }).then(response => {
      console.log('Cargo types distribution API response:', response);
      return response;
    }).catch((error) => {
      console.error('Cargo types distribution error:', error);
      return {
        data: {
          status: 'error',
          message: error.message || 'Failed to fetch cargo types distribution',
          data: []
        }
      };
    });
  }

  /**
   * Get transaction volume statistics by service type
   * Used for: Transaction Volume Bar Chart
   */
  getTransactionVolume(startDate, endDate, authHeader) {
    return axios.get(Reporting.server + "/revenuereport/analytics/transaction-volume", {
      headers: this.getHeaders(authHeader),
      params: {
        startDate: startDate,
        endDate: endDate
      }
    }).then(response => {
      console.log('Transaction volume API response:', response);
      return response;
    }).catch((error) => {
      console.error('Transaction volume error:', error);
      return {
        data: {
          status: 'error',
          message: error.message || 'Failed to fetch transaction volume',
          data: []
        }
      };
    });
  }

  /**
   * Get summary statistics for dashboard cards
   * Used for: Summary Statistics Cards
   */
  getSummaryStatistics(startDate, endDate, authHeader) {
    return axios.get(Reporting.server + "/revenuereport/analytics/summary", {
      headers: this.getHeaders(authHeader),
      params: {
        startDate: startDate,
        endDate: endDate
      }
    }).then(response => {
      console.log('Summary statistics API response:', response);
      return response;
    }).catch((error) => {
      console.error('Summary statistics error:', error);
      return {
        data: {
          status: 'error',
          message: error.message || 'Failed to fetch summary statistics',
          data: null
        }
      };
    });
  }

  /**
   * Get comprehensive dashboard data in a single API call
   * Used for: Complete Dashboard Loading (Most Efficient)
   * ⭐ RECOMMENDED: Use this for loading the entire overview dashboard
   */
  getComprehensiveDashboard(startDate, endDate, authHeader) {
    return axios.get(Reporting.server + "/revenuereport/analytics/dashboard", {
      headers: this.getHeaders(authHeader),
      params: {
        startDate: startDate,
        endDate: endDate
      }
    }).then(response => {
      console.log('Comprehensive dashboard API response:', response);
      return response;
    }).catch((error) => {
      console.error('Comprehensive dashboard error:', error);
      return {
        data: {
          status: 'error',
          message: error.message || 'Failed to fetch comprehensive dashboard data',
          data: {
            revenueDistribution: [],
            vesselServiceBreakdown: [],
            monthlyRevenueTrends: [],
            cargoTypesDistribution: [],
            transactionVolume: [],
            summaryStatistics: null
          }
        }
      };
    });
  }

  /**
   * Get revenue performance metrics with growth analysis
   * Used for: Advanced Performance Analysis
   */
  getRevenuePerformanceMetrics(startDate, endDate, authHeader) {
    return axios.get(Reporting.server + "/revenuereport/analytics/performance", {
      headers: this.getHeaders(authHeader),
      params: {
        startDate: startDate,
        endDate: endDate
      }
    }).then(response => {
      console.log('Revenue performance metrics API response:', response);
      return response;
    }).catch((error) => {
      console.error('Revenue performance metrics error:', error);
      return {
        data: {
          status: 'error',
          message: error.message || 'Failed to fetch revenue performance metrics',
          data: {}
        }
      };
    });
  }

  /**
   * Get revenue trend analysis with growth calculations
   * Used for: Detailed Trend Analysis
   */
  getRevenueTrendAnalysis(startDate, endDate, authHeader) {
    return axios.get(Reporting.server + "/revenuereport/analytics/trends", {
      headers: this.getHeaders(authHeader),
      params: {
        startDate: startDate,
        endDate: endDate
      }
    }).then(response => {
      console.log('Revenue trend analysis API response:', response);
      return response;
    }).catch((error) => {
      console.error('Revenue trend analysis error:', error);
      return {
        data: {
          status: 'error',
          message: error.message || 'Failed to fetch revenue trend analysis',
          data: {}
        }
      };
    });
  }

  /**
   * Get operational efficiency metrics
   * Used for: Efficiency Analysis and KPIs
   */
  getOperationalEfficiencyMetrics(startDate, endDate, authHeader) {
    return axios.get(Reporting.server + "/revenuereport/analytics/efficiency", {
      headers: this.getHeaders(authHeader),
      params: {
        startDate: startDate,
        endDate: endDate
      }
    }).then(response => {
      console.log('Operational efficiency metrics API response:', response);
      return response;
    }).catch((error) => {
      console.error('Operational efficiency metrics error:', error);
      return {
        data: {
          status: 'error',
          message: error.message || 'Failed to fetch operational efficiency metrics',
          data: {}
        }
      };
    });
  }

  /**
   * Get top performing cargo types with optional limit
   * Used for: Top Cargo Rankings
   */
  getTopPerformingCargoTypes(startDate, endDate, limit = 10, authHeader) {
    return axios.get(Reporting.server + "/revenuereport/analytics/top-cargo", {
      headers: this.getHeaders(authHeader),
      params: {
        startDate: startDate,
        endDate: endDate,
        limit: limit
      }
    }).then(response => {
      console.log('Top performing cargo types API response:', response);
      return response;
    }).catch((error) => {
      console.error('Top performing cargo types error:', error);
      return {
        data: {
          status: 'error',
          message: error.message || 'Failed to fetch top performing cargo types',
          data: []
        }
      };
    });
  }

  // ============================================================================
  // CONVENIENCE METHODS FOR SPECIFIC USE CASES
  // ============================================================================

  /**
   * Get all chart data for the overview dashboard
   * This method calls getComprehensiveDashboard and transforms the data for easier use
   */
  async getAllDashboardChartData(startDate, endDate, authHeader) {
    try {
      const response = await this.getComprehensiveDashboard(startDate, endDate, authHeader);
      
      if (response.data.status === 'success') {
        const data = response.data.data;
        return {
          success: true,
          revenueDistribution: data.revenueDistribution || [],
          vesselServiceBreakdown: data.vesselServiceBreakdown || [],
          monthlyRevenueTrends: data.monthlyRevenueTrends || [],
          cargoTypesDistribution: data.cargoTypesDistribution || [],
          transactionVolume: data.transactionVolume || [],
          summaryStatistics: data.summaryStatistics || null,
          period: response.data.period,
          timestamp: response.data.timestamp
        };
      } else {
        throw new Error(response.data.message || 'Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Get all dashboard chart data error:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch dashboard data',
        revenueDistribution: [],
        vesselServiceBreakdown: [],
        monthlyRevenueTrends: [],
        cargoTypesDistribution: [],
        transactionVolume: [],
        summaryStatistics: null
      };
    }
  }

  /**
   * Get formatted data for Chart.js consumption
   * Transforms API response data into Chart.js compatible format
   */
  async getFormattedChartData(startDate, endDate, authHeader) {
    try {
      const dashboardData = await this.getAllDashboardChartData(startDate, endDate, authHeader);
      
      if (!dashboardData.success) {
        throw new Error(dashboardData.error);
      }

      return {
        // Revenue Distribution Doughnut Chart
        revenueDistribution: {
          labels: dashboardData.revenueDistribution.map(item => item.revenue_source),
          datasets: [{
            data: dashboardData.revenueDistribution.map(item => parseInt(item.total_amount)),
            backgroundColor: ['#28a745', '#007bff', '#ffc107'],
            borderWidth: 2,
            borderColor: '#fff'
          }]
        },

        // Vessel Service Breakdown Doughnut Chart
        vesselBreakdown: {
          labels: dashboardData.vesselServiceBreakdown.map(item => item.service_type),
          datasets: [{
            data: dashboardData.vesselServiceBreakdown.map(item => parseInt(item.total_amount)),
            backgroundColor: ['#17a2b8', '#6f42c1'],
            borderWidth: 2,
            borderColor: '#fff'
          }]
        },

        // Monthly Revenue Trends Bar Chart
        monthlyTrends: {
          labels: dashboardData.monthlyRevenueTrends.map(item => item.month_name),
          datasets: [
            {
              label: 'Vessel Revenue',
              data: dashboardData.monthlyRevenueTrends.map(item => parseInt(item.vessel_revenue || 0)),
              backgroundColor: '#007bff',
              borderRadius: 4,
            },
            {
              label: 'Truck Revenue',
              data: dashboardData.monthlyRevenueTrends.map(item => parseInt(item.truck_revenue || 0)),
              backgroundColor: '#ffc107',
              borderRadius: 4,
            },
            {
              label: 'Cargo Revenue',
              data: dashboardData.monthlyRevenueTrends.map(item => parseInt(item.cargo_revenue || 0)),
              backgroundColor: '#28a745',
              borderRadius: 4,
            }
          ]
        },

        // Cargo Types Distribution Doughnut Chart
        cargoTypes: {
          labels: dashboardData.cargoTypesDistribution.map(item => item.cargo_type),
          datasets: [{
            data: dashboardData.cargoTypesDistribution.map(item => parseInt(item.total_weight)),
            backgroundColor: ['#6c757d', '#dc3545', '#fd7e14', '#795548', '#e91e63', '#ff5722', '#8bc34a'],
            borderWidth: 2,
            borderColor: '#fff'
          }]
        },

        // Transaction Volume Bar Chart
        transactionVolume: {
          labels: dashboardData.transactionVolume.map(item => item.service_type),
          datasets: [{
            label: 'Number of Transactions',
            data: dashboardData.transactionVolume.map(item => parseInt(item.transaction_count)),
            backgroundColor: ['#ffc107', '#28a745', '#007bff'],
            borderRadius: 4,
          }]
        },

        // Summary Statistics
        summaryStats: dashboardData.summaryStatistics,
        
        // Metadata
        period: dashboardData.period,
        timestamp: dashboardData.timestamp
      };

    } catch (error) {
      console.error('Get formatted chart data error:', error);
      return null;
    }
  }
}
export default new Reporting()