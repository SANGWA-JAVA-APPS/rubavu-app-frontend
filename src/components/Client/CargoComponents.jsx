import React, { useState } from 'react'
import { TitleSmallDesc } from '../globalcomponents/TitleSmallDesc'
import { InputOnly } from '../Global/Forms/InputRow'
import { Button } from 'react-bootstrap'

export const CargoComponents = () => {
    return (
        <div>CargoComponents</div>
    )
}

export const CargoGrpByByItem = ({ clientsItems }) => {
     const localHead = {
        padding: '12px', color: '#fff'
    }
    const focuscols = {
        backgroundColor: '#f1f1f1',
    }
    return <>
        <TitleSmallDesc title="Entries By Cargo" />
        <table className='w-100  table-bordered'>
            <tr className="fw-bold" style={{ backgroundColor: '#1d6d7b', padding: '9px' }}>
                <td className="text-center" style={localHead}>Entries </td>
                <td className="text-center" style={localHead}>Cargo </td>
                <td className="text-center" style={localHead}>Quantity </td>
                <td className="text-center" style={localHead}>Weight </td>
            </tr>
            <tbody> {clientsItems.map((client, index) => (
                <tr>
                    <td className="text-center">{client.id}</td>
                    <td className="text-center">{client.arrivalNote}</td>
                    <td className="text-center" style={{ fontWeight: 'bold', color: '#000' }}>
                         {((client.quantity ?? 1)  ).toLocaleString()}  </td>
                    <td className="text-center" style={{ fontWeight: 'bold', color: '#000' }}> {((client.quantity ?? 1) * (client.weight ?? 1)).toLocaleString()}  KG</td>

                </tr>
            ))}
            </tbody>
        </table>
    </>
}
export const CargoGrpByArrivalByClient = ({ clients, handleChange, handleChangePeriod, handleUpdateClick,
    dataLoad ,indexForLoader
 }) => {

     
}