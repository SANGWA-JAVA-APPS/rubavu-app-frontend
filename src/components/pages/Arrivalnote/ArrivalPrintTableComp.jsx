import React, { useContext } from 'react'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import Icon from 'react-icons-kit'
import { printer } from 'react-icons-kit/icomoon/printer'
import { Link } from 'react-router-dom'
export const ArrivalPrintTableComp = () => {
    return (
        <thead>
            <td className="mt-2 border-bottom text-center">No.</td>
            <td className="mt-2 border-bottom ">Description</td>
            <td className="mt-2 border-bottom text-center">Qty</td>
            <td className="mt-2 border-bottom text-center">Quantity Type </td>
            <td className="mt-2 border-bottom text-center">Total Weigt</td>
            <td className="mt-2 border-bottom ">Observation</td>
            <td className="mt-2 border-bottom ">Collect Type</td>
        </thead>
    )
}

export const ArrivalTallyRows = ({ tly, index, collectType }) => {
    const { weitypeLabels } = useContext(ColItemContext)
    return (
        <tr key={index}>
            <td className="mt-2 border-bottom text-center" style={{ textTransform: 'capitalize' }}>{index + 1}.</td>
            <td className="mt-2 border-bottom " style={{ textTransform: 'capitalize' }}>{tly.cargo}</td>
            <td className="mt-2 border-bottom text-center" style={{ textTransform: 'capitalize' }}>{tly.unit}</td>
            <td className="mt-2 border-bottom text-center" style={{ textTransform: 'capitalize' }}>
                {weitypeLabels(tly.weighttype * tly.unit)}</td>
            <td className="mt-2 border-bottom text-center" style={{ textTransform: 'capitalize' }}>{ collectType === 'Assorted' ?  tly.weight : tly.weight  * tly.unit  }Kg</td>
            <td className="mt-2 border-bottom " style={{ textTransform: 'capitalize' }}>{tly.description} </td>
            <td className="mt-2 border-bottom " style={{ textTransform: 'capitalize' }}>{tly.cargoAssorted} </td>
            
        </tr>
    )
}
export const ArrivalPurchaseRows = ({ tly, index }) => {
    const { weitypeLabels } = useContext(ColItemContext)
    return (
        <tr key={index}>
            <td className="mt-2 border-bottom text-center" style={{ textTransform: 'capitalize' }}>{index + 1}.</td>
            <td className="mt-2 border-bottom " style={{ textTransform: 'capitalize' }}>{tly.cargo}</td>
            <td className="mt-2 border-bottom text-center" style={{ textTransform: 'capitalize' }}>{tly.unit}</td>
            <td className="mt-2 border-bottom text-center" style={{ textTransform: 'capitalize' }}>
                {weitypeLabels(tly.weighttype)}</td>
            <td className="mt-2 border-bottom text-center" style={{ textTransform: 'capitalize' }}>{tly.weight} Kg</td>
            <td className="mt-2 border-bottom " style={{ textTransform: 'capitalize' }}>{tly.description} </td>
            
        </tr>
    )
}
export const ArrivalSaleRows = ({ tly }) => {
    const { weitypeLabels } = useContext(ColItemContext)
    return (<tr key={index}>
        <td className="mt-2 border-bottom text-center" style={{ textTransform: 'capitalize' }}>{index + 1}.</td>
        <td className="mt-2 border-bottom " style={{ textTransform: 'capitalize' }}>{tly.cargo}</td>
        <td className="mt-2 border-bottom text-center" style={{ textTransform: 'capitalize' }}>{tly.unit}</td>
        <td className="mt-2 border-bottom text-center" style={{ textTransform: 'capitalize' }}>
            {weitypeLabels(tly.weighttype)}</td>
        <td className="mt-2 border-bottom text-center" style={{ textTransform: 'capitalize' }}>{tly.weight} Kg</td>
        <td className="mt-2 border-bottom " style={{ textTransform: 'capitalize' }}>{tly.description} </td>
       
    </tr>)
}