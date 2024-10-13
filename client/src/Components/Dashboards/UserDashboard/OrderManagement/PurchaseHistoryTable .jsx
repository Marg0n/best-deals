import { getCoreRowModel, getPaginationRowModel, useReactTable, getSortedRowModel, flexRender } from '@tanstack/react-table';
import React, { useState } from 'react';
import './TableStyles.css'; // Make sure to import your CSS file

const PurchaseHistoryTable = ({ data }) => {
  const [sorting, setSorting] = useState([]);
  const [expanded, setExpanded] = useState({});

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
        accessorKey: 'shippingAddress',
        header: 'Shipping Address',
      },
      {
        accessorKey: 'transactionId',
        header: 'Transaction ID',
      },
    ],
    []
  );

  const table = useReactTable({
    data: data || [], // Ensure data is an array
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting, expanded },
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    initialState: { pagination: { pageSize: 5 } }, // Set initial page size
  });

  const handleRowClick = (rowId) => {
    setExpanded((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  return (
    <div className="table-container">
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
                  <td key={cell.id} data-label={cell.column.columnDef.header} className=' bg-green-300'>
                    {/* {cell.column.columnDef.accessorKey ? row.original[cell.column.columnDef.accessorKey] : null} */}
                    {/* {cell.getValue()} */}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              {row.getIsExpanded() && (
                <tr>
                  <td colSpan={columns.length} className='pl-2'>
                    <table className="nested-table">
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
                      <tbody>
                        {row.original.items.flat().map((item, index) => (
                          <tr key={index}>
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
