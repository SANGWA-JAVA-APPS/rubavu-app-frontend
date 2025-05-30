import React, { useContext } from 'react'
import { ColItemContext } from '../../Global/GlobalDataContentx'

export const InvoiceRows = ({ tally, index, serviceName }) => {
    const { weitypeLabels } = useContext(ColItemContext)
    return (
        <tr key={index} className=" border border-bottom">
            <td className=" border border-down text-center">
                {index + 1}
            </td>
            <td style={{ textTransform: 'capitalize' }} className=" border border-down ">
                {serviceName} -  {weitypeLabels(tally.weighttype)}
            </td>
            <td className=" border border-down text-center">
                {(tally.weight * (tally.unitPrice ?? 1)).toLocaleString()}
            </td>
            <td className=" border border-down text-center">
                {tally.unitPrice}
            </td>
            <td className=" border border-down text-center">
                {'Assorted' === tally.cargoAssorted ?
                        ( 
                            (tally?.weight ?? 1) *
                            (tally?.unitPrice ?? 1)).toLocaleString()
                        :
                        ((tally?.unit ?? 1) *
                            (tally?.weight ?? 1) *
                            (tally?.unitPrice ?? 1)).toLocaleString()

                }
            </td>
            <td className=" border border-down  ">
                {tally.description}
            </td>

        </tr>
    )
}

export const InvoiceHeader = () => {
    return (
        <thead  >
            <tr>
                <td className="text-center">S/N</td>
                <td className="">Description</td>
                <td className="text-center">Total Weight</td>
                <td className="text-center">Unit Price (Rwf/Kg)</td>
                <td className="text-center">Total Price</td>
                <td className="">Observation</td>

            </tr>
        </thead>
    )
}