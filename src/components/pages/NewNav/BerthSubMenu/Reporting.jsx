import React from 'react'
import { Col } from 'react-bootstrap'
import { TitleDesscNormal } from '../../../globalcomponents/TitleSmallDesc'
import { BadgeContent, TitleAndListNormal } from '../../../globalcomponents/TitleAndList'

export const Reporting = () => {
  return (
    <>
    <Col md={12} className='lightBg p-5'>
        <TitleDesscNormal title={"Vessels Reports"} 
            desc={
                <TitleAndListNormal smallerTitleOn={true}
                    badge1={<>
                        {/* <BadgeContent content="new" />
                        <BadgeContent content="search entries by date" /> */}

                    </>}
                    li1="All Vessels"
                    li2="Booked Vessels"
                    li3="Vessels by Client" 
                     
                    />

            } />

    </Col>
    <Col md={12} className='lightBg p-5 mt-3'>
        <TitleDesscNormal title={"Bookings Reports"}
            desc={
                <TitleAndListNormal smallerTitleOn={true}
                    badge1={<>
                        {/* <BadgeContent content="new" />
                        <BadgeContent content="search entries by date" /> */}
                    </>}
                    li1="Booking by Status"
                    li2="Booking by Period"
                    li3="Booking by Client" />
            } />
    </Col>
    <Col md={12} className='lightBg p-5 mt-3'>
        <TitleDesscNormal title={"Berthing Reports"}
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
