import React from "react"
import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { SmallSplitter } from "../../../globalcomponents/Splitter"
import { TitleSmallDesc } from "../../../globalcomponents/TitleSmallDesc"
import { ArrivalTypesDoughnutChart } from "../ArrivalTypesDoughnutChart"
import { TruckAnalyticsChart } from "../TruckAnalyticsChart"
import { VesselRevenueTypesChart } from "../VesselRevenueTypesChart"
import { VesselTopPaymentChart } from "../VesselTopPaymentChart"
import { VesselTopFrequencyChart } from "../VesselTopFrequencyChart"

export default function MiscTab() {
  return (
    <div>
      <Row>
        <Col>
          <Link to="/rrarec" className="btn btn-primary">
            Import from Other sources
          </Link>
        </Col>
        <Col>
          <Link to="/appauditing" className="btn btn-info">
            Auditing
          </Link>
        </Col>
        <Col>
          <a href="http://192.168.92.6/upload_form" className="btn btn-dark">
            Upload Form
          </a>
        </Col>
      </Row>

      <SmallSplitter />
      <TitleSmallDesc title="Reporting" />

      <Row className="mb-4">
        <Col md={6}>
          <ArrivalTypesDoughnutChart />
        </Col>
        <Col md={6}>
          <TruckAnalyticsChart />
        </Col>
      </Row>

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
    </div>
  )
}
