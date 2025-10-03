import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import ReportTable from "../SharedTabComponents/ReportTable";
import { motion, AnimatePresence } from "framer-motion";
import TabHeader from "../SharedTabComponents/TabHeader";
import RadioGroup from "../SharedTabComponents/RadioButtons";
import { Col } from "react-bootstrap";
export default function ClientTab() {
  const [view, setView] = useState("brief"); // default view
  const [activeTab, setActiveTab] = useState("Vessel");

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
    <div>
      <TabHeader onSearch={() => {}} title="Client" />

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
