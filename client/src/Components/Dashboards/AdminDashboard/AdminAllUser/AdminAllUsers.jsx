import React, { useState } from 'react';

import {
    Button,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';

import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const AdminAllVendors = () => {
    const [vendorDet, setVendorDet] = useState(null); // Store current vendor details
    const [isModalOpen, setIsModalOpen] = useState(false); // Track details modal open state
    const [isBanModalOpen, setIsBanModalOpen] = useState(false); // Track ban modal open state

    const allUsers = useAxiosSecure();

    const { data: allUserInAdmin = [], isLoading, refetch } = useQuery({
        queryKey: ["allUserInAdmin"],
        queryFn: async () => {
            const res = await allUsers.get(`/allUsers?role=User`);
            return res.data; // Ensure you handle the data correctly here
        },
    });
    refetch();

    const initialData = allUserInAdmin.map(user => ({
        id: user?._id,
        name: user?.name,
        email: user?.email,
        bantime: user?.banTime,
    }));

    const openModal = (id) => {
        const vendorDetails = allUserInAdmin.find(userOnly => userOnly._id === id);
        setVendorDet(vendorDetails);
        setIsModalOpen(true);   // Open the details modal
    };

    const currentTime = Date.now();
    let banTime = 0;

    const handleBan = async (duration, id) => {
        if (duration == '5 Minutes') {
            banTime = currentTime + 300000;
        }
        else if (duration == '1 Minute') {
            banTime = currentTime + 60000;
        } 
        else if (duration == '3 Days') {
            banTime = currentTime + 259200000
        }
        else if (duration == '7 Days') {
            banTime = currentTime + 604800000
        }

        const banUser = {
            banTime: banTime,
        }

        const banUpdate = await allUsers.patch(`/allUsers/${id}`, banUser)
        refetch();
        setIsBanModalOpen(false);
    };

    const handleDelete = async (id) => {
       
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    })
    .then(async (result) => {
        if (result.isConfirmed) {
            try {
                await allUsers.delete(`/allUsers/${id}`); // Send DELETE request

                Swal.fire(
                    'Deleted!',
                    'The vendor has been deleted.',
                    'success'
                );

                
            } catch (error) {

                Swal.fire(
                    'Error!',
                    'Failed to delete the user.',
                    'error'
                );
            }
        }
        refetch();
        handleClose(); // Close the menu after the request
    });
};

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 4;

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
        <div className="p-6 min-h-screen space-y-4">
            <div className="relative bg-white p-2 rounded-lg">
            <h1 className="text-3xl mb-4 text-black">All Users</h1>
            <div className='w-1/3 mb-4'>
                <TextField
                    label="Search by Name"
                    variant="outlined"
                    className="bg-gray-200"
                    fullWidth
                    margin="normal"
                    onChange={e => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(0); // Reset to first page on search
                    }}
                />
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>E-mail</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                {
                                    row?.bantime > currentTime ? <TableCell><span className='text-red-500 font-bold'>Banned</span></TableCell>:<TableCell><span className='text-green-500 font-bold'>Open</span></TableCell>
                                }
                                
                                <TableCell>
                                    <div>
                                        <button className="btn" onClick={() => openModal(row.id)}>Details</button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

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

            {/* Modal for Vendor Details */}
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="vendor-details-modal"
                aria-describedby="vendor-details-description"
            >
                <div className="modal-box absolute top-[50%] left-[50%] translate-x-[-50%] text-white translate-y-[-50%]">
                    {vendorDet && (
                        <>
                            <h3 className="font-bold text-lg mb-3">User Details</h3>
                            <div className="flex gap-5">
                                <img className='h-24 w-24 rounded-md' src={vendorDet?.photo} alt="Vendor" />
                                <div>
                                    <p><strong>Name:</strong> {vendorDet?.name}</p>
                                    <p><strong>Email:</strong> {vendorDet?.email}</p>
                                    <p><strong>Last Login:</strong> {vendorDet?.lastLogin}</p>
                                </div>
                            </div>
                            <div className="modal-action">
                                <Button onClick={() => setIsBanModalOpen(true)} className="mr-2">Ban</Button>
                                <Button onClick={() => handleDelete(vendorDet._id) && setIsModalOpen(false)} className="mr-2">Delete</Button>
                                <Button onClick={() => setIsModalOpen(false)}>Close</Button>
                            </div>
                        </>
                    )}
                </div>
            </Modal>

            {/* Modal for Ban Duration */}
            <Modal
                open={isBanModalOpen}
                onClose={() => setIsBanModalOpen(false)}
                aria-labelledby="ban-duration-modal"
                aria-describedby="ban-duration-description"
            >
                <div className="modal-box absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <h3 className="font-bold text-lg">Select Ban Duration</h3>
                    <div className="modal-action flex flex-col gap-4">
                        <Button onClick={() => handleBan('1 Minute', vendorDet._id) && setIsModalOpen(false)} className="mr-2">1 Minute</Button>
                        <Button onClick={() => handleBan('5 Minutes', vendorDet._id) && setIsModalOpen(false)} className="mr-2">5 Minutes</Button>
                        <Button onClick={() => handleBan('3 Days', vendorDet._id) && setIsModalOpen(false)} className="mr-2">3 Days</Button>
                        <Button onClick={() => handleBan('7 Days', vendorDet._id) && setIsModalOpen(false)} className="mr-2">7 Days</Button>
                        <Button onClick={() => setIsBanModalOpen(false)}>Cancel</Button>
                    </div>
                </div>
            </Modal>
            </div>
        </div>
        
    );
};


export default AdminAllVendors;


























// import React, { useState } from 'react';
// import Swal from 'sweetalert2';

// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     TextField,
//     Button,
//     Typography,
//     IconButton,
//     Menu,
//     MenuItem,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import useAxiosSecure from '../../../../hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import InfoIcon from '@mui/icons-material/Info';
// import WarningIcon from '@mui/icons-material/Warning';
// import BlockIcon from '@mui/icons-material/Block';

// const VendorProducts = () => {
//     const allVendors = useAxiosSecure();
//     const vendor = 'Vendor';

//     const { data: allUserInAdmin = [], isLoading } = useQuery({
//         queryKey: ['allVendorsInAdmin'],
//         queryFn: async () => {
//             const res = await allVendors.get(`/allUsers?role=${vendor}`);
//             return res.data; // Ensure you handle the data correctly here
//         },
//     });

//     const initialData = allUserInAdmin.map(user => ({
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         lastLogin: user.lastLogin,
//         joined: user.createdTime,
//         isWarning: user.isWarning || false,
//         isBanned: user.isBanned || false,
//     }));

//     const [searchTerm, setSearchTerm] = useState('');
//     const [currentPage, setCurrentPage] = useState(0);
//     const rowsPerPage = 5;

//     const filteredData = initialData.filter(item =>
//         item.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const combinedData = [...filteredData];
//     const totalPages = Math.ceil(combinedData.length / rowsPerPage);
//     const currentRows = combinedData.slice(
//         currentPage * rowsPerPage,
//         currentPage * rowsPerPage + rowsPerPage
//     );

//     const handleNextPage = () => {
//         if (currentPage < totalPages - 1) {
//             setCurrentPage(prevPage => prevPage + 1);
//         }
//     };

//     const handlePreviousPage = () => {
//         if (currentPage > 0) {
//             setCurrentPage(prevPage => prevPage - 1);
//         }
//     };

//     if (isLoading) {
//         return <Typography>Loading...</Typography>; // Show loading state
//     }

//     return (
//         <div className="p-4 bg-white rounded-lg">
//             <h1 className="text-3xl mb-4 text-black">All Users</h1>

//             <div className="w-1/3 mb-4">
//                 <TextField
//                     label="Search by Product Name"
//                     variant="outlined"
//                     className="bg-gray-200"
//                     fullWidth
//                     margin="normal"
//                     onChange={e => {
//                         setSearchTerm(e.target.value);
//                         setCurrentPage(0); // Reset to first page on search
//                     }}
//                 />
//             </div>

//             <div className="border-2">
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>ID</TableCell>
//                                 <TableCell>User Name</TableCell>
//                                 <TableCell>E-mail</TableCell>
//                                 <TableCell>Joined</TableCell>
//                                 <TableCell>Last Login</TableCell>
//                                 <TableCell>Action</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {currentRows.map((row, rowIndex) => (
//                                 <TableRow key={rowIndex}>
//                                     <TableCell>{row.id}</TableCell>
//                                     <TableCell>{row.name}</TableCell>
//                                     <TableCell>{row.email}</TableCell>
//                                     <TableCell>{row.joined}</TableCell>
//                                     <TableCell>{row.lastLogin}</TableCell>
//                                     <TableCell>
//                                         <ActionMenu row={row} />
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </div>

//             <div className="flex justify-between items-center my-4">
//                 <Button
//                     onClick={handlePreviousPage}
//                     disabled={currentPage === 0}
//                     variant="outlined"
//                 >
//                     Previous
//                 </Button>
//                 <Typography>
//                     Page {currentPage + 1} of {totalPages}
//                 </Typography>
//                 <Button
//                     onClick={handleNextPage}
//                     disabled={currentPage === totalPages - 1}
//                     variant="outlined"
//                 >
//                     Next
//                 </Button>
//             </div>
//         </div>
//     );
// };

// // ActionMenu Component
// const ActionMenu = ({ row }) => {
//     const [anchorEl, setAnchorEl] = useState(null);
//     const allVendors = useAxiosSecure(); // Use the Axios hook to make API requests

//     const handleClick = event => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     // Toggle the warning status for the vendor
//     const toggleWarningStatus = async () => {
//         try {
//             //console.log('Vendor ID:', row.id);  // Log vendor ID
//             const updatedWarningStatus = !row.isWarning;
//             //console.log('Payload:', { isWarning: updatedWarningStatus }); // Log the payload

//             // Send PUT request to update warning status
//             await allVendors.put(`/vendors/${row.id}/warning`, {
//                 isWarning: updatedWarningStatus,
//             });

//             // Update the UI locally after the request succeeds
//             row.isWarning = updatedWarningStatus;
//         } catch (error) {
//             console.error('Error updating warning status:', error);
//         }
//         handleClose(); // Close the menu after the request
//     };

//     // Toggle the ban status for the vendor
//     const toggleBanStatus = async () => {
//         try {
//             //console.log('Vendor ID:', row.id);  // Log vendor ID
//             const updatedBanStatus = !row.isBanned;
//             //console.log('Payload:', { isBanned: updatedBanStatus }); // Log the payload

//             // Send PUT request to update ban status
//             await allVendors.put(`/vendorss/${row.id}/ban`, {
//                 isBanned: updatedBanStatus,
//             });

//             // Update the UI locally after the request succeeds
//             row.isBanned = updatedBanStatus;
//         } catch (error) {
//             console.error('Error updating ban status:', error);
//         }
//         handleClose(); // Close the menu after the request
//     };

//       // Delete the vendor
// const handleDelete = async () => {
//     Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//         if (result.isConfirmed) {
//             try {
//                 await allVendors.delete(`/vendorsDelete/${row.id}`); // Send DELETE request

//                 Swal.fire(
//                     'Deleted!',
//                     'The vendor has been deleted.',
//                     'success'
//                 );

                
//             } catch (error) {
//                 console.error('Error deleting user:', error);

//                 Swal.fire(
//                     'Error!',
//                     'Failed to delete the user.',
//                     'error'
//                 );
//             }
//         }
//         handleClose(); // Close the menu after the request
//     });
// };

//     return (
//         <div>
//             <IconButton onClick={handleClick}>
//                 <MoreVertIcon />
//             </IconButton>
//             <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
//                 {/* Warning Toggle */}
//                 <MenuItem onClick={() => toggleWarningStatus(row)}>
//                     <WarningIcon
//                         fontSize="small"
//                         className={row.isWarning ? 'text-red-500' : 'text-yellow-500'}
//                     />
//                     {row.isWarning ? 'Remove Warning' : 'Warning'}
//                 </MenuItem>

//                 {/* Ban Toggle */}
//                 <MenuItem onClick={() => toggleBanStatus(row)}>
//                     <BlockIcon
//                         fontSize="small"
//                         className={row.isBanned ? 'text-red-500' : 'text-gray-500'}
//                     />
//                     {row.isBanned ? 'Unban' : 'Ban'}
//                 </MenuItem>

//                 <MenuItem onClick={handleClose}>
//                     <InfoIcon fontSize="small" className="text-green-600" /> Details
//                 </MenuItem>
//                 <MenuItem onClick={handleDelete}>
//                     <DeleteIcon fontSize="small" className="text-red-500" /> Delete
//                 </MenuItem>
//             </Menu>
//         </div>
//     );
// };





// // const columns = useMemo(() => [
// //     { Header: '#', accessor: 'id' },
// //     { Header: 'Vendor Name', accessor: 'vendorName' },
// //     { Header: 'E-mail', accessor: 'email' },
// //     { Header: 'Joining Date', accessor: 'joiningDate' },
// //     { Header: 'Total Sales', accessor: 'totalSales' },
// //     { Header: 'Total Product', accessor: 'totalProduct' },
// //     { Header: 'Address', accessor: 'address' },
// //     { Header: 'Action', accessor: 'action', Cell: ({ row }) => <ActionMenu row={row} /> }
// // ], []);

// // <IconButton onClick={handleClick}>
// // <MoreVertIcon />
// // </IconButton>
// // <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
// // <MenuItem onClick={handleClose}>
// //     <InfoIcon fontSize="small" className='text-green-600'/> Details
// // </MenuItem>
// // <MenuItem onClick={handleClose}>
// //     <FeedbackIcon fontSize="small" className='text-cyan-600'/> Complain
// // </MenuItem>
// // <MenuItem onClick={handleClose}>
// //     <WarningIcon fontSize="small" className='text-yellow-500'/> Warning
// // </MenuItem>
// // <MenuItem onClick={handleClose}>
// //     <BlockIcon fontSize="small" className='text-zinc-800'/> Ban
// // </MenuItem>

// // </Menu>