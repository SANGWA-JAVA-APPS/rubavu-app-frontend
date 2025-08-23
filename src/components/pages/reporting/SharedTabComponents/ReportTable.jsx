import React from "react"
import { Table } from "react-bootstrap"
import { motion, AnimatePresence } from "framer-motion"

export default function ReportTable({ view }) {
  return (
    <div className="mt-3">
      <AnimatePresence mode="wait">
        {view === "brief" && (
          <motion.div
            key="brief"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>Brief Row 1</td><td>OK</td></tr>
                <tr><td>2</td><td>Brief Row 2</td><td>OK</td></tr>
              </tbody>
            </Table>
          </motion.div>
        )}

        {view === "summarized" && (
          <motion.div
            key="summarized"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Category A</td><td>120</td></tr>
                <tr><td>Category B</td><td>80</td></tr>
              </tbody>
            </Table>
          </motion.div>
        )}

        {view === "details" && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Value</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>Detailed Row 1</td><td>123</td><td>2025-08-23</td></tr>
                <tr><td>2</td><td>Detailed Row 2</td><td>456</td><td>2025-08-23</td></tr>
              </tbody>
            </Table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
