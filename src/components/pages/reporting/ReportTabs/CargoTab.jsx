import React, { useState } from "react"
import { Form } from "react-bootstrap"
import ReportTable from "../SharedTabComponents/ReportTable"
import { motion, AnimatePresence } from "framer-motion"
import TabHeader from "../SharedTabComponents/TabHeader"
import RadioGroup from "../SharedTabComponents/RadioButtons"

export default function CargoTab() {
  const [view, setView] = useState("brief") // default view

  return (
    <div>
      <TabHeader onSearch={() => {}} title="Cargo" />

      {/* Radio Buttons */}
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
