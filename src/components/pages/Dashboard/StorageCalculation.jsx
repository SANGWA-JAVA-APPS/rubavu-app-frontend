import React, { useContext, useEffect, useRef, useState } from 'react'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import StockRepository from '../../services/StockServices/StockRepository';
import SeaarchBytyping, { SearchTableResult } from '../../globalcomponents/SeaarchBytyping';
import { ClientTableRows } from '../Invoice/Invoice';
import ClientCargo from '../../Client/ClientCargo';
import { TableOpen } from '../../Global/ListTable';
import { TableHead } from '@mui/material';
import { InputOnly } from '../../Global/Forms/InputRow';

export const StorageCalculation = ({ refresh, setRefresh }) => {
    const [clients, setClients] = useState([])
    const [cargoINWh, setCargoINWh] = useState([])
    const [dataLoad, setDataLoad] = useState(false)

    const authHeader = useAuthHeader()();
    const auth = useAuthUser()
    const user = auth();
    useEffect(() => {
        StockRepository.allCargInWh(authHeader).then((res) => {
            const arrivalNotes = res.data.map(note => ({
                id: note.id, arrivalNote: note.itemName || '', quantity: note.cargoBalance || note.noGrpCargoBalance || 0, // Use cargoBalance or noGrpCargoBalance as quantity
                newQuantity: 0, appendedValue: 0, tinNumber: note.tin_number,
                name: note.name, surname: note.surname, category: note.category,
                dateTime: note.date_time, lastDate: note.lastDate, prevQty: note.prevQty,
                weight: note.weight, itemId: note.itemId, userId: user, period: "", InvoicableCost: 0,
            }));
            setClients(arrivalNotes)
        })
    }, [])

    /* #region ------------------SEARCH CLIENT BY TYPING ------------------------------------------------- */
    const { searchTableVisible, setSearchTableVisible } = useContext(ColItemContext)
    const { showSelected, setShowSelected } = useContext(ColItemContext)
    const { searchItemValue, setSearchItemValue } = useContext(ColItemContext)
    const inputRef = useRef(null);
    const [itemssbyname, setItemssbyname] = useState([]) //Data List searched by name
    const tableHead = ['id', 'Client name', 'tin number']

    const hideSelectorLink = () => {
        setShowSelected(false)
        setSearchItemValue('')
    }
    const findClientByNameLike = (searchItemValue) => {

        StockRepository.findClientByNameLike(searchItemValue, authHeader).then((res) => {
            setItemssbyname(res.data.content);

            setDataLoad(true)
        });

    }
    const [numCaharacters, setNumCaharacters] = useState(0)
    const searchOnThirdSecond = (e) => {
        // setSearchTableVisible(true)
        const newVal = e.target.value
        setSearchItemValue(newVal)
        setNumCaharacters(newVal.length)
        if (newVal.length > 3) {
            setSearchTableVisible(true)
            findClientByNameLike(searchItemValue)
        } else {
            setSearchTableVisible(false)
        }


        if (searchItemValue) {//if the user has typed in something
            // setCompletedSearch(false)
            // setSearchProgress(true) // Go and show the progress bar,
        }
    }


    const searchDone = (id, name, platenumber, status) => {
        setSearchTableVisible(false)
        setSearchItemValue(name)
        setShowSelected()

        StockRepository.findClientCargonById(id, authHeader).then((res) => {
            setClients(res.data)
        })

    }
    /* #endregion */

    return (
        <div>
            <h4 className="fw-bold">Storage Calculation</h4>
            <div className="d-flex justify-content-center">
                <div className="card" >
                    <div className="card-body">
                        <SeaarchBytyping placeholder="Enter a Client Name"
                            labelName='Search Client By Name ' searchTableVisible={searchTableVisible} showSelected={showSelected} hideSelectorLink={hideSelectorLink}
                            currentTypingVal={searchItemValue} ref={inputRef} sendRequestOnThirdChar={(e) => searchOnThirdSecond(e)} />
                        {searchTableVisible && <SearchTableResult tableHead={tableHead} TableRows={() => <ClientTableRows clients={itemssbyname} searchDone={searchDone} />} />}
                        <ClientCargo clients={clients} setClients={setClients} refresh={refresh} setRefresh={setRefresh} />

                    </div>
                </div>
            </div>
        </div>
    )
}

export const cargoOutOfWarehouse = ({ cargoWarehouse }) => {
    const [inputs, setInputs] = useState([]); // State for arrival notes
    const [error, setError] = useState(''); // State for validation errors

    const handleChange = (index, field, value) => {
        const updatedInputs = [...inputs];
        updatedInputs[index] = { ...updatedInputs[index], [field]: value };
        setInputs(updatedInputs);
    };

    // Handle newQuantity change with validation
    const handleEditableChange = (index, value) => {
        const updatedInputs = [...inputs];
        const newQuantity = parseInt(value, 10) || 0;
        const maxQuantity = updatedInputs[index].quantity;

        if (newQuantity > maxQuantity) {
            setError(`New quantity (${newQuantity}) cannot exceed original quantity (${maxQuantity}) for arrival ID ${updatedInputs[index].id}.`);
            return;
        }

        setError(''); // Clear error if validation passes
        updatedInputs[index].newQuantity = newQuantity;
        setInputs(updatedInputs);
    };

    // Handle Invoice button click
    const handleInvoiceClick = (arrivalId, quantity, newQuantity) => {
        if (newQuantity > quantity) {
            setError(`Cannot invoice: New quantity (${newQuantity}) exceeds original quantity (${quantity}).`);
            return;
        }
        console.log(`Invoicing for Arrival ID: ${arrivalId}, Quantity: ${quantity}, New Quantity: ${newQuantity}`);
        // Add your invoice API call here, e.g., StockCommons.createInvoice(arrivalId, quantity, newQuantity);
    };

    // Handle Update button click
    const handleUpdateClick = (arrivalId, quantity, newQuantity) => {
        if (newQuantity > quantity) {
            setError(`Cannot update: New quantity (${newQuantity}) exceeds original quantity (${quantity}).`);
            return;
        }
        console.log(`Updating Arrival ID: ${arrivalId}, Quantity: ${quantity}, New Quantity: ${newQuantity}`);
        // Add your update API call here, e.g., StockCommons.updateArrivalNote(arrivalId, newQuantity);
    };
    try {
        const arrivalNotes = cargoWarehouse.map(note => ({
            id: note.id,
            arrivalNote: note.itemName || '',
            quantity: note.cargoBalance > 0 ? note.cargoBalance : (note.noGrpCargoBalance > 0 ?? 0), // Assuming first tally's unit as quantity
            newQuantity: 0, // Initialize newQuantity
        }));
        setInputs(arrivalNotes);
    } catch (err) {
        console.error('Error fetching arrival notes:', err);
        setError('Failed to load arrival notes.');
    }
    return (<>

        <h4 className="fw-bold">Cargo Out of Warehouse</h4>
    </>)
}


export const WarehouseCargo = ({ cargoINWh }) => {
    const { searchItemValue } = useContext(ColItemContext)
    const localHead = {
        padding: '12px', color: '#fff'
    }
    const [showmore, setShowmore] = useState(false)

    const showmoreHandler = () => {
        setShowmore(!showmore)

    }
    return (
        <div>
            <h4 className="fw-bold">Warehouse Cargo Inventory</h4>
            <a href='#' onClick={showmoreHandler} className=''>Show more info</a>
            <table className='table table-bordered'>
                <tr className="fw-bold" style={{ backgroundColor: '#1d6d7b', padding: '9px' }}>
                    <td style={localHead}>Arrival id </td>
                    {showmore && <>
                        <td style={localHead}>Client name </td>
                        <td style={localHead}>TIN </td>
                        <td style={localHead}>Arrival Date </td></>}
                    <td style={localHead}>Cargo </td>
                    <td style={localHead}>Previous </td>
                    <td style={localHead}>Balance  </td>
                    {showmore && <td style={localHead}>Last removal </td>}
                    {<td style={localHead}>New Quantity</td>}
                </tr>
                <tbody> {cargoINWh.map(client => (
                    <tr>
                        <td>{client.id}</td>
                        {showmore && <><td>{client.name}</td>
                            <td>{client.tin}</td>
                            <td>{client.arrivalDate}</td></>}
                        <td>{client.cargo}</td>
                        <td>{client.previous}</td>

                        <td>{client.balance}</td>
                        {showmore && <td>{client.lastRemoval}</td>}
                        <td><InputOnly
                            name="newQuantity" moreclass="w-100" val={client.newQuantity}
                            handle={(e) => handleChange(index, "newQuantity", e.target.value)}
                            label='newQuantity' />
                        </td>
                    </tr>
                ))}</tbody>
            </table>
        </div>
    )
}
