import React, { useContext, useEffect, useRef } from 'react'
import { ItemsContainer } from '../../globalcomponents/ItemsContainer'
import { TitleSmallDesc } from '../../globalcomponents/TitleSmallDesc'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { SmallSplitter, Splitter } from '../../globalcomponents/Splitter'
import Printtemplate from '../../globalcomponents/Printtemplate'
import PagesWapper from '../../Global/PagesWapper'
import { PrintRow, PrintSignature } from '../../Global/Utils'

export const BerthPrint = () => {
  const { obj } = useContext(ColItemContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (!obj || !obj.vesselName) {
      navigate('/bollardsform')
    }
  }, [obj])
  const componentRef = useRef();

  return (
    <PagesWapper>
      <Printtemplate
        ref={componentRef}
        leftAddress="MAGERWA"
        title={`Print a Berth note - ${obj.vesselName}`}
        rightSideAddress="RUBAVU PORT"
        contentTitle={`BERTHING NOTE  `} >

        <PrintRow txt="Berth ID" txtValue={obj.id} />
        <PrintRow txt="ATA" txtValue={(obj.ata).split('T')[0] + ' ' + (obj.ata).split('T')[1]} />
        <PrintRow txt="ETD" txtValue={obj.etd} />
        <PrintRow txt="Bollard /vessel" txtValue={obj.bollard_or_vessel} />
        <PrintRow txt="Vessel / bollard_refId" txtValue={obj.vessel_or_bollard_refId} />
        <PrintRow txt="Vessel_arr_draft" txtValue={obj.vessel_arr_draft} />
        <PrintRow txt="Description" txtValue={obj.description} />

        <h4 className="mt-5 text-underline"><u>Vessel</u></h4>
        <PrintRow txt="Plate Number" txtValue={obj.plate_number} />
        <PrintRow txt="Dimension(m)" txtValue={obj.dimension} />
        <PrintRow txt="Capacity(tons)" txtValue={obj.capacity} />
        <PrintRow txt="Owner/operator" txtValue={obj.owner_operator} />
        <PrintRow txt="RURA certificate" txtValue={obj.rura_certificate} />
        <PrintRow txt="LOA(m)" txtValue={obj.loa} />
        <PrintSignature />  
      </Printtemplate>
    </PagesWapper>

  )
}
