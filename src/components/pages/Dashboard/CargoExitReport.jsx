import { useState, useContext, useRef, useEffect, useCallback } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx";
import { useAuthHeader } from "react-auth-kit";
import { DateRangeContext } from "../../globalcomponents/ButtonContext";
import { TitleSmallDesc } from "../../globalcomponents/TitleSmallDesc";
import ListToolBar, { SearchformAnimation } from "../../Global/ListToolBar";
import SearchBox from "../../Global/SearchBox";
import { LocalReportAddress } from "./DetailedReport";
import { CargoExitBrief } from "./CargoExitBrief";
import { CargoExitDetailed } from "./CargoExitDetailed";
import { CargoExitDetailedDeferred } from "./CargoExitDetailedDeferred";
import { CargoExitSummary } from "./CargoExitSummary";
import { CargoExitClientFilter } from "./CargoExitClientFilter";
import Reporting from "../../services/StockServices/Reporting";

export const CargoExitReport = () => {
  const authHeader = useAuthHeader();
  const { setStartDate, setendDate, startDate, endDate } =
    useContext(DateRangeContext);

  // Component states
  const [activeView, setActiveView] = useState("brief"); // 'brief', 'summary', 'detailed'
  const [searchHeight, setSearchHeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [showClientFilters, setShowClientFilters] = useState(false);

  // Data states
  const [cargoExitData, setCargoExitData] = useState([]);
  const [cargoExitDataDetailed, setCargoExitDataDetailed] = useState([]);
  const [cargoExitBrief, setCargoExitBrief] = useState([]);
  const [loading, setLoading] = useState(false);

  // Client filter states
  const [selectedClients, setSelectedClients] = useState([]);
  const [availableClients, setAvailableClients] = useState([]);

  const componentRef = useRef();

  // Print handler
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "cargo-exit-report",
  });

  // Date search handler
  const getCommonSearchByDate = (date1, date2) => {
    setStartDate(date1);
    setendDate(date2);
  };

  // Fetch cargo exit data (detailed)

  const fetchDetailedCargoExitData = useCallback(async (start, end) => {
    try {
      setLoading(true);
      const response = await Reporting.cargoExitDetailedReport(
        start,
        end,
        authHeader()
      );
      console.log(        "------------------------------DATA FOR CARGO EXIT------------------------------------"      );
      console.log(response.data);
      if (response && response.data && response.data.length > 0) {
        setCargoExitDataDetailed(response.data);
        // Extract unique clients
        const clients = [
          ...new Set(response.data.map((item) => item.user_name)),
        ]
          .filter(Boolean)
          .sort();
        setAvailableClients(clients);
      }
    } catch (error) {
      console.error("Error fetching cargo exit data:", error);
      setCargoExitDataDetailed([]);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Keep empty dependencies to prevent infinite loops caused by authHeader

  const fetchCargoExitData = useCallback(async (start, end) => {
    try {
      setLoading(true);
      const response = await Reporting.cargoExitReport(
        start,
        end,
        authHeader()
      );
      console.log(
        "------------------------------DATA FOR CARGO EXIT------------------------------------"
      );
      console.log(response.data.cargoExitBrief);
      if (
        response &&
        response.data &&
        response.data.cargoExitBrief.length > 0
      ) {
        setCargoExitData(response.data.cargoExitBrief);
        // Extract unique clients
        const clients = [
          ...new Set(
            response.data.cargoExitBrief.map((item) => item.user_name)
          ),
        ]
          .filter(Boolean)
          .sort();
        setAvailableClients(clients);
      }
    } catch (error) {
      console.error("Error fetching cargo exit data:", error);
      setCargoExitData([]);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Keep empty dependencies to prevent infinite loops caused by authHeader

  // Fetch cargo exit brief data (using the same endpoint as detailed for now)
  const fetchCargoExitBrief = useCallback(async (start, end) => {
    try {
      setLoading(true);
      const response = await Reporting.cargoExitReport(
        start,
        end,
        authHeader()
      );
      if (response && response.data.cargoExitBrief) {
        setCargoExitBrief(response.data.cargoExitBrief);
      }
    } catch (error) {
      console.error("Error fetching cargo exit brief:", error);
      setCargoExitBrief([]);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Keep empty dependencies to prevent infinite loops caused by authHeader

  // Load data when dates change
  useEffect(() => {
    if (startDate && endDate) {
      fetchCargoExitData(startDate, endDate);
      fetchCargoExitBrief(startDate, endDate);
      fetchDetailedCargoExitData(startDate, endDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]); // Intentionally excluding fetchCargoExitData, fetchCargoExitBrief to prevent infinite loops

  // Filter data by selected clients
  const filteredData = cargoExitData.filter((item) => {
    if (selectedClients.length === 0) return true;
    return selectedClients.includes(item.user_name);
  });

  const filteredDataDetailed = cargoExitDataDetailed.filter((item) => {
    if (selectedClients.length === 0) return true;
    return selectedClients.includes(item.user_name);
  });

  // Export to Excel
  const exportToExcel = () => {
    let dataToExport = [];
    let filename = "";

    switch (activeView) {
      case "brief":
        dataToExport = cargoExitBrief.map((item) => ({
          "Client Name": item.clientName,
          "Total Current Qty": item.totalCurrentQty,
          "Total Remaining": item.totalRemaining,
          "Count Arrival Notes": item.countArrivalNotes,
        }));
        filename = "cargo_exit_brief";
        break;
      case "detailed":
        dataToExport = filteredData.map((item) => ({          Reference: item.id,          Client: item.user_name,          Item: item.itemName,
          Date: item.date_time,          "Current Qty": item.current_qty,         Remaining: item.remaining,          Carrier: item.carrier,          "Reference No": item.reference,        }));
        filename = "cargo_exit_detailed";
        break;
      case "detailed-deferred":
        dataToExport = filteredDataDetailed.map((item) => ({
          Reference: item.id,
          Client: item.user_name,
          Item: item.itemName,
          Date: item.date_time,
          "Current Qty": item.current_qty,
          Remaining: item.remaining,
          Carrier: item.carrier,
          "Reference No": item.reference,
        }));
        filename = "cargo_exit_detailed_deferred";
        break;
      default:
        dataToExport = filteredData;
        filename = "cargo_exit_data";
    }

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(
      workbook,
      `${filename}_${new Date().toISOString().split("T")[0]}.xlsx`
    );
  };

  return (
    <>
      {/* Radio buttons and controls */}
      <Row className="mb-3 align-items-center  ">
        <Col md={3}>
          <Form>
            <div className="d-flex gap-3">
              <Form.Check
                type="radio"
                id="brief"
                name="cargoExitView"
                label="Brief"
                checked={activeView === "brief"}
                onChange={() => setActiveView("brief")}
              />
              {/* <Form.Check
                type="radio"
                id="summary"
                name="cargoExitView"
                label="Summary"
                checked={activeView === "summary"}
                onChange={() => setActiveView("summary")}
              /> */}
              <Form.Check
                type="radio"
                id="detailed"
                name="cargoExitView"
                label="Detailed"
                checked={activeView === "detailed"}
                onChange={() => setActiveView("detailed")}
              />
              <Form.Check
                type="radio"
                id="detailed-deferred"
                name="cargoExitView"
                label="Detailed deferred"
                checked={activeView === "detailed-deferred"}
                onChange={() => setActiveView("detailed-deferred")}
              />
            </div>
          </Form>
        </Col>

        <Col md={3}>
          <div className="d-flex gap-2 align-items-center"></div>
        </Col>

        <Col  className="text-end  ">
            <Row>
              <Col >
                    <button   className="btn btn-success btn-sm"            onClick={exportToExcel}            disabled={loading}          >            Export Excel          </button>
                        </Col>
              <Col >
              <small className="text-muted">
                Date Range: {startDate} - {endDate}
              </small>
              </Col>
            </Row>
         
        </Col>
      </Row>

      {/* Content based on active view */}
      <div ref={componentRef} className="DashboardPrintView">
        <LocalReportAddress
          reportTitle={`Cargo Exit Report - ${
            activeView.charAt(0).toUpperCase() + activeView.slice(1)
          } from ${startDate} to ${endDate}`}
        />

        {loading && (
          <div className="text-center p-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {!loading && activeView === "brief" && (
          <CargoExitBrief data={cargoExitBrief} />
        )}

        {!loading && activeView === "summary" && (
          <CargoExitSummary data={filteredData} />
        )}

        {!loading && activeView === "detailed" && (
          <CargoExitDetailed data={filteredDataDetailed} />
        )}

        {!loading && activeView === "detailed-deferred" && (
          <CargoExitDetailedDeferred data={filteredDataDetailed} />
        )}
      </div>
    </>
  );
};
