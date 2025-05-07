import React from 'react'
import { Col } from 'react-bootstrap'
import { TitleDesscNormal } from '../../../globalcomponents/TitleSmallDesc'
import { BadgeContent, TitleAndListNormal } from '../../../globalcomponents/TitleAndList'

export const Vessel = () => {
  return (
    <>
    <Col md={12} className='lightBg p-5'>
        <TitleDesscNormal title={"Vessel Truck"}
            desc={
                <TitleAndListNormal smallerTitleOn={true}
                    badge1={<>
                        <BadgeContent content="new" />
                        <BadgeContent content="search entries by date" />

                    </>}
                    li1="Add entry"
                    li2="Search By Date"
                    li3="Unfinished entries" />

            } />

    </Col>
    <Col md={12} className='lightBg p-5 mt-3'>
        <TitleDesscNormal title={"Vessel Warehouse"}
            desc={
                <TitleAndListNormal smallerTitleOn={true}
                    badge1={<>
                        {/* <BadgeContent content="new" />
                        <BadgeContent content="search entries by date" /> */}
                    </>}
                    li1="Add entry"
                    li2="Search By Date"
                    li3="Unfinished entries" />
            } />
    </Col>
     
     
</>
  )
}
