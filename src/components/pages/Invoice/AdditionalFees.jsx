import React, { useState } from 'react'
import { useEffect } from 'react'
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import StockCommons from '../../services/StockServices/StockCommons';
import { Col, Row } from 'react-bootstrap';

export default function AdditionalFees({ type, amountAdded, setAmountAdded, invId, setItemToEdit , refresh, setRefresh}) {
    const berthBaseValue = 28000
    const gateBaseValue = 5000
    const [inputValue, setInputValue] = useState(0);
    const [description, setDescription] = useState('');
    const base = type === 'berthing' ? berthBaseValue : type === 'gate' ? gateBaseValue : 0;
    //the user who is logged in
    const auth = useAuthUser();
    const user = auth();
    const authHeader = useAuthHeader()();
    const handleChange = (e) => {
        const entered = Number(e.target.value);
        setInputValue(entered);
        setAmountAdded(entered + base);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const additionalFee = {
            amount: inputValue,
            type: type,
            invoice_id: invId,
            done_by: user?.userid,
            description: description
        };

        const res = await StockCommons.saveInvAdditionalFee(additionalFee, authHeader);
        console.log(res.data);
        if (res.data != null) {
            alert("Additional fee saved successfully.");
            setItemToEdit(null)
              setRefresh(!refresh)
        }
    }

    return (<>
        <br />
        <form>
            <input type="number" enabled="false" min={0} step={base} value={inputValue} onChange={handleChange} />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} autoComplete='false' required />


            <Row className="m-0 p-0">
                <Col className="m-0 p-0">
                    <input type="submit" className="p-1 my-2 btn   btn-danger"  value="Cancel" style={{fontSize:'12px'}} />
                </Col>
                <Col className="m-0 p-0">
                    <input type="submit" className="p-1 my-2 btn  s btn-primary" onClick={(e) => handleSubmit(e)} value="Update"  style={{fontSize:'12px'}}/>
                </Col>
            </Row>
        </form>
    </>
    )

}

