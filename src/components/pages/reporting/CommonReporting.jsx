import React, { useContext, useState } from 'react'
import PagesWapper from '../../Global/PagesWapper'
import { ItemsContainer } from '../../globalcomponents/ItemsContainer'
import { TitleSmallDesc } from '../../globalcomponents/TitleSmallDesc'
import { DashboardReportsFilters } from '../Dashboard/DashboardReportsFilters'
import { SingleNumber } from './SingleNumber'
import Utils from '../../Global/Utils'
import { useEffect } from 'react'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import CustomModalPopup from '../../Global/CustomModalPopup'

export default function CommonReporting() {
  const { setModalSize, showModal, setShowModal, modalTitle } = useContext(ColItemContext)
  const { setupBycolor } = useContext(ColItemContext)

  useEffect(() => {
    setupBycolor()
    setModalSize('custom-modal_97')
  }, [])

  return (<>
    <CustomModalPopup show={showModal} onHide={() => setShowModal(false)} title={modalTitle} content="Loading ..." />
    <PagesWapper>
      <ItemsContainer>
        {/* <DashboardReportsFilters /> */}
        <TitleSmallDesc title=" Reporting" />
        <SingleNumber />

      </ItemsContainer>
    </PagesWapper>
  </>



  )
}
