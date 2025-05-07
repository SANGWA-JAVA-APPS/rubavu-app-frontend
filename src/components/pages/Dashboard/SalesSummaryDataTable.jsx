import React, { useEffect, useState } from 'react'
import { TableOpen } from '../../Global/ListTable'
import TableHead from '../../Global/TableHead'
import StockRepository from '../../services/StockServices/StockRepository'

function SalesSummaryDataTable() {
    const [userType, setUserType] = useState()
    const [saless, setSaless] = useState([]) //Data List
    var TotalCost = 0;
    const [currencyName, setCurrencyName] = useState('')// this is used on search on the beginning of the form registration


    const getCurrency = (currencyName) => {
        StockRepository.getSettingByName(currencyName, authHeader).then((res) => {
          setCurrencyName(res.data.value)
        })
      }

    useEffect(() => {
        getCurrency("currency")
    }, [])
    return (

        <TableOpen>
            <TableHead>
                <td> Item </td>
                <td> Date </td>
                <td> Qty </td>
                <td>Total </td>
                <td className='cashCol'> Total</td>
                {userType == 'admin' && <td className='delButton'>Option</td>}

                {saless.map((pc, index) => {
                    var total = pc.sale_unit_cost * pc.sold_qty
                    TotalCost += total

                    return (
                        <tr key={index}>
                            <td>{pc.itemName}</td>
                            <td>{pc.date_time}</td>
                            <td>
                                {(!pc.user_name || pc.user_name === 'null') ? <span style={{ color: 'red' }}>deleted</span>
                                    : pc.user_name + ' ' + pc.user_surname}
                            </td>
                            <td>{pc.sold_qty.toLocaleString()}</td>
                            <td>{pc.sale_unit_cost.toLocaleString()}</td>
                            <td className='cashCol'> {currencyName} {total.toLocaleString()}</td>
                            {userType == 'admin' &&
                                <ListOptioncolWithDeactivate getEntityById={() => getSalesById(pc.id, pc.itemName, pc.itemsId)}
                                    delEntityById={() => delPurchaseById(pc.id)} />

                            }
                        </tr>

                    )
                })}

            </TableHead>
        </TableOpen>
    )
}

export default SalesSummaryDataTable