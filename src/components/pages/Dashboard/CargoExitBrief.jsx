import PropTypes from 'prop-types';
import { TableOpen } from '../../Global/ListTable';
import TableHead from '../../Global/TableHead';

export const CargoExitBrief = ({ data = [] }) => {
    const styles = {
        fontWeight: 'bold',
        paddingTop: '10px',
        color: '#000',
        fontSize: '15px',
    };

    // Calculate totals
    const totals = data.length>0 &&  data.reduce((acc, item) => {
        acc.totalCurrentQty += item.totalCurrentQty || 0;
        acc.totalRemaining += item.totalRemaining || 0;
        acc.totalArrivalNotes += item.countArrivalNotes || 0;
        return acc;
    }, {
        totalCurrentQty: 0,
        totalRemaining: 0,
        totalArrivalNotes: 0
    });

    if (data.length === 0) {
        return (
            <div className="text-center p-4">
                <p>No cargo exit data available for the selected date range.</p>
            </div>
        );
    }

    return (
        <TableOpen>
            <TableHead>
                <td>Client Name</td>
                <td>Total Current Qty (KG)</td>
                <td>Total Remaining (KG)</td>
                <td>Arrival Notes Count</td>
                <td>Total Amount</td>
                <td>Efficiency %</td>
            </TableHead>
            <tbody>
                { data.length>0 && data.map((item, index) => {
                    const efficiency = item.totalCurrentQty > 0 
                        ? ((item.totalCurrentQty - item.totalRemaining) / item.totalCurrentQty * 100).toFixed(1)
                        : 0;
                    
                    return (
                        <tr key={index}>
                            <td style={{ fontWeight: 'bold' }}>
                                {item.clientName}
                            </td>
                            <td className="text-end">
                                {item.totalCurrentQty?.toLocaleString()}
                            </td>
                            <td className="text-end">
                                {item.totalRemaining?.toLocaleString()}
                            </td>
                            <td className="text-center">
                                <span className="badge bg-info">
                                    {item.countArrivalNotes}
                                </span>
                            </td>
                            <td className="text-center">
                                
                                    { item.totalAmount && item.totalAmount.toLocaleString()}
                                
                            </td>
                            <td className="text-center">
                                <span 
                                    className={`badge ${efficiency >= 80 ? 'bg-success' : efficiency >= 60 ? 'bg-warning' : 'bg-danger'}`}
                                >
                                    {efficiency}%
                                </span>
                            </td>
                        </tr>
                    );
                })}
                
                {/* Totals Row */}
                <tr style={{ backgroundColor: '#f8f9fa', borderTop: '2px solid #007bff' }}>
                    <td style={styles}>
                        TOTALS ({data.length} clients)
                    </td>
                    <td className="text-end" style={styles}>
                        {totals && totals.totalCurrentQty.toLocaleString()} KG
                    </td>
                    <td className="text-end" style={styles}>
                        {totals && totals.totalRemaining.toLocaleString()} KG
                    </td>
                    <td className="text-center" style={styles}>
                        {totals && totals.totalArrivalNotes}
                    </td>
                    <td className="text-center" style={styles}>
                        {totals && totals.totalCurrentQty > 0 
                            ? ((totals && totals.totalCurrentQty - totals.totalRemaining) / totals.totalCurrentQty * 100).toFixed(1)
                            : 0}%
                    </td>
                </tr>
                
                {/* Summary Row */}
                <tr style={{ backgroundColor: '#e8f5e8' }}>
                    <td colSpan={5} style={{ padding: '15px' }}>
                        <div className="row">
                            <div className="col-md-3">
                                <strong>Total Processed:</strong><br/>
                                <span style={{ fontSize: '1.2em', color: '#28a745' }}>
                                    {(totals && totals.totalCurrentQty - totals.totalRemaining).toLocaleString()} KG
                                </span>
                            </div>
                            <div className="col-md-3">
                                <strong>Still Remaining:</strong><br/>
                                <span style={{ fontSize: '1.2em', color: '#dc3545' }}>
                                    {totals && totals.totalRemaining.toLocaleString()} KG
                                </span>
                            </div>
                            <div className="col-md-3">
                                <strong>Active Clients:</strong><br/>
                                <span style={{ fontSize: '1.2em', color: '#007bff' }}>
                                    {data.length}
                                </span>
                            </div>
                            <div className="col-md-3">
                                <strong>Avg. Notes/Client:</strong><br/>
                                <span style={{ fontSize: '1.2em', color: '#6f42c1' }}>
                                    {data.length > 0 ? (totals.totalArrivalNotes / data.length).toFixed(1) : 0}
                                </span>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </TableOpen>
    );
};

CargoExitBrief.propTypes = {
    data: PropTypes.array
};
