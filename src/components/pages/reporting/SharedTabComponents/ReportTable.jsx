import { Table, Pagination } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { GraphUpArrow, GraphDownArrow } from "react-bootstrap-icons";
import { useState } from "react";

export default function ReportTable({ view, data, columns, itemsPerPage = 50 }) {
  if (!data || !columns) return null;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderCell = (row, column) => {
    const value = row[column.accessor];
    
    // monetary
    if (column.accessor === 'totalPurchaseInvoiceAmount' || 
        column.accessor === 'totalSalesInvoiceAmount') {
      return `RWF ${Number(value).toLocaleString()}`;
    }

    // weight / quantity
    if (['weightIn', 'weightOut', 'transQty'].includes(column.accessor)) {
      const repeatedCargo = column.accessor === 'weightIn' ? row.repeatedIn : row.repeatedOut;

      return (
        <div className="d-flex align-items-center gap-2">
          <span>{Number(value).toLocaleString()} Kg</span>
          {(column.accessor === 'weightIn' || column.accessor === 'weightOut') && repeatedCargo && (
            <div className="d-flex align-items-center text-muted" style={{ fontSize: '0.85rem' }}>
              {column.accessor === 'weightIn' ? <GraphUpArrow size={16} color="#007bff" /> :
                <GraphDownArrow size={16} color="#28a745" />}
              <span className="ms-1">{repeatedCargo}</span>
            </div>
          )}
        </div>
      );
    }

    // totalArrivalNotes
    if (column.accessor === 'totalArrivalNotes') return Number(value).toLocaleString();

    // month + year
    if (column.accessor === 'month' && row.year) return `${value} ${row.year}`;

    return value;
  };

  return (
    <div className="mt-3">
      <AnimatePresence mode="wait">
        <motion.div
          key={view + currentPage} // re-animate when page changes
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
        >
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index} className="text-uppercase">{column.header}</th>
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
            </tbody>
          </Table>

          {totalPages > 1 && (
            <Pagination className="justify-content-center ">
              {Array.from({ length: totalPages }).map((_, i) => (
                <Pagination.Item
                activeClassName=" text-white rounded"
                  key={i}
                  active={i + 1 === currentPage}
                  onClick={() => handlePageChange(i + 1)}
                  className="bg-white rounded"
                  // linkClassName="bg-white"
                >
                  {i + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

ReportTable.defaultProps = {
  data: [],
  columns: [],
  view: 'brief',
  itemsPerPage: 50
};
