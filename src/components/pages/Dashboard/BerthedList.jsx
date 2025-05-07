import React from 'react'
import { TableOpen } from '../../Global/ListTable'
import { TableHeadTwo } from '../../Global/TableHead'

export const BerthedList = ({ vessels }) => {
    let totBerthingNumber = 0
    return (
        <TableOpen>
            <TableHeadTwo>
                <td>Name </td>
                <td>Status</td>
                <td>Capacity </td>
                <td>ATA </td>
                <td>ETD   </td>

            </TableHeadTwo>
            <tbody>
                {vessels.map((vessel) => {
                    totBerthingNumber += 1
                    return (
                        <tr key={vessel.id}>
                            <td>{vessel.name}   </td>
                            <td>{vessel.status}   </td>
                            <td>{vessel.capacity} tons  </td>
                            <td>  {vessel.ata && (vessel.ata).split('T')[0] + ' ' + (vessel.ata).split('T')[1]}   </td>
                            <td>  {vessel.etd && (vessel.etd) + ' '}   </td>

                        </tr>
                    )
                })}</tbody>
        </TableOpen>
    )
}
