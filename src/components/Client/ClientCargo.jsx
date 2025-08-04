import React, { useContext } from 'react'
import ContainerRow from '../Global/ContainerRow'
import { Alert, Button, Col, Row, Tab, Tabs } from 'react-bootstrap'
import { DropDownInput } from '../Global/InputRow'
import { useState } from 'react'
import { Icon } from 'react-icons-kit'
import { newspaper as client } from 'react-icons-kit/icomoon/newspaper'
import { ColItemContext } from '../Global/GlobalDataContentx'
import { SmallSplitter, Splitter } from '../globalcomponents/Splitter'
import { InputOnly } from '../Global/Forms/InputRow'
import StockCommons from '../services/StockServices/StockCommons'
import StockRepository from '../services/StockServices/StockRepository'
import { useAuthHeader, useAuthUser } from 'react-auth-kit'
import { useMemo } from 'react'
import { CargoGrpByArrivalByClient, CargoGrpByByItem } from './CargoComponents'
import { StorageWithAsosrtedOrNot } from '../pages/Dashboard/StorageCalculation'
import { useEffect } from 'react'
import { ProcessMultipleArrivalNotes } from './ProcessMultipleArrivalNotes'
function ClientCargo({ setClients, clients, refresh, setRefresh, clientsItems }) {
    const { searchItemValue, commonArrayTwo, setCommonArrayTwo } = useContext(ColItemContext)
    const authHeader = useAuthHeader()();
    const auth = useAuthUser()
    const user = auth();
    const [processedWeight, setProcessedWeight] = useState(0);
    const [processedQty, setProcessedQty] = useState(0);
    const [mainTableorNextStep, setMainTableorNextStep] = useState(1)// 1 is main table, 2 is next step

    const localHead = {
        padding: '12px', color: '#fff'
    }
    const focuscols = {
        backgroundColor: '#f1f1f1',
    }
    const [showmore, setShowmore] = useState(false)

    const showmoreHandler = () => {
        setShowmore(!showmore)

    }
    const alteredPayments = [];
    const updatedPayments = []

    const [newclients, setNewClients] = useState([])

    useEffect(() => {
        if (clientsItems && clientsItems.length > 0) {
            setNewClients(clientsItems)
            setCommonArrayTwo([])
            setCommonArrayTw(clientsItems)
            console.log('>>The size of newClient: ' + clientsItems.length)
        }

    }, [clientsItems])

    const [selectedPeriod, setSelectedPeriod] = useState(0)
    // let totalTonnage = 0
    const [indexForLoader, setIndexForLoader] = useState(0)

    /* #region -----------------EDITING THE NEW QUANTITY ---------------------------- */
    const [error, setError] = useState(''); // State for validation errors
    const [dataLoad, setDataLoad] = useState(false)
    const handleUpdateClick = (arrivalId, quantity, newQuantity, itemId, index, totalAmount,
        totalWeights, period, assortedOrNot) => {//saving in the db


        // if ('Assorted'===assortedOrNot && newQuantity > totalWeights) {
        //     alert(`Error occured: Cannot update: New quantity (${newQuantity}) exceeds original quantity (${totalWeights}).`);
        //     setError(`Cannot update: New quantity (${newQuantity}) exceeds original quantity (${quantity}).`);
        //     return;
        // }
        if (itemId === undefined || itemId === null || quantity === undefined || quantity === null || newQuantity === undefined || newQuantity === null || totalAmount === 0 || totalAmount === null || totalWeights === undefined || totalWeights === null) {
            setError('Error: either  itemId or quantity, totalAmount, total Weight and new Quantity may be  null');
            alert('Error: either  itemId or quantity or new Quantity may be undefined or null');
            alert(itemId + ' ' + quantity + ' ' + newQuantity + ' ' + totalAmount + ' ' + totalWeights)
            return;
        }
        totalWeights = totalWeights
        console.log('------------- The udpated payments ----------------------');
        console.log(updatedPayments);

        StockCommons.updateWarehouse(itemId, arrivalId, quantity, newQuantity, user.userid, totalAmount, totalWeights, period).then(res => {
            const updatedClients = [...clients];
            updatedClients[index].quantity = updatedClients[index].quantity - newQuantity;
            updatedClients[index].newQuantity = 0;
            setClients(updatedClients);
            alert(`Storage Invoice is generated and Cargo exit updated successfully  `);
            setRefresh(!refresh)
        }).catch(err => {
            console.error('Error updating warehouse:', err);
            setError('An error occurred while updating the warehouse.');
        })
        // console.log(`Updating Arrival ID: ${arrivalId}, Quantity: ${quantity}, New Quantity: ${newQuantity},the itemId: ${itemId}, the user: ${userId.userid} `);
        // Add your update API call here, e.g., StockRepository.updateArrivalNote(arrivalId, newQuantity);
    }

    // Fetch arrival notes on component mount

    const handleChange = (index, field, value) => {
        const updatedClients = [...clients];
        updatedClients[index] = { ...updatedClients[index], [field]: value };

    };
    const [charges, setCharges] = useState(0)

    const handleChangePeriod = (index, field, newQuantity, totalWeight, value) => {// select option

        setIndexForLoader(index)

        const updatedClients = [...clients];
        updatedClients[index] = { ...updatedClients[index], [field]: value };
        const weights = totalWeight;
        const storagePeriod = value
        setSelectedPeriod(storagePeriod)
        if (newQuantity < 1) {
            alert('Please enter a valid quantity before calculating the storage cost.');
            return;
        }

        if (weights < 1) {
            alert('Please enter a valid weight before calculating the storage cost.');
            return;
        }
        if (storagePeriod) {// if the user has selected something
            setDataLoad(true)
            StockRepository.getStorageCost(weights, storagePeriod, authHeader).then(res => {
                updatedClients[index].InvoicableCost = res.data;
                // setClients(updatedClients);
                setDataLoad(false)
                setCharges(res.data)
            }).catch(err => {
                console.error('Error updating period:', err);
                setError('An error occurred while updating the period.');
            });
        }
    };
    const handleEditableChange = (index, value) => {
        const updatedClients = [...clients];
        const newQuantity = parseInt(value, 10) || 0;
        const originalWeight = updatedClients[index].weight;

        // Update newQuantity first
        updatedClients[index].newQuantity = newQuantity;


        // Validate after update
        if (newQuantity > originalWeight) {
            setError(`New quantity (${newQuantity}) cannot exceed original quantity (${originalWeight}) for arrival ID ${updatedClients[index].id}.`);
        } else {
            setError(''); // Clear error if validation passes
        }
        // setClients(updatedClients);
    };
    /* #endregion */



    const CalCulateGrandTotal = (data) => {
        if (!Array.isArray(data)) return { total: 0, count: 0 };
        return data.reduce((acc, client) => {
            let addValue = 0;
            if (client.assortedOrNot === 'Assorted') {
                addValue = Number(client.weight) || 0;

            } else {
                const qty = Number(client.quantity) || Number(client.noGrpCargoBalance) || 1;
                const weight = Number(client.weight) || 1;
                addValue = qty * weight;

            }
            return {
                total: acc.total + addValue,
                count: acc.count + 1,
            };
        }, { total: 0, count: 0 });
    }
    const { total: totalTonnage, count: totalIterations } = useMemo(() => CalCulateGrandTotal(clients), [clients]);

    const [cargoDetails, setCargoDetails] = useState({})
    const NewQtyFocusEvent = (e, index, client) => {
        let i = index
        setCargoDetails(client)
        setIndexForLoader(i)
        console.log('-------------------------------|||---CARGO DETAILS')
        console.log(client)
        console.log('---------------indexForLoader: ' + i + '------------')
    }
    useEffect(() => {
        if (cargoDetails.id > 0) {

            setMainTableorNextStep(2)

            //     setIndexForLoader(-1)
        }
    }, [cargoDetails])


    const [inputQty, setInputQty] = useState(0);

    const [warning, setWarning] = useState('');
    // const totalAmount = newclients.reduce((sum, item) => sum + ('Assorted' === item.assortedOrNot ? item.weight : (item.quantity ?? 1) * (item.weight ?? 1)), 0);
    let totalQtySet = newclients.reduce((sum, item) => {
        const qty = Number(item.quantity) || Number(item.cargoBalance) || Number(item.noGrpCargoBalance) || 0
        return sum + qty
    }, 0);
    const handleInputChange = (e) => {
        setInputQty(e.target.value);
        setWarning(''); // Clear warning on input change
    };
    function mergeClients(originalClients, updatedClients) {
        // Create a map for quick lookup
        const updatedMap = new Map(updatedClients.map(item => [item.id, item]));
        return originalClients.map(client =>
            updatedMap.has(client.id) ? { ...client, ...updatedMap.get(client.id) } : client
        );
    }
    // Place this function inside your component, above handleProcess
    const processClientWeight = (client, quantity) => {
        let calculatedWeight = 0;
        if (client.assortedOrNot === 'Assorted') {
            calculatedWeight = Number(client.weight) || 0;
            setProcessedWeight(calculatedWeight);
            console.log(
                `ID: ${client.id} | Input Quantity: ${quantity}`
            );
            console.log(
                `Calculated Weight: ${calculatedWeight} (${client.weight})`
            );
        } else {
            calculatedWeight = quantity * (Number(client.weight) || 1);
            setProcessedWeight(calculatedWeight);
            console.log(
                `ID: ${client.id} | Input Quantity: ${quantity}`
            );
            console.log(
                `Calculated Weight: ${calculatedWeight} (${client.weight} x ${quantity})`
            );
        }
        return calculatedWeight;
    };
    const handleProcess = (e) => {
        e.preventDefault();
        const quantity = parseFloat(inputQty);
        if (isNaN(quantity) || quantity <= 0) {
            setWarning('Please enter a valid positive number.');
            return;
        }
        if (quantity > totalQtySet) {
            setWarning(`Entered amount (${quantity}) exceeds total available (${totalQtySet}).`);
            return;
        }
        setProcessedQty(quantity); // <-- Save processed quantity here

        // Find the first client to process (customize as needed)
        const clientToProcess = newclients.find(
            c => (Number(c.quantity) || Number(c.cargoBalance) || Number(c.noGrpCargoBalance) || 0) > 0
        );

        if (clientToProcess) {
            processClientWeight(clientToProcess, quantity);
        }


        // ...existing deduction logic...
        let remaining = quantity;
        for (const item of clientsItems) { // Use clientsItems for guaranteed order

            if (remaining <= 0) {
                updatedPayments.push(item);
                continue;
            }
            const deduction = Math.min(item.quantity, remaining);
            remaining -= deduction;
            const newItem = { ...item, quantity: Number(item.quantity) - deduction };
            updatedPayments.push(newItem);
            if (deduction > 0) alteredPayments.push(newItem);
        }
        setNewClients(
            clientsItems.map(item => updatedPayments.find(u => u.id === item.id) || item)
        );
        setClients(prevClients => mergeClients(prevClients, updatedPayments));
        setWarning('Amount processed successfully.');
        console.log('Updated payments:' + updatedPayments.length + ' \t', updatedPayments); // Debug
        console.log('changed payments:', alteredPayments); // Debug
        console.log('Original list:', clients.length); // Debug
    }

    let totalAssorted = 0;
    let totalNotAssorted = 0;

    newclients.forEach(client => {
        if (client.assortedOrNot === 'Assorted') {
            totalAssorted += Number(client.weight) || 0;
        } else {
            const qty = Number(client.quantity) || Number(client.noGrpCargoBalance) || 1;
            const weight = Number(client.weight) || 1;
            totalNotAssorted += qty * weight;
        }
    });

    console.log('Total Assorted:', totalAssorted);
    console.log('Total Not Assorted:', totalNotAssorted);
    return (
        <>
            <ContainerRow mt='3'>
                <SmallSplitter />
                {/* <TitleSmallDesc title="Client Cargo " /> */}
               
                
                <Row className="d-flex flex-rows ">
                    <Col>Total Quantity: <b>{totalQtySet}  </b></Col>
                    
                </Row>
                <ProcessMultipleArrivalNotes  />
                <Splitter />
                <Col md={12}  >
                    {error && <Alert variant="danger">{error}</Alert>}
                    {/* <a href='#' onClick={showmoreHandler} className=''>Show more info</a> */}
                    <Tabs
                        defaultActiveKey="home"
                        id="uncontrolled-tab-example" className="mb-3" >
                        <Tab eventKey="home" title="Available Cargo">

                            {mainTableorNextStep === 2 && cargoDetails.id > 0
                                ? <StorageWithAsosrtedOrNot setMainTableorNextStep={setMainTableorNextStep} cargoDetails={cargoDetails}
                                    setCargoDetails={setCargoDetails} handleUpdateClick={handleUpdateClick} handleChangePeriod={handleChangePeriod}
                                    handleEditableChange={handleEditableChange} charges={charges} />
                                : (mainTableorNextStep === 1 ?
                                    <table className='  table-bordered w-100' style={{ width: '100%' }}>

                                        <tr className="fw-bold" style={{ backgroundColor: '#1d6d7b', padding: '9px' }}>
                                            <td title="grouped by client and item" style={localHead}>Arrival id </td>
                                            <td style={localHead}>Client name </td>
                                            {showmore && <>
                                                <td style={localHead}>TIN </td>
                                                <td style={localHead}>Arrival Date </td></>
                                            }
                                            <td style={localHead}>Cargo </td>
                                            {showmore &&
                                                <td style={localHead}>Prev. Qty</td>
                                            }
                                            <td style={localHead}>Current Qty </td>
                                            <td style={localHead}>Weight </td>
                                            <td style={localHead}>Tot. Wgh  </td>
                                            {showmore &&
                                                <td style={localHead}>Last removal </td>
                                            }
                                            <td style={localHead}>   </td>
                                            <td style={localHead}>Qty to remove  </td>
                                            <td style={localHead}>Amount   </td>
                                            <td style={localHead}>Period  </td>

                                            <td style={localHead}> Option </td>
                                        </tr>
                                        {/* {userType == 'admin' && <td className='delButton d-none'>Option</td>} */}
                                        <tbody> {clients  && clients.isArray && clients.map((client, index) => (
                                            <tr>
                                                <td>{client.id} </td>
                                                <td>{client.name}</td>
                                                {showmore && <>
                                                    <td>{client.tin_number}</td>
                                                    <td>{client.date_time}</td>
                                                </>
                                                }
                                                <td >{client.arrivalNote || client.itemName}  </td>

                                                {showmore && <td>{client.prevQty} </td>}
                                                <td style={focuscols}> <InputOnly name="Quantity" moreclass="w-100" val={(client.quantity)} onChange={(e) => handleChange(index, "quantity", e.target.value)} label='Quantity' />
                                                </td>
                                                <td >
                                                    {((client.weight ? client.weight : 0).toLocaleString())} KG</td>
                                                <td style={{ fontWeight: 'bold', color: '#000' }}>
                                                    {'Assorted' === client.assortedOrNot ? client.weight.toLocaleString() : ((client.quantity ?? 1) * (client.weight ?? 1)).toLocaleString()} KG</td>

                                                <td>{showmore && client.lastDate}</td>
                                                <td style={focuscols}><InputOnly handleFocus={(e) => NewQtyFocusEvent(e, index, client)} name="exit" moreclass="w-100" val={client.newQuantity} handle={(e) => handleEditableChange(index, e.target.value)} label='exit' />
                                                </td>
                                                <td style={focuscols}>
                                                    {(dataLoad && indexForLoader === index) ? <div className="loader"></div>
                                                        :
                                                        <InputOnly name="InvoicableCost" moreclass="w-100" val={client.InvoicableCost} handle={(e) => handleChange(index, e.target.value)} label='InvoicableCost' />
                                                    }
                                                </td>

                                                <td>
                                                    <select style={{ height: '60px', width: '150px' }} className="form-select  p-3" value={client.period} name="period"
                                                        onChange={(e) => handleChangePeriod(index, "period", e.target.value)} label='period' >
                                                        <option></option>
                                                        <option value="single period">single period</option>
                                                        <option value="double period">doulbe period</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <Button variant="success" className="mt-2" style={{ fontSize: '12px', padding: '1px 10px' }}
                                                        onClick={() => handleUpdateClick(client.id, client.quantity, client.newQuantity, client.itemId, client.userId, index, client.InvoicableCost, client.weight, client.period, client.assortedOrNot)}>
                                                        Update & Invoice
                                                    </Button>
                                                </td>
                                            </tr>))}
                                        </tbody>
                                    </table> : '')
                            }
                        </Tab>
                        <Tab eventKey="profile" title="Cargo By item">
                            <CargoGrpByByItem clientsItems={clientsItems} />
                        </Tab>

                    </Tabs>


                </Col>
            </ContainerRow>
        </>
    )
}

export default ClientCargo

