import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import ReportTable from "../SharedTabComponents/ReportTable";
import { motion, AnimatePresence } from "framer-motion";
import TabHeader from "../SharedTabComponents/TabHeader";
import RadioGroup from "../SharedTabComponents/RadioButtons";
import StockRepository from "../../../services/StockServices/StockRepository";
import { useAuthHeader } from "react-auth-kit";
import { Row, Col } from "react-bootstrap";
import Reporting from "../../../services/StockServices/Reporting";
export default function CargoTab({ isActive }) {
  const [view, setView] = useState("brief");
  const [cargoData, setCargoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false); // Track if data has been loaded
  const [detailedCargoData, setDetailedCargoData] = useState([]);
  const [allcargoData, setAllCargoData] = useState([]);
  const [filteredDataByClient, setFilteredDataByClient] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  // const authHeader = useAuthHeader()
  const [clients, setClients] = useState([]);
  const authHeader = useAuthHeader();
  // Assuming detailedCargoData has raw numbers: totalWeightRaw, handlingFeesRaw
  const sumTallyWeight = () => {
    return allcargoData?.tally?.reduce((total, record) => {
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
  const sumPurchases = () => {
    return allcargoData?.tallyIn?.reduce((total, record) => {
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
  const sumSales = () => {
    return allcargoData?.tallyOut?.reduce((total, record) => {
      return total + (Number(record.weight) || 0);
    }, 0);
  };
   
      const GrandTotal=()=>{
        const tallyTotal = allcargoData?.tally?.reduce((total, record) => {
        return total + (Number(record.invoiceAmount) || 0);
      }, 0);
  
      const tallyInTotal = allcargoData?.tallyIn?.reduce((total, record) => {
        return total + (Number(record.invoiceAmount) || 0);
      }, 0);

      const tallyOutTotal = allcargoData?.tallyOut?.reduce((total, record) => {
        return total + (Number(record.amount_paid) || 0);
      }, 0);
  
      return tallyTotal + tallyInTotal + tallyOutTotal;
      };
    

  useEffect(() => {
    const fetchCargoData = async () => {
      if (!isActive) return;

      try {
        setLoading(true);

        const currentYear = new Date().getFullYear();
        const searchByDateRange = {
          startDate: `${currentYear}-01-01`,
          endDate: `${currentYear}-12-31`,
        };

        // Fetch detailed cargo data
        const detailedResponse = await Reporting.allCargoReport(
          searchByDateRange.startDate,
          searchByDateRange.endDate,
          authHeader()
        );
        
        
        const detailedData = detailedResponse.data?.tally || [];
        const cargoData = detailedResponse.data || [];
        setDetailedCargoData(detailedData);
        setAllCargoData(cargoData);
        console.log("detailedResponse", detailedResponse);
        // Extract unique client names
        const uniqueClients = [
          ...new Set(
            detailedData.map((item) =>
              `${item.clientName} ${item.clientSurname}`.trim()
            )
          ),
        ];
        setClients(uniqueClients);

        // Fetch monthly report
        const response = await StockRepository.findMonthlyReport(
          searchByDateRange,
          authHeader()
        );
        setCargoData(response.data);

        setHasLoaded(true);
      } catch (error) {
        console.error("Error fetching cargo data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isActive && !hasLoaded) {
      fetchCargoData();
    }
  }, [isActive, hasLoaded, authHeader]);
  const selectAllClients = () => setSelectedClients(clients);
  const clearAllClients = () => setSelectedClients([]);

  const filteredClients = clients.filter((c) =>
    c.toLowerCase().includes(searchQuery.toLowerCase())
  );
  //Toggle client selection
  const toggleClient = (client) => {
    if (selectedClients.includes(client)) {
      setSelectedClients(selectedClients.filter((c) => c !== client));
    } else {
      setSelectedClients([...selectedClients, client]);
    }
  };
  //Fetching Data based on Client selection
  useEffect(() => {
    if (selectedClients.length === 0) {
      setFilteredDataByClient(detailedCargoData);
    } else {
      const filteredData = detailedCargoData.filter((item) =>
        selectedClients.includes(
          `${item.clientName} ${item.clientSurname}`.trim()
        )
      );
      setFilteredDataByClient(filteredData);
    }
  }, [selectedClients]);
  // Define columns based on view type
  const getColumns = () => {
    const baseColumns = [];
    if (view === "brief") {
      baseColumns.push(
        { header: "month", accessor: "month" },
        { header: "transhipment", accessor: "transQty" },
        { header: "Cargo in", accessor: "weightIn" },
        { header: "Cargo out", accessor: "weightOut" }
        // { header: 'Transactions', accessor: 'transactions' }
      );
    }
    if (view === "summarized") {
      baseColumns.push(
        { header: "Year", accessor: "year" },
        { header: "Month", accessor: "month" },
        { header: "Top Cargo In", accessor: "repeatedIn" },
        { header: "Top Cargo Out", accessor: "repeatedOut" },
        { header: "Total Arrival Notes", accessor: "totalArrivalNotes" },
        { header: "Transhipment", accessor: "transQty" },
        { header: "Cargo In", accessor: "weightIn" },
        { header: "Cargo Out", accessor: "weightOut" },
        { header: "Purchase Amount", accessor: "totalPurchaseInvoiceAmount" },
        { header: "Sales Amount", accessor: "totalSalesInvoiceAmount" }
      );
    }

    if (view === "details") {
      baseColumns.push(
        { header: "Ref No.", accessor: "refNo" },
        { header: "Cargo Owner", accessor: "cargoOwner" },
        { header: "Cargo", accessor: "cargo" },
        { header: "Movement", accessor: "movement" },
        { header: "Entry Date", accessor: "entryDate" },
        { header: "Exit Date", accessor: "exitDate" },
        { header: "Total Weight", accessor: "totalWeight" },
        { header: "Import/Export", accessor: "importExport" },
        { header: "Number of Days", accessor: "numberOfDays" },
        { header: "Handling Fees", accessor: "handlingFees" },
        { header: "Storage Amount", accessor: "storageAmount" }
      );
    }

    return baseColumns;
  };
  function formatDetailedCargoData(detailedCargoData) {
    // console.log("cargo data details", detailedCargoData);

    return detailedCargoData.map((item, index) => {
      // Weight calculation
      const totalWeight =
        item.cargoAssorted === "Assorted"
          ? item.weight
          : item.weight * (item.unit || 1);

      // Days calculation
      const numberOfDays =
        item.entry_date && item.invDate
          ? Math.ceil(
              (new Date(item.invDate).getTime() -
                new Date(item.entry_date).getTime()) /
                (1000 * 60 * 60 * 24)
            )
          : 0;

      return {
        refNo: item.id || `REF-${index + 1}`,
        cargoOwner: `${item.clientName} ${item.clientSurname}`.trim(),
        cargo: item.cargo,
        movement: item.destinationName,
        entryDate: item.entry_date
          ? new Date(item.entry_date).toLocaleString()
          : "-",
        exitDate: item.invDate ? new Date(item.invDate).toLocaleString() : "-",
        totalWeight: totalWeight,
        importExport: item.tarifftype === "1" ? "Export" : "Import",
        numberOfDays,
        handlingFees: item.invoiceAmount || "0",
        storageAmount: "N/A", // if you later calculate this, replace
      };
    });
  }

  const getData = () => {
    if (view === "details") {
      // preprocess detailedCargoData into rows that match your details columns
      return formatDetailedCargoData(filteredDataByClient || []);
    }
    // for "brief" and "summarized" views
    return cargoData;
  };
  // Details Filter By import/Export
  const getDetailsDataByType = () => {
    const formattedData = formatDetailedCargoData(filteredDataByClient || []);

    const imported = formattedData.filter(
      (item) => item.importExport === "Import"
    );
    const exported = formattedData.filter(
      (item) => item.importExport === "Export"
    );
    const all = formattedData; // just all rows

    return { imported, exported, all };
  };
  const currentYear = new Date().getFullYear();

  const [dateRange, setDateRange] = useState({
    start: `${currentYear}-01-01`,
    end: `${currentYear}-12-31`,
  });
  return (
    <div>
      <TabHeader onSearch={() => {}} title="Cargo" />

      <Row className="mb-3">
        <Col md="auto">
          <RadioGroup
            name="cargoView"
            options={[
              { label: "Brief", value: "brief" },
              { label: "Summarized", value: "summarized" },
              { label: "Details", value: "details" },
            ]}
            selected={view}
            onChange={setView}
          />
        </Col>

        {view === "details" && (
          <Col className="d-flex justify-content-end align-items-center gap-3">
            <Form.Check
              type="checkbox"
              label="Show Filters"
              checked={showFilters}
              onChange={(e) => setShowFilters(e.target.checked)}
            />

            <div>
              <strong>Date Range:</strong> {dateRange.start} - {dateRange.end}
            </div>

            <button className="btn btn-success btn-sm">Export Excel</button>
          </Col>
        )}
      </Row>

      {/* --- CLIENT FILTER UI --- */}
      {showFilters && view == "details" && (
        <AnimatePresence mode="sync">
          <motion.div
            key={showFilters}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.1 }}
          >
            <div className="p-3 border rounded bg-light mb-4">
              <div className="d-flex align-items-center justify-content-between my-1">
                <h6 className="mb-2">Filter by Clients:</h6>
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={selectAllClients}
                  >
                    Select All
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={clearAllClients}
                  >
                    Clear All
                  </button>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <Form.Control
                  type="text"
                  placeholder="Search clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div
                className="d-flex flex-wrap gap-2"
                style={{
                  maxHeight: "100px", // adjust as needed
                  overflowY: "auto",
                }}
              >
                {filteredClients.map((client) => (
                  <div
                    key={client}
                    className={`px-2 py-1 border rounded ${
                      selectedClients.includes(client)
                        ? "bg-primary text-white"
                        : "bg-white"
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleClient(client)}
                  >
                    {client}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      {/* Handling Totals to be later moved to a new file for code readability */}
      {view === "details" && (
        <div className="d-flex justify-content-start align-items-center gap-4 mb-3">
          <div>
            <span className="text-muted">Transhipment: </span>
            <strong>{sumTallyWeight().toLocaleString()} KG</strong>
          </div>
          <div>
            <span className="text-muted">Cargo To W/H: </span>
            <strong>{sumPurchases().toLocaleString()} KG</strong>
          </div>
          <div>
            <span className="text-muted">Cargo From W/H: </span>
            <strong>{sumSales().toLocaleString()} KG</strong>
          </div>
          <div className="px-3 py-1 rounded bg-success text-white">
            <span className="text-white">RWF </span>
            <strong>{GrandTotal().toLocaleString()}</strong>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.2 }}
        >
          {loading ? (
            <div>Loading cargo data...</div>
          ) : view === "details" ? (
            (() => {
              const { imported, exported, all } = getDetailsDataByType();
              return (
                <>
                  <ReportTable
                    view="details"
                    data={imported}
                    columns={getColumns()}
                  />

                  <ReportTable
                    view="details"
                    data={exported}
                    columns={getColumns()}
                  />

                  <ReportTable
                    view="details"
                    data={all}
                    columns={getColumns()}
                  />
                </>
              );
            })()
          ) : (
            <ReportTable view={view} data={getData()} columns={getColumns()} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
