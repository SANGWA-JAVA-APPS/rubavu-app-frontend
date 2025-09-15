import { Table, Pagination } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { GraphUpArrow, GraphDownArrow } from "react-bootstrap-icons";
import { useState } from "react";

export default function ReportTable({
  view,
  data,
  columns,
  itemsPerPage = 50,
}) {
  if (!data || !columns) return null;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const calculateColumnSum = (accessor) => {
    // console.log("Calculating sum for column:", accessor);

    return data.reduce((sum, row) => {
      const value = row[accessor];
      return sum + (Number(value) || 0);
    }, 0);
  };
  const sumColumnsByView = {
    brief: ["weightIn", "weightOut", "transQty"],
    summarized: [
      "weightIn",
      "weightOut",
      "transQty",
      "totalPurchaseInvoiceAmount",
      "totalSalesInvoiceAmount",
      "totalArrivalNotes",
    ],
    details: ["totalWeight", "handlingFees"], 
  };

  const renderCell = (row, column) => {
    const value = row[column.accessor];

    // monetary
    if (
      column.accessor === "totalPurchaseInvoiceAmount" ||
      column.accessor === "totalSalesInvoiceAmount" ||
      column.accessor === "handlingFees"
    ) {
      return `RWF ${value}`;
    }
    if (column.accessor === "totalWeight") {
      return `${value} Kg`;
    }

    // weight / quantity
    if (["weightIn", "weightOut", "transQty"].includes(column.accessor)) {
      const repeatedCargo =
        column.accessor === "weightIn" ? row.repeatedIn : row.repeatedOut;

      return (
        <div className="d-flex align-items-center gap-2">
          <span>{Number(value).toLocaleString()} Kg</span>
          {(column.accessor === "weightIn" ||
            column.accessor === "weightOut") &&
            repeatedCargo && (
              <div
                className="d-flex align-items-center text-muted"
                style={{ fontSize: "0.85rem" }}
              >
                {column.accessor === "weightIn" ? (
                  <GraphUpArrow size={16} color="#007bff" />
                ) : (
                  <GraphDownArrow size={16} color="#28a745" />
                )}
                <span className="ms-1">{repeatedCargo}</span>
              </div>
            )}
        </div>
      );
    }

    // totalArrivalNotes
    if (column.accessor === "totalArrivalNotes")
      return Number(value).toLocaleString();

    // month + year
    if (column.accessor === "month" && row.year) return `${value} ${row.year}`;

    return value;
  };

  return (
    <div className="mt-3">
      <AnimatePresence mode="wait">
        <motion.div
          key={view + currentPage}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
        >
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index} className="text-uppercase">
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex}>{renderCell(row, column)}</td>
                  ))}
                </tr>
              ))}
              <tr>
                {/* First column: label */}
                <td>
                  <strong>Total</strong>
                </td>

                {/* Remaining columns: sums or empty */}
                {columns.slice(1).map((column, colIndex) => {
                  const sumColumns = sumColumnsByView[view] || [];
                  if (sumColumns.includes(column.accessor)) {
                    const sum = calculateColumnSum(column.accessor);
                    let displaySum = sum;

                    if (
                      [
                        "weightIn",
                        "weightOut",
                        "transQty",
                        "totalWeight",
                      ].includes(column.accessor)
                    ) {
                      displaySum = `${sum.toLocaleString()} Kg`;
                    } else if (
                      [
                        "totalPurchaseInvoiceAmount",
                        "totalSalesInvoiceAmount",
                        "handlingFees",
                      ].includes(column.accessor)
                    ) {
                      displaySum = `RWF ${sum.toLocaleString()}`;
                    } else if (column.accessor === "totalArrivalNotes") {
                      displaySum = sum.toLocaleString();
                    }

                    return (
                      <td key={colIndex}>
                        <strong>{displaySum}</strong>
                      </td>
                    );
                  }

                  return <td key={colIndex}></td>; // empty for columns not summed
                })}
              </tr>
            </tbody>
          </Table>

          {totalPages > 1 && (
            <Pagination className="justify-content-center">
              {Array.from({ length: totalPages }).map((_, i) => {
                const isActive = i + 1 === currentPage;
                return (
                  <Pagination.Item
                    key={i}
                    active={isActive}
                    onClick={() => handlePageChange(i + 1)}
                    linkClassName={`rounded ${
                      isActive
                        ? "bg-primary text-white"
                        : "bg-tertiary text-white"
                    }`}
                    className="mx-1 rounded bg-primary"
                  >
                    {i + 1}
                  </Pagination.Item>
                );
              })}
            </Pagination>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ReportTable.defaultProps = {
//   data: [],
//   columns: [],
//   view: "brief",
//   itemsPerPage: 50,
// };
