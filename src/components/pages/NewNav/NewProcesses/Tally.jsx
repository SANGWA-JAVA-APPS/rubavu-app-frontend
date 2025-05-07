import React from 'react'
import { TitleSmallDesc } from '../../../globalcomponents/TitleSmallDesc'
import TallyForm from '../../Tally/TallyForm'
import Purchase from '../../Purchase/Purchases'
import Sales from '../../sale/Sales'
import PurchaseForm from '../../Purchase/PurchaseForm'

function Tally() {
  return (
    <>
      <TitleSmallDesc title="  Tally" desc="Make Tally for Warehouse or transshipment" />
      <TallyForm />
      <Purchase/>
      <Sales />
    </>
  )
}

export default Tally