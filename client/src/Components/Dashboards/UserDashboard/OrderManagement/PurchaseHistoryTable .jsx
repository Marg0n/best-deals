import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import AOS from 'aos';
import React, { useEffect, useState } from 'react';
import './TableStyles.css';
import { TextField } from '@mui/material';

const PurchaseHistoryTable = ({ data }) => {
  const [sorting, setSorting] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'orderDate',
        header: 'Order Date',
      },
      {
        accessorKey: 'totalAmount',
        header: 'Total Amount',
        cell: info => `$${info.getValue()}`,
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'paymentMethod',
        header: 'Payment Method',
      },
      {
        accessorKey: 'address',
        header: 'Shipping Address',
      },
      {
        accessorKey: 'transactionId',
        header: 'Transaction ID',
      },
      {
        accessorKey: 'trackingNumber',
        header: 'Tracking ID',
      },
      {
        accessorKey: 'track',
        header: 'Track',
        cell: ({ row }) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* <span>{row.original.trackingNumber}</span> */}
            <button
              onClick={() => handleTrackNow(row.original.trackingNumber)}
              className="btn-active btn-link btn"
            >
              Track Now
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // Handler function for tracking button
  const handleTrackNow = (trackingNumber) => {
    // Replace with actual tracking URL or logic
    const trackingUrl = `https://tracking.example.com/${trackingNumber}`;
    window.open(trackingUrl, '_blank');
  };

  // useEffect(() => {
  //   setFilteredData(
  //     data.filter(row =>
  //       columns.some(column =>
  //         row[column.accessorKey]?.toString().toLowerCase().includes(search.toLowerCase())
  //       )
  //     )
  //   );
  // }, [search, data, columns]);

  // search items
  useEffect(() => {
    setFilteredData(
      data?.map(entry => ({
        ...entry,
        items: entry?.items.flat().filter(item =>
          Object.values(item).some(value =>
            value.toString().toLowerCase().includes(search.toLowerCase())
          )
        )
      })).filter(entry => entry.items.length > 0)
    );
  }, [search, data]);
  // console.log(filteredData)

  const table = useReactTable({
    data: filteredData || [],
    // data: data || [], // Ensure data is an array
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting, expanded },
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    initialState: { pagination: { pageSize: 5  } }, // Set initial page size
  });

  const handleRowClick = (rowId) => {
    setExpanded((preview) => ({
      ...preview,
      [rowId]: !preview[rowId],
    }));
  };

  // aos animation use effect
  useEffect(() => {
    AOS.init({
      duration: 500
    });
  }, []);

  return (
    <div className="table-container">
      {/* search input */}
      <TextField
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        label="Search by Product Name"
        variant="outlined"
        // fullWidth
        margin="normal"
        className="mb-4 p-2 border rounded"
        data-aos='fade-up-left'
        data-aos-duration="1000"
      />
      {/* table */}
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} onClick={header.column.getToggleSortingHandler()} className='bg-yellow-600'>
                  {/* sorting */}
                  {header.column.getIsSorted() ? (header.column.getIsSorted() === 'desc' ? '🔽 ' : '🔼 ') : ''}
                  {/* header */}
                  {header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <React.Fragment key={row.id}>
              <tr onClick={() => handleRowClick(row.id)} style={{ cursor: 'pointer' }}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} data-label={cell.column.columnDef.header} className=' bg-green-300 text-xs text-black'>
                    {/* {cell.column.columnDef.accessorKey ? row.original[cell.column.columnDef.accessorKey] : null} */}
                    {/* {cell.getValue()} */}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              {row.getIsExpanded() && (
                <tr data-aos='fade-up' data-aos-duration="500">
                  <td colSpan={columns.length} className='pl-2'>
                    <table className="nested-table text-black">
                      <thead>
                        <tr>
                          <th>Product Name</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Category</th>
                          <th>Company</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody className='text-black'>
                        {row.original.items.flat().map((item, index) => (
                          <tr key={index} className='text-xs text-black'>
                            <td data-label="Product Name">{item.productName}</td>
                            <td data-label="Price">${item.price}</td>
                            <td data-label="Price">{item.cartQuantity
                            }</td>
                            <td data-label="Category">{item.category}</td>
                            <td data-label="Category">{item.companyName}</td>
                            <td data-label="Description">{item.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* pagination */}
      <div className="pagination">
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </button>
        <span>
          Page{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PurchaseHistoryTable;
