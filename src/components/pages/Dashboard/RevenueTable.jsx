import React, { useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from '@tanstack/react-table';
import { Button, Row, Col } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import Repository from '../../services/Repository';
import { useAuthHeader } from 'react-auth-kit';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RevenueTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const authHeader = useAuthHeader()();

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

  const getSource = (invoice) => {
    if (invoice.invoiceType === 'VESSEL') {
      return 'Berthing';
    } else if (invoice.invoiceType === 'TRUCK') {
      return 'Truck';
    }
    return 'Ops';
  };

  const getClient = (invoice) => {
    if (invoice.invoiceType === 'VESSEL') {
      return `Vessel ${invoice.vesselId}`;
    } else if (invoice.invoiceType === 'TRUCK') {
      return invoice.licencePlateNumber || 'N/A';
    }
    return invoice.clientName || 'N/A';
  };

  const getAmount = (invoice) => {
    if (invoice.invoiceType === 'VESSEL') {
      return (invoice.vesselHandlingCharges || 0) + (invoice.quayAmount || 0);
    }
    return invoice.amount || 0;
  };

  const columns = [
    {
      accessorKey: 'dateTime',
      header: 'Date',
      cell: ({ row }) => formatDate(row.original.dateTime || row.original.ata || row.original.entryTime)
    },
    {
      accessorKey: 'amount',
      header: 'Amount (RWF)',
      cell: ({ row }) => getAmount(row.original).toLocaleString()
    },
    {
      accessorKey: 'client',
      header: 'Client',
      cell: ({ row }) => getClient(row.original)
    },
    {
      accessorKey: 'source',
      header: 'Source',
      cell: ({ row }) => getSource(row.original)
    }
  ];

  const table = useReactTable({
    data: invoices,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const csvData = invoices.map(invoice => ({
    'Date': formatDate(invoice.dateTime || invoice.ata || invoice.entryTime),
    'Amount (RWF)': getAmount(invoice).toLocaleString(),
    'Client': getClient(invoice),
    'Source': getSource(invoice)
  }));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="revenue-table">
      <Row className="mb-3">
        <Col md={4}>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            className="form-control"
            placeholderText="Start Date"
            dateFormat="yyyy-MM-dd"
          />
        </Col>
        <Col md={4}>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            className="form-control"
            placeholderText="End Date"
            dateFormat="yyyy-MM-dd"
          />
        </Col>
        <Col md={4} className="text-end">
          <CSVLink
            data={csvData}
            filename="combined-invoices.csv"
            className="btn btn-primary"
          >
            Export to CSV
          </CSVLink>
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