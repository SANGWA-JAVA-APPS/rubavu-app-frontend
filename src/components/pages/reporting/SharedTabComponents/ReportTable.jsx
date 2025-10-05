import { Table } from "react-bootstrap"
import { motion, AnimatePresence } from "framer-motion"
import { GraphUpArrow, GraphDownArrow } from 'react-bootstrap-icons'

export default function ReportTable({ view, data, columns }) {
  if (!data || !columns) return null

  const renderCell = (row, column) => {
    const value = row[column.accessor]
    
    // Handle monetary values
    if (column.accessor === 'totalPurchaseInvoiceAmount' || 
        column.accessor === 'totalSalesInvoiceAmount') {
      return `RWF ${Number(value).toLocaleString()}`
    }

    // Handle weight and quantity columns
    if (column.accessor === 'weightIn' || 
        column.accessor === 'weightOut' || 
        column.accessor === 'transQty') {
      const repeatedCargo = column.accessor === 'weightIn' ? row.repeatedIn : row.repeatedOut

      return (
        <div className="d-flex align-items-center gap-2">
          <span>{Number(value).toLocaleString()} Kg</span>
          {(column.accessor === 'weightIn' || column.accessor === 'weightOut') && repeatedCargo && (
            <div className="d-flex align-items-center text-muted" style={{ fontSize: '0.85rem' }}>
              {column.accessor === 'weightIn' ? (
                <GraphUpArrow size={16} color="#007bff" />
              ) : (
                <GraphDownArrow size={16} color="#28a745" />
              )}
              <span className="ms-1">{repeatedCargo}</span>
            </div>
          )}
        </div>
      )
    }

    // Handle total arrival notes
    if (column.accessor === 'totalArrivalNotes') {
      return Number(value).toLocaleString()
    }

    // Handle year + month combination
    if (column.accessor === 'month' && row.year) {
      return `${value} ${row.year}`
    }

    // Default return
    return value
  }

  return (
    <div className="mt-3">
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
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
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex}>
                      {renderCell(row, column)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

ReportTable.defaultProps = {
  data: [],
  columns: [],
  view: 'brief'
}