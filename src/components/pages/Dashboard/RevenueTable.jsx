import React, { useEffect, useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { Button, Row, Col, Form } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import Repository from '../../services/Repository';
import { useAuthHeader } from 'react-auth-kit';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

const RevenueTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [columnFilters, setColumnFilters] = useState([]);
  const [clientSearch, setClientSearch] = useState('');
  const [selectedClients, setSelectedClients] = useState([]);
  const authHeader = useAuthHeader()();
  const userType = localStorage.getItem('catname');

  const formatDateForAPI = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await Repository.findCombinedInvoicesByStartAndEnd(
          formatDateForAPI(startDate),
          formatDateForAPI(endDate)
        );
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [startDate, endDate]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
    } catch (error) {
      console.error('Error formatting date:', dateString, error);
      return 'Invalid Date';
    }
  };

  // Robustly determine the source
  const getSource = (invoice) => {
    if (invoice.invoiceType && invoice.invoiceType.toUpperCase() === 'VESSEL') {
      return 'Berthing';
    } else if (invoice.invoiceType && invoice.invoiceType.toUpperCase() === 'TRUCK_PARKING') {
      return 'Truck';
    } else if (invoice.invoiceType && invoice.invoiceType.toUpperCase() === 'UNKNOWN') {
      return 'Other Revenues'
    }
    return 'Ops';
  };

  // Robustly get the amount for each invoice type
  const getAmount = (invoice) => {
    if (invoice.invoiceType && invoice.invoiceType.toUpperCase() === 'VESSEL') {
      return (invoice.quayAmount || 0) + (invoice.vesselHandlingCharges || 0);
    }
    return invoice.amount || 0;
  };

  // Get all unique client names (case-insensitive, sorted)
  const allClientNames = useMemo(() => {
    const namesSet = new Set();
    invoices.forEach(inv => {
      if (inv.clientName) namesSet.add(inv.clientName);
    });
    return Array.from(namesSet).sort((a, b) => a.localeCompare(b));
  }, [invoices]);

  // Filter client names by search
  const filteredClientNames = useMemo(() => {
    if (!clientSearch) return allClientNames;
    return allClientNames.filter(name => name.toLowerCase().includes(clientSearch.toLowerCase()));
  }, [allClientNames, clientSearch]);

  // Multi-select filter function for client names
  const clientNameMultiFilterFn = (row, columnId, filterValue) => {
    if (!filterValue || filterValue.length === 0) return true;
    const clientName = (row.getValue(columnId) || '').toString().toLowerCase();
    return filterValue.some(val => clientName === val.toLowerCase());
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'dateTime',
      header: 'Date',
      cell: ({ row }) => formatDate(row.original.dateTime)
    },
    {
      accessorKey: 'amount',
      header: 'Amount (RWF)',
      cell: ({ row }) => getAmount(row.original).toLocaleString()
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => row.original.description || 'N/A'
    },
    {
      accessorKey: 'clientName',
      header: 'Client Name',
      cell: ({ row }) => row.original.clientName || 'N/A',
      filterFn: clientNameMultiFilterFn,
    },
    {
      accessorKey: 'source',
      header: 'Source',
      cell: ({ row }) => getSource(row.original)
    }
  ], []);

  // Update column filter when selectedClients changes
  useEffect(() => {
    setColumnFilters((prev) => {
      const otherFilters = prev.filter(f => f.id !== 'clientName');
      return selectedClients.length > 0 ? [...otherFilters, { id: 'clientName', value: selectedClients }] : otherFilters;
    });
  }, [selectedClients]);

  const table = useReactTable({
    data: invoices,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters: columnFilters
    },
    onColumnFiltersChange: setColumnFilters,
  });

  // For the filter input
  // const clientNameFilterValue = columnFilters.find(f => f.id === 'clientName')?.value || '';

  // Dynamically update summary statistics based on filtered rows
  const filteredRows = table.getFilteredRowModel().rows;
  const filteredSourceTotals = useMemo(() => {
    const totals = {
      'Berthing': 0,
      'Truck': 0,
      'Ops': 0, 'Other Revenues': 0
    };
    filteredRows.forEach(row => {
      const invoice = row.original;
      const source = getSource(invoice);
      totals[source] += getAmount(invoice);
    });
    return totals;
  }, [filteredRows]);

  const grandTotal = Object.values(filteredSourceTotals).reduce((sum, val) => sum + val, 0);


  const grandTotalWithoutOtherRevenues = Object.entries(filteredSourceTotals)
    .filter(([source]) => source !== 'Other Revenues')
    .reduce((sum, [, val]) => sum + val, 0);


  const csvData = invoices.map(invoice => ({
    'Date': formatDate(invoice.dateTime),
    'Amount (RWF)': getAmount(invoice).toLocaleString(),
    'Description': invoice.description || 'N/A',
    'Client Name': invoice.clientName || 'N/A',
    'Source': getSource(invoice)
  }));

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Date', 'Amount (RWF)', 'Description', 'Client Name', 'Source']],
      body: table.getRowModel().rows.map(row => [
        formatDate(row.original.dateTime),
        getAmount(row.original).toLocaleString(),
        row.original.description || 'N/A',
        row.original.clientName || 'N/A',
        getSource(row.original)
      ]),
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 128, 185] }
    });
    doc.save('revenue-report.pdf');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="revenue-table">
      <Row className="mb-3">
        <Col md={3}>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            className="form-control"
            placeholderText="Start Date"
            dateFormat="yyyy-MM-dd"
          />
        </Col>
        <Col md={3}>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            className="form-control"
            placeholderText="End Date"
            dateFormat="yyyy-MM-dd"
          />
        </Col>
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Search client names..."
            value={clientSearch}
            onChange={e => setClientSearch(e.target.value)}
            className="mb-2"
          />
          <Form.Select
            multiple
            value={selectedClients}
            onChange={e => {
              const options = Array.from(e.target.selectedOptions).map(opt => opt.value);
              setSelectedClients(options);
            }}
            size={Math.min(6, filteredClientNames.length)}
          >
            {filteredClientNames.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3} className="text-end">
          {userType === 'admin' ? (
            <>  <CSVLink data={csvData} filename="combined-invoices.csv" className="btn btn-primary"            >
              Export to CSV
            </CSVLink><br /><br />
              <Button variant="info" onClick={exportToPDF}            >
                Export to PDF
              </Button></>
          ) : (
            <Button
              variant="primary"
              onClick={exportToPDF}
            >
              Export to PDF
            </Button>
          )}
        </Col>
      </Row>

      {/* Source Totals */}
      <Row className="mb-3">
        <Col md={12} className="">
          <div className="d-flex justify-content-end gap-4">
            {Object.entries(filteredSourceTotals).map(([source, total]) => (
              <div key={source} className="text-end">
                <h5>{source}</h5>
                <h4>RWF {total.toLocaleString()}</h4>
              </div>
            ))}
            <div className="text-end ms-5">
              <h5>Grand Total (excluding Other Revenues)</h5>
              <h4 style={{ color: 'blue' }}>RWF {grandTotalWithoutOtherRevenues.toLocaleString()}</h4>
            </div>
            <div className="text-end ms-5">
              <h5>Grand Total</h5>
              <h4 style={{ color: 'green' }}>RWF {grandTotal.toLocaleString()}</h4>
            </div>

          </div>
        </Col>
      </Row>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{ cursor: 'pointer' }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted()] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueTable; 