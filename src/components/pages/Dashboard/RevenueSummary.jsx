import React, { useContext, useEffect, useState } from 'react'
import ListOptioncol, { TableOpen } from '../../Global/ListTable'
import TableHead from '../../Global/TableHead'
import { Col, Row } from 'react-bootstrap'
import CurrentDate from '../../Global/CurrentDate'
import StockRepository from '../../services/StockServices/StockRepository'
import PurchaseDataTable from '../Purchase/PurchaseDataTable'
import SalesSummaryDataTable from './SalesSummaryDataTable'

import { ColItemContext } from '../../Global/GlobalDataContentx'
import { Link } from 'react-router-dom'


function RevenueSummary({ debtsList }) {

    const [hwmovements, setHwmovement] = useState([]) //Data List that comes initially
    const [dailyReportList, setDailyReportList] = useState([]) //Data List that comes initially
    var n = 0 // this is the number that is given to a key
    const [searchByDate, setSearchByDate] = useState(false)
    const [userType, setUserType] = useState()

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [expensesList, setExpensesList] = useState([])
    const [currencyName, setCurrencyName] = useState('')// this is used on search on the beginning of the form registration
    let totalExpenses = 0, totalDebts = 0;
    const getAllHw_movements = () => {
        var SearchByDateOnly = {
            startDate: startDate,
            endDate: endDate
        }
        StockRepository.groupByInOut(SearchByDateOnly, authHeader).then((res) => {
            // StockRepository.findHw_movement(SearchByDateOnly, authHeader).then((res) => {
            setDailyReportList(res.data);
            //   setDataLoad(true)
        });
    }
    const findDailyreport = () => {
        const SearchByDateOnly = {
            startDate: CurrentDate.todaydate(),
            endDate: CurrentDate.todaydate()
        }
        StockRepository.findDailyreport(SearchByDateOnly, authHeader).then((res) => {
            // StockRepository.findHw_movement(SearchByDateOnly, authHeader).then((res) => {
            setDailyReportList(res.data)
            //   setDataLoad(true)
        });
    }

    const getTodayExpenses = () => {
        const searchByDateOnly = {
            date1: CurrentDate.todaydate(),
            date2: CurrentDate.todaydate()
        }

        StockRepository.findExpenseByDate(searchByDateOnly, authHeader).then((res) => {
            let resp = res.data
            setExpensesList(resp)

        })

    }
    useEffect(()=>{
         const intervalId = setInterval(() => {
        findDailyreport();
    }, 5000); // 5000ms = 5 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
    },[])
    const getCurrency = (currencyName) => {
        StockRepository.getSettingByName(currencyName, authHeader).then((res) => {
          setCurrencyName(res.data.value)
        })
      }
    useEffect(() => {
        getAllHw_movements()
        getCurrency("currency")
        setUserType(localStorage.getItem('catname'))
        getTodayExpenses()

    }, [])
    let grandTotal = 0, subTotal = 0
    return (
        <Row   >
            {expensesList.map((exp) => {
                totalExpenses += Number(exp.exp_amount)
            })}

            {debtsList.map((debt) => {
                totalDebts += Number(debt.prof_lost_overprof)
            })
            }

            {/* <Col md={12}>Purchase</Col> */}
            <Col md={12} >
                <h4 className='text-uppercase mb-3 fw-bold mt-3 '>Today's Summary Report</h4>
                {dailyReportList.length > 0 ?
                    <TableOpen>
                        <TableHeadView userType={userType} searchByDate={searchByDate} />
                        <tbody>
                            {dailyReportList.map((report, index) => {
                                subTotal += Number(report.sold_qty * report.sold_unit_cost)
                                return <RowsLoop n={index} report={report} />
                            })}
                            <tr className='text-dark'>
                                <td colSpan={5}> <h4>  Sub Total </h4>  </td>
                                <td colSpan={5}><h4 style={{ textAlign: 'right' }}>      <Link to="/expenses">      {subTotal.toLocaleString()}  </Link></h4></td>
                            </tr>
                            <tr className='text-dark d-none'>
                                <td colSpan={5}> <h4>
                                    Expenses </h4>  </td>
                                <td colSpan={5}><h4 style={{ textAlign: 'right' }}>      <Link to="/expenses">      {totalExpenses.toLocaleString()}  </Link></h4></td>
                            </tr>
                            <tr className='text-dark d-none'>
                                <td colSpan={5}><h4>Debts</h4></td>
                                <td colSpan={5}><h4 style={{ textAlign: 'right' }}><Link to="/debts">   {totalDebts.toLocaleString()} </Link></h4></td>
                            </tr>

                            <tr className='text-dark'>
                                <td className='cashCol2' colSpan={5}><h3>Grand Total</h3></td>
                                <td className='cashCol2' colSpan={5}><h3 style={{ textAlign: 'right' }}>{currencyName}  {(Number(subTotal + totalExpenses + totalDebts)).toLocaleString()} </h3></td>
                            </tr>


                        </tbody>
                    </TableOpen>
                    : <Row className='text-dark' >
                        <h6 className="text-uppercase mb-5">No Activity done yet Today!</h6>
                    </Row>}
            </Col>
        </Row >
    )


}

export default RevenueSummary

export const TableHeadView = ({ userType, searchByDate }) => {
    const { purchaseMenu } = useContext(ColItemContext)
    const {saleMenu} = useContext(ColItemContext)
    return <TableHead>
        {/* <td>id</td> */}
        <td>item</td>
        <td>date_time</td>
        <td>Opening</td>

        <td>{purchaseMenu}</td>
        <td>{saleMenu}</td>
        <td>Closing</td>
        <td>Sold UC</td>
        <td>Revenue</td>
        {searchByDate && <td>Report</td>}

        {/* {userType == 'admin' && <td className='delButton'>Option</td>} */}
    </TableHead>
}


export const RowsLoop = ({ n, report }) => {
    return (
        <tr className='text-dark' key={n}>
            <td>{report.itemName}</td>
            <td>{report.date_time}</td>
            <td>{report.opening_stock}</td>
            <td>{report.purchased_qty === 0 ? '----' : report.purchased_qty}</td>
            <td>{report.sold_qty === 0 ? '----' : report.sold_qty}</td>
            <td>{(report.opening_stock + report.purchased_qty) - report.sold_qty}</td>
            <td>{report.sold_unit_cost != undefined ? (report.sold_unit_cost).toLocaleString() : report.sold_unit_cost}</td>
            <td className='cashCol'>     {(report.sold_qty * report.sold_unit_cost).toLocaleString()} ({report.sold_qty} x {report.sold_unit_cost} )</td>


            {/* {userType == 'admin' && <ListOptioncol getEntityById={() => getHw_movementById(Hw_movement.id)} delEntityById={() => delHw_movementById(Hw_movement.id)} />} */}
        </tr>)
}
