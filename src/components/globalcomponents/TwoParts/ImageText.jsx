import React from 'react'
import { TwoHorizontalParts } from './TwoHorizontalParts'
import { ItemsContainer } from '../ItemsContainer'
import { Col, Row } from 'react-bootstrap'



export const ImageText = ({ img, title, desc, justified, moreClassOne, moreClassTwo,hideUnderLine, underlinepos }) => {
    return (
        // <ItemsContainer>
        <TwoHorizontalParts partOne={

            <img className='scaleOnHover img-fluid thumbnail   rounded' alt="..." src={img} />
        } partTwo={
            <> <h1 className={`title ${underlinepos} `} >{title}
               {!hideUnderLine &&
           
                <p>
                    <Row className='d-flex justify-content-start'>
                        <Col style={{ border: '5px solid #ffa200' }} className='col-4 ms-3 mt-3'> </Col>
                    </Row>
                </p>    }
            </h1>
                <p style={{ textAlign: justified ? 'justify' : 'center' }} className='titleDesc'>{desc}</p> </>
        }
            moreClassOne={moreClassOne}
            moreClassTwo={moreClassTwo}
        />
        // </ItemsContainer>
    )
}
