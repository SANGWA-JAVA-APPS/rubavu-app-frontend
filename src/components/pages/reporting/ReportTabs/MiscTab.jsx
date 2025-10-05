import { useState, useContext } from "react"
import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { SmallSplitter } from "../../../globalcomponents/Splitter"
import { TitleSmallDesc } from "../../../globalcomponents/TitleSmallDesc"
import { ArrivalTypesDoughnutChart } from "../ArrivalTypesDoughnutChart"
import { TruckAnalyticsChart } from "../TruckAnalyticsChart"
import { VesselRevenueTypesChart } from "../VesselRevenueTypesChart"
import { VesselTopPaymentChart } from "../VesselTopPaymentChart"
import { VesselTopFrequencyChart } from "../VesselTopFrequencyChart"
import ListToolBar, { SearchformAnimation } from "../../../Global/ListToolBar";
import SearchBox from "../../../Global/SearchBox";
import CurrentDate from "../../../Global/CurrentDate";
import { useReactToPrint } from "react-to-print";
import { DateRangeContext } from "../../../globalcomponents/ButtonContext";

import { toPng } from "html-to-image";
import { useRef } from "react";
 


export default function MiscTab() {
  const ref = useRef();
  
  // Header component states
  const [searchHeight, setSearchHeight] = useState(0);
  const [height, setHeight] = useState(0);
  const { setStartDate, setendDate } = useContext(DateRangeContext);
  
  const getCommonSearchByDate = (date1, date2) => {
    setStartDate(date1);
    setendDate(date2);
  };
  
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "misc-report",
  });

  const getScreenShot = () => {
    if (ref.current) {
      toPng(ref.current).then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "screenshot.png";
        link.href = dataUrl;
        link.click();
      });
    }
  };
  
  return (
    <div ref={componentRef}>
      <TitleSmallDesc
        title={`Miscellaneous Report on ${CurrentDate.todaydate()} `}
        moreclass="showOnPrint"
      />
      <ListToolBar
        hideSaveBtn={true}
        height={height}
        entity="Miscellaneous report"
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
        <Col>

        <div className="d-none" ref={ref}  style={{width:'200px', height:'200px',padding:'20px', backgroundColor:'red'}}>Some content</div>
          <a className="d-none" href="#" onClick={getScreenShot} className="btn btn-dark">
            Capture screen
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
