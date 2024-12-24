import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CustomModalPopup from '../../Global/CustomModalPopup'
import StockRepository from '../../services/StockServices/StockRepository';
import StockConn from '../../services/StockServices/StockConn';



function BeerColsTitleDesc({ mdl_items }) {

    const [modalTitle, setModalTitle] = useState('');
    const [content, setContent] = useState('');
    const [startPoint, setStartPoint] = useState(0)
    const [nextset, setNextset] = useState(50) // number of record
    const [modalShow, setModalShow] = useState(false);

    const productDetailsModalShow = (title, desc) => {
        // alert(id + ' , ' + name)

        setModalShow(true)
        setModalTitle(title)
        setContent(
            <>
                {/* <img src={img} width="200px" /> */}
                <p>{desc}</p>
            </>
        )
    }

    return (
        <>


            <CustomModalPopup
                title={modalTitle}
                content={content}
                show={modalShow} onHide={() => setModalShow(false)} />

            {mdl_items.map((res, index) => (
                <Col md={3} key={index}>
                    <h4 className='text-success'>{res.name}</h4>
                    <Row style={{ backgroundColor: '#fff' }}>
                        <Col md={4}>
                            {/* <img src={res.imagePath.path} width="99%" alt={res.items[34].imagePath[0].path} /> */}
                            {(res.imagePath !== undefined) &&
                                res.imagePath.map((img) => (
                                    <span>
                                        <img width={`95px`} src={`${StockConn.server.name + StockConn.port.val}images/${img.path}`} />
                                    </span>
                                ))

                            }
                        </Col>
                        <Col md={8}>
                            <div className='small p-5' style={{ backgroundColor: '#fff' }}>
                                <Link onClick={() => productDetailsModalShow(res.name, res.description)}> 
                                    {res.description} </Link>
                            </div>
                        </Col>
                    </Row>
                </Col>
            ))}



            {/* 

            <Col md={3}>
                <h4 className='text-success'>{title2}</h4>
                <Row style={{ backgroundColor: '#fff' }}>
                    <Col md={4} >
                        <img src={img2} width="99%" alt="loading..." />
                    </Col>
                    <Col md={8}>
                        <div className='small p-5' style={{ backgroundColor: '#fff' }}>
                            <Link onClick={() => productDetailsModalShow(title2, desc2, img2)}> {desc2} </Link>
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col md={3}>
                <h4 className='text-success'>{title3}</h4>
                <Row style={{ backgroundColor: '#fff' }}>
                    <Col md={4}>
                        <img src={img3} width="100%" alt="loading..." />
                    </Col>
                    <Col md={8}>
                        <div className='small p-5' style={{ backgroundColor: '#fff' }}>
                            <Link onClick={() => productDetailsModalShow(title3, desc3, img3)}> {desc3} </Link>
                        </div>
                    </Col>
                </Row>
            </Col> */}
        </>
    )
}

export default BeerColsTitleDesc