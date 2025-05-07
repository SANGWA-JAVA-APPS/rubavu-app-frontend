
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { InputOnly, InputOnlyReadOnly } from "../../Global/Forms/InputRow";
import { ButtonContext } from "../../globalcomponents/ButtonContext";
import { cross as remove } from 'react-icons-kit/icomoon/cross'
import Icon from "react-icons-kit";
import InputRow, { DropDownInput, DropDownInputPad } from "../../Global/InputRow";
import { YesNoDialog } from "../../globalcomponents/YesNoDialog";
import { ColItemContext } from "../../Global/GlobalDataContentx";
import { TableOpen } from "../../Global/ListTable";
import { Link } from "react-router-dom";
import OtherStyles from "../../Styles/OtherStyles";
import { useCollectTypeContext } from "../../Global/CollectTypeContext";
export default function MultipleInputs() {
    const { handleChange, removeInput, inputs, setInputs, showDialog, setShowDialog, handleYes, confirm, alertModal,
        newSourceId, setnewSourceId, newDestId, setnewDestId,
        cargoTypes } = useContext(ButtonContext);

    const { sourceId, destId } = useContext(ColItemContext)


    const [showWeightTyopes, setShowWeightTypes] = useState(false)
    const { collect_type } = useCollectTypeContext()
    const setTableWeightType = (cargo, i, index) => {
        handleChange(index, "weighttype", cargo)
        alert(index)

    }

    return (
        <div>
            <h4 className="fw-bold">Tally Information   </h4>
            <YesNoDialog
                show={showDialog} handleClose={() => setShowDialog(false)} handleYes={handleYes}
                confirm={confirm}
            />

            {inputs.map((input, index) => (
                <> <Row key={index} className="mb-2">
                    <Col style={{ maxWidth: '40px' }} className="  ms-1 ps-3">{(index + 1)}{'.'} </Col>

                    {/* Type Input */}

                    <Col className="m-0 pe-0  ">
                        <InputOnly
                            name="Description" moreclass="w-100" val={input.cargo}
                            handle={(e) => handleChange(index, "cargo", e.target.value)}
                            label='descriptiont' />
                    </Col>
                    <Col className="m-0 pe-0">
                        <InputOnly
                            num={true} name={`${collect_type==='Assorted' ?  'Total Quantity': 'Quantity'} `} val={input.unit}
                            handle={(e) => handleChange(index, "unit", e.target.value)}
                            placeholder="qty" label="qty"
                        />
                    </Col>
                    <Col className="m-0 pe-0">
                        <select style={{ height: '60px', width: '150px' }} className="form-select  p-3"
                            value={input.weighttype}
                            onChange={(e) => handleChange(index, "weighttype", e.target.value)} required   >
                            <option></option>
                            <option value={1}>{"sacs & bags < 100kg"}</option>
                            <option value={2}>{"jerry cans up to 25"}</option>
                            {/* <option value={3}>{"package laden cartons cons. material"}</option> */}
                            <option value={3}>{"Others"}</option>
                        </select>

                    </Col>
                    <Col className="m-0 pe-0">
                        <InputOnly num={true} name={`${collect_type==='Assorted' ?  'Total Weight': 'Weight'} `} 
                        val={input.weight} handle={(e) => handleChange(index, "weight", e.target.value)}
                            placeholder={`${collect_type==='Assorted' ?  'Total Weight': 'Weight'} `} label="lbldimension" />
                    </Col>

                    {/* Read-Only Inputs */}
                    <Col className="m-0 pe-0">
                        <InputOnly
                            name="obervation" readonly val={input.description}
                            handle={(e) => handleChange(index, "description", e.target.value)}
                            label="obervation" moreclass="w-100" />
                    </Col>
                    {collect_type!=='assorted' &&
                    <Col className="m-0 pe-0">
                        <InputOnlyReadOnly num={true} name="Total Items"
                            val={Number(input.unit * input.weight)} handle={(e) => handleChange(index, "totalItems", e.target.value)}
                            placeholder="Total Items" moreclass="p-4 w-75" label="lbldimension" />
                    </Col>
                        }
                    {/* Remove Button */}
                    <Col>
                        <Button title="remove item" variant="outline-danger" className="p-1 mt-2" onClick={() => alertModal(index)} disabled={inputs.length === 1}>
                            <Icon size={16} icon={remove} />
                        </Button>
                    </Col>
                </Row>
                </>
            ))}

        </div >
    )
}


const WeightTypes = ({ show, onHide, children, handleClose }) => {


    // const {setTableWeightType}=useContext(ButtonContext)
    return (
        <Modal
            show={show}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Weight Types
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {children}

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}