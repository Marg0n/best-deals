import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
    Typography,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import BlockIcon from '@mui/icons-material/Block';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const VendorProducts = () => {

    const vendorProducts = useAxiosSecure();

    const { data: allUserInAdmin = [], isLoading } = useQuery({
        queryKey: ["allUserInAdmin"],
        queryFn: async () => {
            const res = await vendorProducts.get('/allUsers');
            return res.data; // Ensure you handle the data correctly here
        },
    });

    const initialData = allUserInAdmin.map(user => ({
        id: user._id,
        name: user.name,
        email: user.email, // Assuming you might want to add category
        lastLogin: user.lastLogin,
        joined: user.createdTime
        // Assuming you might want to add price
    }));

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 5; // Set number of rows per page

    const filteredData = initialData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const combinedData = [...filteredData];

    const totalPages = Math.ceil(combinedData.length / rowsPerPage);
    const currentRows = combinedData.slice(
        currentPage * rowsPerPage,
        currentPage * rowsPerPage + rowsPerPage
    );

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    if (isLoading) {
        return <Typography>Loading...</Typography>; // Show loading state
    }

    return (
        <div className="p-4 bg-white rounded-lg">
            <h1 className="text-3xl mb-4 text-black">All Users</h1>

            <div className='w-1/3 mb-4'>
                <TextField
                    label="Search by Product Name"
                    variant="outlined"
                    className='bg-gray-200'
                    fullWidth
                    margin="normal"
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(0); // Reset to first page on search
                    }}
                />
            </div>

            <div className='border-2'><TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>E-mail</TableCell>
                            <TableCell>Joined</TableCell>
                            <TableCell>Last Login</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.joined}</TableCell>
                                <TableCell>{row.lastLogin}</TableCell>
                                <TableCell>
                                    <ActionMenu row={row} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer></div>

            <div className="flex justify-between items-center my-4">
                <Button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 0}
                    variant="outlined"
                >
                    Previous
                </Button>
                <Typography>
                    Page {currentPage + 1} of {totalPages}
                </Typography>
                <Button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}
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

    const handleEdit = () => {
        console.log('Edit Product:', row);
        handleClose(); // Close menu after action
        // Add your edit logic here (e.g., open a modal with the product data)
    };

    const handleDelete = () => {
        console.log('Delete Product:', row);
        handleClose(); // Close menu after action
        // Add your delete logic here (e.g., confirm and delete the product)
    };

    return (
        <div>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleClose}>
                    <InfoIcon fontSize="small" className='text-green-600' /> Details
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <WarningIcon fontSize="small" className='text-yellow-500' /> Warning
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <BlockIcon fontSize="small" className='text-zinc-800' /> Ban
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <DeleteIcon fontSize="small" className='text-red-500' /> Delete
                </MenuItem>
            </Menu>
        </div>
    );
};

export default VendorProducts;
