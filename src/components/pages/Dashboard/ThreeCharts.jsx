import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Line } from 'react-chartjs-2'
import { Icon } from 'react-icons-kit'
import { androidBoat as boat } from 'react-icons-kit/ionicons/androidBoat'
import { ic_refresh as refreshIcon } from 'react-icons-kit/md/ic_refresh'
export const ThreeCharts = ({ dataOne, dataTwo, dataThree }) => {
    return (
        <Container fluid className=' ' >
            <Row className=" threecharts m-5 pt-4 mt-5 d-flex align-items-stretch   " style={{ height: '300px' }}>
                <ChartCol title="Today" desc="Today's revenue by hour" bgColor="bg1" chartComponent={<ChartComponent dataOne={dataOne} />} colSize={8} />
                <ChartCol title="This week  " desc="This week revenue" bgColor="bg2" chartComponent={<ChartComponent dataOne={dataTwo || dataOne} />} colSize={4} />
            </Row>
            <Row className=" threecharts m-5 pt-4 mt-0 d-flex align-items-stretch   " style={{ height: '300px' }}>
                <ChartCol title="This Month" desc="This month revenue" bgColor="bg3" chartComponent={<ChartComponent dataOne={dataThree || dataOne} />} colSize={12} />
            </Row>
        </Container>
    )
}
export const ChartCol = ({ title, desc, chartComponent, bgColor, colSize = 4 }) => {

    return (<Col className='   d-flex flex-column  align-items-stretch justify-content-between' md={colSize} >
        <div className='bg-light chartopPartparent  ' style={{ position: 'relative', height: '200px' }} >
            <div className={`chartopPart  d-flex    ${bgColor} `}
                style={{ position: 'absolute', height: '200px', top: '-30px' }}>
                {chartComponent}
            </div>
        </div>
        <div className='bg-light bottom border-top border-dark p-4 flex-fill ' >
            <h6 className='fw-bold '>{title}</h6>
            <p style={{ fontSize: '13px' }}>{desc}</p>

            {/* refresh at the border-bottom */}
            <div className="refresh d-flex justify-content-center align-items-center">
                <Icon size={'20'} icon={refreshIcon} style={{ color: '#7b7b7b' }} title="Updating in one minute" />
            </div>
        </div>
    </Col>)
}
export const ChartComponent = ({ dataOne = [] }) => {
    // Process the real data to extract hours and group by hour if needed
    const processedData = dataOne.length > 0 ? dataOne : [];
    
    // Extract unique hours/periods and aggregate data by hour/day/week
    const aggregatedData = processedData.reduce((acc, item) => {
        let key = 'No Data';
        
        if (item.etd) {
            if (item.period) {
                // For weekly data - convert DAYOFWEEK number to day name
                const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                key = dayNames[item.period - 1] || `Day ${item.period}`;
            } else {
                // For hourly data - extract hour
                const hour = new Date(item.etd).getHours();
                key = `${hour.toString().padStart(2, '0')}h`;
            }
            
            if (!acc[key]) {
                acc[key] = {
                    period: key,
                    quay_amount: 0,
                    vessel_handling_charges: 0,
                    count: 0
                };
            }
            
            acc[key].quay_amount += (item.quay_amount || item.quayAmount || 0);
            acc[key].vessel_handling_charges += (item.vessel_handling_charges || item.handlingCharges || 0);
            acc[key].count += 1;
        }
        return acc;
    }, {});
    
    // Convert to array and sort appropriately
    const sortedData = Object.values(aggregatedData).sort((a, b) => {
        // If it's hourly data (contains 'h'), sort by hour number
        if (a.period.includes('h') && b.period.includes('h')) {
            const hourA = parseInt(a.period.replace('h', ''));
            const hourB = parseInt(b.period.replace('h', ''));
            return hourA - hourB;
        }
        // If it's weekly data (day names), sort by day order
        const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const indexA = dayOrder.indexOf(a.period);
        const indexB = dayOrder.indexOf(b.period);
        if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
        }
        // Default alphabetical sort
        return a.period.localeCompare(b.period);
    });
    
    // If no real data, show empty chart
    const labels = sortedData.length > 0 
        ? sortedData.map(item => item.period)
        : ['No Data'];
        
    const quayData = sortedData.length > 0 
        ? sortedData.map(item => item.quay_amount)
        : [0];
        
    const handlingData = sortedData.length > 0 
        ? sortedData.map(item => item.vessel_handling_charges)
        : [0];

    return (
        <Line 
            data={{
                labels: labels,
                datasets: [
                    {
                        label: 'Quay Amount (RWF)',
                        data: quayData,
                        backgroundColor: '#064ff0',
                        borderColor: '#064ff0', 
                        borderWidth: 3,
                        tension: 0.1,
                        fill: false
                    },
                    {
                        label: 'Handling Charges (RWF)',
                        data: handlingData,
                        backgroundColor: '#ff3030',
                        borderColor: '#ff3030', 
                        borderWidth: 3,
                        tension: 0.1,
                        fill: false
                    }
                ]
            }}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 10
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: labels[0] && labels[0].includes('h') ? 'Berthing Revenue by Hour' : 
                              labels[0] && (labels[0].includes('day') || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].includes(labels[0])) ? 'Berthing Revenue by Day' : 
                              'Berthing Revenue',
                        font: {
                            size: 12
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: labels[0] && labels[0].includes('h') ? 'Hour' : 
                                  labels[0] && (labels[0].includes('day') || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].includes(labels[0])) ? 'Day' : 
                                  'Period',
                            font: {
                                size: 10
                            }
                        },
                        ticks: {
                            font: {
                                size: 9
                            }
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Amount (RWF)',
                            font: {
                                size: 10
                            }
                        },
                        ticks: {
                            font: {
                                size: 9
                            },
                            callback: function(value) {
                                // Format large numbers with K/M suffixes
                                if (value >= 1000000) {
                                    return (value / 1000000).toFixed(1) + 'M';
                                } else if (value >= 1000) {
                                    return (value / 1000).toFixed(1) + 'K';
                                }
                                return value;
                            }
                        },
                        beginAtZero: true
                    }
                },
                elements: {
                    point: {
                        radius: 3,
                        hoverRadius: 5
                    }
                }
            }}
        />
    )
}