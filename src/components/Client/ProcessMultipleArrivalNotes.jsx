import React, { useContext, useEffect } from 'react'
import { Row, Col, Alert } from 'react-bootstrap';
import { ColItemContext } from '../Global/GlobalDataContentx'; // Adjust the path if needed
import { newspaper as client } from 'react-icons-kit/icomoon/newspaper'

import { DropDownInput } from '../Global/InputRow';
import { InputOnly } from '../Global/Forms/InputRow'
import { useState } from 'react';
import { StorageWithAsosrtedOrNot } from '../pages/Dashboard/StorageCalculation';
import StockCommons from '../services/StockServices/StockCommons';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import { Icon } from 'react-icons-kit'
import { pencil as edit } from 'react-icons-kit/icomoon/pencil'
import { cross as remove } from 'react-icons-kit/icomoon/cross'
import StockDelete from '../services/StockServices/StockDelete';
export const ProcessMultipleArrivalNotes = ({ refresh, setRefresh }) => {
    const { commonArrayTwo, setCommonArrayTwo, commonArray, setCommonArray } = useContext(ColItemContext);
    const [warning, setWarning] = useState('');
    const [inputQty, setInputQty] = useState('');
    const [processedWeight, setProcessedWeight] = useState('');
    const [filteredByDate, setFilteredByDate] = useState([]);

    const authHeader = useAuthHeader()();
    const auth = useAuthUser()
    const user = auth();

    const [userType, setUserType] = useState()

    const focuscols = {
        backgroundColor: '#f1f1f1',
    }
    const handleInputChange = () => {

    }
    const handleProcess = () => { }

    useEffect(() => {
        setUserType(localStorage.getItem('catname'))
    }, [refresh])

    const filterSameDates = () => {
        if (commonArrayTwo.length === 0) {
            setFilteredByDate([]);
            return;
        }
        // Get the date part and weight from the first row
        const firstDate = commonArrayTwo[0].date_time.split(' ')[0];
        const firstWeight = commonArrayTwo[0].weight;

        // Filter all rows that have the same date (ignoring time) AND same weight
        const group = commonArrayTwo.filter(item =>
            item.date_time &&
            item.date_time.split(' ')[0] === firstDate &&
            item.weight === firstWeight
        );
        setFilteredByDate(group);
        setCommonArray(group);
    }
    const [error, setError] = useState(''); // State for validation errors
    const [dataLoad, setDataLoad] = useState(false)

    const handleUpdateClick = async (arrivalId, quantity, newQuantity, itemId, index, totalAmount,
        totalWeights, period, assortedOrNot, paymentOption) => {//saving in the db


        // if ('Assorted'===assortedOrNot && newQuantity > totalWeights) {
        //     alert(`Error occured: Cannot update: New quantity (${newQuantity}) exceeds original quantity (${totalWeights}).`);
        //     setError(`Cannot update: New quantity (${newQuantity}) exceeds original quantity (${quantity}).`);
        //     return;
        // }
        if (quantity === undefined || quantity === null || newQuantity === undefined || newQuantity === null || totalAmount === 0 || totalAmount === null || totalWeights === undefined || totalWeights === null) {
            setError('Error: either  itemId or quantity, totalAmount, total Weight and new Quantity may be  null');
            alert('Error: either  itemId or quantity or new Quantity may be undefined or null');
            alert(quantity + ' ' + newQuantity + ' ' + totalAmount + ' ' + totalWeights)
            return;
        }

        if (newQuantity > quantity) {
            alert(`You have to provide the quantity not beyond: ${quantity}`)
            return;
        }
        
        console.log('------------- The udpated payments ----------------------' + quantity);
        console.log('Payment Option Selected:', paymentOption);

        await StockCommons.updateWarehouse(quantity, newQuantity, user.userid, totalAmount||0, totalWeights, period, filteredByDate,paymentOption, authHeader).then(res => {
            // setClients(updatedClients);
            alert(`Storage Invoice is generated and Cargo exit updated successfully  `);
            setRefresh(!refresh)
            setFilteredByDate([]);
            setCommonArrayTwo([]); 
        }).catch(err => {
            console.error('Error updating warehouse:', err);
            setError('An error occurred while updating the warehouse.');
        })
       
    }
    const editionHandle = async (id) => {
        // try{
            // const res = await StockDelete.deletewhMovementById(id);

        // }catch(err){
        //     alert('An error occured')
        // }
    }

    return (
        <Row>
            {warning && <Alert variant="warning">{warning}</Alert>}
            {filteredByDate.length > 0 && <StorageWithAsosrtedOrNot cargoDetails={filteredByDate} handleUpdateClick={handleUpdateClick} />}
            <Row>
                <Col md={9}></Col>
                <Col className=" d-flex justify-content-end pd-0">
                    <button className='btn btn-primary m-0' onClick={(e) => filterSameDates(e)}>Filter By date & Item</button>
                </Col>
            </Row>
            <Col md={12}>


                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>TIN Number</th>
                            <th>Name</th>
                            <th>Item Name</th>
                            <th>Arrival Time</th>
                            <th>Prev Qty</th>
                            <th>Current Qty</th>
                            <th>Weight</th>
                            <th>Last Date</th>
                            <th>Item ID</th>
                            <th>Assorted Or Not</th>
                            {userType == 'admin' && <th>Actions</th>}
                        </tr>
                    </thead>

                    <tbody>
                        {filteredByDate.map((item, ic) => (
                            <tr key={item.id || ic}>
                                <td>{item.id}</td>
                                <td>{item.tin_number}</td>
                                <td>{item.name}</td>
                                <td>{item.itemName}</td>
                                <td style={focuscols}>{item.date_time}</td>
                                <td>{item.prevQty}</td>
                                <td style={focuscols}>{item.cargoBalance && item.cargoBalance.localeString() || item.noGrpCargoBalance}</td>
                                <td>{item.weight}</td>
                                <td>{item.lastDate}</td>
                                <td>{item.itemId}</td>
                                <td>{item.assortedOrNot}</td>
                                {userType == 'admin' && <td>
                                    <button onClick={editionHandle} style={{ width: "40px", padding: "5px", cursor: "pointer" }} title="Update Record" className='btn'>
                                        <Icon size={16} style={{ color: '#0fd120' }} icon={remove} />
                                    </button>
                                </td>}
                            </tr>
                        ))}
                    </tbody>
                    <br />
                    <tbody>
                        {commonArrayTwo.map((whMovt, idx) => (
                            <tr key={whMovt.id || idx}>
                                <td>{whMovt.id}</td>
                                <td>{whMovt.tin_number}</td>
                                <td>{whMovt.name}</td>
                                <td>{whMovt.itemName}</td>
                                <td style={focuscols}>{whMovt.date_time}</td>
                                <td>{whMovt.prevQty}</td>
                                <td style={focuscols}>{whMovt.cargoBalance && whMovt.cargoBalance.localeString() || whMovt.noGrpCargoBalance}</td>
                                <td>{whMovt.weight}</td>
                                <td>{whMovt.lastDate}</td>
                                <td>{whMovt.itemId}</td>
                                <td>{whMovt.assortedOrNot}</td>
                                {userType == 'admin' && <td>
                                    <button onClick={() => editionHandle(whMovt.id)} style={{ width: "40px", padding: "5px", cursor: "pointer" }} title="Update Record" className='btn'>
                                        <Icon size={16} style={{ color: '#fe3535' }} icon={remove} />
                                    </button>
                                </td>}
                            </tr>
                        ))}
                    </tbody>
                </table>

            </Col>
        </Row>
    );
}