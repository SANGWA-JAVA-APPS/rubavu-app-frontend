import React, { useRef } from 'react'
import { Col, Row } from 'react-bootstrap'
import { UseInView } from './UseInView';
import { Fade, Slide } from 'react-reveal';
import Icon from 'react-icons-kit';

export const TitleSmallDesc = ({ title, desc, smallDesc, titmespaceTop, color, hideUnderLine, underlinepos, moreclass }) => {

    const elementRef = useRef(null);
    const isInView = UseInView(elementRef, 100); // Add 100px offset
    return <>
        <span ref={elementRef}>
            <Slide delay={500} up duration={500} when={isInView} >
                <h1 className={`title spacer ${underlinepos} `}
                    style={{ textAlign: 'left', color: color, margin: titmespaceTop ? '20px auto' : 'auto auto 20px auto' }}>   {title}
                    {!hideUnderLine &&
                        <p>  <Row className='d-flex justify-content-start'>
                            <Col style={{ border: '3px solid #ffa200' }} className='col-3 ms-2 mt-2'> </Col>
                        </Row>  </p>}
                </h1>
                {smallDesc ?
                    <Row className='d-flex  justify-content-center'>
                        <Col className="col-12 " md={7}>
                            <Fade delay={600}>
                                <p className='titleDesc smallDesc' style={{ textAlign: 'left', justifyContent: 'center' }}>{desc}</p>
                            </Fade>
                        </Col>
                    </Row>
                    :
                    <Fade delay={600}>
                        <p className={`titleDesc ${moreclass}`} style={{ textAlign: 'left', color: color, justifyContent: 'center' }}>{desc}</p>
                    </Fade>
                }

            </Slide>
        </span >
    </>

}

export const TitleSmallDescOnPrint = ({ title, desc, smallDesc, titmespaceTop, color, hideUnderLine, underlinepos, moreclass }) => {

    const elementRef = useRef(null);
    const isInView = UseInView(elementRef, 100); // Add 100px offset
    return <>


        <h1 className={`title spacer ${underlinepos} `}
            style={{ textAlign: 'left', color: color, margin: titmespaceTop ? '20px auto' : 'auto auto 20px auto' }}>   {title}
            {!hideUnderLine &&
                <p>
                    <Row className='d-flex justify-content-start'>
                        <Col style={{ border: '3px solid #ffa200' }} className='col-3 ms-2 mt-2'> </Col>
                    </Row>  </p>}
        </h1>
        {smallDesc ?
            <Row className='d-flex  justify-content-center'>
                <Col className="col-12 " md={7}>

                    <p className='titleDesc smallDesc' style={{ textAlign: 'left', justifyContent: 'center' }}>{desc}</p>

                </Col>
            </Row>
            :
            <p className={`titleDesc ${moreclass}`} style={{ textAlign: 'left', color: color, justifyContent: 'center' }}>{desc}</p>

        }


    </>

}
export const TitleSmallDescNoSlide = ({ title, desc, smallDesc, titmespaceTop, color, hideUnderLine, underlinepos, moreclass }) => {
    return <>
        <span  >

            <h1 className={`title spacer ${underlinepos} `}
                style={{ textAlign: 'left', color: color, margin: titmespaceTop ? '20px auto' : 'auto auto 20px auto' }}>   {title}
                {!hideUnderLine &&
                    <p>  <Row className='d-flex justify-content-start'>
                        <Col style={{ border: '3px solid #ffa200' }} className='col-3 ms-2 mt-2'> </Col>
                    </Row>  </p>}
            </h1>
            {smallDesc ?
                <Row className='d-flex  justify-content-center'>
                    <Col className="col-12 " md={7}>
                        <Fade delay={600}>
                            <p className='titleDesc smallDesc' style={{ textAlign: 'left', justifyContent: 'center' }}>{desc}</p>
                        </Fade>
                    </Col>
                </Row>
                :
                <Fade delay={600}>
                    <p className={`titleDesc ${moreclass}`} style={{ textAlign: 'left', color: color, justifyContent: 'center' }}>{desc}</p>
                </Fade>
            }

        </span >
    </>

}

export const TitleSmallDescTwo = ({ title, desc, smallDesc, titmespaceTop, color, hideUnderLine, underlinepos, moreclass }) => {
    const elementRef = useRef(null);
    const isInView = UseInView(elementRef, 100); // Add 100px offset
    return <>
        <span ref={elementRef}>
            <Slide delay={500} up duration={500} when={isInView} >
                <h1 className={`title spacer ${underlinepos} `}
                    style={{ textAlign: 'left', color: color, margin: titmespaceTop ? '20px auto' : 'auto auto 20px auto' }}>   {title}
                    {!hideUnderLine &&
                        <p>  <Row className='d-flex justify-content-start'>
                            <Col style={{ border: '3px solid #ffa200' }} className='col-7 ms-2 mt-2'> </Col>
                        </Row>  </p>}
                </h1>
                {smallDesc ?
                    <Row className='d-flex  justify-content-center'>
                        <Col className="col-12 " md={7}>
                            <Fade delay={600}>
                                <p className='titleDesc smallDesc' style={{ textAlign: 'left', justifyContent: 'center' }}>{desc}</p>
                            </Fade>
                        </Col>
                    </Row>
                    :
                    <Fade delay={600}>
                        <p className={`titleDesc ${moreclass}`} style={{ textAlign: 'left', color: color, justifyContent: 'center' }}>{desc}</p>
                    </Fade>
                }

            </Slide>
        </span >
    </>

}
export const TitleDesscNormal = ({ title, desc }) => {
    return (
        <>
            <h4 className="title">
                {title}
                <p>
                    <Row className='d-flex justify-content-start'>
                        <Col style={{ border: '1px solid #000' }} className='col-2 ms-3 mt-2'> </Col>
                    </Row>
                </p>
            </h4>
            <p>
                {desc}

            </p>
        </>
    )
}
