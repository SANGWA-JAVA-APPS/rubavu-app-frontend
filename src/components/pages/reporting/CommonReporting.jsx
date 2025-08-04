import React, { useContext, useState } from 'react'
import PagesWapper from '../../Global/PagesWapper'
import { ItemsContainer } from '../../globalcomponents/ItemsContainer'
import { TitleSmallDesc } from '../../globalcomponents/TitleSmallDesc'
import { DashboardReportsFilters } from '../Dashboard/DashboardReportsFilters'
import { SingleNumber } from './SingleNumber'
import Utils from '../../Global/Utils'
import { useEffect } from 'react'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import CustomModalPopup from '../../Global/CustomModalPopup'
import { SmallSplitter, Splitter } from '../../globalcomponents/Splitter'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ArrivalTypesDoughnutChart } from './ArrivalTypesDoughnutChart'
import { TruckAnalyticsChart } from './TruckAnalyticsChart'
import { VesselRevenueTypesChart } from './VesselRevenueTypesChart'
import { VesselTopPaymentChart } from './VesselTopPaymentChart'
import { VesselTopFrequencyChart } from './VesselTopFrequencyChart'
import { DateRangeProvider } from '../../globalcomponents/ButtonContext'

export default function CommonReporting() {
  const { setModalSize, showModal, setShowModal, modalTitle } = useContext(ColItemContext)
  const { setupBycolor } = useContext(ColItemContext)

  useEffect(() => {

    setupBycolor()
    setModalSize('custom-modal_97')
  }, [])

  return (
    <DateRangeProvider>
      <CustomModalPopup show={showModal} onHide={() => setShowModal(false)} title={modalTitle} content="Loading ..." />
      <PagesWapper>
        <ItemsContainer>
          {/* <DashboardReportsFilters /> */}
          <Row>
            <Col >
             <Link href="#" to="/rrarec" className='btn btn-primary'>Import from Other sources</Link>
            </Col>
            <Col >
             <Link href="#" to="/appauditing" className='btn btn-info'>Auditing</Link>
            </Col>

            <Col>
              <a href="http://192.168.92.6/upload_form" className='btn btn-dark'>Upload Form</a>
            </Col>


          </Row>
          <SmallSplitter />
          <TitleSmallDesc title=" Reporting" />
          
          {/* Doughnut Chart for Arrival Types */}
          <Row className="mb-4">
            <Col md={6}>
              <ArrivalTypesDoughnutChart />
            </Col>
            <Col md={6}>
              <TruckAnalyticsChart />
            </Col>
          </Row>

          {/* Vessel Analytics Charts */}
          <Row className="mb-4">
            <Col md={4}>
              <VesselRevenueTypesChart />
            </Col>
            <Col md={4}>
              <VesselTopPaymentChart />
            </Col>
            <Col md={4}>
              <VesselTopFrequencyChart />
            </Col>
          </Row>
          
          {/* <SingleNumber /> */}          

        </ItemsContainer>
      </PagesWapper>
    </DateRangeProvider>
  )
}
