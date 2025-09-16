import React, { useRef, useState, useEffect, useCallback } from "react";
import { useColItemContext } from "../../Global/GlobalDataContentx";
import { TableOpen } from "../../Global/ListTable";
import TableHead from "../../Global/TableHead";
import {
  SmallSplitter,
  Splitter,
  SplitterOnPrint,
} from "../../globalcomponents/Splitter";
import {
  TitleSmallDesc,
  TitleSmallDescOnPrint,
} from "../../globalcomponents/TitleSmallDesc";
import CurrentDate from "../../Global/CurrentDate";
import ListToolBar, { SearchformAnimation } from "../../Global/ListToolBar";
import SearchBox from "../../Global/SearchBox";
import { useReactToPrint } from "react-to-print";
import { useContext } from "react";
import { DateRangeContext } from "../../globalcomponents/ButtonContext";
import { TitleAndList } from "../../globalcomponents/TitleAndList";
import { CargoExitReport } from "./CargoExitReport";
import { Col, Row } from "react-bootstrap";
import { Form, InputGroup } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Reporting from "../../services/StockServices/Reporting";
import { useAuthHeader } from "react-auth-kit";
import RevenueTable from "./RevenueTable";
import { Nav } from "react-bootstrap";
import useMonthlyReport from "../../Global/useMonthlyReport";
import StockRepository from "../../services/StockServices/StockRepository";
import InventoryBrief from "./InventoryBrief";
import * as XLSX from 'xlsx';
import InventorySummary from "./InventorySummary";
import InventoryDetailed from "./InventoryDetailed";
import { 
  CargoSearchBox, 
  CargoClientSelector, 
  useCargoFilters, 
  useClientSelection,
  convertKgToTons 
} from "./CargoFilters";

function BerthingRevenue({ invoiceReport }) {
  const { selectedItem } = useColItemContext(); // Get the selected item from the context
  const styles = {
    fontWeight: "bold",
    paddingTop: "0px",
    color: "#000",
    fontSize: "15px",
  };
  let totBerthing = 0.0;

  /* #region ---------ToolBar ----------------------- */
  const [searchHeight, setSearchHeight] = useState(0);
  const [height, setHeight] = useState(0);

  const { setStartDate, setendDate, startDate, endDate } =
    useContext(DateRangeContext);
  const getCommonSearchByDate = (date1, date2) => {
    setStartDate(date1);
    setendDate(date2);
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
  });
  /* #endregion */
  let totalBerthingAmount = 0,
    totWharfageAmount = 0;
  return (
    <>
      <TitleSmallDesc
        title={`Berthing  Report on ${CurrentDate.todaydate()} `}
        moreclass="showOnPrint"
      />
      <ListToolBar
        hideSaveBtn={true}
        height={height}
        entity="Arrival note"
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
      <div ref={componentRef} className="DashboardPrintView">
        <LocalReportAddress
          reportTitle={`Berthing Report from ${startDate} to ${endDate} `}
        />
        <span className="showOnPrint" style={{ display: "none" }}></span>
        <TableOpen>
          <TableHead>
            {/* <td>Berth Ref.No.</td> */}
            <td>Vessel Operator</td>
            <td>Vessel Name</td>
            <td>Vessel License Plate</td>
            <td>LOA</td>
            <td>Arrival Date/Time</td>
            <td>Exit Date/Time</td>
            <td>Destination</td>
            <td>Wharfage Charges</td>
            <td>Berthing Charges</td>
          </TableHead>
          <tbody>
            {invoiceReport &&
              invoiceReport.map((vessel) => {
                totBerthing += vessel.id;
                totalBerthingAmount += vessel.quayAmount;
                totWharfageAmount += vessel.handlingCharges;
                return (
                  <tr key={vessel.id}>
                    {/* <td>{vessel.id}</td> */}
                    <td>{vessel.owner_operator}</td>
                    <td>{vessel.name}</td>
                    <td>{vessel.plate_number}</td>
                    <td>{vessel.loa}</td>
                    <td>
                      {vessel.etd.includes("T")
                        ? vessel.etd.split("T")[0] +
                          " " +
                          vessel.etd.split("T")[1]
                        : vessel.etd}
                    </td>
                    <td>
                      {vessel.ata.includes("T")
                        ? vessel.ata.split("T")[0] +
                          " " +
                          vessel.ata.split("T")[1]
                        : vessel.ata}
                    </td>
                    <td>{vessel.loading_port}</td>
                    <td>{vessel.handlingCharges.toLocaleString()}</td>
                    <td>{vessel.quayAmount.toLocaleString()}</td>
                  </tr>
                );
              })}
            <td colSpan={5}>
              <SmallSplitter />
              <TitleAndList
                title="Summary"
                li1={
                  <>
                    {" "}
                    <h5 style={{ display: "inline" }}>
                      Total Berthing :{" "}
                      <span style={styles}>
                        RWF {totalBerthingAmount.toLocaleString()}{" "}
                      </span>{" "}
                    </h5>{" "}
                  </>
                }
                li2={
                  <>
                    {" "}
                    <h5 style={{ display: "inline" }}>
                      Total Wharfage :{" "}
                      <span style={styles}>
                        RWF {totWharfageAmount.toLocaleString()}{" "}
                      </span>{" "}
                    </h5>{" "}
                  </>
                }
              />
            </td>
            <td colspan={4}>
              <SmallSplitter />
              <h4>Tariff</h4>
              <table>
                <tr>
                  {" "}
                  <td>{"Wharfage (LOA <= 60m)"}</td>{" "}
                  <td>{"210,000	one time fee"}</td>
                </tr>
                <tr>
                  {" "}
                  <td>{"Wharfage (LOA > 60m)"}</td>{" "}
                  <td>{"630,000	one time fee"}</td>
                </tr>
                <tr>
                  {" "}
                  <td>{"Berthing (LOA <= 60m)"}</td>{" "}
                  <td>{"28,000	Per day. Grace period 3 days"}</td>
                </tr>
                <tr>
                  {" "}
                  <td>{"Berthing (LOA > 60m)"}</td>{" "}
                  <td> {"84,000	Per day. Grace period 3 days"}</td>
                </tr>
              </table>
            </td>
          </tbody>
        </TableOpen>
      </div>
    </>
  );
}
export default BerthingRevenue;

export const TrucksRevenue = ({ truckReport }) => {
  const styles = {
    fontWeight: "bold",
    paddingTop: "30px",
    fontSize: "15px",
  };
  let totalAmount = 0;

  /* #region ---------ToolBar ----------------------- */
  const [searchHeight, setSearchHeight] = useState(0);
  const [height, setHeight] = useState(0);
  const { setStartDate, setendDate, startDate, endDate } =
    useContext(DateRangeContext);
  const getCommonSearchByDate = (date1, date2) => {
    setStartDate(date1);
    setendDate(date2);
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
  });
  /* #endregion */

  return (
    <>
      <TitleSmallDesc
        title={`Trucks  Report on ${CurrentDate.todaydate()} `}
        moreclass="showOnPrint"
      />
      <ListToolBar
        hideSaveBtn={true}
        height={height}
        entity="Arrival note"
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
      <div ref={componentRef} className="DashboardPrintView">
        <LocalReportAddress
          reportTitle={`Trucks Report from ${startDate} to ${endDate} `}
        />
        <TableOpen>
          <TableHead>
            {/* <td>Gate Ref. No.</td> */}
            <td>Truck Driver</td>
            <td>Licence Plate Number</td>
            <td>Arrival Time</td>
            <td>Exit Time</td>
            <td>12-hour blocks</td>
            <td>Amount</td>
          </TableHead>
          <tbody>
            {truckReport.map((truck, i) => {
              const hasDigit = truck.driverName && /\d/.test(truck.driverName);
              const timeHasDigit =
                truck.get_out_time && /\d/.test(truck.get_out_time);
              let driverWrongval = hasDigit ? "NA" : truck.driverName;
              let outTimeWrongval = hasDigit ? "NA" : truck.get_out_time;
              totalAmount += truck.amount;
              return (
                <tr key={truck.id}>
                  {/* <td>{truck.id} </td> */}

                  <td>{driverWrongval}</td>
                  <td>{truck.licencePlateNumber}</td>
                  <td>{truck.entryTime && truck.entryTime.toLocaleString()}</td>
                  <td>
                    {truck.getOutTime &&
                      truck.getOutTime.split("T")[0] +
                        " " +
                        truck.getOutTime.split("T")[1]}
                  </td>
                  <td>{truck.totalDays + 1}</td>
                  <td>{truck.amount && truck.amount.toLocaleString()}</td>
                </tr>
              );
            })}
            <td colSpan={5}>
              <SmallSplitter />
              <TitleAndList
                title="Summary"
                li1={
                  <>
                    {" "}
                    <h5 style={{ display: "inline" }}>
                      Total Parking :{" "}
                      <span style={localStyle()}>
                        RWF {totalAmount.toLocaleString()}{" "}
                      </span>{" "}
                    </h5>{" "}
                  </>
                }
              />
            </td>
            <td colspan={4}>
              <SmallSplitter />
              <h4>Tariff</h4>
              <table>
                <tr>
                  {" "}
                  <td>{"Parking"}</td> <td>{"RWF 5000 per 12 hour block"}</td>
                </tr>
              </table>
            </td>
          </tbody>
        </TableOpen>
      </div>
    </>
  );
};

export function PaginationControls({ currentPage, totalPages, goToPage }) {
  const [buttonSet, setButtonSet] = useState(0); // 0 = first 10, 1 = next 10, etc.
  const buttonsPerSet = 10;
  const maxSet = Math.floor((totalPages - 1) / buttonsPerSet);

  // Calculate start and end page for current set
  const startPage = buttonSet * buttonsPerSet + 1;
  const endPage = Math.min(startPage + buttonsPerSet - 1, totalPages);

  // When currentPage changes, update buttonSet if needed
  React.useEffect(() => {
    const newSet = Math.floor((currentPage - 1) / buttonsPerSet);
    if (newSet !== buttonSet) setButtonSet(newSet);
  }, [currentPage, buttonSet]);

  return (
    <div style={{ marginTop: 16, textAlign: "center" }}>
      <button
        onClick={() => setButtonSet((s) => Math.max(s - 1, 0))}
        disabled={buttonSet === 0}
        style={{ marginRight: 8 }}
      >
        Prev
      </button>
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
        const page = startPage + i;
        return (
          <button
            key={page}
            onClick={() => goToPage(page)}
            style={{
              margin: "0 2px",
              fontWeight: page === currentPage ? "bold" : "normal",
              background: page === currentPage ? "#007bff" : undefined,
              color: page === currentPage ? "#fff" : undefined,
              borderRadius: 4,
              border: "1px solid #ccc",
              minWidth: 32,
            }}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={() => setButtonSet((s) => Math.min(s + 1, maxSet))}
        disabled={buttonSet === maxSet}
        style={{ marginLeft: 8 }}
      >
        Next
      </button>
    </div>
  );
}

export const CargoRevenue = ({ cargoAmountReport }) => {
  const authHeader = useAuthHeader();
  const styles = {
    fontWeight: "bold",
    paddingTop: "30px",
    fontSize: "15px",
  };
  let tally = 0.0,
    tallyIn = 0.0,
    tallyOut = 0.0,
    amount = 0;
  let toWarehouseAmount = 0,
    totalOutWarehouse = 0;

  /* #region ---------ToolBar ----------------------- */
  const [searchHeight, setSearchHeight] = useState(0);
  const [height, setHeight] = useState(0);
  const { setStartDate, setendDate, startDate, endDate } =
    useContext(DateRangeContext);

  // Function to set date range to today's date
  const setCurrentYearDateRange = () => {
    const todayDate = CurrentDate.todaydate();
    setStartDate(todayDate);
    setendDate(todayDate);
  };

  // Add monthly report hook with new optimized version
  const {
    monthlyData,
    loading: monthlyLoading,
    error: monthlyError,
    refreshMonthlyReport,
    isDataStale,
  } = useMonthlyReport();

  // Use custom hooks for filter management
  const {
    filteredTally,
    filteredTallyIn,
    filteredTallyOut,
    handleGoodsFilter,
    handleTonnageFilter,
    applyCargoClientFilter,
  } = useCargoFilters(cargoAmountReport);

  const {
    selectedCargoClients,
    availableCargoClients,
    handleCargoClientToggle,
    handleSelectAllCargo,
    handleClearAllCargo,
  } = useClientSelection(cargoAmountReport);

  /* #region ---------------------PAGINATIONS ---------------------- */
  const [tallyPage, setTallyPage] = useState(1);
  const [tallyInPage, setTallyInPage] = useState(1);
  const [tallyOutPage, setTallyOutPage] = useState(1);
  const recordsPerPage = 10;

  // 2. Calculate filtered data and total pages for each list (with client filtering applied)
  const finalFilteredTally = React.useMemo(() => 
    applyCargoClientFilter(filteredTally, 'clientName', selectedCargoClients), 
    [filteredTally, applyCargoClientFilter, selectedCargoClients]
  );
  const finalFilteredTallyIn = React.useMemo(() => 
    applyCargoClientFilter(filteredTallyIn, 'user_name', selectedCargoClients), 
    [filteredTallyIn, applyCargoClientFilter, selectedCargoClients]
  );
  const finalFilteredTallyOut = React.useMemo(() => 
    applyCargoClientFilter(filteredTallyOut, 'user_name', selectedCargoClients), 
    [filteredTallyOut, applyCargoClientFilter, selectedCargoClients]
  );
  
  const tallyTotalPages = Math.ceil(finalFilteredTally.length / recordsPerPage);
  const tallyInTotalPages = Math.ceil(finalFilteredTallyIn.length / recordsPerPage);
  const tallyOutTotalPages = Math.ceil(
    finalFilteredTallyOut.length / recordsPerPage
  );

  // 3. Slice data for current page (using client-filtered data)
  const tallyPageData = finalFilteredTally.slice(
    (tallyPage - 1) * recordsPerPage,
    tallyPage * recordsPerPage
  );
  const tallyInPageData = finalFilteredTallyIn.slice(
    (tallyInPage - 1) * recordsPerPage,
    tallyInPage * recordsPerPage
  );
  const tallyOutPageData = finalFilteredTallyOut.slice(
    (tallyOutPage - 1) * recordsPerPage,
    tallyOutPage * recordsPerPage
  );

  /* #endregion */

  const [activeTab, setActiveTab] = useState("cargo-report");
  const [inventoryView, setInventoryView] = useState("brief");
  const [showClientFilters, setShowClientFilters] = useState(false);
  const [selectedClients, setSelectedClients] = useState([]);
  const [availableClients, setAvailableClients] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);

  // Excel export function
  const exportToExcel = (data, filename) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, `${filename}_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const getCommonSearchByDate = (date1, date2) => {
    setStartDate(date1);
    setendDate(date2);
  };

  const fetchInventoryData = useCallback(async () => {
    try {
      console.log("Starting inventory data fetch...");
      const response = await StockRepository.inventoryReport(authHeader());
      console.log("Raw inventory response:", response);

      // Check if response exists and has data property
      if (response && response.data) {
        console.log("Response data structure:", response.data);
        // If the data is directly the array, use it
        if (Array.isArray(response.data)) {
          console.log("Data is direct array, length:", response.data.length);
          setInventoryData(response.data);
        }
        // If the data has allCargoByClient property, use that
        else if (response.data.allCargoByClient) {
          console.log(
            "Data has allCargoByClient, length:",
            response.data.allCargoByClient.length
          );
          setInventoryData(response.data.allCargoByClient);
        }
        // If neither, set empty array
        else {
          console.warn("Unexpected inventory data structure:", response.data);
          setInventoryData([]);
        }
      } else {
        console.warn("No data received from inventory report");
        setInventoryData([]);
      }
    } catch (error) {
      console.error("Error fetching inventory data:", error);
      setInventoryData([]);
    }
  }, [authHeader]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
  });
  /* #endregion */

  // Fetch inventory data when tab changes
  useEffect(() => {
    console.log("Tab changed to:", activeTab);
    if (activeTab === "inventory") {
      console.log("Fetching inventory data...");
      fetchInventoryData();
    }
  }, [activeTab]);

  // Extract available clients when inventory data changes
  useEffect(() => {
    if (inventoryData.length > 0) {
      const clients = [...new Set(inventoryData.map(record => record.name))].sort();
      setAvailableClients(clients);
    }
  }, [inventoryData]);
  
  const [grandTotalState, setGrandTotalState] = useState(0);
  
  // Calculate grand total whenever filtered data changes
  useEffect(() => {
    const tallyTotal = finalFilteredTally.reduce((total, record) => {
      return total + (Number(record.invoiceAmount) || 0);
    }, 0);
    
    const tallyInTotal = finalFilteredTallyIn.reduce((total, record) => {
      return total + (Number(record.invoiceAmount) || 0);
    }, 0);
    
    const tallyOutTotal = finalFilteredTallyOut.reduce((total, record) => {
      return total + (Number(record.amount_paid) || 0);
    }, 0);
    
    setGrandTotalState(tallyTotal + tallyInTotal + tallyOutTotal);
  }, [finalFilteredTally, finalFilteredTallyIn, finalFilteredTallyOut]);

  const sumFilteredTallyWeight = () => {
    return finalFilteredTally.reduce((total, record) => {
      // If cargoAssorted is truthy and not "Not Assorted", use record.weight, else use record.weight * record.purchased_qty
      if (record.cargoAssorted && record.cargoAssorted === "Assorted") {
        return total + (Number(record.weight) || 0);
      } else {
        return (
          total + (Number(record.weight) || 0) * (Number(record.unit) || 1)
        );
      }
    }, 0);
  };
  const sumPruchases = () => {
    return finalFilteredTallyIn.reduce((total, record) => {
      if (record.cargoAssorted && record.cargoAssorted === "Assorted") {
        return total + (Number(record.weight) || 0);
      } else {
        return (
          total +
          (Number(record.weight) || 0) * (Number(record.purchased_qty) || 1)
        );
      }
    }, 0);
  };
  const sumSaless = () => {
    return finalFilteredTallyOut.reduce((total, record) => {
      return total + (Number(record.weight) || 0);
    }, 0);
  };
  const summarizedcargoReport = () => {
    return <h2>Quick Overview</h2>;
  };

  const detailedCargoReport = () => (
    <div ref={componentRef} className="DashboardPrintView">
      <LocalReportAddress
        reportTitle={`Cargo Report from ${startDate} to ${endDate} `}
        leftAddress="MAGERWA"
      />
      <Row>
        <Col md={2}>
          Transhipment:{" "}
          <strong>{sumFilteredTallyWeight().toLocaleString()} KG</strong>{" "}
        </Col>
        <Col md={2}>
          Cargo To W/H: <strong>{sumPruchases().toLocaleString()}</strong> KG
        </Col>
        <Col md={2}>
          Cargo From W/H: <strong>{sumSaless().toLocaleString()}</strong> KG
        </Col>
        <Col md={2} style={{backgroundColor:'#d6ffd6'}}>
          RWF <strong> {grandTotalState.toLocaleString()}</strong>{" "}
        </Col>
        {/* <Col className="text-end"><p className="m-0 p-0" style={{fontSize:'12px'}}>Date Range <span style={{color:"#6e3000"}}> { startDate} - {endDate}</span></p></Col> */}
      </Row>
      <TableOpen>
        <TableHead>
          <td>Ref. No.</td>
          <td>Cargo Owner</td>
          <td>Cargo </td>
          <td>Movement </td>
          <td>Entry Date</td>
          <td>Exit Date</td>
          <td>Total Weight (KG)</td>
          <td>Import/Export</td>
          <td>Number Of Days</td>
          <td>Handling Fees</td>
          <td>Storage Amount</td>
        </TableHead>
        <tbody>
          {tallyPageData.map((record) => {
            tally +=
              "Assorted" === record.cargoAssorted
                ? record.weight
                : record.weight * record.unit;
            amount += record.invoiceAmount;
            return (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.clientName} </td>
                <td>{record.cargo}</td>
                <td>{record.destinationName}</td>
                <td>
                  {record.entry_date &&
                    record.entry_date.split("T")[0] +
                      " " +
                      record.entry_date.split("T")[1]}
                </td>
                <td>
                  {record.invDate &&
                    record.invDate.split("T")[0] +
                      " " +
                      record.invDate.split("T")[1]}
                </td>
                <td>
                  {"Assorted" !== record.cargoAssorted
                    ? (record.weight * record.unit).toLocaleString()
                    : record.weight.toLocaleString()}{" "}
                </td>
                <td>
                  {record.tarifftype
                    ? "1" === record.tarifftype
                      ? "Export"
                      : "Import"
                    : "NA"}{" "}
                </td>
                <td>0 </td>
                <td>
                  RWF{" "}
                  {record.invoiceAmount &&
                    record.invoiceAmount.toLocaleString()}{" "}
                </td>
                <td>N/A </td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={6}>
              <p style={styles}>Total Tonnage (transhipments): </p>
            </td>
            <td colspan={2}>
              <p style={styles}>
                {tally.toLocaleString()} /{" "}
                <span style={{ color: "green" }}>
                  {sumFilteredTallyWeight().toLocaleString()} KG
                </span>{" "}
              </p>
            </td>
            <td colSpan={4}>
              <p style={styles}>Total Amount RWF {amount.toLocaleString()} </p>
            </td>
          </tr>
          {/* Pagination */}
          <tr>
            <td colspan={12}>
              <PaginationControls
                currentPage={tallyPage}
                totalPages={tallyTotalPages}
                goToPage={setTallyPage}
              />
            </td>
          </tr>
          {tallyInPageData.map((record) => {
            tallyIn +=
              "Assorted" === record.cargoAssorted
                ? record.weight
                : record.weight * record.purchased_qty;
            toWarehouseAmount += Number(record.invoiceAmount);
            return (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.user_name}</td>
                <td>{record.itemName}</td>
                <td>{record.destName}</td>
                <td>{record.date_time}</td>
                <td>{record.invDate}</td>
                <td>
                  {"Assorted" === record.cargoAssorted
                    ? record.weight.toLocaleString()
                    : (record.weight * record.purchased_qty).toLocaleString()}
                </td>
                <td>{"1" === record.importExport ? "Export" : "Import"}</td>
                <td>0</td>
                <td>{record.invoiceAmount.toLocaleString()}</td>
                <td>N/A </td>
              </tr>
            );
          })}

          <tr>
            <td colSpan={6}>
              <p style={styles}>Total Tonnage Moved To the Warehouse: </p>
            </td>
            <td colspan={2}>
              {" "}
              <p style={styles}>{tallyIn.toLocaleString()} KG</p>{" "}
            </td>
            <td colSpan={3}>
              <p style={styles}>
                {" "}
                Total Amount: RWF {toWarehouseAmount.toLocaleString()}{" "}
              </p>
            </td>
          </tr>
          <tr>
            <td colspan={12}>
              <PaginationControls
                currentPage={tallyInPage}
                totalPages={tallyInTotalPages}
                goToPage={setTallyInPage}
              />
            </td>
          </tr>
          {tallyOutPageData.map((record) => {
            tallyOut += record.weight;
            totalOutWarehouse += record.amount_paid;
            return (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.user_name}</td>
                <td>{record.itemName}</td>
                <td>Warehouse Truck</td>
                <td>{record.date_time}</td>
                <td>{endDate}</td>
                <td>{record.weight.toLocaleString()}</td>
                <td>Import</td>
                <td>15 </td>
                <td>N/A</td>
                <td>RWF{record.amount_paid.toLocaleString()}</td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={6}>
              {" "}
              <p style={styles}> Tonnage Moved from the warehouse: </p>
            </td>
            <td colSpan={2}>
              <p style={styles}> {tallyOut.toLocaleString()} KG</p>
            </td>
            <td colSpan={3}>
              <p style={styles}>
                {" "}
                Amount: RWF {totalOutWarehouse.toLocaleString()}{" "}
              </p>
            </td>
          </tr>

          <tr>
            <td colSpan={12}>
              <PaginationControls
                currentPage={tallyOutPage}
                totalPages={tallyOutTotalPages}
                goToPage={setTallyOutPage}
              />
            </td>
          </tr>
          <tr>
            <td colspan={6}>
              <Splitter />
              <h4>Tariff</h4>
              <table>
                <tr>
                  <td>Tariff</td>
                  <td>RWF</td>
                  <td>Comments</td>
                </tr>
                <tr>
                  {" "}
                  <td>{"Storage"}</td> <td>{"0"}</td>
                  <td>{"day 1 up to 14"}</td>
                </tr>
                <tr>
                  {" "}
                  <td>{"Storage)"}</td> <td>{"0.6"}</td>
                  <td>{"Per day per kg from day 15 - day 30"}</td>
                </tr>
                <tr>
                  {" "}
                  <td>{"Storage"}</td> <td>{"1.2"}</td>
                  <td>{"Per day per kg from day 31 onwards"}</td>
                </tr>
                <tr>
                  {" "}
                  <td>{"Handling"}</td> <td>{"2.0"}</td>
                  <td>{"Per kg. For cargo imported."}</td>
                </tr>
                <tr>
                  {" "}
                  <td>{"Handling"}</td> <td>{"0.4"}</td>
                  <td>{"Per kg. For cargo made locally."}</td>
                </tr>
              </table>
            </td>
          </tr>
        </tbody>
      </TableOpen>
    </div>
  );

  // State to toggle between table and summary view
  const [showTable, setShowTable] = useState(false);

  // Add animation style to the document head if not already present for current month highlighting
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !document.getElementById("current-month-anim-style")
    ) {
      const style = document.createElement("style");
      style.id = "current-month-anim-style";
      style.innerHTML = `
        .current-month-anim {
          animation: highlightRow 1.5s ease-in-out;
          transition: background 0.5s;
        }
        @keyframes highlightRow {
          0% { background-color: #fff; }
          40% { background-color: #d6ffd6; }
          100% { background-color: #d6ffd6; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const SummarizedDataTable = () => {
    const lighterRed = { backgroundColor: "#ffeaea" };
    const lightGreen = { backgroundColor: "#d6ffd6" };
    const now = new Date();
    const currentMonthName = now.toLocaleString("default", { month: "long" });
    const currentMonthAnimClass = "current-month-anim";

    function normalizeMonthName(name) {
      if (!name) return "";
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }

    // Show loading state if data is being fetched
    if (monthlyLoading) {
      return (
        <TableOpen>
          <TableHead>
            <td>Year</td>
            <td>Month</td>
            <td>Top Cargo</td>
            <td>Top Client</td>
            <td>Total Arrival Notes</td>
            <td>Transhipment</td>
            <td>Cargo In</td>
            <td>Cargo Out</td>
            <td>Handling Fees</td>
            <td>Storage Fees</td>
          </TableHead>
          <tbody>
            <tr>
              <td colSpan={10} style={{ textAlign: "center", padding: "20px" }}>
                Loading monthly data...
              </td>
            </tr>
          </tbody>
        </TableOpen>
      );
    }

    // Show error state if there's an error
    if (monthlyError) {
      return (
        <TableOpen>
          <TableHead>
            <td>Year</td>
            <td>Month</td>
            <td>Top Cargo</td>
            <td>Top Client</td>
            <td>Total Arrival Notes</td>
            <td>Transhipment</td>
            <td>Cargo In</td>
            <td>Cargo Out</td>
            <td>Handling Fees</td>
            <td>Storage Fees</td>
          </TableHead>
          <tbody>
            <tr>
              <td
                colSpan={10}
                style={{ textAlign: "center", padding: "20px", color: "red" }}
              >
                Error loading monthly data: {monthlyError.message}
              </td>
            </tr>
          </tbody>
        </TableOpen>
      );
    }

    return (
      <TableOpen noStripe={true}>
        <TableHead>
          <td>Year</td>
          <td>Month</td>
          <td>Top Cargo</td>
          <td>Top Client</td>
          <td>Total Arrival Notes</td>
          <td>Transhipment</td>
          <td>Cargo In</td>
          <td>Cargo Out</td>
          <td>Handling Amount</td>
          <td>Storage Fees</td>
        </TableHead>
        <tbody>
          {monthlyData.length === 0 ? (
            <tr>
              <td colSpan={10} style={{ textAlign: "center", padding: "20px" }}>
                No monthly data available for the selected date range (
                {startDate || "N/A"} to {endDate || "N/A"})
              </td>
            </tr>
          ) : (
            <>
              {monthlyData.map((row, idx) => {
                const isCurrentMonth =
                  normalizeMonthName(row.month) ===
                  normalizeMonthName(currentMonthName);
                const cargoIn = parseFloat(row.weightIn) || 0;
                const cargoOut = parseFloat(row.weightOut) || 0;
                const transWght = parseFloat(row.transWght) || 0;
                const totalArrivalNotes = parseInt(row.totalArrivalNotes) || 0;
                const purchaseAmount =
                  parseFloat(row.totalPurchaseInvoiceAmount) || 0;
                const salesAmount =
                  parseFloat(row.totalSalesInvoiceAmount) || 0;

                return (
                  <tr
                    key={idx}
                    className={isCurrentMonth ? currentMonthAnimClass : ""}
                    style={isCurrentMonth ? lightGreen : {}}
                  >
                    <td>{row.year}</td>
                    <td style={{ verticalAlign: "middle" }}>
                      <span>{row.month}</span>
                    </td>
                    <td>{row.repeatedIn || "N/A"}</td>
                    <td>{row.featuredClient || "N/A"}</td>
                    <td
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color:
                          totalArrivalNotes > 50
                            ? "#28a745"
                            : totalArrivalNotes > 20
                            ? "#ffc107"
                            : "#dc3545",
                      }}
                    >
                      {totalArrivalNotes.toLocaleString()}
                    </td>
                    <td style={transWght < 10000 ? lighterRed : {}}>
                      {transWght.toLocaleString()}{" "}
                      <span style={{ fontSize: "0.8em" }}>KG</span>
                    </td>
                    <td style={cargoIn < 10000 ? lighterRed : {}}>
                      {cargoIn.toLocaleString()}{" "}
                      <span style={{ fontSize: "0.8em" }}>KG</span>
                    </td>
                    <td style={cargoOut < 10000 ? lighterRed : {}}>
                      {cargoOut.toLocaleString()}{" "}
                      <span style={{ fontSize: "0.8em" }}>KG</span>
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        fontWeight: "bold",
                        color: purchaseAmount > 0 ? "#28a745" : "#6c757d",
                        fontSize: "0.9em",
                      }}
                    >
                      RWF {purchaseAmount.toLocaleString()}
                    </td>
                    <td                      style={{                        textAlign: "right",                        fontWeight: "bold",                        color: salesAmount > 0 ? "#007bff" : "#6c757d",                        fontSize: "0.9em",                      }}
                    >
                      RWF {salesAmount.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
              {/* Totals Row */}
              {monthlyData.length > 0 &&
                (() => {
                  const totals = monthlyData.reduce(
                    (acc, row) => {
                      const cargoIn = parseFloat(row.weightIn) || 0;
                      const cargoOut = parseFloat(row.weightOut) || 0;
                      const transWght = parseFloat(row.transWght) || 0;
                      const totalArrivalNotes =
                        parseInt(row.totalArrivalNotes) || 0;
                      const purchaseAmount =
                        parseFloat(row.totalPurchaseInvoiceAmount) || 0;
                      const salesAmount =
                        parseFloat(row.totalSalesInvoiceAmount) || 0;

                      acc.totalTransshipment += transWght;
                      acc.totalCargoIn += cargoIn;
                      acc.totalCargoOut += cargoOut;
                      acc.totalArrivalNotes += totalArrivalNotes;
                      acc.totalPurchaseAmount += purchaseAmount;
                      acc.totalSalesAmount += salesAmount;

                      return acc;
                    },
                    {
                      totalTransshipment: 0,
                      totalCargoIn: 0,
                      totalCargoOut: 0,
                      totalArrivalNotes: 0,
                      totalPurchaseAmount: 0,
                      totalSalesAmount: 0,
                    }
                  );

                  return (
                    <tr
                      style={{
                        backgroundColor: "#f8f9fa",
                        borderTop: "2px solid #007bff",
                        fontWeight: "bold",
                      }}
                    >
                      <td
                        style={{
                          fontWeight: "bold",
                          color: "#007bff",
                          fontSize: "0.9em",
                        }}
                      >
                        TOTALS
                      </td>
                      <td
                        style={{
                          fontWeight: "bold",
                          color: "#007bff",
                          fontSize: "0.9em",
                        }}
                      >
                        -
                      </td>
                      <td
                        style={{
                          fontWeight: "bold",
                          color: "#007bff",
                          fontSize: "0.9em",
                        }}
                      >
                        -
                      </td>
                      <td
                        style={{
                          fontWeight: "bold",
                          color: "#007bff",
                          fontSize: "0.9em",
                        }}
                      >
                        -
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          color: "#000",
                          backgroundColor: "#e3f2fd",
                        }}
                      >
                        {totals.totalArrivalNotes.toLocaleString()}
                      </td>
                      <td
                        style={{
                          fontWeight: "bold",
                          color: "#000",
                          backgroundColor: "#e3f2fd",
                        }}
                      >
                        {totals.totalTransshipment.toLocaleString()}{" "}
                        <span style={{ fontSize: "0.8em" }}>KG</span>
                      </td>
                      <td
                        style={{
                          fontWeight: "bold",
                          color: "#000",
                          backgroundColor: "#e8f5e8",
                        }}
                      >
                        {totals.totalCargoIn.toLocaleString()}{" "}
                        <span style={{ fontSize: "0.8em" }}>KG</span>
                      </td>
                      <td
                        style={{
                          fontWeight: "bold",
                          color: "#000",
                          backgroundColor: "#fff3e0",
                        }}
                      >
                        {totals.totalCargoOut.toLocaleString()}{" "}
                        <span style={{ fontSize: "0.8em" }}>KG</span>
                      </td>
                      <td
                        style={{
                          textAlign: "right",                         fontWeight: "bold",                          color: "#000",                          backgroundColor: "#e8f5e8",                          fontSize: "0.9em",
                        }}
                      >
                        RWF {totals.totalPurchaseAmount.toLocaleString()}
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          fontWeight: "bold",
                          color: "#000",
                          backgroundColor: "#e3f2fd",
                          fontSize: "0.9em",
                        }}
                      >
                        RWF {totals.totalSalesAmount.toLocaleString()}
                      </td>
                    </tr>
                  );
                })()}
              {/* OPS Row - Handling Fees + Storage Fees */}
              {monthlyData.length > 0 && (() => {
                const opsTotal = monthlyData.reduce((acc, row) => {
                  const purchaseAmount = parseFloat(row.totalPurchaseInvoiceAmount) || 0;
                  const salesAmount = parseFloat(row.totalSalesInvoiceAmount) || 0;
                  
                  acc.totalOpsAmount += purchaseAmount + salesAmount;
                  
                  return acc;
                }, {
                  totalOpsAmount: 0
                });

                return (
                  <tr style={{ 
                    backgroundColor: '#fff3e0', 
                    borderTop: '1px solid #ffa726',
                    fontWeight: 'bold'
                  }}>
                    <td style={{ 
                      fontWeight: 'bold', 
                      color: '#e65100',
                      fontSize: '0.9em'
                    }}>
                   GRAND TOTAL   OPS
                    </td>
                    <td style={{ 
                      fontWeight: 'bold', 
                      color: '#e65100',
                      fontSize: '0.9em'
                    }}>
                      -
                    </td>
                    <td style={{ 
                      fontWeight: 'bold', 
                      color: '#e65100',
                      fontSize: '0.9em'
                    }}>
                      -
                    </td>
                    <td style={{ 
                      fontWeight: 'bold', 
                      color: '#e65100',
                      fontSize: '0.9em'
                    }}>
                      -
                    </td>
                    <td style={{ 
                      fontWeight: 'bold', 
                      color: '#e65100',
                      fontSize: '0.9em'
                    }}>
                      -
                    </td>
                    <td style={{ 
                      fontWeight: 'bold', 
                      color: '#e65100',
                      fontSize: '0.9em'
                    }}>
                      -
                    </td>
                    <td style={{ 
                      fontWeight: 'bold', 
                      color: '#e65100',
                      fontSize: '0.9em'
                    }}>
                      -
                    </td>
                    <td style={{ 
                      fontWeight: 'bold', 
                      color: '#e65100',
                      fontSize: '0.9em'
                    }}>
                      -
                    </td>
                    <td colSpan={2} style={{ 
                      textAlign: 'center', 
                      fontWeight: 'bold',
                      color: '#000',
                      backgroundColor: '#ffcc80',
                      fontSize: '1.0em'
                    }}>
                      RWF {opsTotal.totalOpsAmount.toLocaleString()}
                    </td>
                  </tr>
                );
              })()}
            </>
          )}
        </tbody>
      </TableOpen>
    );
  };
  // Simple table with only month, transhipment, cargo in, cargo out
  function BriefMonthTable() {
    const lighterRed = { backgroundColor: "#ffeaea" };
    const lightGreen = { backgroundColor: "#d6ffd6" };
    const now = new Date();
    const currentMonthName = now.toLocaleString("default", { month: "long" });
    const currentMonthAnimClass = "current-month-anim";

    function normalizeMonthName(name) {
      if (!name) return "";
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }

    // Show loading state if data is being fetched
    if (monthlyLoading) {
      return (
        <TableOpen>
          <TableHead>
            <td>Month</td>
            <td>Transhipment</td>
            <td>Cargo In</td>
            <td>Cargo Out</td>
          </TableHead>
          <tbody>
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: "20px" }}>
                Loading monthly data...
              </td>
            </tr>
          </tbody>
        </TableOpen>
      );
    }

    // Show error state if there's an error
    if (monthlyError) {
      return (
        <TableOpen>
          <TableHead>
            <td>Month</td>
            <td>Transhipment</td>
            <td>Cargo In</td>
            <td>Cargo Out</td>
          </TableHead>
          <tbody>
            <tr>
              <td
                colSpan={4}
                style={{ textAlign: "center", padding: "20px", color: "red" }}
              >
                Error loading monthly data: {monthlyError.message}
              </td>
            </tr>
          </tbody>
        </TableOpen>
      );
    }

    // Calculate column totals
    const totals = monthlyData.reduce(
      (acc, row) => {
        const cargoIn = parseFloat(row.weightIn) || 0;
        const cargoOut = parseFloat(row.weightOut) || 0;
        const transWght = parseFloat(row.transWght) || 0;

        acc.totalTransshipment += transWght;
        acc.totalCargoIn += cargoIn;
        acc.totalCargoOut += cargoOut;

        return acc;
      },
      {
        totalTransshipment: 0,
        totalCargoIn: 0,
        totalCargoOut: 0,
      }
    );

    return (
      <>
        <TableOpen>
          <TableHead>
            <td>Month</td>
            <td>Transhipment</td>
            <td>Cargo In</td>
            <td>Cargo Out</td>
          </TableHead>
          <tbody>
            {monthlyData.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No monthly data available for the selected date range (
                  {startDate || "N/A"} to {endDate || "N/A"})
                </td>
              </tr>
            ) : (
              <>
                {monthlyData.map((row, idx) => {
                  const isCurrentMonth =
                    normalizeMonthName(row.month) ===
                    normalizeMonthName(currentMonthName);
                  const cargoIn = parseFloat(row.weightIn) || 0;
                  const cargoOut = parseFloat(row.weightOut) || 0;
                  const transWght = parseFloat(row.transWght) || 0;

                  return (
                    <tr
                      key={idx}
                      className={isCurrentMonth ? currentMonthAnimClass : ""}
                      style={isCurrentMonth ? lightGreen : {}}
                    >
                      <td style={{ verticalAlign: "middle" }}>
                        <span>{row.month}</span>
                        {row.year && (
                          <span
                            className="badge bg-primary ms-2"
                            style={{
                              fontSize: "0.65em",
                              verticalAlign: "middle",
                            }}
                          >
                            {row.year}
                          </span>
                        )}
                      </td>
                      <td style={transWght < 10000 ? lighterRed : {}}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            flexWrap: "wrap",
                          }}
                        >
                          <div>
                            {transWght.toLocaleString()}{" "}
                            <span style={{ fontSize: "0.8em" }}>KG</span>
                          </div>
                        </div>
                      </td>
                      <td style={cargoIn < 10000 ? lighterRed : {}}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            flexWrap: "wrap",
                          }}
                        >
                          <div>
                            {cargoIn.toLocaleString()}{" "}
                            <span style={{ fontSize: "0.8em" }}>KG</span>
                          </div>
                          {row.repeatedIn && (
                            <span
                              className="badge"
                              style={{
                                fontSize: "0.75em",
                                backgroundColor: "#28a745",
                                color: "white",
                                maxWidth: "80px",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                display: "inline-block",
                              }}
                              title={`Most frequent in: ${row.repeatedIn}`}
                            >
                              📈{" "}
                              {row.repeatedIn.length > 8
                                ? row.repeatedIn.substring(0, 8) + "..."
                                : row.repeatedIn}
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={cargoOut < 10000 ? lighterRed : {}}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            flexWrap: "wrap",
                          }}
                        >
                          <div>
                            {cargoOut.toLocaleString()}{" "}
                            <span style={{ fontSize: "0.8em" }}>KG</span>
                          </div>
                          {row.repeatedOut && (
                            <span
                              className="badge"
                              style={{
                                fontSize: "0.75em",
                                backgroundColor: "#0c5171ff",
                                color: "white",
                                maxWidth: "80px",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                display: "inline-block",
                              }}
                              title={`Most frequent out: ${row.repeatedOut}`}
                            >
                              📉{" "}
                              {row.repeatedOut.length > 8
                                ? row.repeatedOut.substring(0, 8) + "..."
                                : row.repeatedOut}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {/* Totals Row */}
                <tr
                  style={{
                    backgroundColor: "#f8f9fa",
                    borderTop: "2px solid #007bff",
                    fontWeight: "bold",
                  }}
                >
                  <td
                    style={{
                      fontWeight: "bold",
                      color: "#007bff",
                      fontSize: "0.9em",
                    }}
                  >
                    TOTALS
                  </td>
                  <td
                    style={{
                      fontWeight: "bold",
                      color: "#000",
                      backgroundColor: "#e3f2fd",
                    }}
                  >
                    {totals.totalTransshipment.toLocaleString()}{" "}
                    <span style={{ fontSize: "0.8em" }}>KG</span>
                  </td>
                  <td
                    style={{
                      fontWeight: "bold",
                      color: "#000",
                      backgroundColor: "#e8f5e8",
                    }}
                  >
                    {totals.totalCargoIn.toLocaleString()}{" "}
                    <span style={{ fontSize: "0.8em" }}>KG</span>
                  </td>
                  <td
                    style={{
                      fontWeight: "bold",
                      color: "#000",
                      backgroundColor: "#fff3e0",
                    }}
                  >
                    {totals.totalCargoOut.toLocaleString()}{" "}
                    <span style={{ fontSize: "0.8em" }}>KG</span>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </TableOpen>
      </>
    );
  }

  // Radio button state: 'full', 'simple', 'detailed'
  const [cargoView, setCargoView] = useState("simple");

  function CargoRadioSwitcher() {
    return (
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <label style={{ marginRight: 16 }}>
            <input
              type="radio"
              name="cargoView"
              value="simple"
              checked={cargoView === "simple"}
              onChange={() => setCargoView("simple")}
            />{" "}
            Brief
          </label>
          <label style={{ marginRight: 16 }}>
            <input
              type="radio"
              name="cargoView"
              value="full"
              checked={cargoView === "full"}
              onChange={() => setCargoView("full")}
            />{" "}
            Summarized
          </label>
          <label>
            <input
              type="radio"
              name="cargoView"
              value="detailed"
              checked={cargoView === "detailed"}
              onChange={() => setCargoView("detailed")}
            />{" "}
            Detailed
          </label>
        </div>

        {/* Refresh button and date range */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Show data staleness warning only for simple view */}
          {cargoView === "simple" && isDataStale && (
            <span
              style={{
                color: "#ff6b35",
                fontSize: "0.9em",
                fontStyle: "italic",
              }}
            >
              ⚠️ Data may be outdated
            </span>
          )}
          {/* Show refresh button only for simple view */}
          {cargoView === "simple" && (
            <button
              onClick={() => refreshMonthlyReport(startDate, endDate)}
              disabled={monthlyLoading}
              style={{
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "6px 12px",
                fontSize: "0.8em",
                cursor: monthlyLoading ? "not-allowed" : "pointer",
                opacity: monthlyLoading ? 0.6 : 1,
              }}
            >
              {monthlyLoading ? "⟳ Refreshing..." : "🔄 Refresh Data"}
            </button>
          )}
           {/* Checkbox to show/hide client filters for detailed view */}
          {cargoView === "detailed" && (
            <label style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "4px",
              fontSize: "0.9em",
              cursor: "pointer"
            }}>
              <input className="btn"
                type="checkbox"
                checked={showClientFilters}
                onChange={(e) => setShowClientFilters(e.target.checked)}
                style={{ marginRight: "4px" }}
              />
              Show  Filters
            </label>
          )}
          {/* Excel download button for detailed view */}
          {cargoView === "detailed" && (
            <button
              onClick={() => {
                const detailedData = [
                  ...finalFilteredTally.map(record => ({
                    refNo: record.id,
                    cargoOwner: record.clientName,
                    cargo: record.cargo,
                    movement: record.destinationName,
                    entryDate: record.entry_date,
                    exitDate: record.invDate,
                    totalWeight: record.cargoAssorted === "Assorted" ? record.weight : record.weight * record.unit,
                    importExport: record.tarifftype === "1" ? "Export" : "Import",
                    handlingFees: record.invoiceAmount,
                    type: "Transhipment"
                  })),
                  ...finalFilteredTallyIn.map(record => ({
                    refNo: record.id,
                    cargoOwner: record.user_name,
                    cargo: record.itemName,
                    movement: record.destName,
                    entryDate: record.date_time,
                    exitDate: record.invDate,
                    totalWeight: record.cargoAssorted === "Assorted" ? record.weight : record.weight * record.purchased_qty,
                    importExport: record.importExport === "1" ? "Export" : "Import",
                    handlingFees: record.invoiceAmount,
                    type: "To Warehouse"
                  })),
                  ...finalFilteredTallyOut.map(record => ({
                    refNo: record.id,
                    cargoOwner: record.user_name,
                    cargo: record.itemName,
                    movement: "Warehouse Truck",
                    entryDate: record.date_time,
                    exitDate: endDate,
                    totalWeight: record.weight,
                    importExport: "Import",
                    handlingFees: record.amount_paid,
                    type: "From Warehouse"
                  }))
                ];
                
                if (detailedData.length > 0) {
                  exportToExcel(detailedData, 'Detailed_Cargo_Report');
                } else {
                  alert('No detailed data available to export');
                }
              }}
              style={{
                background: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "6px 12px",
                fontSize: "0.8em",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px"
              }}
            >
              📊 Export Excel
            </button>
          )}
         

          {/* Date Range Display - shown for all views */}
          <p className="m-0 p-0" style={{ fontSize: "12px" }}>
            Date Range{" "}
            <span style={{ color: "#6e3000" }}>
              {startDate || "N/A"} - {endDate || "N/A"}
            </span>
          </p>
        </div>
      </div>
    );
  }

  function renderCargoReportTab() {
    return (
      <>
        <CargoRadioSwitcher />
        <CargoClientSelector 
          selectedClients={selectedCargoClients}
          availableClients={availableCargoClients}
          onClientToggle={handleCargoClientToggle}
          onSelectAll={handleSelectAllCargo}
          onClearAll={handleClearAllCargo}
          showComponent={cargoView === "detailed" && showClientFilters}
        />
        {cargoView === "full" && <SummarizedDataTable />}
        {cargoView === "simple" && <BriefMonthTable />}
        {cargoView === "detailed" && detailedCargoReport()}
      </>
    );
  }

  // Client selection component for inventory
  function InventoryClientSelector() {
    const handleClientToggle = (clientName) => {
      setSelectedClients(prev => {
        if (prev.includes(clientName)) {
          return prev.filter(name => name !== clientName);
        } else {
          return [...prev, clientName];
        }
      });
    };

    const handleSelectAll = () => {
      setSelectedClients(availableClients);
    };

    const handleClearAll = () => {
      setSelectedClients([]);
    };

    return (
      <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <strong>Select Clients:</strong>
          <div>
            <button 
              onClick={handleSelectAll}
              style={{ 
                marginRight: '8px', 
                padding: '4px 8px', 
                fontSize: '0.8em',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              Select All
            </button>
            <button 
              onClick={handleClearAll}
              style={{ 
                padding: '4px 8px', 
                fontSize: '0.8em',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              Clear All
            </button>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxHeight: '120px', overflowY: 'auto' }}>
          {availableClients.map(client => (
            <label 
              key={client}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '4px 8px',
                backgroundColor: selectedClients.includes(client) ? '#e3f2fd' : '#fff',
                border: `1px solid ${selectedClients.includes(client) ? '#007bff' : '#dee2e6'}`,
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9em',
                minWidth: '120px'
              }}
            >
              <input
                type="checkbox"
                checked={selectedClients.includes(client)}
                onChange={() => handleClientToggle(client)}
                style={{ marginRight: '6px' }}
              />
              {client}
            </label>
          ))}
        </div>
        
        {selectedClients.length > 0 && (
          <div style={{ marginTop: '8px', fontSize: '0.9em', color: '#007bff' }}>
            <strong>{selectedClients.length}</strong> client(s) selected
          </div>
        )}
        
        {/* Excel Download Button */}
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            onClick={() => {
              const filteredInventoryData = selectedClients.length > 0 
                ? inventoryData.filter(item => selectedClients.includes(item.name))
                : inventoryData;
              
              if (filteredInventoryData.length > 0) {
                exportToExcel(filteredInventoryData, 'Inventory_Report');
              } else {
                alert('No data available to export');
              }
            }}
            style={{ 
              padding: '8px 16px', 
              fontSize: '0.9em',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            📊 Download Excel
          </button>
        </div>
      </div>
    );
  }

  // Radio button switcher for inventory views
  function InventoryRadioSwitcher() {
    return (
      <div style={{ marginBottom: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <label style={{ marginRight: 16 }}>
          <input
            type="radio"
            name="inventoryView"
            value="brief"
            checked={inventoryView === "brief"}
            onChange={() => setInventoryView("brief")}
          />{" "}
          Brief
        </label>
        <label style={{ marginRight: 16 }}>
          <input
            type="radio"
            name="inventoryView"
            value="summary"
            checked={inventoryView === "summary"}
            onChange={() => setInventoryView("summary")}
          />{" "}
          Summary
        </label>
        <label>
          <input
            type="radio"
            name="inventoryView"
            value="detailed"
            checked={inventoryView === "detailed"}
            onChange={() => setInventoryView("detailed")}
          />{" "}
          Detailed
        </label>
      </div>
    );
  }

  const renderInventoryTab = () => {
    return (
      <div>
        <InventoryRadioSwitcher />
        <InventoryClientSelector />
        
        {inventoryView === "brief" && (
          <InventoryBrief 
            selectedClients={selectedClients} 
            inventoryData={inventoryData} 
          />
        )}
        
        {inventoryView === "summary" && (
          <InventorySummary 
            selectedClients={selectedClients} 
            inventoryData={inventoryData} 
          />
        )}
        
        {inventoryView === "detailed" && (
          <InventoryDetailed 
            selectedClients={selectedClients} 
            inventoryData={inventoryData} 
          />
        )}
      </div>
    );
  };

  return (
    <>
      <TitleSmallDesc
        title={`Cargo Report on ${CurrentDate.todaydate()} `}
        moreclass="showOnPrint"
      />
      <ListToolBar
        hideSaveBtn={true}
        height={height}
        entity="Arrival note"
        changeFormHeightClick={() => setHeight(height === 0 ? "auto" : 0)}
        changeSearchheight={() =>
          setSearchHeight(searchHeight === 0 ? "auto" : 0)
        }
        handlePrint={handlePrint}
        searchHeight={searchHeight}
      />
      <SearchformAnimation searchHeight={searchHeight}>
        {activeTab === "cargo-report" && (
          <CargoSearchBox
            getCommonSearchByDate={getCommonSearchByDate}
            onGoodsFilter={handleGoodsFilter}
            onTonnageFilter={handleTonnageFilter}
          />
        )}
        {activeTab === "cargo-exit" && (
          <SearchBox getCommonSearchByDate={getCommonSearchByDate} />
        )}
      </SearchformAnimation>

      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="cargo-report">
            <Nav.Item>
              <Nav.Link
                title="This brings the invoiced cargo movement"
                eventKey="cargo-report"
                onClick={() => {
                  setActiveTab("cargo-report");
                  // setCurrentYearDateRange();
                  // Trigger refresh with today's date after setting the date range
                  setTimeout(() => {
                    const todayDate = CurrentDate.todaydate();
                    refreshMonthlyReport(
                      todayDate,
                      todayDate
                    );
                  }, 100); // Small delay to ensure date range is set first
                }}
                active={activeTab === "cargo-report"}
              >
                Cargo Financial Report
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                title="This brings the cargo tonnage balance in the warehouse, so it does not include the amount paid"
                eventKey="inventory"
                onClick={() => setActiveTab("inventory")}
                active={activeTab === "inventory"}
              >
                Inventory
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                title="This brings the cargo movement history by date range, so you have to select the date range"
                eventKey="cargo-exit"
                onClick={() => setActiveTab("cargo-exit")}
                active={activeTab === "cargo-exit"}
              >
                Cargo Exit
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          {activeTab === "cargo-report" && renderCargoReportTab()}
          {activeTab === "inventory" && renderInventoryTab()}
          {activeTab === "cargo-exit" && <CargoExitReport />}
        </Card.Body>
      </Card>
    </>
  );
};

export const AllRevenue = () => {
  return (
    <div>
      <TitleAndList title="All Revenue" />
      <RevenueTable />
    </div>
  );
};

export const LocalReportAddress = ({
  reportTitle,  leftAddress = "MAGERWA",  rightSideAddress,
}) => {
  return (
    <>
      {" "}
      <Row
        className="  showOnPrint"
        style={{ marginBottom: "50px", display: "none" }}
      >
        <Col md={5}>
          {leftAddress}
          <Col md={12}>Date: {CurrentDate.todaydate()}</Col>
        </Col>
        <Col md={6} className="pe-5 text-end">
          {rightSideAddress}{" "}
        </Col>
      </Row>
      <SplitterOnPrint />
      <span className="  showOnPrint" style={{ display: "none" }}>
        {" "}
        <TitleSmallDescOnPrint title={` ${reportTitle} `} />{" "}
      </span>
    </>
  );
};

export const localStyle = () => {
  return {
    fontWeight: "bold",
    paddingTop: "0px",
    color: "#000",
    fontSize: "15px",
  };
};
