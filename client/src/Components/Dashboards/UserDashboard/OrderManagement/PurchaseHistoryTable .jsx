import { getCoreRowModel, getPaginationRowModel, useReactTable, getSortedRowModel } from '@tanstack/react-table';
import React, { useState } from 'react';
import './TableStyles.css'; // Make sure to import your CSS file

const PurchaseHistoryTable = ({ data }) => {
  const [sorting, setSorting] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'orderDate',
        header: 'Order Date',
      },
      {
        accessorKey: 'totalAmount',
        header: 'Total Amount',
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
    state: { sorting },
    onSortingChange: setSorting,
    initialState: { pagination: { pageSize: 3 } }, // Set initial page size
  });

  return (
    <div className="table-container">
      {/* table */}
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
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
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} data-label={cell.column.columnDef.header}>
                  {cell.column.columnDef.accessorKey ? row.original[cell.column.columnDef.accessorKey] : null}
                </td>
              ))}
            </tr>
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
