import React, { useState } from "react";
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
} from "@mui/material";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AdminVendorRequest = () => {
    const vendorRequests = useAxiosSecure();

    const {
        refetch,
        data: VendorRequestInAdmin = [],
        isLoading,
    } = useQuery({
        queryKey: ["VendorRequestInAdmin"],
        queryFn: async () => {
            const res = await vendorRequests.get("/allUsers");
            return res.data; // Ensure you handle the data correctly here
        },
    });
    //
    const vendorReq = VendorRequestInAdmin?.filter(
        (vendor) => vendor?.vendorDocument
    );
    // console.log(allVendorProducts);

    const initialData = vendorReq.map((vendor) => ({
        name: vendor.vendorDocument.name,
        email: vendor.email,
        companyName: vendor.vendorDocument.companyName,
        phoneNumber: vendor.vendorDocument.phoneNumber,
        pdfUrl: vendor.vendorDocument.pdfUrl,
        vendorStatus: vendor.vendorDocument.vendorStatus
    }));

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 10; // Set number of rows per page

    const filteredData = initialData.filter((vendor) =>
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const combinedData = [...filteredData];

    const totalPages = Math.ceil(combinedData.length / rowsPerPage);
    const currentRows = combinedData.slice(
        currentPage * rowsPerPage,
        currentPage * rowsPerPage + rowsPerPage
    );

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleApprove = (mail) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to add this user as a vendor?!",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, approve it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const vendStatus = {
                    status: 'Approved',
                    reason: '',
                    role: 'Vendor',
                    banTime: 0
                }
                const role = 'Vendor'
                const res = await vendorRequests.patch(`/allUser/${mail}`, vendStatus, role)
                console.log(res)
                if (res.data.matchedCount > 0) {
                    Swal.fire(
                        'Approved!',
                        'The vendor has been added.',
                        'success'
                    );
                    refetch(); // Refresh the data
                }
            }
        });
    }

    const handleDecline = (mail) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to decline this user?!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, decline it!',
            input: 'text', // Add an input field
            inputPlaceholder: 'Enter the reason for decline',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write a reason for the decline!';
                }
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const vendStatus = {
                    status: 'Declined',
                    reason: result.value // Capture the reason input
                };

                // Send the decline request with reason
                const res = await vendorRequests.patch(`/allUser/${mail}`, vendStatus);
                console.log(res);

                if (res.data.matchedCount > 0) {
                    Swal.fire(
                        'Declined!',
                        'The vendor has been declined with reason: ' + result.value,
                        'error'
                    );
                    refetch(); // Refresh the data
                }
            }
        });
    }

    if (isLoading) {
        return <Typography>Loading...</Typography>; // Show loading state
    }

    return (
        <div className="p-6 min-h-screen space-y-4">
            <div className="p-2 bg-white rounded-lg">
                <h1 className="text-3xl mb-4 text-black">All Vendor Requests</h1>

                <div className="w-1/3 mb-4">
                    <TextField
                        label="Search by Vendor Name"
                        variant="outlined"
                        className="bg-gray-200"
                        fullWidth
                        margin="normal"
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(0); // Reset to first page on search
                        }}
                    />
                </div>

                <div className="border-2">
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Company</TableCell>
                                    <TableCell>Phone Number</TableCell>
                                    <TableCell>Document</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentRows.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.companyName}</TableCell>
                                        <TableCell>{row.phoneNumber}</TableCell>
                                        <TableCell>
                                            <a className="btn hover:bg-gray-300 hover:text-black" target="_blank" href={row.pdfUrl}>Show Document</a>
                                        </TableCell>
                                        <TableCell>{row.vendorStatus.status}</TableCell>
                                        <TableCell>
                                            <div className="text-center">
                                                {
                                                    (row?.vendorStatus?.status === 'Approved' || "Declined")
                                                        ? (
                                                            row?.vendorStatus?.status === 'Approved'
                                                                ? <button onClick={() => handleDecline(row.email)} className="bg-red-600 text-white p-2 rounded-lg hover:bg-gray-700">Revert to User</button>
                                                                : <div><button onClick={() => handleApprove(row.email)} className="bg-green-600 text-white p-2 rounded-lg mr-2 hover:bg-gray-700">Approve</button>
                                                                    <button onClick={() => handleDecline(row.email)} className="bg-red-600 text-white p-2 rounded-lg hover:bg-gray-700">Decline</button></div>
                                                        )
                                                        : <>
                                                            <button onClick={() => handleApprove(row.email)} className="bg-green-600 text-white p-2 rounded-lg mr-2 hover:bg-gray-700">Approve</button>
                                                            <button onClick={() => handleDecline(row.email)} className="bg-red-600 text-white p-2 rounded-lg hover:bg-gray-700">Decline</button>
                                                        </>
                                                }
                                            </div>
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



export default AdminVendorRequest;
