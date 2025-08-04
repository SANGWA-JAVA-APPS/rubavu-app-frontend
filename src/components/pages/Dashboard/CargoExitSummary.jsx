import PropTypes from 'prop-types';
import { Row, Col, Card } from 'react-bootstrap';
import { TableOpen } from '../../Global/ListTable';
import TableHead from '../../Global/TableHead';

export const CargoExitSummary = ({ data = [] }) => {
    // Calculate summary statistics
    const summary = data.reduce((acc, item) => {
        acc.totalCurrentQty += item.current_qty || 0;
        acc.totalRemaining += item.remaining || 0;
        acc.totalRecords += 1;
        
        // Track unique clients
        if (item.user_name && !acc.uniqueClients.has(item.user_name)) {
            acc.uniqueClients.add(item.user_name);
        }
        
        // Track items
        if (item.itemName && !acc.uniqueItems.has(item.itemName)) {
            acc.uniqueItems.add(item.itemName);
        }
        
        // Track carriers
        if (item.carrier && !acc.uniqueCarriers.has(item.carrier)) {
            acc.uniqueCarriers.add(item.carrier);
        }
        
        return acc;
    }, {
        totalCurrentQty: 0,
        totalRemaining: 0,
        totalRecords: 0,
        uniqueClients: new Set(),
        uniqueItems: new Set(),
        uniqueCarriers: new Set()
    });
    
    const processedQty = summary.totalCurrentQty - summary.totalRemaining;
    const efficiencyRate = summary.totalCurrentQty > 0 
        ? (processedQty / summary.totalCurrentQty * 100).toFixed(1) 
        : 0;
    
    // Group data by client for client summary
    const clientSummary = data.reduce((acc, item) => {
        const client = item.user_name || 'Unknown';
        if (!acc[client]) {
            acc[client] = {
                totalQty: 0,
                totalRemaining: 0,
                recordCount: 0,
                items: new Set()
            };
        }
        acc[client].totalQty += item.current_qty || 0;
        acc[client].totalRemaining += item.remaining || 0;
        acc[client].recordCount += 1;
        if (item.itemName) {
            acc[client].items.add(item.itemName);
        }
        return acc;
    }, {});
    
    const clientStats = Object.entries(clientSummary)
        .map(([client, stats]) => ({
            client,
            ...stats,
            processed: stats.totalQty - stats.totalRemaining,
            efficiency: stats.totalQty > 0 ? ((stats.totalQty - stats.totalRemaining) / stats.totalQty * 100).toFixed(1) : 0
        }))
        .sort((a, b) => b.totalQty - a.totalQty)
        .slice(0, 10); // Top 10 clients

    if (data.length === 0) {
        return (
            <div className="text-center p-4">
                <p>No cargo exit data available for the selected date range.</p>
            </div>
        );
    }

    return (
        <div>
            {/* Summary Cards */}
            <Row className="mb-4">
                <Col md={3}>
                    <Card className="text-center h-100" style={{ backgroundColor: '#e3f2fd' }}>
                        <Card.Body>
                            <h5>Total Records</h5>
                            <h3 style={{ color: '#1976d2' }}>{summary.totalRecords.toLocaleString()}</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center h-100" style={{ backgroundColor: '#e8f5e8' }}>
                        <Card.Body>
                            <h5>Total Quantity</h5>
                            <h3 style={{ color: '#388e3c' }}>{summary.totalCurrentQty.toLocaleString()} KG</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center h-100" style={{ backgroundColor: '#fff3e0' }}>
                        <Card.Body>
                            <h5>Processed</h5>
                            <h3 style={{ color: '#f57c00' }}>{processedQty.toLocaleString()} KG</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center h-100" style={{ backgroundColor: '#fce4ec' }}>
                        <Card.Body>
                            <h5>Efficiency Rate</h5>
                            <h3 style={{ color: '#c2185b' }}>{efficiencyRate}%</h3>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            {/* Additional Stats */}
            <Row className="mb-4">
                <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <h6>Active Clients</h6>
                            <h4>{summary.uniqueClients.size}</h4>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <h6>Unique Items</h6>
                            <h4>{summary.uniqueItems.size}</h4>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <h6>Carriers Used</h6>
                            <h4>{summary.uniqueCarriers.size}</h4>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            {/* Top Clients Table */}
            <h5 className="mb-3">Top 10 Clients by Quantity</h5>
            <TableOpen>
                <TableHead>
                    <td>Rank</td>
                    <td>Client Name</td>
                    <td>Total Qty (KG)</td>
                    <td>Processed (KG)</td>
                    <td>Remaining (KG)</td>
                    <td>Records</td>
                    <td>Unique Items</td>
                    <td>Efficiency</td>
                </TableHead>
                <tbody>
                    {clientStats.map((client, index) => (
                        <tr key={client.client}>
                            <td className="text-center">
                                <span className={`badge ${index < 3 ? 'bg-warning' : 'bg-secondary'}`}>
                                    #{index + 1}
                                </span>
                            </td>
                            <td style={{ fontWeight: 'bold' }}>
                                {client.client}
                            </td>
                            <td className="text-end">
                                {client.totalQty.toLocaleString()}
                            </td>
                            <td className="text-end">
                                {client.processed.toLocaleString()}
                            </td>
                            <td className="text-end">
                                {client.totalRemaining.toLocaleString()}
                            </td>
                            <td className="text-center">
                                {client.recordCount}
                            </td>
                            <td className="text-center">
                                {client.items.size}
                            </td>
                            <td className="text-center">
                                <span 
                                    className={`badge ${client.efficiency >= 80 ? 'bg-success' : client.efficiency >= 60 ? 'bg-warning' : 'bg-danger'}`}
                                >
                                    {client.efficiency}%
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </TableOpen>
            
            {/* Performance Summary */}
            <div className="mt-4 p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                <h6>Performance Summary</h6>
                <Row>
                    <Col md={6}>
                        <ul className="list-unstyled">
                            <li><strong>Highest Volume Client:</strong> {clientStats[0]?.client || 'N/A'}</li>
                            <li><strong>Most Efficient Client:</strong> {
                                clientStats.sort((a, b) => b.efficiency - a.efficiency)[0]?.client || 'N/A'
                            }</li>
                        </ul>
                    </Col>
                    <Col md={6}>
                        <ul className="list-unstyled">
                            <li><strong>Average Qty per Record:</strong> {
                                summary.totalRecords > 0 
                                    ? (summary.totalCurrentQty / summary.totalRecords).toFixed(2) + ' KG'
                                    : '0 KG'
                            }</li>
                            <li><strong>Average Records per Client:</strong> {
                                summary.uniqueClients.size > 0 
                                    ? (summary.totalRecords / summary.uniqueClients.size).toFixed(1)
                                    : '0'
                            }</li>
                        </ul>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

CargoExitSummary.propTypes = {
    data: PropTypes.array
};
