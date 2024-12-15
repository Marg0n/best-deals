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
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useUserProfile from '../../../../hooks/useUserProfile';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';

const VendorOrders = () => {
    const vendorProducts = useAxiosSecure();
    const { user } = useAuth();
    const vendorMail = user?.email;

    console.log(vendorMail);

    const { data: vendorAllOrders, isLoading } = useQuery({
        queryKey: ["allOrdersForVendor"],
        queryFn: async () => {
            const res = await vendorProducts.get(`/vendor-orders/${vendorMail}`);
            return res.data;
        },
    });

    // Extract all items from all orders
    const allItems = vendorAllOrders?.flatMap(order =>
        order.items.flatMap(productList =>
            productList.map(product => ({
                ...product,
                customerEmail: order.customerEmail,
                address: order.address,
                name: order.name,
                trackingNumber: order.trackingNumber,
                paymentMethod: order.paymentMethod
            }))
        )
    ) || [];

    console.log('All items:', allItems);

    // Initialize data for table rows
    const initialData = allItems?.map(order => ({
        id: order._id,
        productId: order.productId,
        name: order.productName,
        customer: order.name,
        quantity: order.cartQuantity ,
        price: order.price,
        payment: order.paymentMethod,
        track: order.trackingNumber
    }));

    console.log(initialData);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 5;

    // Filtered data with fallback for empty initialData
    const filteredData = initialData?.filter(item =>
        item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

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
        return <Typography className='flex justify-center items-center h-screen'>Loading...</Typography>;
    }

    return (
        <div className='p-8 min-h-screen space-y-4'>
            <div className="p-4 bg-white rounded-lg">
                <h1 className="text-3xl mb-4 text-black">All Products</h1>

                <div className='w-1/3 mb-4'>
                    <TextField
                        label="Search by Product Name"
                        variant="outlined"
                        className='bg-gray-200'
                        fullWidth
                        margin="normal"
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(0);
                        }}
                    />
                </div>

                <div className='border-2'>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order ID</TableCell>
                                    <TableCell>Product ID</TableCell>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Customer</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Payment Type</TableCell>
                                    <TableCell>Tracking No</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentRows.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.productId}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.customer}</TableCell>
                                        <TableCell>{row.quantity}</TableCell>
                                        <TableCell>{row.price}</TableCell>
                                        <TableCell>{row.payment}</TableCell>
                                        <TableCell>{row.track}</TableCell>
                                        <TableCell>
                                            <ActionMenu row={row} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

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
                    <FlipCameraAndroidIcon fontSize="small" className='text-green-500' /> <span className='ml-1'>Refund</span>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <LocalShippingIcon fontSize="small" className='text-orange-500' /> <span className='ml-1'>Send to Shipment</span>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default VendorOrders;
