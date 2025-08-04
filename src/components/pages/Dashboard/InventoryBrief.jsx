import { TableOpen } from '../../Global/ListTable';
import TableHead from '../../Global/TableHead';

const InventoryBrief = ({ selectedClients, inventoryData }) => {
  // Filter data based on selected clients
  const filteredData = selectedClients.length > 0 
    ? inventoryData.filter(record => selectedClients.includes(record.name))
    : inventoryData;

  // Calculate summary statistics
  const summary = filteredData.reduce((acc, record) => {
    const totalItemWeight =
      "Assorted" === record.assortedOrNot
        ? record.weight
        : record.weight * record.noGrpCargoBalance;
    
    acc.totalClients = new Set([...acc.clientSet, record.name]).size;
    acc.clientSet.add(record.name);
    acc.totalItems += 1;
    acc.totalQuantity += record.noGrpCargoBalance;
    acc.totalWeight += totalItemWeight;
    
    return acc;
  }, {
    totalClients: 0,
    clientSet: new Set(),
    totalItems: 0,
    totalQuantity: 0,
    totalWeight: 0
  });

  const styles = {
    card: {
      backgroundColor: '#f8f9fa',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      padding: '20px',
      margin: '10px 0',
      textAlign: 'center'
    },
    title: {
      fontSize: '1.2em',
      fontWeight: 'bold',
      color: '#007bff',
      marginBottom: '15px'
    },
    statCard: {
      backgroundColor: '#fff',
      border: '1px solid #e0e0e0',
      borderRadius: '6px',
      padding: '15px',
      margin: '5px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    statNumber: {
      fontSize: '1.8em',
      fontWeight: 'bold',
      color: '#28a745'
    },
    statLabel: {
      fontSize: '0.9em',
      color: '#6c757d',
      marginTop: '5px'
    }
  };

  return (
    <div>
      <div style={styles.card}>
        <div style={styles.title}>📊 Inventory Brief Overview</div>
        
        <div className="row">
          <div className="col-md-3">
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{summary.totalClients}</div>
              <div style={styles.statLabel}>Active Clients</div>
            </div>
          </div>
          
          <div className="col-md-3">
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{summary.totalItems}</div>
              <div style={styles.statLabel}>Total Items</div>
            </div>
          </div>
          
          <div className="col-md-3">
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{summary.totalQuantity.toLocaleString()}</div>
              <div style={styles.statLabel}>Total Quantity</div>
            </div>
          </div>
          
          <div className="col-md-3">
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{summary.totalWeight.toLocaleString()}</div>
              <div style={styles.statLabel}>Total Weight (KG)</div>
            </div>
          </div>
        </div>

        {selectedClients.length > 0 && (
          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
            <strong>Filtered for clients:</strong> {selectedClients.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryBrief;
