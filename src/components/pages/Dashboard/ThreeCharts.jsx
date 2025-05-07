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
                <ChartCol title="Today" desc="Today's revenue" bgColor="bg1" chartComponent={<ChartComponent dataOne={dataOne} />} />
                <ChartCol title="This week  " desc="This week revenue" bgColor="bg2" chartComponent={<ChartComponent dataOne={dataOne} />} />
                <ChartCol title="This Month" desc="This month revenue" bgColor="bg3" chartComponent={<ChartComponent dataOne={dataOne} />} />
            </Row>
        </Container>
    )
}
export const ChartCol = ({ title, desc, chartComponent, bgColor }) => {

    return (<Col className='   d-flex flex-column  align-items-stretch justify-content-between' md={4} >
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
export const ChartComponent = ({ dataOne = [] }) => {//
    return (
        <Line data={{
            labels: SampleLineChartData().map((berthRevByMonth, index) => berthRevByMonth.period),
            datasets: [
                {
                    label: 'Quay Amount',
                    data: SampleLineChartData().map((berthRevByMonth, index) => berthRevByMonth.quay_amount),
                    backgroundColor: '#064ff0',
                    borderColor: '#064ff0', borderWidth: 3
                },
                {
                    label: 'Handling Charges Amount',
                    data: SampleLineChartData().map((berthRevByMonth, index) => berthRevByMonth.vessel_handling_charges),
                    backgroundColor: '#ff3030',
                    borderColor: '#ff3030', borderWidth: 3
                }
            ]

        }} />
    )
}


export const SampleLineChartData = () => {
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const randomPlate = () => `${String.fromCharCode(65 + randomInt(0, 25))}${String.fromCharCode(65 + randomInt(0, 25))}E-${randomInt(100, 999)}`;
    const randomDate = (month) => {
        const day = randomInt(1, 28); // Keep it simple, avoid edge cases
        return `2025-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${randomInt(0, 23)}:${randomInt(0, 59)}:00`;
    };
    const vesselNames = ['Sunset Explorer', 'Ocean Star', 'Blue Horizon', 'Wave Rider', 'Sea Venture', 'Tidal Dream'];
    const operators = ['Maritime Express', 'BlueWave Shipping', 'Oceanic Co.', 'SeaLink Operators'];

    // Generate 12 months of data
    return Array.from({ length: 12 }, (_, index) => ({
        id: index + 1, // Sequential IDs (1 to 12)
        quay_amount: randomInt(0, 5000), // Random quay amount between 0 and 5000
        etd: randomDate(index + 1), // ETD as a 2025 date in the given month
        vessel_handling_charges: randomInt(100, 1000), // Random charges between 100 and 1000
        name: vesselNames[randomInt(0, vesselNames.length - 1)], // Random vessel name
        plate_number: randomPlate(), // Random plate like "RAE-153"
        dimension: `${randomInt(20, 50)} x ${randomInt(10, 60)} x ${randomInt(20, 40)}`, // Random dimensions
        capacity: `${randomInt(10000, 60000)}`, // Random capacity between 10,000 and 60,000
        owner_operator: operators[randomInt(0, operators.length - 1)], // Random operator
        rura_certificate: `RURA-CERT-${String(randomInt(1, 999)).padStart(3, '0')}`, // Random certificate
        contact_number: `07${randomInt(80, 89)}${randomInt(1000000, 9999999)}`, // Random phone number
        loa: `${randomInt(20, 50)}`, // Random length overall
        vesselId: randomInt(1, 20), // Random vessel ID
        period: index + 1, // Month number (1 to 12)
    }));

}