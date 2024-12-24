import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Icon from 'react-icons-kit'
import { bin } from 'react-icons-kit/icomoon/bin'
import { ic_print_outline as print } from 'react-icons-kit/md/ic_print_outline'
function TopPart({ totalitems, handleAddFields, plusIcon, handleSubmit, confirmIcon, clearAll }) {
    return (
        <Row className='border mt-2     d-flex justify-content-center'>
            <Col md={8} className="topmenus  ">
                <Row className='buttonss d-flex justify-content-end '>
                    <Col style={{ color: '#12a8e3' }}>
                        {totalitems}
                    </Col>
                    <Col>   <Icon size={25} className='btn-link' style={{ cursor: 'pointer', color: '#000', marginRight: "10px" }} icon={print} />                    </Col>
                    <Col md={2}>
                        <button style={{ width: "20px", marginLeft: "20px" }}
                            title="Add Item" onClick={handleAddFields} className=' ml-0 p-0 btn'>
                            <Icon size={25} style={{ color: '#12a8e3', marginRight: "10px" }} icon={plusIcon} />
                        </button>
                        <button style={{ width: "20px", marginLeft: "20px" }}
                            title="Confirm" onClick={handleSubmit} className=' ml-0 p-0 btn'>
                            <Icon size={25} style={{ color: '#097740', marginRight: "10px" }} icon={confirmIcon} />
                        </button>

                        <button style={{ width: "20px", marginLeft: "20px" }}
                            title="Confirm" onClick={clearAll} className=' ml-3 p-0 btn'>
                            <Icon size={25} style={{ color: 'red', marginRight: "10px" }} icon={bin} />
                        </button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default TopPart