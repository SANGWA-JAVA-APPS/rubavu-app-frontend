import React, { useContext, useEffect, useRef } from 'react'



import { Button, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { SmallSplitter, Splitter } from './Splitter'
import { ItemsContainer } from './ItemsContainer'
import { TitleSmallDesc } from './TitleSmallDesc'
import { useReactToPrint } from 'react-to-print'


const Printtemplate = React.forwardRef((props, ref) => {


    const { title, leftAddress, rightSideAddress, contentTitle, children, startPrinting } = props;
    // const componentRef = useRef();


    useEffect(() => {
        document.body.style.backgroundColor = '#ccc'
    }, [])

    const formatDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const handlePrint = useReactToPrint({
        content: () => ref?.current || null,
        documentTitle: 'printabledata'
    });
    return (
        <ItemsContainer full={props.full} ref={ref} positioning="d-flex justify-content-center"
            moreclass="mb-5   print-container page-break printTemplate" >
            <SmallSplitter />
            <Row className="d-flex justify-content-start printTopTitle">
                <Col md={6}  >
                    <TitleSmallDesc title={` ${title} `} />
                </Col>
            </Row>
            <Col className='col-10  mt-3 contentStart    ' style={{ position: 'relative', backgroundColor: '#fff', minWidth: '700px', boxShadow: "0 0 8px blue", border: '1px solid #000', minHeight: '1000px' }}>
                <Row className="mt-5  ms-3 d-flex justify-content-center  ">
                    <Col md={11} className='col-11 p-2' style={{ border: '1px solid #ccc' }}>
                        <Row>
                            <Col md={5}>{leftAddress}
                                <Col md={12}>Date: {formatDate()}</Col>
                            </Col>
                            <Col md={6} className="pe-5 text-end">{rightSideAddress} </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className='d-flex  ms-3 d-flex justify-content-center'  >
                    <Col md={11} className="col-11 mt-4 avoid-break" style={{ border: '1px solid #ccc' }}>
                        <Splitter />
                        <Row className='customData   '>
                            {/* here is to change the title ,it is used ono the arrival notice */}
                            {props.diffTitleSize ?
                                <p style={{ fontSize: '25px', fontWeight: 'bolder', textAlign: 'center', fontFamily: 'Arial !important' }} className={`text-uppercase bigOnPrint  `}><u>{contentTitle}</u></p>
                                :
                                <h4 STYLE={{ fontSize: '25px', textAlign: 'center' }} className={`text-uppercase  bigOnPrint `}><u>{contentTitle}</u></h4>
                            }
                            <Col className="col-12 mt-4"></Col>
                            {children}
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col md={2} className="col-2 printButtonoff p-5">
                <Button onClick={handlePrint} href='#' className="btn btn-dark">Print</Button>
            </Col>
        </ItemsContainer>
    )
})
export default Printtemplate