import React, { useContext, useEffect, useState } from 'react'
import { ItemsContainer } from '../../globalcomponents/ItemsContainer'
import { Col, Row } from 'react-bootstrap'
import CurrentDate from '../../Global/CurrentDate'
import Reporting from '../../services/StockServices/Reporting'
import TableHead from '../../Global/TableHead'
import { TableOpen } from '../../Global/ListTable'
import { TitleSmallDesc } from '../../globalcomponents/TitleSmallDesc'
import { Splitter } from '../../globalcomponents/Splitter'
import ColItem from '../Dashboard/ColItem'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import { useAuthHeader } from 'react-auth-kit'


export const TitleDisp = ({ title }) => {
    if (title === 'revenueBerth') {
        return <ListByTitle titleOne='Bething Revenue' titleTwo='Truck Parking Revenue' titleThree="Operations Revenue" />
    } else if (title === 'totBerthed') {
        return <ListByTitle titleOne='Berthed Vessels' titleTwo='Entered Trucks' titleThree="Offloaded Weight" />
    }
}
export const ListByTitle = ({ titleOne, titleTwo, titleThree }) => {
    const [invoiceReport, setInvoiceReport] = useState([])
    const [truckReport, setTruckReport] = useState([])
    const [cargoAmountReport, setCargoAmountReport] = useState([])
    const authHeader = useAuthHeader()
    const getAllREvenue = (date1, date2) => {
        const dates = {
            startDate: date1, // Send the startDate as a query parameter
            endDate: date2
        }
        Reporting.revenueReport(date1, date2, authHeader).then((res) => {
            setInvoiceReport(res.data.berthReport)
            setTruckReport(res.data.truckReport)
            setCargoAmountReport(res.data.cargoAmount)
        })
        Reporting.vesselTruckWeightReport(date1, date2, authHeader).then((res) => {
            setTruckReport(res.data.BerthedVessels)
        })
    }

    useEffect(() => {
        getAllREvenue(CurrentDate.todaydate(), CurrentDate.todaydate())
    }, [])

    return <>
        <Col md={12}>

            <TitleSmallDesc title={titleOne} />

            <TableOpen>
                <TableHead>
                    <td>ID</td>
                    <td>Quay Amount</td>
                    <td>ETD</td>
                    <td>Vessel Handling Charges</td>
                    <td>Name</td>
                    <td>Plate Number</td>
                    <td>Dimension</td>
                    <td>Capacity</td>
                    <td>Owner/Operator</td>
                    <td>RURA Certificate</td>
                    <td>Contact Number</td>
                    <td>LOA</td>

                </TableHead>
                <tbody>
                    {invoiceReport.map((vessel) => (
                        <tr key={vessel.id}>
                            <td>{vessel.id}</td>
                            <td>{vessel.quay_amount}</td>
                            <td>{new Date(vessel.etd)}</td>
                            <td>{vessel.vessel_handling_charges}</td>
                            <td>{vessel.name}</td>
                            <td>{vessel.plate_number}</td>
                            <td>{vessel.dimension}</td>
                            <td>{vessel.capacity}</td>
                            <td>{vessel.owner_operator}</td>
                            <td>{vessel.rura_certificate}</td>
                            <td>{vessel.contact_number}</td>
                            <td>{vessel.loa}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={2}></td>
                    </tr>
                </tbody>
            </TableOpen>


            <Splitter />
            <TitleSmallDesc title={titleTwo} />
            <TableOpen>
                <TableHead>
                    <td>ID</td>
                    <td>Licence Plate Number</td>
                    <td>Get Out Time</td>
                    <td>Amount</td>
                    <td>Total Days</td>
                    <td>Total Hours</td>
                    <td>Total Minutes</td>
                    <td>Fee</td>
                    <td>Entry Time</td>
                </TableHead>
                <tbody>
                    {truckReport.map((truck) => (
                        <tr key={truck.id}>
                            <td>{truck.id}</td>
                            <td>{truck.licence_plate_number || "N/A"}</td>
                            <td>{truck.get_out_time ? new Date(truck.get_out_time).toLocaleString() : "N/A"}</td>
                            <td>{truck.amount ?? "N/A"}</td>
                            <td>{truck.totalDays ?? "N/A"}</td>
                            <td>{truck.totalHours ?? "N/A"}</td>
                            <td>{truck.totalMin ?? "N/A"}</td>
                            <td>{truck.fee ?? "N/A"}</td>
                            <td>{truck.entryTime || "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </TableOpen>

            <Splitter />
            <TitleSmallDesc title={titleThree} />
            <TableOpen>
                <TableHead>
                    <td>ID</td>
                    <td>Date & Time</td>
                    <td>Amount</td>

                    <td>Total Weight</td>
                    <td>Total Amount</td>
                </TableHead>

                <tbody>
                    {cargoAmountReport.map((record) => (
                        <tr key={record.id}>
                            <td>{record.id}</td>
                            <td>{new Date(record.date_time).toLocaleString()}</td>
                            <td>{record.amount}</td>

                            <td>{record.total_weight}</td>
                            <td>{record.total_amount}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={2}></td>
                    </tr>
                </tbody>
            </TableOpen>
        </Col>
    </>
}
export const RevenueReports = () => {
    const { reportType } = useContext(ColItemContext)
    return (
        <ItemsContainer>
            <Splitter />
            <TitleDisp title={reportType} />

        </ItemsContainer>
    )
}
