import React, { useContext, useEffect } from "react"
import { Tabs, Tab, Row, Col } from "react-bootstrap"
import PagesWapper from "../../Global/PagesWapper"
import { ColItemContext } from "../../Global/GlobalDataContentx"
import CustomModalPopup from "../../Global/CustomModalPopup"
import { DateRangeProvider } from "../../globalcomponents/ButtonContext"

// Import tab pages
import OverviewTab from "./ReportTabs/OverviewTab"
import CargoTab from "./ReportTabs/CargoTab"
import VesselTab from "./ReportTabs/VesselTab"
import ClientTab from "./ReportTabs/ClientTab"
import MiscTab from "./ReportTabs/MiscTab"

export default function ReportingTabs() {
  const { setModalSize, showModal, setShowModal, modalTitle, setupBycolor } =
    useContext(ColItemContext)
  const [activeTab, setActiveTab] = React.useState("Cargo")
  useEffect(() => {
    setupBycolor()
    setModalSize("custom-modal_97")
  }, [])

  return (
    <DateRangeProvider>
      <CustomModalPopup
        show={showModal}
        onHide={() => setShowModal(false)}
        title={modalTitle}
        content="Loading ..."
      />
      <PagesWapper>
        <div className="container">
          <Tabs
            defaultActiveKey="overview"
            id="reporting-tabs" className="bg-light my-3 mx-auto"
            mountOnEnter            onSelect={(k) => setActiveTab(k)}
            unmountOnExit
            transition={true}
          >
            <Tab eventKey="overview" title="Overview" tabClassName="px-4">
              <OverviewTab isActive={activeTab === "overview"} />
            </Tab>
            <Tab eventKey="Cargo" title="Cargo" tabClassName="px-4">
              <CargoTab   />
            </Tab>

            <Tab eventKey="Vessel" title="Vessel" tabClassName="px-4">
              <VesselTab isActive={activeTab === "Vessel"} />
            </Tab>

            <Tab eventKey="Client" title="Client" tabClassName="px-4">
              <ClientTab isActive={activeTab === "Client"} />
            </Tab>

            <Tab
              eventKey="commonReporting"
              tabClassName="ml-2 px-4"
              title="Misc"
            >
              <MiscTab isActive={activeTab === "Misc"} />
            </Tab>
          </Tabs>
        </div>
      </PagesWapper>
    </DateRangeProvider>
  )
}
