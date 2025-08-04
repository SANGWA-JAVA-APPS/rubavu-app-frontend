import { LocalReportAddress } from './DetailedReport';
import { TableOpen } from '../../Global/ListTable';
import TableHead from '../../Global/TableHead';
import CurrentDate from '../../Global/CurrentDate';

const InventoryDetailed = ({ selectedClients, inventoryData }) => {
  // Filter data based on selected clients
  const filteredData = selectedClients.length > 0 
    ? inventoryData.filter(record => selectedClients.includes(record.name))
    : inventoryData;

  let totalWeight = 0;
  let totalQuantity = 0;

  const styles = {
    fontWeight: "bold",
    paddingTop: "30px",
    fontSize: "15px",
  };

  return (
    <div className="DashboardPrintView">
      <LocalReportAddress
        reportTitle={`Inventory Report as of ${CurrentDate.todaydate()}`}
        leftAddress="MAGERWA"
      />
      
      {selectedClients.length > 0 && (
        <div style={{ 
          marginBottom: '15px', 
          padding: '10px', 
          backgroundColor: '#e3f2fd', 
          borderRadius: '4px',
          fontSize: '0.9em'
        }}>
          <strong>Filtered for clients:</strong> {selectedClients.join(', ')}
        </div>
      )}

      <TableOpen>
        <TableHead>
          <td>A.No.</td>
          <td>Client Name</td>
          <td>Item Name</td>
          <td>Entry Date</td>
          
          <td>Previous Quantity</td>
          <td>Current Balance</td>
          <td>Weight (KG)</td>
          <td>Total Weight (KG)</td>
        </TableHead>
        <tbody>
          {filteredData.map((record) => {
            const totalItemWeight =
              "Assorted" === record.assortedOrNot
                ? record.weight
                : record.weight * record.noGrpCargoBalance;
            totalWeight += totalItemWeight;
            totalQuantity += record.noGrpCargoBalance;

            return (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.name}</td>
                <td>
                  {record.itemName}{" "}
                  <span
                    className={`badge ms-2 `}
                           style={{ fontSize: "0.75em", verticalAlign: "middle", backgroundColor: record.assortedOrNot === "Assorted" ? "#a6571b" : "#1b6e85", }}
                  >
                    {record.assortedOrNot}{" "}
                  </span>
                </td>
                <td>{record.date_time && record.date_time.split(" ")[0]}</td>
                
                <td>{record.prevQty.toLocaleString()}</td>
                <td>{record.noGrpCargoBalance.toLocaleString()}</td>
                <td>{totalItemWeight.toLocaleString()}</td>
                <td>{totalItemWeight.toLocaleString()}</td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={4}>
              <p style={styles}>Total Summary:</p>
            </td>
            <td>
              <p style={styles}>{totalQuantity.toLocaleString()} units</p>
            </td>
            <td colSpan={2}>
              <p style={styles}>{totalWeight.toLocaleString()} KG</p>
            </td>
          </tr>
        </tbody>
      </TableOpen>
    </div>
  );
};

export default InventoryDetailed;
