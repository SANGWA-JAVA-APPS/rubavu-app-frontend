import React, { useState } from "react"
import { Form } from "react-bootstrap"
import ReportTable from "../SharedTabComponents/ReportTable"
import { motion, AnimatePresence } from "framer-motion"
import TabHeader from "../SharedTabComponents/TabHeader"

export default function VesselTab() {
  const [view, setView] = useState("brief") // default view

  return (
    <div>
      <TabHeader onSearch={() => {}} title="Vessel" />

      {/* Radio Buttons */}
      <Form className="d-flex gap-4 mb-3">
        <Form.Check
          inline
          type="radio"
          label="Brief"
          name="cargoView"
          value="brief"
          checked={view === "brief"}
          onChange={(e) => setView(e.target.value)}
        />
        <Form.Check
          inline
          type="radio"
          label="Summarized"
          name="cargoView"
          value="summarized"
          checked={view === "summarized"}
          onChange={(e) => setView(e.target.value)}
        />
        <Form.Check
          inline
          type="radio"
          label="Details"
          name="cargoView"
          value="details"
          checked={view === "details"}
          onChange={(e) => setView(e.target.value)}
        />
      </Form>

      {/* Dynamic Table with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={view} // important: re-renders on view change
          initial={{ opacity: 0, y: 50 }}   // start hidden
          animate={{ opacity: 1, y: 0 }}    // slide in
          exit={{ opacity: 0, y: -50 }}     // slide out
          transition={{ duration: 0.2 }}
        >
          <ReportTable view={view} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
