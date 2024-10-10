import React from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import './TableStyles.css'; // Make sure to import your CSS file

const PurchaseHistoryTable = ({ data }) => {
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
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
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
              <td key={cell.id}>{cell.column.columnDef.accessorKey ? row.original[cell.column.columnDef.accessorKey] : null}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PurchaseHistoryTable;
