import React from 'react'
import { Col } from 'react-bootstrap'
import { TitleDesscNormal } from '../../../globalcomponents/TitleSmallDesc'
import { BadgeContent, TitleAndListNormal } from '../../../globalcomponents/TitleAndList'

export const Reports = () => {
  return (
    <>
    <Col md={12} className='lightBg p-5'>
        <TitleDesscNormal title={"Entries"} 
            desc={
                <TitleAndListNormal smallerTitleOn={true}
                    badge1={<>
                        <BadgeContent content="new" />
                        <BadgeContent content="search entries by date" />

                    </>}
                    li1="List entry"
                    li2="Search By Date"
                      />

            } />

    </Col>
    <Col md={12} className='lightBg p-5 mt-3'>
        <TitleDesscNormal title={"Cargo"}
            desc={
                <TitleAndListNormal smallerTitleOn={true}
                    badge1={<>
                        <BadgeContent content="new" />
                        <BadgeContent content="search entries by date" />
                    </>}
                    li1="List entry "
                    li2="Search By Date"
                      />
            } />
    </Col>
    <Col md={12} className='lightBg p-5 mt-3'>
        <TitleDesscNormal title={"Clients"}
            desc={
                <TitleAndListNormal smallerTitleOn={true}
                    badge1={<>
                        <BadgeContent content="new" />
                        <BadgeContent content="search entries by date" />
                    </>}
                    li1="List of Clients"
                    li2="Search By Name"
                    li3="Unfinished entries" />
            } />
    </Col> 
    <Col md={12} className='lightBg p-5 mt-3'>
        <TitleDesscNormal title={"Revenue"}
            desc={
                <TitleAndListNormal smallerTitleOn={true}
                    badge1={<>
                        <BadgeContent content="new" />
                        <BadgeContent content="search entries by date" />
                    </>}
                    li1="Revenue Report"
                    li2="Search By Date, Amount"
                    />
            } />
    </Col> 
</>
  )
}
