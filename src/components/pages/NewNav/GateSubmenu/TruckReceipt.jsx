import React from 'react'
import { Col } from 'react-bootstrap'
import { TitleDesscNormal } from '../../../globalcomponents/TitleSmallDesc'
import { BadgeContent, TitleAndListNormal } from '../../../globalcomponents/TitleAndList'
import { useNavigate } from 'react-router-dom'

export const TruckReceipt = () => {
    const navigate=useNavigate()
    const gotoEntry=()=>{
        navigate("/truckpaymentform")
    }
  return (
    <>
    <Col md={12} className='lightBg p-5'>
        <TitleDesscNormal title={"Truck Payment"} 
            desc={
                <TitleAndListNormal smallerTitleOn={true}
                    badge1={<>
                        {/* <BadgeContent content="new" />
                        <BadgeContent content="search entries by date" /> */}
                    </>}
                    eventOne={gotoEntry}
                    li1="Add Truck Receipt"
                    />

            } />

    </Col>
    
    
</>
  )
}
