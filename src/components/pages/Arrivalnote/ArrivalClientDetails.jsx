import React, { useContext, useState } from 'react'
import ListOptioncol, { TableOpen } from '../../Global/ListTable'
import { TableHead } from '@mui/material'
import StockRepository from '../../services/StockServices/StockRepository'

export const ArrivalDetailsContent = ({ closeclient ,arrivalSelectionHandler }) => {

    const {clientByArrival, setClientByArrival} = useContext({
        name: '', surname: '', tin_number: '', telephone: ''
    })
    const findClientnames = (arrival_id) => {
        StockRepository.findClientnames(arrival_id, authHeader).then((res) => {
            setArrival_id(arrival_id)
            setCloseClient(true)
            setClientByArrival({
                name: res.data.name,
                surname: res.data.surname,
                tin_number: res.data.tin_number,
                telephone: res.data.telephone
            })
        })
    }

    return (<>
     <DropDownInput handle={arrivalSelectionHandler} name='Arrival Number' label='Bollard' >
                {arrival_notes.map((arrival) => (
                  <option value={arrival.id} key={arrival.id}>    {arrival.id}</option>
                ))}
              </DropDownInput>
        {closeclient && <>
            <InputReadOnly name='Client Name' val={clientByArrival.name} label='name' />
            <InputReadOnly name='Client Surname' val={clientByArrival.surname} label='surname' />
            <InputReadOnly name='Client TIN' val={clientByArrival.tin_number} label='tin' />
            <InputReadOnly name='Client Telephone' val={clientByArrival.telephone} label='telephone' />
        </>
        }
    </>)






}
