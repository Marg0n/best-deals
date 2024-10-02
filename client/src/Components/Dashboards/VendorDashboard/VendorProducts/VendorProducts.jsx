import React, { useMemo, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem, Button, Typography, TextField
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const VendorProducts = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Define columns (memoized to avoid re-rendering issues)
    const columns = useMemo(() => [
        { Header: 'ID', accessor: 'id' },
        { Header:'Product Name', accessor: 'name'},
        { Header: 'Category', accessor: 'category' },
        { Header: 'Stock', accessor: 'stock' },
        { Header: 'Sold', accessor: 'sold'},
        { Header: 'Price', accessor: 'price' },
        { Header: 'Rating', accessor: 'rating' },
        { Header: 'Action', accessor: 'action', Cell: ({ row }) => <ActionMenu row={row} /> }
    ], []);

    // Sample data
    const data = useMemo(() => [
        { id: 1,  stock:6, sold:100, name:'test kit', category: 'health', price: 200, rating: 5, },
        { id: 2,  stock:61, sold:120, name:'socks', category: 'men', price: 203, rating: 4.5, },
        { id: 3,  stock:26, sold:140, name:'comb', category: 'women', price: 500, rating: 5, },
        { id: 4,  stock:36, sold:120, name:'jersey', category: 'men', price: 600, rating: 4.5, },
        { id: 5,  stock:61, sold:110, name:'doll', category: 'kids', price: 700, rating: 3, },
        { id: 6,  stock:46, sold:100, name:'knife', category: 'kitchen', price: 800, rating: 3.5, },
        { id: 7,  stock:5, sold:50, name:'tomato', category: 'grocery', price: 700, rating: 5, },
        { id: 8,  stock:4, sold:200, name:'earphone', category: 'accessories', price: 500, rating: 4, },
        { id: 9,  stock:0, sold:40, name:'sound box', category: 'electronic', price: 500, rating: 3.5, },
        { id: 10, stock:1, sold:200, name:'glamour', category: 'beauty', price: 2300, rating: 5, },
        { id: 11, stock:2, sold:140, name:'boots', category: 'men', price: 240, rating: 4, },
        { id: 12, stock:4, sold:108, name:'pressure machine', category: 'health', price: 230, rating: 5, },
        { id: 13, stock:5, sold:190, name:'clip', category: 'women', price: 220, rating: 4, },
        { id: 14, stock:6, sold:100, name:'sphagmomanometer', category: 'health', price: 230, rating: 5, },
    ], []);

    const filteredData = useMemo(() => {
        return data.filter((order) => order.name.toLowerCase().includes(searchTerm.toLowerCase()));
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
                <Typography variant="h5" className="font-extrabold text-black">All Products</Typography>
            </div>

            {/* Search Input */}
            <div className="mb-4 bg-white w-1/3 rounded-lg">
                <TextField
                    label="Search By Product Name"
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
                    <EditIcon fontSize="small" /> Edit Product
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <DeleteIcon fontSize="small" className='text-red-500'/> Delete
                </MenuItem>
            </Menu>
        </div>
    );

};

export default VendorProducts;