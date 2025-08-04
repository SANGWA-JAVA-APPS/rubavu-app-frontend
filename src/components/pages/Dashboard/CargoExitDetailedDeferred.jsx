import { useState } from 'react';
import PropTypes from 'prop-types';
import { TableOpen } from '../../Global/ListTable';
import TableHead from '../../Global/TableHead';

export const CargoExitDetailedDeferred = ({ data = [] }) => {
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
    
    // Filter data based on selected clients - focus on deferred items (items with remaining > 0)
    const deferredData = data.filter(item => (item.remaining || 0) > 0);
    const filteredData = selectedClients.length === 0 
        ? deferredData 
        : deferredData.filter(item => {
            const clientName = item.user_name || item.clientName;
            return selectedClients.includes(clientName);
        });

    // Further filter to show only "Exit and pay later" payment options
    const deferredPayLaterData = filteredData.filter(item => 
        item.paymentOption === "Exit and pay later"
    );

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

    // Calculate totals (use deferred "pay later" data)
    let totalAmount = 0;
    let totalWeight = 0;
    let totalCurrentQty = 0;
    let totalRemaining = 0;

    deferredPayLaterData.forEach((record) => {
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
                    <h6 className="mb-0">Filter by Clients (Deferred Items Only)</h6>
                    <button 
                        className="btn btn-outline-warning btn-sm"
                        onClick={() => setShowClientFilter(!showClientFilter)}
                    >
                        {showClientFilter ? 'Hide Filters' : 'Show Filters'} ({uniqueClients.length} clients)
                    </button>
                </div>
                
                {showClientFilter && (
                    <div className="border rounded p-3" style={{ backgroundColor: '#fff3cd' }}>
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

    if (deferredData.length === 0) {
        return (
            <div className="text-center p-4">
                <div className="alert alert-success">
                    <h5>🎉 Excellent! No Deferred Cargo Found</h5>
                    <p>All cargo items have been fully processed. There are no deferred items in the selected date range.</p>
                </div>
            </div>
        );
    }

    if (deferredPayLaterData.length === 0) {
        return (
            <div className="text-center p-4">
                <div className="alert alert-info">
                    <h5>📋 No &quot;Exit and Pay Later&quot; Deferred Items</h5>
                    <p>There are {deferredData.length} deferred items total, but none with &quot;Exit and pay later&quot; payment option in the selected date range.</p>
                    {selectedClients.length > 0 && (
                        <p><small>Filtered for clients: {selectedClients.join(', ')}</small></p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div>
            <ClientFilter />
            
            {deferredPayLaterData.length === 0 && selectedClients.length > 0 && (
                <div className="alert alert-info">
                    <strong>No &quot;Exit and pay later&quot; deferred records found</strong> for the selected client(s): {selectedClients.join(', ')}
                </div>
            )}
            
            <div className="alert alert-warning mb-3">
                <strong>Deferred &quot;Pay Later&quot; Report:</strong> Showing only deferred items with &quot;Exit and pay later&quot; payment option. 
                Total matching items: <strong>{deferredPayLaterData.length}</strong> out of {deferredData.length} deferred records.
            </div>
            
            <TableOpen>
                <TableHead>
                    <td>A.No.</td>
                    <td>Client Name</td>
                    <td>Cargo Type</td>
                    <td>Entry Date</td>
                    <td>Exit Date</td>
                    <td>Prev. Qty</td>
                    <td>Current Qty</td>
                    <td>Remaining</td>
                    <td>Weight (KG)</td>
                    <td>Amount (RWF)</td>
                    <td>Payment Option</td>
                    <td>Collect Type</td>
                    <td>Deferred %</td>
                </TableHead>
                <tbody>
                    {deferredPayLaterData.map((record) => {
                        const recordWeight = "Not Assorted" === record.collectType
                            ? (record.remaining || 0) * (record.weight || 0)
                            : (record.weight || 0);

                        const deferredPercentage = record.current_qty > 0 
                            ? ((record.remaining || 0) / record.current_qty * 100).toFixed(1)
                            : 0;

                        return (
                            <tr key={record.id} style={{ backgroundColor: deferredPercentage > 50 ? '#fff3cd' : 'inherit' }}>
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
                                    {((record.current_qty || 0) - (record.remaining || 0)).toLocaleString()}
                                </td>
                                <td className="text-end">
                                    <span className="badge bg-danger">
                                        {(record.remaining || 0).toLocaleString()}
                                    </span>
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
                                <td className="text-center">
                                    <span className={`badge ${
                                        deferredPercentage > 75 ? 'bg-danger' : 
                                        deferredPercentage > 50 ? 'bg-warning' : 'bg-info'
                                    }`}>
                                        {deferredPercentage}%
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                    
                    {/* Summary Row */}
                    <tr style={{ backgroundColor: '#fff3cd', borderTop: '2px solid #ffc107' }}>
                        <td colSpan={5} style={styles}>
                            Pay Later Deferred Summary ({deferredPayLaterData.length} records):
                        </td>
                        <td className="text-end" style={styles}>
                            {totalCurrentQty.toLocaleString()}
                        </td>
                        <td className="text-end" style={styles}>
                            {(totalCurrentQty - totalRemaining).toLocaleString()}
                        </td>
                        <td className="text-end" style={styles}>
                            <span className="badge bg-danger" style={{ fontSize: '14px' }}>
                                {totalRemaining.toLocaleString()}
                            </span>
                        </td>
                        <td className="text-end" style={styles}>
                            {totalWeight.toLocaleString()} KG
                        </td>
                        <td className="text-end" style={styles}>
                            RWF {totalAmount.toLocaleString()}
                        </td>
                        <td colSpan={3} style={styles}>
                            Avg Deferred: {totalCurrentQty > 0 ? (totalRemaining / totalCurrentQty * 100).toFixed(1) : 0}%
                        </td>
                    </tr>
                    
                    {/* Performance Metrics */}
                    <tr style={{ backgroundColor: '#ffe6e6' }}>
                        <td colSpan={13} style={{ padding: '15px' }}>
                            <div className="row">
                                <div className="col-md-3">
                                    <strong>Pay Later Items:</strong><br/>
                                    <span style={{ fontSize: '1.2em', color: '#dc3545' }}>
                                        {deferredPayLaterData.length} items
                                    </span>
                                </div>
                                <div className="col-md-3">
                                    <strong>Total Deferred Qty:</strong><br/>
                                    <span style={{ fontSize: '1.2em', color: '#dc3545' }}>
                                        {totalRemaining.toLocaleString()} units
                                    </span>
                                </div>
                                <div className="col-md-3">
                                    <strong>Avg Deferred/Record:</strong><br/>
                                    <span style={{ fontSize: '1.2em', color: '#fd7e14' }}>
                                        {deferredPayLaterData.length > 0 
                                            ? (totalRemaining / deferredPayLaterData.length).toFixed(0) + ' units'
                                            : '0 units'}
                                    </span>
                                </div>
                                <div className="col-md-3">
                                    <strong>High Priority Items:</strong><br/>
                                    <span style={{ fontSize: '1.2em', color: '#6f42c1' }}>
                                        {deferredPayLaterData.filter(item => {
                                            const deferredPct = item.current_qty > 0 ? (item.remaining / item.current_qty * 100) : 0;
                                            return deferredPct > 75;
                                        }).length} items (&gt;75% deferred)
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

CargoExitDetailedDeferred.propTypes = {
    data: PropTypes.array.isRequired
};
