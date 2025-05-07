import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2'; // Use Doughnut instead of Bar
import {
  Chart as ChartJS,
  ArcElement, // For circular charts
  Tooltip,
  Legend,
} from 'chart.js';

 
// Register Chart.js components for Doughnut chart
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({totalQuayAmount, totalHandlingCharges}) {
     
  
    // Chart data for Doughnut
    const chartData = {
      labels: ['Total Quay Amount', 'Total Vessel Handling Charges'],
      datasets: [
        {
          data: [totalQuayAmount, totalHandlingCharges],
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)', // Teal for Quay Amount
            'rgba(255, 99, 132, 0.6)', // Pink for Handling Charges
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false, // Allows vertical resizing
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Summary of Berth Charges',
        },
        tooltip: {
          callbacks: {
            label: (context) => `${context.label}: $${context.raw}`, // Add currency to tooltips
          },
        },
      },
    };
  
    return (
      <Row style={styles.row}>
        <Col className="border" style={{ flex: 1 }} md={3}>
          <div style={styles.placeholder}>
         - Quay: ${totalQuayAmount} <br/>
          -Handling: ${totalHandlingCharges} 
          </div>
        </Col>
        <Col className="border" style={{ flex: 1 }} md={9} xs={12}>
          <div style={styles.chartContainer}>
            <Doughnut data={chartData} options={options} />
          </div>
        </Col>
      </Row>
    );
}
 const styles = {
    row: {
    height: '300px', // Fixed height from your Row
    
    fontSize: '21px',
    color: '#f17618',
  },
  placeholder: {
    height: '100%', // Fills Col height
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize:'13px'
  },
    chartContainer: {
      height: '100%', // Fills Col height
      width: '100%',  // Fills Col width
      position: 'relative', // Ensures chart stays within bounds
    },
  };