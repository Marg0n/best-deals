import React, { useMemo, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem, Button, Typography, TextField
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const VendorOrders = () => {
    const [searchTerm, setSearchTerm] = useState(''); 
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Define columns (memoized to avoid re-rendering issues)
    const columns = useMemo(() => [
        { Header: '#', accessor: 'id' },
        { Header: 'Order ID', accessor: 'orderID' },
        { Header: 'Customer Name', accessor: 'customerName' }, 
        { Header: 'Date', accessor: 'date' },
        { Header: 'Items', accessor: 'items' },
        { Header: 'Price', accessor: 'price' },
        { Header: 'Paid', accessor: 'paid' },
        { Header: 'Address', accessor: 'address' },
        { Header: 'Status', accessor: 'status' },
        { Header: 'Action', accessor: 'action', Cell: ({ row }) => <ActionMenu row={row} /> }
    ], []);

    // Sample data
    const data = useMemo(() => [
        { id: 1, orderID: '675902', customerName: 'John Doe', date: '17 Jan, 2024', items: 10, price: '$376.00', paid: 'Yes', address: 'Beaverton, OR 97005', status: 'Complete' },
        { id: 2, orderID: '675909', customerName: 'Jane Smith', date: '1 Feb, 2024', items: 22, price: '$210.00', paid: 'No', address: 'Savannah, GA 31404', status: 'Pending' },
        { id: 3, orderID: '675909', customerName: 'Jane Smith', date: '1 Feb, 2024', items: 22, price: '$210.00', paid: 'No', address: 'Savannah, GA 31404', status: 'Pending' },
        { id: 4, orderID: '675909', customerName: 'Jane Smith', date: '1 Feb, 2024', items: 22, price: '$210.00', paid: 'No', address: 'Savannah, GA 31404', status: 'Pending' },
        { id: 5, orderID: '675909', customerName: 'Jane Smith', date: '1 Feb, 2024', items: 22, price: '$210.00', paid: 'No', address: 'Savannah, GA 31404', status: 'Pending' },
        { id: 6, orderID: '675909', customerName: 'Jane Smith', date: '1 Feb, 2024', items: 22, price: '$210.00', paid: 'No', address: 'Savannah, GA 31404', status: 'Pending' },
        { id: 7, orderID: '675909', customerName: 'Jane Smith', date: '1 Feb, 2024', items: 22, price: '$210.00', paid: 'No', address: 'Savannah, GA 31404', status: 'Pending' },
        { id: 8, orderID: '675909', customerName: 'Jane Smith', date: '1 Feb, 2024', items: 22, price: '$210.00', paid: 'No', address: 'Savannah, GA 31404', status: 'Pending' },
        { id: 9, orderID: '675909', customerName: 'Jane Smith', date: '1 Feb, 2024', items: 22, price: '$210.00', paid: 'No', address: 'Savannah, GA 31404', status: 'Pending' },
        { id: 10, orderID: '675909', customerName: 'Jane Smith', date: '1 Feb, 2024', items: 22, price: '$210.00', paid: 'No', address: 'Savannah, GA 31404', status: 'Pending' },
        { id: 11, orderID: '675909', customerName: 'Jane Smith', date: '1 Feb, 2024', items: 22, price: '$210.00', paid: 'No', address: 'Savannah, GA 31404', status: 'Pending' },
        { id: 12, orderID: '675909', customerName: 'Jane Smith', date: '1 Feb, 2024', items: 22, price: '$210.00', paid: 'No', address: 'Savannah, GA 31404', status: 'Pending' },
        { id: 13, orderID: '675909', customerName: 'Jane Smith', date: '1 Feb, 2024', items: 22, price: '$210.00', paid: 'No', address: 'Savannah, GA 31404', status: 'Pending' },
        { id: 14, orderID: '675909', customerName: 'Jane Smith', date: '1 Feb, 2024', items: 22, price: '$210.00', paid: 'No', address: 'Savannah, GA 31404', status: 'Pending' },
    ], []);

    const filteredData = useMemo(() => {
        return data.filter((order) => order.customerName.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm, data]);


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, 
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state: { pageIndex },
    } = useTable(
        { columns, data: filteredData, initialState: { pageIndex: 0 } },
        usePagination
    );

    return (
        <div className="p-4 bg-gray-200">
            <div className="flex justify-between items-center mb-4">
                <Typography variant="h5" className="font-extrabold text-black">Order Management</Typography>

                <Button variant="contained" color="primary" startIcon={<AddIcon />}>
                    New Product
                </Button>
            </div>

            {/* Search Input */}
            <div className="mb-4 bg-white w-1/3 rounded-lg">
                <TextField
                    label="Search by Customer Name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    fullWidth
                    variant="outlined"
                />
            </div>

            {/* Table */}
            <TableContainer component={Paper}>
                <Table {...getTableProps()} className="min-w-full">
                    <TableHead>
                        {headerGroups.map((headerGroup) => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>

                    <TableBody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <div className="flex justify-between items-center my-4">
                <Button
                    onClick={previousPage}
                    disabled={!canPreviousPage}
                    variant="outlined"
                >
                    Previous
                </Button>
                <Typography>Page {pageIndex + 1} of {pageOptions.length}</Typography>
                <Button
                    onClick={nextPage}
                    disabled={!canNextPage}
                    variant="outlined"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

// ActionMenu Component
const ActionMenu = ({ row }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleClose}>
                    <DownloadIcon fontSize="small" /> Download
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <EditIcon fontSize="small" /> Edit Order
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <DeleteIcon fontSize="small" /> Delete
                </MenuItem>
            </Menu>
        </div>
    );
};

export default VendorOrders;
