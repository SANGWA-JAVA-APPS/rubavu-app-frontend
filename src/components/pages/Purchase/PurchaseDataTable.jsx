import React, { useEffect, useState } from 'react'
import StockRepository from '../../services/StockServices/StockRepository';
import CurrentDate from '../../Global/CurrentDate';
import { Col, Row } from 'react-bootstrap';
import { TableOpen } from '../../Global/ListTable';
import TableHead from '../../Global/TableHead';


function PurchaseDataTable() {

    const [purchasess, setPurchasess] = useState([]) //Data List
    const [itemssbyname, setItemssbyname] = useState([]) //Data List searched by name
    const [currencyName, setCurrencyName] = useState('')// this is used on search on the beginning of the form registration
    const getAllPurchasess = (date1, date2) => {
        const purchaseDatesDTO = {
            date1: date1,
            date2: date2
        }
        StockRepository.findPurchases(purchaseDatesDTO, authHeader).then((res) => {
            setPurchasess(res.data);
            // setDataLoad(true)
        });
    }

    const getCurrency = (currencyName) => {
        StockRepository.getSettingByName(currencyName, authHeader).then((res) => {
            setCurrencyName(res.data.value)
        })
    }
    useEffect(() => {
        getAllPurchasess(CurrentDate.todaydate(), CurrentDate.todaydate())
        getCurrency("currency")
    }, [])

    var TotalCost1 = 0
    var TotalCost = 0;
    return (
 
                        <TableOpen>
                            <TableHead>
                                <td> Item </td>
                                <td > Date  </td>
                                <td> Qty </td>
                                <td className='cashCol'> Total</td>
                            </TableHead>
                            <tbody>
                                {purchasess.map((pc, index) => {
                                    var total = pc.unit_cost * pc.purchased_qty
                                    TotalCost += total
                                    return (
                                        <tr key={index}>
                                            <td>{pc.itemName}</td>
                                            <td>{pc.date_time}</td>
                                            <td>{pc.purchased_qty.toLocaleString()}</td>
                                            <td className='cashCol text-white'> {currencyName} {total.toLocaleString()}</td>

                                        </tr>
                                    )
                                })
                                }
                                <tr>
                                    <td className=' ' colSpan={7} >
                                        <Row className='d-flex  justify-content-end   '>
                                            <Col md={11}   style={{ textAlign: 'right' }}>
                                                <span className='grandTotal2 '> Total {currencyName} {TotalCost.toLocaleString()}</span>
                                            </Col>
                                        </Row>
                                    </td>
                                </tr>
                            </tbody>
                        </TableOpen>
 
        
    )
}

export default PurchaseDataTable