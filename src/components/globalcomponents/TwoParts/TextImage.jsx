import React from 'react'
import { TwoHorizontalParts } from './TwoHorizontalParts'
import { Col, Row } from 'react-bootstrap'

export const TextImage = ({ img, title, desc, justified, moreContent,hideUnderLine, underlinepos }) => {
    return (
        <TwoHorizontalParts partOne={
            <> <h1 className={`title ${underlinepos} `}>{title}
               {!hideUnderLine &&
                 <p>
                        <Row className='d-flex justify-content-start'>
                            <Col style={{border:'5px solid #ffa200'}} className='col-4 ms-3 mt-3'> </Col>
                        </Row>
                    </p>}
            </h1>
                <p style={{ textAlign: justified ? 'justify' : 'center' }} className='titleDesc'>{desc}</p>
                <Row style={{ bottom: '0px', position: 'absolute' }} className="morecontentParent  w-100    ">{moreContent}</Row>
            </>
        } partTwo={
            <img className='scaleOnHover img-fluid thumbnail rounded' alt="..." src={img} />
        } />
    )
}
