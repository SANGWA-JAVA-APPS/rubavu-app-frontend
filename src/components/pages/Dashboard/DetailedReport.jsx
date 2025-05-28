import React, { useRef, useState, useEffect } from 'react'
import { useColItemContext } from '../../Global/GlobalDataContentx';
import { TableOpen } from '../../Global/ListTable';
import TableHead from '../../Global/TableHead';
import { SmallSplitter, Splitter, SplitterOnPrint } from '../../globalcomponents/Splitter';
import { TitleSmallDesc, TitleSmallDescOnPrint } from '../../globalcomponents/TitleSmallDesc';
import CurrentDate from '../../Global/CurrentDate';
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar';
import SearchBox from '../../Global/SearchBox';
import { useReactToPrint } from 'react-to-print';
import { useContext } from 'react';
import { DateRangeContext } from '../../globalcomponents/ButtonContext';
import { TitleAndList } from '../../globalcomponents/TitleAndList';
import { Col, Row } from 'react-bootstrap';
import { Form, InputGroup } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Reporting from '../../services/StockServices/Reporting';
import { useAuthHeader } from 'react-auth-kit';
import RevenueTable from './RevenueTable';
import { Nav } from 'react-bootstrap';
import StockRepository from '../../services/StockServices/StockRepository';

function BerthingRevenue({ invoiceReport }) {
  const { selectedItem } = useColItemContext(); // Get the selected item from the context
  const styles = {
    fontWeight: 'bold', paddingTop: '0px', color: '#000', fontSize: '15px'
  }
  let totBerthing = 0.0

  /* #region ---------ToolBar ----------------------- */
  const [searchHeight, setSearchHeight] = useState(0);
  const [height, setHeight] = useState(0);
  const { setStartDate, setendDate, startDate, endDate } = useContext(DateRangeContext)
  const getCommonSearchByDate = (date1, date2) => {
    setStartDate(date1)
    setendDate(date2)
  }
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data'
  });
  /* #endregion */
  let totalBerthingAmount = 0, totWharfageAmount = 0
  return (
    <>
      <TitleSmallDesc title={`Berthing  Report on ${CurrentDate.todaydate()} `} moreclass="showOnPrint" />
      <ListToolBar hideSaveBtn={true} height={height} entity='Arrival note'
        changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)}
        changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)}
        handlePrint={handlePrint} searchHeight={searchHeight} />
      <SearchformAnimation searchHeight={searchHeight}>
        <SearchBox getCommonSearchByDate={getCommonSearchByDate} />
      </SearchformAnimation>
      <div ref={componentRef} className="DashboardPrintView"  >
        <LocalReportAddress reportTitle={`Berthing Report from ${startDate} to ${endDate} `} />
        <span className="showOnPrint" style={{ display: 'none' }}>
        </span>
        <TableOpen>
          <TableHead  >
            {/* <td>Berth Ref.No.</td> */}
            <td>Vessel Operator</td>
            <td>Vessel Name</td>
            <td>Vessel License Plate</td>
            <td>LOA</td>
            <td>Arrival Date/Time</td>
            <td>Exit Date/Time</td>
            <td>Destination</td>
            <td>Wharfage Charges</td>
            <td>Berthing Charges</td>
          </TableHead>
          <tbody>
            {invoiceReport && invoiceReport.map((vessel) => {
              totBerthing += vessel.id
              totalBerthingAmount += vessel.quayAmount
              totWharfageAmount += vessel.handlingCharges
              return (
                <tr key={vessel.id}>
                  {/* <td>{vessel.id}</td> */}
                  <td>{vessel.owner_operator}</td>
                  <td>{vessel.name}</td>
                  <td>{vessel.plate_number}</td>
                  <td>{vessel.loa}</td>
                  <td>{(vessel.etd).includes('T') ? (vessel.etd).split('T')[0] + ' ' + (vessel.etd).split('T')[1] : vessel.etd}</td>
                  <td>{(vessel.ata).includes('T') ? (vessel.ata).split('T')[0] + ' ' + (vessel.ata).split('T')[1] : vessel.ata}</td>
                  <td>{(vessel.loading_port)}</td>
                  <td>{(vessel.handlingCharges).toLocaleString()}</td>
                  <td>{(vessel.quayAmount.toLocaleString())}</td>
                </tr>
              )
            })}
            <td colSpan={5}>
              <SmallSplitter />
              <TitleAndList title="Summary"
                li1={<>    <h5 style={{ display: 'inline' }}>Total Berthing : <span style={styles}>RWF {totalBerthingAmount.toLocaleString()} </span> </h5>              </>}
                li2={<>    <h5 style={{ display: 'inline' }}>Total Wharfage  : <span style={styles}>RWF {totWharfageAmount.toLocaleString()} </span> </h5>              </>}
              />
            </td>
            <td colspan={4}>
              <SmallSplitter />
              <h4>Tariff</h4>
              <table>
                <tr>  <td>{'Wharfage (LOA <= 60m)'}</td>   <td>{'210,000	one time fee'}</td></tr>
                <tr> <td>{'Wharfage (LOA > 60m)'}</td>    <td>{'630,000	one time fee'}</td></tr>
                <tr> <td>{'Berthing (LOA <= 60m)'}</td>   <td>{'28,000	Per day. Grace period 3 days'}</td></tr>
                <tr> <td>{'Berthing (LOA > 60m)'}</td>    <td>	{'84,000	Per day. Grace period 3 days'}</td></tr>
              </table>
            </td>
          </tbody>
        </TableOpen>
      </div>
    </>
  )
}
export default BerthingRevenue

export const TrucksRevenue = ({ truckReport }) => {

  const styles = {
    fontWeight: 'bold', paddingTop: '30px', fontSize: '15px'
  }
  let totalAmount = 0


  /* #region ---------ToolBar ----------------------- */
  const [searchHeight, setSearchHeight] = useState(0);
  const [height, setHeight] = useState(0);
  const { setStartDate, setendDate, startDate, endDate } = useContext(DateRangeContext)
  const getCommonSearchByDate = (date1, date2) => {
    setStartDate(date1)
    setendDate(date2)

  }
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data'
  });
  /* #endregion */

  return <>
    <TitleSmallDesc title={`Trucks  Report on ${CurrentDate.todaydate()} `} moreclass="showOnPrint" />
    <ListToolBar hideSaveBtn={true} height={height} entity='Arrival note'
      changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)}
      changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)}
      handlePrint={handlePrint} searchHeight={searchHeight} />
    <SearchformAnimation searchHeight={searchHeight}>
      <SearchBox getCommonSearchByDate={getCommonSearchByDate} />
    </SearchformAnimation>
    <div ref={componentRef} className="DashboardPrintView"  >
      <LocalReportAddress reportTitle={`Trucks Report from ${startDate} to ${endDate} `} />
      <TableOpen>
        <TableHead>
          {/* <td>Gate Ref. No.</td> */}
          <td>Truck Driver</td>
          <td>Licence Plate Number</td>
          <td>Arrival Time</td>
          <td>Exit Time</td>
          <td>12-hour blocks</td>
          <td>Amount</td>
        </TableHead>
        <tbody>
          {truckReport.map((truck, i) => {
            const hasDigit = truck.driverName && /\d/.test(truck.driverName);
            const timeHasDigit = truck.get_out_time && /\d/.test(truck.get_out_time);
            let driverWrongval = hasDigit ? 'NA' : truck.driverName
            let outTimeWrongval = hasDigit ? 'NA' : truck.get_out_time
            totalAmount += truck.amount
            return (
              <tr key={truck.id}>
                {/* <td>{truck.id} </td> */}

                <td>{driverWrongval}</td>
                <td>{truck.licence_plate_number}</td>
                <td>{truck.entryTime && (truck.entryTime).toLocaleString()}</td>
                <td>{truck.get_out_time && ((truck.get_out_time).split('T')[0] + ' ' + (truck.get_out_time).split('T')[1])}</td>
                <td>{(truck.totalDays + 1)}</td>
                <td>{truck.amount && (truck.amount).toLocaleString()}</td>

              </tr>
            )
          })}
          <td colSpan={5}>
            <SmallSplitter />
            <TitleAndList title="Summary"
              li1={<>    <h5 style={{ display: 'inline' }}>Total Parking : <span style={localStyle()}>RWF {totalAmount.toLocaleString()} </span> </h5>              </>}
            />
          </td>
          <td colspan={4}>
            <SmallSplitter />
            <h4>Tariff</h4>
            <table>
              <tr>  <td>{'Parking'}</td>   <td>{"RWF 5000 per 12 hour block"}</td></tr>

            </table>
          </td>
        </tbody>
      </TableOpen>
    </div>
  </>
}

const CargoSearchBox = ({ getCommonSearchByDate, onGoodsFilter, onTonnageFilter }) => {
  const [goodsFilter, setGoodsFilter] = useState('');
  const [tonnageFilter, setTonnageFilter] = useState('');
  const [tonnageOperator, setTonnageOperator] = useState('=');
  const [filterType, setFilterType] = useState('individual'); // 'individual' or 'aggregate'
  const [aggregatePeriod, setAggregatePeriod] = useState('daily'); // 'daily' or 'monthly'
  const [aggregateOperator, setAggregateOperator] = useState('>');
  const [aggregateTonnage, setAggregateTonnage] = useState('');

  const handleGoodsFilterChange = (e) => {
    const value = e.target.value;
    setGoodsFilter(value);
    onGoodsFilter(value);
  };

  const handleTonnageFilterChange = (e) => {
    const value = e.target.value;
    setTonnageFilter(value);
    onTonnageFilter(tonnageOperator, value);
  };

  const handleTonnageOperatorChange = (e) => {
    const value = e.target.value;
    setTonnageOperator(value);
    onTonnageFilter(value, tonnageFilter);
  };

  const handleFilterTypeChange = (e) => {
    const value = e.target.value;
    setFilterType(value);
    // Reset filters when switching types
    setTonnageFilter('');
    setAggregateTonnage('');
    onGoodsFilter('');
  };

  const handleAggregatePeriodChange = (e) => {
    const value = e.target.value;
    setAggregatePeriod(value);
    onTonnageFilter(aggregateOperator, aggregateTonnage, value);
  };

  const handleAggregateOperatorChange = (e) => {
    const value = e.target.value;
    setAggregateOperator(value);
    onTonnageFilter(value, aggregateTonnage, aggregatePeriod);
  };

  const handleAggregateTonnageChange = (e) => {
    const value = e.target.value;
    setAggregateTonnage(value);
    onTonnageFilter(aggregateOperator, value, aggregatePeriod);
  };

  return (
    <Row className="mb-3">
      <Col md={12} className="my-2">
        <Form.Select 
          value={filterType} 
          onChange={handleFilterTypeChange}
          className="mb-2"
        >
          <option value="individual">Filter Individual Records</option>
          <option value="aggregate">Filter by Goods Type Aggregate</option>
        </Form.Select>
      </Col>

      {filterType === 'individual' ? (
        <>
          <Col md={3}>
            <InputGroup>
              <InputGroup.Text>Goods</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Filter by goods..."
                value={goodsFilter}
                onChange={handleGoodsFilterChange}
              />
            </InputGroup>
          </Col>
          <Col md={4}>
            <InputGroup>
              <InputGroup.Text>Tonnage (tons)</InputGroup.Text>
              <Form.Select
                value={tonnageOperator}
                onChange={handleTonnageOperatorChange}
                style={{ maxWidth: '100px' }}
              >
                <option value="=">=</option>
                <option value=">">&gt;</option>
                <option value="<">&lt;</option>
                <option value=">=">&gt;=</option>
                <option value="<=">&lt;=</option>
              </Form.Select>
              <Form.Control
                type="number"
                placeholder="Enter tonnage..."
                value={tonnageFilter}
                onChange={handleTonnageFilterChange}
              />
            </InputGroup>
          </Col>
        </>
      ) : (
        <>
          <Col md={3}>
            <InputGroup>
              <InputGroup.Text>Period</InputGroup.Text>
              <Form.Select
                value={aggregatePeriod}
                onChange={handleAggregatePeriodChange}
              >
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
              </Form.Select>
            </InputGroup>
          </Col>
          <Col md={4}>
            <InputGroup>
              <InputGroup.Text>Tonnage (tons)</InputGroup.Text>
              <Form.Select
                value={aggregateOperator}
                onChange={handleAggregateOperatorChange}
                style={{ maxWidth: '100px' }}
              >
                <option value=">">&gt;</option>
                <option value="<">&lt;</option>
                <option value="=">=</option>
                <option value=">=">&gt;=</option>
                <option value="<=">&lt;=</option>
              </Form.Select>
              <Form.Control
                type="number"
                placeholder="Enter tonnage..."
                value={aggregateTonnage}
                onChange={handleAggregateTonnageChange}
              />
            </InputGroup>
          </Col>
        </>
      )}
      <Col md={5}>
        <SearchBox getCommonSearchByDate={getCommonSearchByDate} />
      </Col>
    </Row>
  );
};

export const CargoRevenue = ({ cargoAmountReport }) => {
  const styles = {
    fontWeight: 'bold', paddingTop: '30px', fontSize: '15px'
  }
  let tally = 0.0, tallyIn = 0.0, tallyOut = 0.0, amount = 0
  let toWarehouseAmount = 0, totalOutWarehouse = 0

  /* #region ---------ToolBar ----------------------- */
  const [searchHeight, setSearchHeight] = useState(0);
  const [height, setHeight] = useState(0);
  const { setStartDate, setendDate, startDate, endDate } = useContext(DateRangeContext)
  const [filteredTally, setFilteredTally] = useState([]);
  const [filteredTallyIn, setFilteredTallyIn] = useState([]);
  const [filteredTallyOut, setFilteredTallyOut] = useState([]);
  const [activeTab, setActiveTab] = useState('cargo-report');
  const [cargoExitData, setCargoExitData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const getAuthHeader = useAuthHeader();
  const authHeader = getAuthHeader();

  const getCommonSearchByDate = (date1, date2) => {
    setStartDate(date1)
    setendDate(date2)
    if (activeTab === 'cargo-exit') {
      fetchCargoExitData(date1, date2);
    }
  }

  const fetchInventoryData = async () => {
    try {
      console.log('Starting inventory data fetch...');
      const response = await StockRepository.inventoryReport(authHeader);
      console.log('Raw inventory response:', response);
      
      // Check if response exists and has data property
      if (response && response.data) {
        console.log('Response data structure:', response.data);
        // If the data is directly the array, use it
        if (Array.isArray(response.data)) {
          console.log('Data is direct array, length:', response.data.length);
          setInventoryData(response.data);
        }
        // If the data has allCargoByClient property, use that
        else if (response.data.allCargoByClient) {
          console.log('Data has allCargoByClient, length:', response.data.allCargoByClient.length);
          setInventoryData(response.data.allCargoByClient);
        }
        // If neither, set empty array
        else {
          console.warn('Unexpected inventory data structure:', response.data);
          setInventoryData([]);
        }
      } else {
        console.warn('No data received from inventory report');
        setInventoryData([]);
      }
    } catch (error) {
      console.error('Error fetching inventory data:', error);
      setInventoryData([]);
    }
  };

  const fetchCargoExitData = async (start, end) => {
    try {
      console.log('Fetching cargo exit data...');
      const response = await Reporting.cargoExitReport(start, end, authHeader);
      console.log('Cargo exit response:', response);
      
      if (response && response.data) {
        setCargoExitData(response.data);
      } else {
        console.warn('No data received from cargo exit report');
        setCargoExitData([]);
      }
    } catch (error) {
      console.error('Error fetching cargo exit data:', error);
      setCargoExitData([]);
    }
  };

  const convertKgToTons = (kg) => kg / 1000;

  const handleGoodsFilter = (value) => {
    if (!value) {
      setFilteredTally(cargoAmountReport.tally || []);
      setFilteredTallyIn(cargoAmountReport.tallyIn || []);
      setFilteredTallyOut(cargoAmountReport.tallyOut || []);
      return;
    }

    const filterByGoods = (items) => {
      return items.filter(item => 
        item.cargo?.toLowerCase().includes(value.toLowerCase()) ||
        item.itemName?.toLowerCase().includes(value.toLowerCase())
      );
    };

    setFilteredTally(filterByGoods(cargoAmountReport.tally || []));
    setFilteredTallyIn(filterByGoods(cargoAmountReport.tallyIn || []));
    setFilteredTallyOut(filterByGoods(cargoAmountReport.tallyOut || []));
  };

  const handleTonnageFilter = (operator, value, period = null) => {
    if (!value) {
      setFilteredTally(cargoAmountReport.tally || []);
      setFilteredTallyIn(cargoAmountReport.tallyIn || []);
      setFilteredTallyOut(cargoAmountReport.tallyOut || []);
      return;
    }

    const filterByTonnage = (items) => {
      if (period) {
        // Group by goods type and date
        const groupedByGoods = items.reduce((acc, item) => {
          const goodsType = item.cargo || item.itemName;
          const date = new Date(item.entry_date || item.date_time);
          const key = period === 'monthly' 
            ? `${goodsType}-${date.getFullYear()}-${date.getMonth()}`
            : `${goodsType}-${date.toISOString().split('T')[0]}`;
          
          if (!acc[key]) {
            acc[key] = {
              goodsType,
              totalWeight: 0,
              items: []
            };
          }
          
          const weight = 'Assorted' !== item.cargoAssorted ? 
            (item.weight * (item.unit || item.purchased_qty || item.sold_qty)) : 
            item.weight;
          
          acc[key].totalWeight += weight;
          acc[key].items.push(item);
          
          return acc;
        }, {});

        // Filter groups based on total weight
        const filteredGroups = Object.values(groupedByGoods).filter(group => {
          const totalTons = convertKgToTons(group.totalWeight);
          switch(operator) {
            case '>': return totalTons > Number(value);
            case '<': return totalTons < Number(value);
            case '>=': return totalTons >= Number(value);
            case '<=': return totalTons <= Number(value);
            default: return totalTons === Number(value);
          }
        });

        // Flatten filtered groups back to items
        return filteredGroups.flatMap(group => group.items);
      } else {
        // Individual record filtering
        return items.filter(item => {
          const weight = 'Assorted' !== item.cargoAssorted ? 
            (item.weight * (item.unit || item.purchased_qty || item.sold_qty)) : 
            item.weight;
          
          const weightInTons = convertKgToTons(weight);
          
          switch(operator) {
            case '>': return weightInTons > Number(value);
            case '<': return weightInTons < Number(value);
            case '>=': return weightInTons >= Number(value);
            case '<=': return weightInTons <= Number(value);
            default: return weightInTons === Number(value);
          }
        });
      }
    };

    setFilteredTally(filterByTonnage(cargoAmountReport.tally || []));
    setFilteredTallyIn(filterByTonnage(cargoAmountReport.tallyIn || []));
    setFilteredTallyOut(filterByTonnage(cargoAmountReport.tallyOut || []));
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data'
  });
  /* #endregion */

  // Initialize filtered data when component mounts or cargoAmountReport changes
  useEffect(() => {
    setFilteredTally(cargoAmountReport.tally || []);
    setFilteredTallyIn(cargoAmountReport.tallyIn || []);
    setFilteredTallyOut(cargoAmountReport.tallyOut || []);
  }, [cargoAmountReport]);

  // Fetch inventory data when tab changes
  useEffect(() => {
    console.log('Tab changed to:', activeTab);
    if (activeTab === 'inventory') {
      console.log('Fetching inventory data...');
      fetchInventoryData();
    }
  }, [activeTab]);

  // Fetch cargo exit data when tab changes
  useEffect(() => {
    if (activeTab === 'cargo-exit') {
      fetchCargoExitData(startDate, endDate);
    }
  }, [activeTab]);

  const renderCargoReportTab = () => (
    <div ref={componentRef} className="DashboardPrintView">
      <LocalReportAddress reportTitle={`Cargo Report from ${startDate} to ${endDate} `} leftAddress="MAGERWA" />
      <TableOpen>
        <TableHead>
          <td>Ref. No.</td>
          <td>Cargo Owner</td>
          <td>Cargo </td>
          <td>Movement </td>
          <td>Entry Date</td>
          <td>Exit Date</td>
          <td>Total Weight (KG)</td>
          <td>Import/Export</td>
          <td>Number Of Days</td>
          <td>Handling Amount</td>
          <td>Storage Amount</td>
        </TableHead>
        <tbody>
          {filteredTally.map((record) => {
            tally += record.weight
            amount += record.invoiceAmount
            return (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.clientName} </td>
                <td>{record.cargo}</td>
                <td>{record.destinationName}</td>
                <td>{record.entry_date && (record.entry_date).split('T')[0] + ' ' + (record.entry_date).split('T')[1]}</td>
                <td>{record.invDate && (record.invDate).split('T')[0] + ' ' + (record.invDate).split('T')[1]}</td>
                <td>{'Assorted' !== record.cargoAssorted ? (record.weight * record.unit).toLocaleString()
                  : (record.weight).toLocaleString()} </td>
                <td>{record.tarifftype ? ('1' === record.tarifftype ? 'Export' : 'Import') : 'NA'} </td>
                <td>0 </td>
                <td>RWF {record.invoiceAmount && (record.invoiceAmount).toLocaleString()} </td>
                <td>N/A  </td>
              </tr>
            )
          })}
          <tr>
            <td colSpan={6}>
              <p style={styles}>Total Tonnage (transhipments): </p>
            </td>
            <td colspan={2}><p style={styles}>{tally.toLocaleString()} KG</p></td>
            <td colSpan={4}>
              <p style={styles}>Total Amount RWF {amount.toLocaleString()}  </p>
            </td>
          </tr>

          {filteredTallyIn.map((record) => {
            tallyIn += 'Assorted' === record.cargoAssorted ? record.weight : record.weight * record.purchased_qty
            toWarehouseAmount += record.invoiceAmount
            return (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.itemName}</td>
                <td>{record.itemName}</td>
                <td>{record.destName}</td>
                <td>{record.date_time}</td>
                <td>{record.invDate}</td>
                <td>{'Assorted' === record.cargoAssorted ? (record.weight).toLocaleString() : (record.weight * record.purchased_qty).toLocaleString()}</td>
                <td>{'1' === record.importExport ? 'Export' : 'Import'}</td>
                <td>0</td>
                <td>{(record.invoiceAmount).toLocaleString()}</td>
                <td>N/A </td>
              </tr>
            )
          })}

          <tr>
            <td colSpan={6}>
              <p style={styles}>
                Total Tonnage Moved To the Warehouse:  </p>
            </td>
            <td colspan={2}> <p style={styles}>{tallyIn.toLocaleString()} KG</p> </td>
            <td colSpan={3}>
              <p style={styles}> Total Amount: RWF {toWarehouseAmount.toLocaleString()} </p>
            </td>
          </tr>
          {filteredTallyOut.map((record) => {
            tallyOut += record.weight* record.sold_qty
            totalOutWarehouse += (record.weight * record.sold_qty) * 0.6
            return (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.user_name}</td>
                <td>{record.itemName}</td>
                <td>Warehouse Truck</td>
                <td>{record.date_time}</td>
                <td>{endDate}</td>
                <td>{(record.weight * record.sold_qty).toLocaleString()}</td>
                <td>Import</td>
                <td>15 </td>
                <td>N/A</td>
                <td>RWF{(record.weight * record.sold_qty) * 0.6}</td>
              </tr>
            )
          })}
          <tr>
            <td colSpan={6}> <p style={styles}> Total Tonnage Moved from the warehouse:  </p></td>
            <td colSpan={2}>
              <p style={styles}>  {tallyOut.toLocaleString()} KG</p>
            </td>
            <td colSpan={3}>
              <p style={styles}> Total Amount: RWF {(totalOutWarehouse).toLocaleString()} </p>
            </td>
          </tr>
          <tr>
            <td colspan={6} >
              <Splitter />
              <h4>Tariff</h4>
              <table>
                <tr>
                  <td>Tariff</td>
                  <td>RWF</td>
                  <td>Comments</td>
                </tr>
                <tr>  <td>{'Storage'}</td>    <td>{'0'}</td><td>{'day 1 up to 14'}</td></tr>
                <tr> <td>{'Storage)'}</td>    <td>{'0.6'}</td><td>{'Per day per kg from day 15 - day 30'}</td></tr>
                <tr> <td>{'Storage'}</td>     <td>{'1.2'}</td><td>{'Per day per kg from day 31 onwards'}</td></tr>
                <tr> <td>{'Handling'}</td>    <td>{'2.0'}</td><td>{'Per kg. For cargo imported.'}</td></tr>
                <tr> <td>{'Handling'}</td>    <td>{'0.4'}</td><td>{'Per kg. For cargo made locally.'}</td></tr>
              </table>
            </td>
          </tr>
        </tbody>
      </TableOpen>
    </div>
  );

  const renderInventoryTab = () => {
    let totalWeight = 0;
    let totalQuantity = 0;

    return (
      <div className="DashboardPrintView">
        <LocalReportAddress reportTitle={`Inventory Report as of ${CurrentDate.todaydate()}`} leftAddress="MAGERWA" />
        <TableOpen>
          <TableHead>
            <td>Client Name</td>
            <td>Item Name</td>
            <td>Last Updated</td>
            <td>Previous Quantity</td>
            <td>Current Balance</td>
            <td>Weight per Unit (KG)</td>
            <td>Total Weight (KG)</td>
          </TableHead>
          <tbody>
            {inventoryData.map((record) => {
              const totalItemWeight = record.weight * record.noGrpCargoBalance;
              totalWeight += totalItemWeight;
              totalQuantity += record.noGrpCargoBalance;
              
              return (
                <tr key={record.id}>
                  <td>{record.name}</td>
                  <td>{record.itemName}</td>
                  <td>{record.lastDate && record.lastDate.split(' ')[0]}</td>
                  <td>{record.prevQty.toLocaleString()}</td>
                  <td>{record.noGrpCargoBalance.toLocaleString()}</td>
                  <td>{record.weight.toLocaleString()}</td>
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

  const renderCargoExitTab = () => {
    let totalAmount = 0;
    let totalWeight = 0;

    return (
      <div className="DashboardPrintView">
        <LocalReportAddress reportTitle={`Cargo Exit Report from ${startDate} to ${endDate} `} leftAddress="MAGERWA" />
        <TableOpen>
          <TableHead>
            <td>Ref. No.</td>
            <td>Client Name</td>
            <td>Cargo Type</td>
            <td>Entry Date</td>
            <td>Total Weight (KG)</td>
            <td>Amount (RWF)</td>
            <td>Status</td>
          </TableHead>
          <tbody>
            {cargoExitData.map((record) => {
              const invoice = record.o_mdl_gen_invoices?.[0];
              totalAmount += invoice?.total_amount || 0;
              totalWeight += invoice?.total_weight || 0;
              
              return (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.mdl_client?.mdl_client?.name || 'N/A'}</td>
                  <td>{record.o_talliess?.[0]?.cargo || 'N/A'}</td>
                  <td>{record.date_time && record.date_time.split(' ')[0]}</td>
                  <td>{(invoice?.total_weight || 0).toLocaleString()}</td>
                  <td>{(invoice?.total_amount || 0).toLocaleString()}</td>
                  <td>{record.status}</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={4}>
                <p style={styles}>Total Summary:</p>
              </td>
              <td>
                <p style={styles}>{totalWeight.toLocaleString()} KG</p>
              </td>
              <td colSpan={2}>
                <p style={styles}>RWF {totalAmount.toLocaleString()}</p>
              </td>
            </tr>
          </tbody>
        </TableOpen>
      </div>
    );
  };

  return (
    <>
      <TitleSmallDesc title={`Cargo Report on ${CurrentDate.todaydate()} `} moreclass="showOnPrint" />
      <ListToolBar 
        hideSaveBtn={true} 
        height={height} 
        entity='Arrival note'
        changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)}
        changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)}
        handlePrint={handlePrint} 
        searchHeight={searchHeight} 
      />
      <SearchformAnimation searchHeight={searchHeight}>
        {activeTab === 'cargo-report' && (
          <CargoSearchBox 
            getCommonSearchByDate={getCommonSearchByDate}
            onGoodsFilter={handleGoodsFilter}
            onTonnageFilter={handleTonnageFilter}
          />
        )}
        {activeTab === 'cargo-exit' && (
          <SearchBox getCommonSearchByDate={getCommonSearchByDate} />
        )}
      </SearchformAnimation>

      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="cargo-report">
            <Nav.Item>
              <Nav.Link 
                eventKey="cargo-report" 
                onClick={() => setActiveTab('cargo-report')}
                active={activeTab === 'cargo-report'}
              >
                Cargo Report
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                eventKey="inventory" 
                onClick={() => setActiveTab('inventory')}
                active={activeTab === 'inventory'}
              >
                Inventory
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                eventKey="cargo-exit" 
                onClick={() => setActiveTab('cargo-exit')}
                active={activeTab === 'cargo-exit'}
              >
                Cargo Exit
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          {activeTab === 'cargo-report' && renderCargoReportTab()}
          {activeTab === 'inventory' && renderInventoryTab()}
          {activeTab === 'cargo-exit' && renderCargoExitTab()}
        </Card.Body>
      </Card>
    </>
  );
}

export const AllRevenue = () => {
  return (
    <div>
      <TitleAndList title="All Revenue" />
      <RevenueTable />
    </div>
  );
}

export const LocalReportAddress = ({ reportTitle, leftAddress = "MAGERWA", rightSideAddress }) => {
  return <>   <Row className='  showOnPrint' style={{ marginBottom: '50px', display: 'none' }}>
    <Col md={5}>{leftAddress}
      <Col md={12}>Date: {CurrentDate.todaydate()}</Col>
    </Col>
    <Col md={6} className="pe-5 text-end">{rightSideAddress} </Col>
  </Row >
    <SplitterOnPrint />
    <span className='  showOnPrint' style={{ display: 'none' }}> <TitleSmallDescOnPrint title={` ${reportTitle} `} /> </span>
  </>

}

export const localStyle = () => {
  return {
    fontWeight: 'bold', paddingTop: '0px', color: '#000', fontSize: '15px'
  }
}