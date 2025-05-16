import React, { useContext } from 'react'
import ContainerRow from '../Global/ContainerRow'
import { Alert, Button, Col } from 'react-bootstrap'
import { DropDownInput } from '../Global/InputRow'
import TableHead from '../Global/TableHead'
import { TableOpen } from '../Global/ListTable'
import { TitleSmallDesc } from '../globalcomponents/TitleSmallDesc'
import { useState } from 'react'
import { Icon } from 'react-icons-kit'
import { newspaper as client } from 'react-icons-kit/icomoon/newspaper'
import { ColItemContext } from '../Global/GlobalDataContentx'
import { SmallSplitter, Splitter } from '../globalcomponents/Splitter'
import { InputOnly } from '../Global/Forms/InputRow'
import StockCommons from '../services/StockServices/StockCommons'
import StockRepository from '../services/StockServices/StockRepository'
import { useAuthHeader } from 'react-auth-kit'
function ClientCargo({ setClients, clients,refresh, setRefresh }) {
    const { searchItemValue } = useContext(ColItemContext)
    const authHeader = useAuthHeader()();

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
    let totalTonnage = 0
    const [indexForLoader, setIndexForLoader] = useState(0)

    /* #region -----------------EDITING THE NEW QUANTITY ---------------------------- */
    const [inputs, setInputs] = useState([]); // State for arrival notes
    const [error, setError] = useState(''); // State for validation errors
    const [dataLoad, setDataLoad] = useState(false)
    const handleUpdateClick = (arrivalId, quantity, newQuantity, itemId, userId, index, totalAmount, totalWeights) => {
        if (newQuantity > quantity) {
            alert(`Error occured: Cannot update: New quantity (${newQuantity}) exceeds original quantity (${quantity}).`);
            setError(`Cannot update: New quantity (${newQuantity}) exceeds original quantity (${quantity}).`);
            return;
        }
        if (itemId === undefined || itemId === null || quantity === undefined || quantity === null || newQuantity === undefined || newQuantity === null || totalAmount === undefined || totalAmount === null || totalWeights === undefined || totalWeights === null) {
            setError('Error: either  itemId or quantity, totalAmount, total Weight and new Quantity may be  null');
            alert('Error: either  itemId or quantity or new Quantity may be undefined or null');
            return;
        }
        totalWeights=totalWeights*newQuantity
        StockCommons.updateWarehouse(itemId, arrivalId, quantity, newQuantity, userId.userid, totalAmount, totalWeights).then(res => {
            const updatedClients = [...clients];
            // updatedClients[index].quantity = updatedClients[index].quantity - newQuantity;
            updatedClients[index].newQuantity = 0;
            setClients(updatedClients);
            alert(`Storage Invocie is generated and Cargo exit updated successfully  `);
            setRefresh(!refresh)
        }).catch(err => {
            console.error('Error updating warehouse:', err);
            setError('An error occurred while updating the warehouse.');

        });

        console.log(`Updating Arrival ID: ${arrivalId}, Quantity: ${quantity}, New Quantity: ${newQuantity},the itemId: ${itemId}, the user: ${userId.userid} `);

        // Add your update API call here, e.g., StockRepository.updateArrivalNote(arrivalId, newQuantity);
    }

    // Fetch arrival notes on component mount

    const handleChange = (index, field, value) => {
        const updatedClients = [...clients];
        updatedClients[index] = { ...updatedClients[index], [field]: value };
        setClients(updatedClients);
    };
    const handleChangePeriod = (index, field, value) => {// select option

        setIndexForLoader(index)
        const updatedClients = [...clients];
        updatedClients[index] = { ...updatedClients[index], [field]: value };
        const weights = updatedClients[index].newQuantity * updatedClients[index].weight
        const storagePeriod = value
        if (updatedClients[index].newQuantity < 1) {
            alert('Please enter a valid quantity before calculating the storage cost.');
            return;
        }
        setDataLoad(true)
        StockRepository.getStorageCost(weights, storagePeriod, authHeader).then(res => {

            updatedClients[index].InvoicableCost = res.data;
            setClients(updatedClients);
            setDataLoad(false)
        }).catch(err => {
            console.error('Error updating period:', err);
            setError('An error occurred while updating the period.');
        });
    };
    const handleEditableChange = (index, value) => {
        const updatedClients = [...clients];
        const newQuantity = parseInt(value, 10) || 0;
        const originalQuantity = updatedClients[index].quantity;

        // Update newQuantity first
        updatedClients[index].newQuantity = newQuantity;


        // Validate after update
        if (newQuantity > originalQuantity) {
            setError(`New quantity (${newQuantity}) cannot exceed original quantity (${originalQuantity}) for arrival ID ${updatedClients[index].id}.`);
        } else {
            setError(''); // Clear error if validation passes
        }
        setClients(updatedClients);
    };
    /* #endregion */
    return (
        <>
        
            {clients.map(client => {
                totalTonnage += client.quantity * client.weight
            })
            }

            <ContainerRow mt='3'>
                <Splitter />

                <TitleSmallDesc title="Client Cargo " />
                <SmallSplitter />

                <Col md={2}>
                    <div className="border d-flex justify-content-center " style={{ height: '100px', width: '100px' }}>
                        <Icon size={'70%'} style={{ color: '#1d6d7b' }} icon={client} />
                    </div>
                    <p style={{ fontSize: '12px', fontWeight: 'bold' }}>{searchItemValue}</p>
                    <p style={{ fontSize: '12px', fontWeight: 'bold' }}> { }</p>
                </Col>
                <Col md={4} className='border'>
                    <DropDownInput label='Period' name='year'  >
                        <option>2025</option>
                    </DropDownInput>
                </Col>
                <Col md={4}><p style={{ fontSize: '20px' }}>Total Tonnage: <b>{(totalTonnage).toLocaleString()} KG</b></p></Col>
                <Col md={12}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <a href='#' onClick={showmoreHandler} className=''>Show more info</a>
                    <table className='  table-bordered'>

                        <tr className="fw-bold" style={{ backgroundColor: '#1d6d7b', padding: '9px' }}>
                            <td title="grouped by client and item" style={localHead}>Arrival id </td>
                            <td style={localHead}>Client name </td>
                            {showmore && <>
                                <td style={localHead}>TIN </td>
                                <td style={localHead}>Arrival Date </td></>}
                            <td style={localHead}>Cargo </td>
                            {showmore &&
                                <td style={localHead}>Prev. Qty</td>}
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
                        <tbody> {clients.map((client, index) => (
                            <tr>
                                <td>{client.id > 100 ? client.id : client.id + ' Arrival notes'} </td>
                               <td>{client.name}</td>
                                {showmore && <>
                                    <td>{client.tin_number}</td>
                                    <td>{client.date_time}</td></>}
                                <td>{client.arrivalNote} </td>
                               {showmore &&   <td>{client.prevQty} </td>}
                                <td style={focuscols}> <InputOnly name="Quantity" moreclass="w-100" val={(client.quantity)} onChange={(e) => handleChange(index, "quantity", e.target.value)} label='Quantity' />
                                </td>
                                <td >
                                    {((client.weight ? client.weight : 0).toLocaleString())} KG</td>
                                <td style={{ fontWeight: 'bold', color: '#000' }}>{((((client.quantity ?? 0) * client.weight) > 1 ? ((client.quantity ?? 0) * client.weight) : (client.noGrpCargoBalance ?? 0) * client.weight).toLocaleString())} KG</td>

                                <td>{showmore && client.lastDate}</td>
                                <td style={focuscols}><InputOnly name="exit" moreclass="w-100" val={client.newQuantity} handle={(e) => handleEditableChange(index, e.target.value)} label='exit' />
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
                                        <option value="doulbe period">doulbe period</option>
                                    </select>
                                </td>
                                <td>
                                    <Button variant="success" className="mt-2" style={{ fontSize: '12px', padding: '1px 10px' }}
                                        onClick={() => handleUpdateClick(client.id, client.quantity, client.newQuantity, client.itemId, client.userId, index, client.InvoicableCost, client.weight)}>
                                        Update & Invoice
                                    </Button>
                                </td>
                            </tr>))}
                        </tbody>

                    </table>
                </Col>
            </ContainerRow>
        </>
    )
}

export default ClientCargo