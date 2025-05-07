import React, { useContext } from 'react'
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import SearchResultTable from './SearchResultTable'
import Icon from 'react-icons-kit'
import { cross as remove } from 'react-icons-kit/icomoon/cross'
import { ColItemContext } from '../../Global/GlobalDataContentx'

//child of Billform
function SalePurchaseForm({field,index,handleInputChange,handleHideDiv,handleRemoveFields,
    showLoader,    resultTableVisible,     searchDone, delItemsById,     userType,itemssbyname}) {
    const {   handleKeyPress } = useContext(ColItemContext); // Use the context
    const {selectedItem} = useContext(ColItemContext);
    return (
        <Row key={index} className="mb-2 pb-5 singleItem" >
            <Col md={12} >
                <h4><b>item {index + 1} - <span style={{color:'#12a8e3'}}>{field.itemsId} </span> </b></h4>
            </Col>
            {/*             --------------------------item Name*/}
            <Col md={5} className=''>
                <FloatingLabel controlId="floatingInput" label="Item name" className="smallpad mb-3 m-0 p-0">
                    <Form.Control type="email txt" className='m-0 txt'
                        placeholder="Item" style={{ boxShadow: 'none' }}
                        value={field.itemsId} name="itemsId"
                        onChange={(event) => handleInputChange(index, event)}
                        onKeyDown={handleKeyPress} />
                        
                </FloatingLabel>
            </Col>
            {/*             -------------------------- Unit cost*/}
            <Col md={3} className=''>
                <FloatingLabel controlId="floatingInput" label="unit cost" className="smallpad mb-3 m-0 p-0">
                    <Form.Control type="number" className='m-0 txt'
                        placeholder="Unit Cost" style={{ boxShadow: 'none' }}
                        value={field.sale_unit_cost} name="sale_unit_cost"
                        onChange={(event) => handleInputChange(index, event)}
                        onKeyDown={handleKeyPress} />
                </FloatingLabel>
            </Col>
            {/*             --------------------------Quantity*/}
            <Col md={3} className=''>
                <Row style={{ position: 'relative' }}>
                    <Col md={10} >
                        <FloatingLabel controlId="floatingInput" label="Quantity" className=" smallpad mb-3">
                            <Form.Control type="number" className='m-0 txt' placeholder="Quantity"
                                value={field.sold_qty} name="sold_qty" style={{ boxShadow: 'none' }}
                                onChange={(event) => handleInputChange(index, event)}
                                onKeyDown={handleKeyPress} />
                        </FloatingLabel>
                    </Col>
                    <span style={{ width: "20px", marginLeft: "20px" }}
                        title="Update Record" onClick={() => handleRemoveFields(index)} className=' m-0 mt-2 p-0 btn '>
                        <Icon size={10} style={{ color: '#ff0000', marginRight: "5px" }} icon={remove} />
                    </span>
                </Row>
            </Col>
            {/* Display the traceable value in a Table below the input */}
            {field.show && (
                <div style={{ position: "relative", padding: "10px", marginTop: "20px" }}>
                    <span>
                        <p>Search Result for: <b> {field.item} </b> </p>
                        {showLoader &&
                            <Row className='loader d-flex justify-content-center' >
                                <Col className="" md={12} style={{ height: '50px' }}></Col>
                            </Row>
                        }
                        <Row>
                            <SearchResultTable resultTableVisible={resultTableVisible}
                                itemssbyname={itemssbyname} searchDone={searchDone} delItemsById={delItemsById}
                                userType={userType} />
                        </Row>
                    </span>
                    <button type='button' style={{ position: "absolute", top: "0px", right: "5px", width: "20px", marginLeft: "20px" }}
                        title="Update Record" onClick={() => handleHideDiv(index)} className=' ml-0 p-0 btn'>
                        <Icon size={15} style={{ color: '#ff0000', marginRight: "10px" }} icon={remove} />
                    </button>

                </div>
            )}

        </Row>
    )
}

export default SalePurchaseForm