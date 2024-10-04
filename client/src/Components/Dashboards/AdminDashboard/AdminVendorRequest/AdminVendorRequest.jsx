import React, { useMemo, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem, Button, Typography, TextField
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DangerousIcon from '@mui/icons-material/Dangerous';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const AdminVendorRequest = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Define columns (memoized to avoid re-rendering issues)
    const columns = useMemo(() => [
        { Header: '#', accessor: 'id' },
        { Header: 'User Name', accessor: 'userName' },
        { Header: 'E-mail', accessor: 'email' },
        { Header: 'Request Date', accessor: 'requestDate' },
        { Header: 'Document', accessor: 'document' },
        { Header: 'Address', accessor: 'address' },
        { Header: 'Action', accessor: 'action', Cell: ({ row }) => <ActionMenu row={row} /> }
    ], []);

    // Sample data
    const data = useMemo(() => [
        { id: 1,  userName: 'Jane Smith', email: 'bestdeals119@gmail.com' ,  requestDate: '1 Feb, 2024',  document: <button className='border-1 p-2 bg-gray-300 rounded-md hover:bg-black hover:text-white'>Johndoe.pdf</button>, address: 'Savannah, GA 31404'},
        { id: 2,  userName: 'John Doe',   email: 'bestdeals119@gmail.com' ,  requestDate: '17 Jan, 2024', document: <button className='border-1 p-2 bg-gray-300 rounded-md hover:bg-black hover:text-white'>John.pdf</button>, address: 'Beaverton, OR 97005'},
        { id: 3,  userName: 'Jane Smith', email: 'bestdeals119@gmail.com' ,  requestDate: '1 Feb, 2024',  document: <button className='border-1 p-2 bg-gray-300 rounded-md hover:bg-black hover:text-white'>doe.pdf</button>, address: 'Savannah, GA 31404'},
        { id: 4,  userName: 'Jane Smith', email: 'bestdeals119@gmail.com' ,  requestDate: '1 Feb, 2024',  document: <button className='border-1 p-2 bg-gray-300 rounded-md hover:bg-black hover:text-white'>Johndoe.pdf</button>, address: 'Savannah, GA 31404'},
        { id: 5,  userName: 'Jane Smith', email: 'bestdeals119@gmail.com' ,  requestDate: '1 Feb, 2024',  document: <button className='border-1 p-2 bg-gray-300 rounded-md hover:bg-black hover:text-white'>Johndoe.pdf</button>, address: 'Savannah, GA 31404'},
        { id: 6,  userName: 'Jane Smith', email: 'bestdeals119@gmail.com' ,  requestDate: '1 Feb, 2024',  document: <button className='border-1 p-2 bg-gray-300 rounded-md hover:bg-black hover:text-white'>ohndoe.pdf</button>, address: 'Savannah, GA 31404'},
        { id: 7,  userName: 'Jane Smith', email: 'bestdeals119@gmail.com' ,  requestDate: '1 Feb, 2024',  document: <button className='border-1 p-2 bg-gray-300 rounded-md hover:bg-black hover:text-white'>Jondoe.pdf</button>, address: 'Savannah, GA 31404'},
        { id: 8,  userName: 'Jane Smith', email: 'bestdeals119@gmail.com' ,  requestDate: '1 Feb, 2024',  document: <button className='border-1 p-2 bg-gray-300 rounded-md hover:bg-black hover:text-white'>Johoe.pdf</button>, address: 'Savannah, GA 31404'},
        { id: 9,  userName: 'Jane Smith', email: 'bestdeals119@gmail.com' ,  requestDate: '1 Feb, 2024',  document: <button className='border-1 p-2 bg-gray-300 rounded-md hover:bg-black hover:text-white'>Joe.pdf</button>, address: 'Savannah, GA 31404'},
        { id: 10, userName: 'Jane Smith', email: 'bestdeals119@gmail.com' ,  requestDate: '1 Feb, 2024',  document: <button className='border-1 p-2 bg-gray-300 rounded-md hover:bg-black hover:text-white'>ndoe.pdf</button>, address: 'Savannah, GA 31404'},
        { id: 11, userName: 'Jane Smith', email: 'bestdeals119@gmail.com' ,  requestDate: '1 Feb, 2024',  document: <button className='border-1 p-2 bg-gray-300 rounded-md hover:bg-black hover:text-white'>Johndoe.pdf</button>, address: 'Savannah, GA 31404'},
        { id: 12, userName: 'Jane Smith', email: 'bestdeals119@gmail.com' ,  requestDate: '1 Feb, 2024',  document: <button className='border-1 p-2 bg-gray-300 rounded-md hover:bg-black hover:text-white'>Johndoe.pdf</button>, address: 'Savannah, GA 31404'},
        { id: 13, userName: 'Jane Smith', email: 'bestdeals119@gmail.com' ,  requestDate: '1 Feb, 2024',  document: <button className='border-1 p-2 bg-gray-300 rounded-md hover:bg-black hover:text-white'>Jndoe.pdf</button>, address: 'Savannah, GA 31404'},
        { id: 14, userName: 'Jane Smith', email: 'bestdeals119@gmail.com' ,  requestDate: '1 Feb, 2024',  document: <button className='border-1 p-2 bg-gray-300 rounded-md hover:bg-black hover:text-white'>Jondo.pdf</button>, address: 'Savannah, GA 31404'},
    ], []);

    const filteredData = useMemo(() => {
        return data.filter((order) => order.userName.toLowerCase().includes(searchTerm.toLowerCase()));
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
                <Typography variant="h5" className="font-extrabold text-black">Vendor Requests</Typography>
            </div>

            {/* Search Input */}
            <div className="mb-4 bg-white w-1/3 rounded-lg">
                <TextField
                    label="Search by Vendor Name"
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
                    <DangerousIcon fontSize="small" className='text-red-500'/> Decline
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <CheckCircleOutlineIcon fontSize="small" className='text-green-500' /> Approve
                </MenuItem>
            </Menu>
        </div>
    );
};

export default AdminVendorRequest;
