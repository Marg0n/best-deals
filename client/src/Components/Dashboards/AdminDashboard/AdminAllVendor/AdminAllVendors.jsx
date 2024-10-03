import React, { useMemo, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem, Button, Typography, TextField
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import FeedbackIcon from '@mui/icons-material/Feedback';

const AdminAllVendors = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Define columns (memoized to avoid re-rendering issues)
    const columns = useMemo(() => [
        { Header: '#', accessor: 'id' },
        { Header: 'Vendor Name', accessor: 'vendorName' },
        { Header: 'E-mail', accessor: 'email' },
        { Header: 'Joining Date', accessor: 'joiningDate' },
        { Header: 'Total Sales', accessor: 'totalSales' },
        { Header: 'Total Product', accessor: 'totalProduct' },
        { Header: 'Address', accessor: 'address' },
        { Header: 'Action', accessor: 'action', Cell: ({ row }) => <ActionMenu row={row} /> }
    ], []);

    // Sample data
    const data = useMemo(() => [
        { id: 1, vendorName: 'John Doe', email: 'bestdeals119@gmail.com', joiningDate: '17 Jan, 2024',  totalProduct: 50, totalSales: '$376.00', address: 'Beaverton, OR 97005' },
        { id: 2, vendorName: 'Jane Smith', email: 'bestdeals119@gmail.com', joiningDate: '1 Feb, 2024', totalProduct: 53,  totalSales: '$210.00', address: 'Savannah, GA 31404' },
        { id: 3, vendorName: 'Jane Smith', email: 'bestdeals119@gmail.com', joiningDate: '1 Feb, 2024', totalProduct: 50,  totalSales: '$210.00', address: 'Savannah, GA 31404' },
        { id: 4, vendorName: 'Jane Smith', email: 'bestdeals119@gmail.com', joiningDate: '1 Feb, 2024', totalProduct: 40,  totalSales: '$210.00', address: 'Savannah, GA 31404' },
        { id: 5, vendorName: 'Jane Smith', email: 'bestdeals119@gmail.com', joiningDate: '1 Feb, 2024', totalProduct: 70,  totalSales: '$210.00', address: 'Savannah, GA 31404' },
        { id: 6, vendorName: 'Jane Smith', email: 'bestdeals119@gmail.com', joiningDate: '1 Feb, 2024', totalProduct: 52,  totalSales: '$210.00', address: 'Savannah, GA 31404' },
        { id: 7, vendorName: 'Jane Smith', email: 'bestdeals119@gmail.com', joiningDate: '1 Feb, 2024', totalProduct: 58,  totalSales: '$210.00', address: 'Savannah, GA 31404' },
        { id: 8, vendorName: 'Jane Smith', email: 'bestdeals119@gmail.com', joiningDate: '1 Feb, 2024', totalProduct: 65,  totalSales: '$210.00', address: 'Savannah, GA 31404' },
        { id: 9, vendorName: 'Jane Smith', email: 'bestdeals119@gmail.com', joiningDate: '1 Feb, 2024', totalProduct: 55,  totalSales: '$210.00', address: 'Savannah, GA 31404' },
        { id: 10, vendorName: 'Jane Smith', email: 'bestdeals119@gmail.com', joiningDate: '1 Feb, 2024', totalProduct: 33, totalSales: '$210.00', address: 'Savannah, GA 31404' },
        { id: 11, vendorName: 'Jane Smith', email: 'bestdeals119@gmail.com', joiningDate: '1 Feb, 2024', totalProduct: 33, totalSales: '$210.00', address: 'Savannah, GA 31404' },
        { id: 12, vendorName: 'Jane Smith', email: 'bestdeals119@gmail.com', joiningDate: '1 Feb, 2024', totalProduct: 33, totalSales: '$210.00', address: 'Savannah, GA 31404' },
        { id: 13, vendorName: 'Jane Smith', email: 'bestdeals119@gmail.com', joiningDate: '1 Feb, 2024', totalProduct: 33, totalSales: '$210.00', address: 'Savannah, GA 31404' },
        { id: 14, vendorName: 'Jane Smith', email: 'bestdeals119@gmail.com', joiningDate: '1 Feb, 2024', totalProduct: 33, totalSales: '$210.00', address: 'Savannah, GA 31404' },
    ], []);

    const filteredData = useMemo(() => {
        return data.filter((order) => order.vendorName.toLowerCase().includes(searchTerm.toLowerCase()));
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
                <Typography variant="h5" className="font-extrabold text-black">All Vendors</Typography>
            </div>

            {/* Search Input */}
            <div className="mb-4 bg-white w-1/3 rounded-lg">
                <TextField
                    label="Search by Vendors"
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
                    <InfoIcon fontSize="small" className='text-green-600'/> Details
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <FeedbackIcon fontSize="small" className='text-cyan-600'/> Complain
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <WarningIcon fontSize="small" className='text-yellow-500'/> Warning
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <BlockIcon fontSize="small" className='text-zinc-800'/> Ban
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <DeleteIcon fontSize="small" className='text-red-500'/> Remove
                </MenuItem>
            </Menu>
        </div>
    );
};

export default AdminAllVendors;
