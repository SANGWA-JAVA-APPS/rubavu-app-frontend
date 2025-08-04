import { TableOpen } from '../../Global/ListTable';
import TableHead from '../../Global/TableHead';

const InventorySummary = ({ selectedClients, inventoryData }) => {
  // Filter data based on selected clients
  const filteredData = selectedClients.length > 0 
    ? inventoryData.filter(record => selectedClients.includes(record.name))
    : inventoryData;

  // Group data by client
  const clientSummary = filteredData.reduce((acc, record) => {
    const clientName = record.name;
    const totalItemWeight =
      "Assorted" === record.assortedOrNot
        ? record.weight
        : record.weight * record.noGrpCargoBalance;

    if (!acc[clientName]) {
      acc[clientName] = {
        clientName,
        totalItems: 0,
        totalQuantity: 0,
        totalWeight: 0,
        lastUpdated: record.lastDate
      };
    }

    acc[clientName].totalItems += 1;
    acc[clientName].totalQuantity += record.noGrpCargoBalance;
    acc[clientName].totalWeight += totalItemWeight;
    
    // Keep the most recent date
    if (record.lastDate > acc[clientName].lastUpdated) {
      acc[clientName].lastUpdated = record.lastDate;
    }

    return acc;
  }, {});

  const summaryArray = Object.values(clientSummary);
  
  // Sort clients by total weight in descending order to identify top performers
  const sortedSummaryArray = [...summaryArray].sort((a, b) => b.totalWeight - a.totalWeight);
  
  const styles = {
    fontWeight: "bold",
    paddingTop: "30px",
    fontSize: "15px",
  };

  // Function to get background color based on client ranking
  const getClientRowStyle = (clientName) => {
    const clientIndex = sortedSummaryArray.findIndex(client => client.clientName === clientName);
    
    if (clientIndex === 0) {
      // Top 1 client - green background
      return {
        backgroundColor: '#d4edda',
        border: '2px solid #28a745',
        fontWeight: 'bold'
      };
    } else if (clientIndex === 1) {
      // Top 2 client - light green background
      return {
        backgroundColor: '#e8f5e9',
        border: '1px solid #4caf50',
        fontWeight: 'bold'
      };
    }
    return {};
  };

  const grandTotals = summaryArray.reduce((acc, client) => {
    acc.totalItems += client.totalItems;
    acc.totalQuantity += client.totalQuantity;
    acc.totalWeight += client.totalWeight;
    return acc;
  }, { totalItems: 0, totalQuantity: 0, totalWeight: 0 });

  return (
    <div>
      <h4 style={{ color: '#007bff', marginBottom: '20px' }}>📋 Inventory Summary by Client</h4>
      
      {selectedClients.length > 0 && (
        <div style={{ 
          marginBottom: '15px', 
          padding: '10px', 
          backgroundColor: '#e3f2fd', 
          borderRadius: '4px',
          fontSize: '0.9em'
        }}>
          <strong>Showing data for:</strong> {selectedClients.join(', ')}
        </div>
      )}

      <TableOpen>
        <TableHead>
          <td>Client Name</td>
          <td>Total Items</td>
          <td>Total Quantity</td>
          <td>Total Weight (KG)</td>
          <td>Last Updated</td>
        </TableHead>
        <tbody>
          {summaryArray.map((client, index) => (
            <tr key={index} style={getClientRowStyle(client.clientName)}>
              <td style={{ fontWeight: 'bold', color: '#007bff' }}>
                {client.clientName}
                {/* Add ranking badges for top 2 clients */}
                {sortedSummaryArray.findIndex(c => c.clientName === client.clientName) === 0 && (
                  <span 
                    style={{
                      marginLeft: '8px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '3px',
                      fontSize: '0.75em',
                      fontWeight: 'bold'
                    }}
                  >
                    🏆 #1
                  </span>
                )}
                {sortedSummaryArray.findIndex(c => c.clientName === client.clientName) === 1 && (
                  <span 
                    style={{
                      marginLeft: '8px',
                      backgroundColor: '#4caf50',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '3px',
                      fontSize: '0.75em',
                      fontWeight: 'bold'
                    }}
                  >
                    🥈 #2
                  </span>
                )}
              </td>
              <td style={{ textAlign: 'center' }}>
                {client.totalItems}
              </td>
              <td style={{ textAlign: 'right' }}>
                {client.totalQuantity.toLocaleString()}
              </td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                {client.totalWeight.toLocaleString()} KG
              </td>
              <td>
                {client.lastUpdated ? client.lastUpdated.split(' ')[0] : 'N/A'}
              </td>
            </tr>
          ))}
          
          {/* Grand Totals Row */}
          <tr style={{ 
            backgroundColor: '#f8f9fa', 
            borderTop: '2px solid #007bff',
            fontWeight: 'bold'
          }}>
            <td style={{ color: '#007bff', fontSize: '1.1em' }}>
              GRAND TOTALS ({summaryArray.length} clients)
            </td>
            <td style={{ textAlign: 'center', backgroundColor: '#e3f2fd' }}>
              {grandTotals.totalItems}
            </td>
            <td style={{ textAlign: 'right', backgroundColor: '#e8f5e8' }}>
              {grandTotals.totalQuantity.toLocaleString()}
            </td>
            <td style={{ textAlign: 'right', backgroundColor: '#fff3e0' }}>
              {grandTotals.totalWeight.toLocaleString()} KG
            </td>
            <td style={{ backgroundColor: '#f8f9fa' }}>
              -
            </td>
          </tr>
        </tbody>
      </TableOpen>
    </div>
  );
};

export default InventorySummary;
