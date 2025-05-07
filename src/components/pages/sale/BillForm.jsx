import React from 'react'
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import Icon from 'react-icons-kit'

import { cross as remove } from 'react-icons-kit/icomoon/cross'
import SearchResultTable from './SearchResultTable'
import SalePurchaseForm from './SalePurchaseForm'

// child of  MultipleItems
function BillForm({ myRef, handleSubmit, fields, handleInputChange, handleHideDiv, handleRemoveFields,
    resultTableVisible, searchDone, delItemsById, userType, showLoader,itemssbyname

}) {
    return (
        <Col md={7} ref={myRef} className=" mt-1 p-5 board" >
            {/* --------------------------form to add each item while saling or purchasing*/}
            <Form onSubmit={handleSubmit}>
                {fields.map((field, index) => (
                    <SalePurchaseForm
                        field={field} index ={index}handleInputChange={handleInputChange}itemssbyname={itemssbyname} handleHideDiv={handleHideDiv} handleRemoveFields={handleRemoveFields}
                        showLoader={showLoader} resultTableVisible={resultTableVisible}  
                        searchDone={searchDone} delItemsById={delItemsById} userType={userType}
                    />
                ))}


            </Form>
        </Col>
    )
}

export default BillForm