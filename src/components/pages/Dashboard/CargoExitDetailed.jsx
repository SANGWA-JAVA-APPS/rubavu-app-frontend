import { useState } from 'react';
import PropTypes from 'prop-types';
import { TableOpen } from '../../Global/ListTable';
import TableHead from '../../Global/TableHead';

export const CargoExitDetailed = ({ data = [] }) => {
    const [selectedClients, setSelectedClients] = useState([]);
    const [showClientFilter, setShowClientFilter] = useState(false);
    
    const styles = {
        fontWeight: 'bold',
        paddingTop: '10px',
        color: '#000',
        fontSize: '15px',
    };

    // Get unique clients from data
    const uniqueClients = [...new Set(data.map(item => item.user_name || item.clientName).filter(Boolean))].sort();
    
    // Filter data based on selected clients
    const filteredData = selectedClients.length === 0 
        ? data 
        : data.filter(item => {
            const clientName = item.user_name || item.clientName;
            return selectedClients.includes(clientName);
        });

    // Client selection handlers
    const handleClientToggle = (clientName) => {
        setSelectedClients(prev => 
            prev.includes(clientName) 
                ? prev.filter(name => name !== clientName)
                : [...prev, clientName]
        );
    };

    const handleSelectAllClients = () => {
        setSelectedClients([...uniqueClients]);
    };

    const handleClearAllClients = () => {
        setSelectedClients([]);
    };

    // Calculate totals (use filtered data)
    let totalAmount = 0;
    let totalWeight = 0;
    let totalCurrentQty = 0;
    let totalRemaining = 0;

    filteredData.forEach((record) => {
        totalAmount += record.invoiceAmount || 0;
        totalCurrentQty += record.current_qty || 0;
        totalRemaining += record.remaining || 0;
        
        // Calculate weight based on collect type
        if ("Not Assorted" === record.collectType) {
            totalWeight += (record.current_qty || 0) * (record.weight || 0);
        } else {
            totalWeight += record.weight || 0;
        }
    });

    // Client Filter Component
    const ClientFilter = () => {
        if (uniqueClients.length === 0) return null;

        return (
            <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0">Filter by Clients</h6>
                    <button 
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => setShowClientFilter(!showClientFilter)}                    >
                        {showClientFilter ? 'Hide Filters' : 'Show Filters'} ({uniqueClients.length} clients)
                    </button>
                </div>
                
                {showClientFilter && (
                    <div className="border rounded p-3" style={{ backgroundColor: '#f8f9fa' }}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <button className="btn btn-outline-success btn-sm me-2" onClick={handleSelectAllClients}>
                                    Select All
                                </button>
                                <button className="btn btn-outline-danger btn-sm" onClick={handleClearAllClients}>
                                    Clear All
                                </button>
                            </div>
                            <small className="text-muted">
                                {selectedClients.length} of {uniqueClients.length} selected
                            </small>
                        </div>
                        
                        <div className="row">
                            {uniqueClients.map(client => (
                                <div key={client} className="col-md-4 col-sm-6 mb-2">
                                    <div className="form-check p-2" style={{ backgroundColor: '#fff' }}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`client-${client}`}
                                            checked={selectedClients.includes(client)}
                                            onChange={() => handleClientToggle(client)}
                                        />
                                        <label className="form-check-label" htmlFor={`client-${client}`}>
                                            {client}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    if (data.length === 0) {
        return (
            <div className="text-center p-4">
                <p>No cargo exit data available for the selected date range.</p>
            </div>
        );
    }

    return (
        <div>
            <ClientFilter />
            
            {filteredData.length === 0 && selectedClients.length > 0 && (
                <div className="alert alert-info">
                    <strong>No records found</strong> for the selected client(s): {selectedClients.join(', ')}
                </div>
            )}
            
            <TableOpen>
                <TableHead>
                    <td>A.No.</td>
                    <td>Client Name</td>
                    <td>Cargo Type</td>
                    <td>Entry Date</td>
                    <td>Exit Date</td>
                    <td>Prev. Qty</td>
                    <td>Current Qty</td>
                    <td>Weight (KG)</td>
                    <td>Amount (RWF)</td>
                    <td>Payment Option</td>
                    <td>Collect Type</td>
                </TableHead>
                <tbody>
                    {filteredData.map((record) => {
                        const recordWeight = "Not Assorted" === record.collectType
                            ? (record.remaining || 0) * (record.weight || 0)
                            : (record.weight || 0);

                        return (
                            <tr key={record.id}>
                                <td>{record.arrivalId}</td>
                                <td>{record.user_name || record.clientName || "N/A"}</td>
                                <td>{record.itemName || record.itemname || "N/A"}</td>
                                <td>
                                    {record.arrivalDate 
                                        ? new Date(record.arrivalDate).toLocaleDateString()
                                        : "N/A"
                                    }
                                </td>
                                <td>
                                    {record.date_time 
                                        ? new Date(record.date_time).toLocaleDateString()
                                        : "N/A"
                                    }
                                </td>
                                <td className="text-end">
                                    {(record.current_qty || 0).toLocaleString()}
                                </td>
                                <td className="text-end">
                                    {(record.remaining || 0).toLocaleString()}
                                </td>
                                <td className="text-end">
                                    {recordWeight.toLocaleString()}
                                </td>
                                <td className="text-end">
                                    {record.invoiceAmount ? `RWF ${record.invoiceAmount.toLocaleString()}` : "N/A"}
                                </td>
                                <td>
                                    {record.paymentOption ? (
                                        <span 
                                            className={`badge ${
                                                record.paymentOption === "Exit and pay later" 
                                                    ? "bg-light text-dark border" 
                                                   : "bg-success"
                                            }`}
                                            style={{
                                                backgroundColor: record.paymentOption === "Exit and pay later" 
                                                    ? "#b96a31ff" 
                                                    : undefined,
                                                color: record.paymentOption === "Exit and pay later" 
                                                    ? "#6c757d" 
                                                    : undefined
                                            }}
                                        >
                                            {record.paymentOption}
                                        </span>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                                <td>
                                    <span className={`badge ${
                                        record.collectType === "Assorted" ? "bg-info" : "bg-warning"
                                    }`}>
                                        {record.collectType || "N/A"}
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                    
                    {/* Summary Row */}
                    <tr style={{ backgroundColor: '#f8f9fa', borderTop: '2px solid #007bff' }}>
                        <td colSpan={5} style={styles}>
                            Total Summary ({filteredData.length} records):
                        </td>
                        <td className="text-end" style={styles}>
                            {totalCurrentQty.toLocaleString()}
                        </td>
                        <td className="text-end" style={styles}>
                            {totalRemaining.toLocaleString()}
                        </td>
                        <td className="text-end" style={styles}>
                            {totalWeight.toLocaleString()} KG
                        </td>
                        <td className="text-end" style={styles}>
                            RWF {totalAmount.toLocaleString()}
                        </td>
                        <td colSpan={2} style={styles}>
                            
                        </td>
                    </tr>
                    
                    {/* Performance Metrics */}
                    <tr style={{ backgroundColor: '#e8f5e8' }}>
                        <td colSpan={11} style={{ padding: '15px' }}>
                            <div className="row">
                                <div className="col-md-3">
                                    <strong>Processing Rate:</strong><br/>
                                    <span style={{ fontSize: '1.1em', color: '#28a745' }}>
                                        {totalCurrentQty > 0 
                                            ? ((totalCurrentQty - totalRemaining) / totalCurrentQty * 100).toFixed(1)
                                            : 0}%
                                    </span>
                                </div>
                                <div className="col-md-3">
                                    <strong>Avg Weight/Record:</strong><br/>
                                    <span style={{ fontSize: '1.1em', color: '#007bff' }}>
                                        {filteredData.length > 0 
                                            ? (totalWeight / filteredData.length).toFixed(2) + ' KG'
                                            : '0 KG'}
                                    </span>
                                </div>
                                <div className="col-md-3">
                                    <strong>Unique Clients:</strong><br/>
                                    <span style={{ fontSize: '1.1em', color: '#6f42c1' }}>
                                        {new Set(filteredData.map(item => item.user_name || item.clientName)).size}
                                    </span>
                                </div>
                                <div className="col-md-3">
                                    <strong>Avg Amount/Record:</strong><br/>
                                    <span style={{ fontSize: '1.1em', color: '#fd7e14' }}>
                                        {filteredData.length > 0 
                                            ? 'RWF ' + (totalAmount / filteredData.length).toFixed(0)
                                            : 'RWF 0'}
                                    </span>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </TableOpen>
        </div>
    );
};

CargoExitDetailed.propTypes = {
    data: PropTypes.array.isRequired
};
