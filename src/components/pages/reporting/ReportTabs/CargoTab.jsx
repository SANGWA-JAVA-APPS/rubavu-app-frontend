import React, { useState, useEffect, useCallback } from "react";
import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Reporting from "../../../services/StockServices/Reporting";
import { useAuthHeader } from "react-auth-kit";
import { DateRangeContext } from "../../../globalcomponents/ButtonContext";
import { CargoRevenue } from "../../Dashboard/DetailedReport";

export default function CargoTab() {
  const authHeader = useAuthHeader()();
  const { startDate, endDate } = useContext(DateRangeContext);
  
  // State for cargo data - matching DetailedReportLoaderModal structure
  const [allTallies, setAllTallies] = useState({});
  const [dataLoad, setDataLoad] = useState(false);

  // Function to load cargo data - matching DetailedReportLoaderModal
  const loadCargoData = useCallback(() => {
    setDataLoad(true);
    
    Reporting.allCargoReport(startDate, endDate, authHeader).then((res) => {
      setAllTallies({
        tally: res.data.tally,
        tallyIn: res.data.tallyIn,
        tallyOut: res.data.tallyOut,
      });
      setDataLoad(false);
    }).catch((error) => {
      console.error("Error loading cargo data:", error);
      setDataLoad(false);
    });
  }, [startDate, endDate, authHeader]);

  // Load data when component mounts and when date range changes
  useEffect(() => {
    if (startDate && endDate) {
      loadCargoData();
    }
  }, [startDate, endDate, loadCargoData]);

  return (
    <Container style={{ height: '100%', width: '100%' }} className='styledVHScrollBar'>
      <Row>
        <Col md={12}>
          {dataLoad && (
            <Row className="d-flex justify-content-center">
              <Col className='loader' md={3}>Loading Cargo Data...</Col>
            </Row>
          )}
        </Col>
        <Col md={12}>
          {(!dataLoad) && allTallies.tally && (
            <CargoRevenue cargoAmountReport={allTallies} />
          )}
        </Col>
      </Row>
    </Container>
  );
}