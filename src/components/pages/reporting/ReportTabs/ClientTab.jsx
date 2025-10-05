import { useState, useRef, useContext } from "react";
import { Tab, Tabs } from "react-bootstrap";
import ReportTable from "../SharedTabComponents/ReportTable";
import { motion, AnimatePresence } from "framer-motion";
import RadioGroup from "../SharedTabComponents/RadioButtons";
import { Col } from "react-bootstrap";
import { TitleSmallDesc } from "../../../globalcomponents/TitleSmallDesc";
import ListToolBar, { SearchformAnimation } from "../../../Global/ListToolBar";
import SearchBox from "../../../Global/SearchBox";
import CurrentDate from "../../../Global/CurrentDate";
import { useReactToPrint } from "react-to-print";
import { DateRangeContext } from "../../../globalcomponents/ButtonContext";

export default function ClientTab() {
  const [view, setView] = useState("brief"); // default view
  const [activeTab, setActiveTab] = useState("Vessel");
  
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
    documentTitle: "client-report",
  });

  const renderTable = () => (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${activeTab}-${view}`} // key depends on tab + view
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.2 }}
      >
        <ReportTable view={view} />
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div ref={componentRef}>
      <TitleSmallDesc
        title={`Client Report on ${CurrentDate.todaydate()} `}
        moreclass="showOnPrint"
      />
      <ListToolBar
        hideSaveBtn={true}
        height={height}
        entity="Client report"
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

      <Tabs
        id="client-tabs"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || "Vessel")}
        className="bg-light my-3 mx-auto"
        mountOnEnter
        unmountOnExit
      >
        <Tab eventKey="Vessel" title="Vessel">
          <Col>
            <RadioGroup
              name="ClientTab"
              options={[
                { label: "Brief", value: "brief" },
                { label: "Summarized", value: "summarized" },
                { label: "Details", value: "details" },
              ]}
              selected={view}
              onChange={setView}
            />
            {renderTable()}
          </Col>
        </Tab>
        <Tab eventKey="Handling" title="Handling">
          <Col>
            <RadioGroup
              name="ClientTab"
              options={[
                { label: "Brief", value: "brief" },
                { label: "Summarized", value: "summarized" },
                { label: "Details", value: "details" },
              ]}
              selected={view}
              onChange={setView}
            />
            {renderTable()}
          </Col>
        </Tab>
        <Tab eventKey="Storage" title="Storage">
          <Col>
            <RadioGroup
              name="ClientTab"
              options={[
                { label: "Brief", value: "brief" },
                { label: "Summarized", value: "summarized" },
                { label: "Details", value: "details" },
              ]}
              selected={view}
              onChange={setView}
            />
            {renderTable()}
          </Col>
        </Tab>
      </Tabs>
    </div>
  );
}
