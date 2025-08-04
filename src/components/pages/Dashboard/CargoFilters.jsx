import React, { useState } from "react";
import { Row, Col, Form, InputGroup } from "react-bootstrap";
import SearchBox from "../../Global/SearchBox";

// Utility function to convert KG to tons
export const convertKgToTons = (kg) => kg / 1000;

// Advanced search box component for cargo filtering
export const CargoSearchBox = ({
  getCommonSearchByDate,
  onGoodsFilter,
  onTonnageFilter,
}) => {
  const [goodsFilter, setGoodsFilter] = useState("");
  const [tonnageFilter, setTonnageFilter] = useState("");
  const [tonnageOperator, setTonnageOperator] = useState("=");
  const [filterType, setFilterType] = useState("individual"); // 'individual' or 'aggregate'
  const [aggregatePeriod, setAggregatePeriod] = useState("daily"); // 'daily' or 'monthly'
  const [aggregateOperator, setAggregateOperator] = useState(">");
  const [aggregateTonnage, setAggregateTonnage] = useState("");

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
    setTonnageFilter("");
    setAggregateTonnage("");
    onGoodsFilter("");
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
      <Col md={12}>
        <SearchBox getCommonSearchByDate={getCommonSearchByDate} />
      </Col>
      <Col md={4} className="my-2">
        <Form.Select
          value={filterType}
          onChange={handleFilterTypeChange}
          className="mb-2"
        >
          <option value="individual">Filter Individual Records</option>
          <option value="aggregate">Filter by Goods Type Aggregate</option>
        </Form.Select>
      </Col>

      {filterType === "individual" ? (
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
                style={{ maxWidth: "100px" }}
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
                style={{ maxWidth: "100px" }}
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
    </Row>
  );
};

// Client selector component for filtering by specific clients
export const CargoClientSelector = ({
  selectedClients,
  availableClients,
  onClientToggle,
  onSelectAll,
  onClearAll,
  showComponent = true,
}) => {
  const [clientFilter, setClientFilter] = React.useState('');

  const handleClientToggle = (clientName) => {
    onClientToggle(clientName);
  };

  const handleSelectAll = () => {
    onSelectAll();
  };

  const handleClearAll = () => {
    onClearAll();
  };

  // Filter clients based on search text
  const filteredAvailableClients = React.useMemo(() => {
    if (!clientFilter) return availableClients;
    return availableClients.filter(client => 
      client.toLowerCase().includes(clientFilter.toLowerCase())
    );
  }, [availableClients, clientFilter]);

  // Only show if showComponent is true
  if (!showComponent) return null;

  return (
    <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <strong>Filter by Clients:</strong>
        <div>
          <button 
            onClick={handleSelectAll}
            style={{ 
              marginRight: '8px', 
              padding: '4px 8px', 
              fontSize: '0.8em',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            Select All
          </button>
          <button 
            onClick={handleClearAll}
            style={{ 
              padding: '4px 8px', 
              fontSize: '0.8em',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            Clear All
          </button>
        </div>
      </div>
      
      {/* Search textbox for filtering clients */}
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search clients..."
          value={clientFilter}
          onChange={(e) => setClientFilter(e.target.value)}
          style={{
            width: '100%',
            padding: '6px 10px',
            fontSize: '0.9em',
            border: '1px solid #dee2e6',
            borderRadius: '4px',
            backgroundColor: '#fff'
          }}
        />
        {clientFilter && (
          <div style={{ fontSize: '0.8em', color: '#6c757d', marginTop: '4px' }}>
            Showing {filteredAvailableClients.length} of {availableClients.length} clients
          </div>
        )}
      </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxHeight: '120px', overflowY: 'auto' }}>
        {filteredAvailableClients.map(client => (
          <label 
            key={client}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '4px 8px',
              backgroundColor: selectedClients.includes(client) ? '#e3f2fd' : '#fff',
              border: `1px solid ${selectedClients.includes(client) ? '#007bff' : '#dee2e6'}`,
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9em',
              minWidth: '120px'
            }}
          >
            <input
              type="checkbox"
              checked={selectedClients.includes(client)}
              onChange={() => handleClientToggle(client)}
              style={{ marginRight: '6px' }}
            />
            {client}
          </label>
        ))}
      </div>
      
      {filteredAvailableClients.length === 0 && clientFilter && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#6c757d', fontSize: '0.9em' }}>
          No clients found matching &quot;{clientFilter}&quot;
        </div>
      )}
      
      {selectedClients.length > 0 && (
        <div style={{ marginTop: '8px', fontSize: '0.9em', color: '#007bff' }}>
          <strong>{selectedClients.length}</strong> client(s) selected
        </div>
      )}
    </div>
  );
};

// Hook for managing cargo filter logic
export const useCargoFilters = (cargoAmountReport) => {
  const [filteredTally, setFilteredTally] = useState([]);
  const [filteredTallyIn, setFilteredTallyIn] = useState([]);
  const [filteredTallyOut, setFilteredTallyOut] = useState([]);

  // Initialize filtered data when cargoAmountReport changes
  React.useEffect(() => {
    setFilteredTally(cargoAmountReport?.tally || []);
    setFilteredTallyIn(cargoAmountReport?.tallyIn || []);
    setFilteredTallyOut(cargoAmountReport?.tallyOut || []);
  }, [cargoAmountReport]);

  const handleGoodsFilter = (value) => {
    if (!value) {
      setFilteredTally(cargoAmountReport?.tally || []);
      setFilteredTallyIn(cargoAmountReport?.tallyIn || []);
      setFilteredTallyOut(cargoAmountReport?.tallyOut || []);
      return;
    }

    const filterByGoods = (items) => {
      return items.filter(
        (item) =>
          item.cargo?.toLowerCase().includes(value.toLowerCase()) ||
          item.itemName?.toLowerCase().includes(value.toLowerCase())
      );
    };

    setFilteredTally(filterByGoods(cargoAmountReport?.tally || []));
    setFilteredTallyIn(filterByGoods(cargoAmountReport?.tallyIn || []));
    setFilteredTallyOut(filterByGoods(cargoAmountReport?.tallyOut || []));
  };

  const handleTonnageFilter = (operator, value, period = null) => {
    if (!value) {
      setFilteredTally(cargoAmountReport?.tally || []);
      setFilteredTallyIn(cargoAmountReport?.tallyIn || []);
      setFilteredTallyOut(cargoAmountReport?.tallyOut || []);
      return;
    }

    const filterByTonnage = (items) => {
      if (period) {
        // Group by goods type and date
        const groupedByGoods = items.reduce((acc, item) => {
          const goodsType = item.cargo || item.itemName;
          const date = new Date(item.entry_date || item.date_time);
          const key =
            period === "monthly"
              ? `${goodsType}-${date.getFullYear()}-${date.getMonth()}`
              : `${goodsType}-${date.toISOString().split("T")[0]}`;

          if (!acc[key]) {
            acc[key] = {
              goodsType,
              totalWeight: 0,
              items: [],
            };
          }

          const weight =
            "Assorted" !== item.cargoAssorted
              ? item.weight * (item.unit || item.purchased_qty || item.sold_qty)
              : item.weight;

          acc[key].totalWeight += weight;
          acc[key].items.push(item);

          return acc;
        }, {});

        // Filter groups based on total weight
        const filteredGroups = Object.values(groupedByGoods).filter((group) => {
          const totalTons = convertKgToTons(group.totalWeight);
          switch (operator) {
            case ">":
              return totalTons > Number(value);
            case "<":
              return totalTons < Number(value);
            case ">=":
              return totalTons >= Number(value);
            case "<=":
              return totalTons <= Number(value);
            default:
              return totalTons === Number(value);
          }
        });

        // Flatten filtered groups back to items
        return filteredGroups.flatMap((group) => group.items);
      } else {
        // Individual record filtering
        return items.filter((item) => {
          const weight =
            "Assorted" !== item.cargoAssorted
              ? item.weight * (item.unit || item.purchased_qty || item.sold_qty)
              : item.weight;

          const weightInTons = convertKgToTons(weight);

          switch (operator) {
            case ">":
              return weightInTons > Number(value);
            case "<":
              return weightInTons < Number(value);
            case ">=":
              return weightInTons >= Number(value);
            case "<=":
              return weightInTons <= Number(value);
            default:
              return weightInTons === Number(value);
          }
        });
      }
    };

    setFilteredTally(filterByTonnage(cargoAmountReport?.tally || []));
    setFilteredTallyIn(filterByTonnage(cargoAmountReport?.tallyIn || []));
    setFilteredTallyOut(filterByTonnage(cargoAmountReport?.tallyOut || []));
  };

  // Apply client filtering to cargo data
  const applyCargoClientFilter = React.useCallback((data, clientField, selectedClients) => {
    if (!selectedClients || selectedClients.length === 0) return data;
    return data.filter(record => {
      const clientName = record[clientField];
      return selectedClients.includes(clientName);
    });
  }, []);

  return {
    filteredTally,
    filteredTallyIn,
    filteredTallyOut,
    handleGoodsFilter,
    handleTonnageFilter,
    applyCargoClientFilter,
    setFilteredTally,
    setFilteredTallyIn,
    setFilteredTallyOut,
  };
};

// Hook for managing client selection
export const useClientSelection = (cargoAmountReport) => {
  const [selectedCargoClients, setSelectedCargoClients] = useState([]);
  const [availableCargoClients, setAvailableCargoClients] = useState([]);

  // Extract available cargo clients when cargoAmountReport changes
  React.useEffect(() => {
    if (cargoAmountReport) {
      const cargoClients = new Set();
      
      // Extract clients from tally (transhipment)
      if (cargoAmountReport.tally) {
        cargoAmountReport.tally.forEach(record => {
          if (record.clientName) cargoClients.add(record.clientName);
        });
      }
      
      // Extract clients from tallyIn (to warehouse)
      if (cargoAmountReport.tallyIn) {
        cargoAmountReport.tallyIn.forEach(record => {
          if (record.user_name) cargoClients.add(record.user_name);
        });
      }
      
      // Extract clients from tallyOut (from warehouse)
      if (cargoAmountReport.tallyOut) {
        cargoAmountReport.tallyOut.forEach(record => {
          if (record.user_name) cargoClients.add(record.user_name);
        });
      }
      
      setAvailableCargoClients([...cargoClients].sort());
    }
  }, [cargoAmountReport]);

  const handleCargoClientToggle = (clientName) => {
    setSelectedCargoClients(prev => {
      if (prev.includes(clientName)) {
        return prev.filter(name => name !== clientName);
      } else {
        return [...prev, clientName];
      }
    });
  };

  const handleSelectAllCargo = () => {
    setSelectedCargoClients(availableCargoClients);
  };

  const handleClearAllCargo = () => {
    setSelectedCargoClients([]);
  };

  return {
    selectedCargoClients,
    availableCargoClients,
    handleCargoClientToggle,
    handleSelectAllCargo,
    handleClearAllCargo,
    setSelectedCargoClients,
    setAvailableCargoClients,
  };
};
