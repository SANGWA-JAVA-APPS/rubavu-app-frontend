import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import ReportTable from "../SharedTabComponents/ReportTable";
import { motion, AnimatePresence } from "framer-motion";
import TabHeader from "../SharedTabComponents/TabHeader";
import RadioGroup from "../SharedTabComponents/RadioButtons";
import StockRepository from "../../../services/StockServices/StockRepository";
import { useAuthHeader } from "react-auth-kit";
import Reporting from "../../../services/StockServices/Reporting";
export default function CargoTab({ isActive }) {
  const [view, setView] = useState("brief");
  const [cargoData, setCargoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false); // Track if data has been loaded
  const [detailedCargoData, setDetailedCargoData] = useState([]);
  // const authHeader = useAuthHeader()
  const authHeader = useAuthHeader();

  useEffect(() => {
    console.log("CargoTab view:", view);

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
        console.log("detailedResponse", detailedResponse);

        setDetailedCargoData(detailedResponse.data?.tally);
        //Calling MONTHLY REPORT
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
  }, [isActive, hasLoaded, authHeader, view]);

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
    console.log("cargo data details", detailedCargoData);
    return detailedCargoData.map((item, index) => ({
      refNo: item.id || `REF-${index + 1}`,
      cargoOwner: `${item.clientName} ${item.clientSurname}`.trim(),
      cargo: item.cargo,
      movement: item.destinationName,
      entryDate: item.entry_date
        ? new Date(item.entry_date).toLocaleDateString()
        : "-",
      exitDate: item.end_date_time
        ? new Date(item.end_date_time).toLocaleDateString()
        : "-",
      totalWeight: `${item.weight} ${item.weighttype === "1" ? "kg" : "tons"}`,
      importExport: item.tarifftype === "1" ? "Import" : "Export",
      numberOfDays:
        item.entry_date && item.end_date_time
          ? Math.ceil(
              (new Date(item.end_date_time).getTime() -
                new Date(item.entry_date).getTime()) /
                (1000 * 60 * 60 * 24)
            )
          : "-",
      handlingFees: item.invoiceAmount || 0,
      storageAmount: item.unit || 0,
    }));
  }
  const getData = () => {
    if (view === "details") {
      // preprocess detailedCargoData into rows that match your details columns
      return formatDetailedCargoData(detailedCargoData);
    }
    // for "brief" and "summarized" views
    return cargoData;
  };
  // Details Filter By import/Export
  const getDetailsDataByType = () => {
    const formattedData = formatDetailedCargoData(detailedCargoData || []);

    const imported = formattedData.filter(
      (item) => item.importExport === "Import"
    );
    const exported = formattedData.filter(
      (item) => item.importExport === "Export"
    );
    const all = formattedData; // just all rows

    return { imported, exported, all };
  };

  return (
    <div>
      <TabHeader onSearch={() => {}} title="Cargo" />

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
                  <h5>Imported Cargo</h5>
                  <ReportTable
                    view="details"
                    data={imported}
                    columns={getColumns()}
                  />

                  <h5>Exported Cargo</h5>
                  <ReportTable
                    view="details"
                    data={exported}
                    columns={getColumns()}
                  />

                  <h5>All Cargo</h5>
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
