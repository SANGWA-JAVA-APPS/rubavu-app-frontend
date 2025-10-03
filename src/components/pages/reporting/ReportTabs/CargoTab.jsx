import React, { useState, useEffect } from "react"
import { Form } from "react-bootstrap"
import ReportTable from "../SharedTabComponents/ReportTable"
import { motion, AnimatePresence } from "framer-motion"
import TabHeader from "../SharedTabComponents/TabHeader"
import RadioGroup from "../SharedTabComponents/RadioButtons"
import  StockRepository  from "../../../services/StockServices/StockRepository"
import { useAuthHeader } from 'react-auth-kit'

export default function CargoTab({ isActive }) {
  const [view, setView] = useState("brief")
  const [cargoData, setCargoData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false) // Track if data has been loaded
  // const authHeader = useAuthHeader()
  const authHeader = useAuthHeader()
  

  useEffect(() => {
    const fetchCargoData = async () => {
      if (!isActive) return

      try {
        setLoading(true)
        const currentYear = new Date().getFullYear()
        const searchByDateRange = {
          startDate: `${currentYear}-01-01`,
          endDate: `${currentYear}-12-31`
        }
        
        const response = await StockRepository.findMonthlyReport(searchByDateRange, authHeader())
       
        setCargoData(response.data)
        setHasLoaded(true)
        
        
      } catch (error) {
        console.error('Error fetching cargo data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (isActive && !hasLoaded) {
      fetchCargoData()
    }
  }, [isActive, hasLoaded, authHeader])

  // Define columns based on view type
  const getColumns = () => {
    const baseColumns = [
      
    ]
    if(view === 'brief') {
      baseColumns.push(
        { header: 'month', accessor: 'month' },
        { header: 'transhipment', accessor: 'transQty' },
        { header: 'Cargo in', accessor: 'weightIn' },
        { header: 'Cargo out', accessor: 'weightOut' },
        // { header: 'Transactions', accessor: 'transactions' }
      )
    }
    if (view === 'summarized' || view === 'details') {
    baseColumns.push(
      { header: 'Year', accessor: 'year' },
      { header: 'Month', accessor: 'month' },
      { header: 'Top Cargo In', accessor: 'repeatedIn' },
      { header: 'Top Cargo Out', accessor: 'repeatedOut' },
      { header: 'Total Arrival Notes', accessor: 'totalArrivalNotes' },
      { header: 'Transhipment', accessor: 'transQty' },
      { header: 'Cargo In', accessor: 'weightIn' },
      { header: 'Cargo Out', accessor: 'weightOut' },
      { header: 'Purchase Amount', accessor: 'totalPurchaseInvoiceAmount' },
      { header: 'Sales Amount', accessor: 'totalSalesInvoiceAmount' }
    )
  }

    if (view === 'details') {
      baseColumns.push(
        { header: 'Purchase Amount', accessor: 'purchaseAmount' },
        { header: 'Sales Amount', accessor: 'salesAmount' },
        { header: 'Featured Client', accessor: 'featuredClient' }
      )
    }

    return baseColumns
  }

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
          ) : (
            <ReportTable 
              view={view} 
              data={cargoData} 
              columns={getColumns()}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}