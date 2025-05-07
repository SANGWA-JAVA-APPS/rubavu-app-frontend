import React from 'react'

function DataRows({res, color}) {
    return (
        <tr style={{ backgroundColor: color }}>
            <td>{res.itemname}</td>
            <td>{res.date_time}</td>
            <td>  {res.in_out === 'in' ? 'Purchase' : 'Sale'}
            </td>
            <td>{res.current_qty}</td>
            <td>{res.remaining}</td>
            <td style={{backgroundColor:'#fad7c6'}}>RWf {res.remaining * 1240}</td>
            <td>
                <a className='btn button_skin4' href='#'>Sell</a>
            </td>
        </tr>
    )
}

export default DataRows