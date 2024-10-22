import React, { useEffect, useState } from "react";
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
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosCommon from "./../../../../hooks/useAxiosCommon";
import Swal from "sweetalert2";
import { Controller, useForm } from "react-hook-form";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Select from "react-select";
import { imageUpload } from "../../../../utils/imageUpload";
import { FaTrashAlt } from "react-icons/fa";
const style = {
  position: "absolute",
  bgcolor: "#EEEEEE",
  boxShadow: 4,
  border: "none",
  p: 4,
};

const VendorProducts = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showCustomSizeInput, setShowCustomSizeInput] = useState(false);
  const [customSize, setCustomSize] = useState("");
  const [showCustomCategoryInput, setShowCustomCategoryInput] = useState(false);
  const [customCategory, setCustomCategory] = useState("");
  const [showCustomColorInput, setShowCustomColorInput] = useState(false);
  const [customColor, setCustomColor] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [updateSingleProduct, setUpdateSingleProduct] = useState([]);

  // const test = updateSingleProduct.map((item) => item.veriation);
  // console.log(test);
  const size = updateSingleProduct?.veriation?.map((prd) => prd.size);
  const uniqueSize = [...new Set(size)];

  console.log(uniqueSize);
  // modal update product start

  const { register, handleSubmit, reset, control, setValue } = useForm();

  const [categoryOptions, setCategoryOptions] = useState([
    { value: "Men", label: "Men" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Technology", label: "Technology" },
    { value: "Woman", label: "Woman" },
    { value: "add_more", label: "Add more" },
  ]);
  const [sizeOptions, setSizeOptions] = useState([
    { value: "Small", label: "Small" },
    { value: "Medium", label: "Medium" },
    { value: "Large", label: "Large" },
    { value: "add_more", label: "Add more" },
  ]);

  const [colorOptions, setColorOptions] = useState([
    { value: "red", label: "Red" },
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
    { value: "blue", label: "Blue" },
    { value: "add_more_color", label: "Add more Color" },
  ]);

  const onSubmit = async (data, e) => {
    try {
      // Upload main product image
      const productImage = data.photo[0];
      const imageUrl = await imageUpload(productImage);

      // Upload gallery images one by one and store their URLs
      const productsGallarysUrl = await Promise.all(
        selectedImages.map(async (image) => {
          const galleryImageUrl = await imageUpload(image);
          return galleryImageUrl;
        })
      );

      // Generate unique variations based on selected colors and sizes
      let variations = [];
      // Check for color and size and generate variations accordingly
      if (data.color && data.size) {
        // If both color and size are present, combine them
        variations = data.color.flatMap((color) =>
          data.size.map((size) => ({
            color,
            size,
          }))
        );
      } else if (data.color) {
        // If only color is present, create variations with color only
        variations = data.color.map((color) => ({
          color,
          size: null, // No size
        }));
      } else if (data.size) {
        // If only size is present, create variations with size only
        variations = data.size.map((size) => ({
          color: null, // No color
          size,
        }));
      }

      // Add product details
      const addProduct = {
        vendorEmail: user?.email,
        companyName: data.companyName || "",
        productName: data.productName,
        productShortDescription: data.productShortDescription,
        description: data.productDescription,
        category: data.category,
        price: parseFloat(data.price),
        stockQuantity: parseInt(data.stock),
        rating: 0.0,
        discount: parseFloat(data.discount),
        isFeatured: false,
        productImage: imageUrl || "",
        veriation: variations,
        galleryImages: productsGallarysUrl || [],
      };

      console.log(addProduct);

      // Send data to Database
      // const res = await axiosCommon.post("/all-products", addProduct);
      // if (res.data.insertedId) {
      //   Swal.fire({
      //     position: "center",
      //     icon: "success",
      //     title: `Your Product Has Been Added`,
      //     showConfirmButton: true,
      //   });
      //   reset();
      // }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  // modal update product end

  const vendorProducts = useAxiosSecure();
  const { user } = useAuth();
  const axiosCommon = useAxiosCommon();

  const {
    refetch,
    data: vendorAllProducts = [],
    isLoading,
  } = useQuery({
    queryKey: ["productsForVendor"],
    queryFn: async () => {
      const res = await vendorProducts.get("/allVendorProducts");
      return res.data; // Ensure you handle the data correctly here
    },
  });
  //
  const allVendorProducts = vendorAllProducts?.filter(
    (product) => product?.vendorEmail === user?.email
  );
  // console.log(allVendorProducts);

  const initialData = allVendorProducts.map((product) => ({
    id: product._id,
    name: product.productName,
    category: product.category || "N/A", // Assuming you might want to add category
    price: product.price || "N/A", // Assuming you might want to add price
  }));

  console.log(initialData);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const rowsPerPage = 5; // Set number of rows per page

  const filteredData = initialData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const combinedData = [...filteredData];
  console.log(combinedData);
  console.log(filteredData);

  const totalPages = Math.ceil(combinedData.length / rowsPerPage);
  const currentRows = combinedData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  console.log(currentRows);

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloses = () => {
    setAnchorEl(null);
  };

  // product update handle start

  const handleEdit = async (id) => {
    try {
      const resp = await axiosCommon.get(`/vendorProductEdit/${id}`);

      setUpdateSingleProduct(resp?.data);
    } catch (error) {
      console.log(error);
    }

    // handleCloses();
    // Close menu after action
    // Add your edit logic here (e.g., open a modal with the product data)
  };

  // productData change on edit
  useEffect(() => {
    if (updateSingleProduct?.productName) {
      setValue("productName", updateSingleProduct.productName || "");
    }
    if (updateSingleProduct?.productShortDescription) {
      setValue(
        "productShortDescription",
        updateSingleProduct.productShortDescription || ""
      );
    }
    if (updateSingleProduct?.productImage) {
      setValue("photo", updateSingleProduct.productImage || "");
    }
    if (updateSingleProduct?.description) {
      setValue("productDescription", updateSingleProduct.description || "");
    }
    if (updateSingleProduct?.variation?.[0]?.size) {
      setValue("size", updateSingleProduct?.variation?.[0]?.size || "");
    }
    if (updateSingleProduct?.price) {
      setValue("price", updateSingleProduct?.price || "");
    }
    if (updateSingleProduct?.stockQuantity) {
      setValue("stock", updateSingleProduct?.stockQuantity || "");
    }
    if (updateSingleProduct?.discount) {
      setValue("discount", updateSingleProduct?.discount || "");
    }
  }, [updateSingleProduct, setValue]);

  // product update handle end

  const handleDelete = async (id) => {
    try {
      const resp = await axiosCommon.delete(`/vendorProductDelete/${id}`);
      refetch();
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your work has been Deleted",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      // console.log(error);
    }
    // handleClose();
    // Close menu after action
    // Add your delete logic here (e.g., confirm and delete the product)
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>; // Show loading state
  }

  console.log(updateSingleProduct?.productName);

  return (
    <div className="p-4 bg-white rounded-lg">
      <h1 className="text-3xl mb-4 text-black">All Products</h1>

      <div className="w-1/3 mb-4">
        <TextField
          label="Search by Product Name"
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
                <TableCell>ID</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div>
                        <Button className="pr-8" onClick={handleOpen}>
                          {" "}
                          <button
                            className="bg-blue-500 w-[64px] text-sm py-[10px] text-white rounded-md"
                            onClick={() => handleEdit(row?.id)}
                          >
                            Edit
                          </button>
                        </Button>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          BackdropProps={{
                            style: {
                              backgroundColor: "rgba(255, 255, 255, 0.0)",
                            },
                          }}
                          aria-labelledby="modal-title"
                          aria-describedby="modal-description"
                          className="w-[1000px] h-[820px] mx-auto overflow-auto my-auto"
                        >
                          <Box sx={style}>
                            <div className="p-8 text-black">
                              <form
                                onSubmit={handleSubmit(onSubmit)}
                                className=""
                              >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                  {/* General Information Section */}
                                  <div className="col-span-2">
                                    <div className="bg-white shadow-md p-6 rounded-md">
                                      <Typography
                                        variant="h6"
                                        className="mb-4 font-semibold"
                                      >
                                        General Information
                                      </Typography>

                                      {/* Name Product */}

                                      <div className="my-4">
                                        <TextField
                                          fullWidth
                                          label="Product Name"
                                          required
                                          {...register("productName", {
                                            required:
                                              "Product Name is required",
                                          })}
                                        />
                                      </div>

                                      {/* Product Short Description  */}
                                      <div className="mb-4">
                                        <TextField
                                          required
                                          fullWidth
                                          multiline
                                          rows={4}
                                          label="Short Description"
                                          placeholder="Enter a brief summary of the product..."
                                          inputProps={{ maxLength: 250 }}
                                          {...register(
                                            "productShortDescription"
                                          )}
                                          className="mb-4"
                                          helperText="Maximum 250 characters."
                                        />
                                      </div>

                                      {/* Description Product */}
                                      <div className="mb-4">
                                        <TextField
                                          required
                                          fullWidth
                                          multiline
                                          rows={4}
                                          label="Description Product"
                                          {...register("productDescription")}
                                          className="mb-4"
                                        />
                                      </div>

                                      {/* Size options */}
                                      <div className="bg-white shadow-md p-6 rounded-md">
                                        <div className="mb-2">
                                          <Typography
                                            variant="h6"
                                            className="mb-4 font-semibold"
                                          >
                                            Select Size
                                          </Typography>
                                        </div>
                                        <div className="p-2 mb-2">
                                          <Controller
                                            control={control}
                                            name="size" // Name for react-hook-form
                                            // Default value, making sure it's an array of objects
                                            render={({
                                              field: { onChange, value, ref },
                                            }) => (
                                              <Select
                                                inputRef={ref}
                                                value={
                                                  value && value.length
                                                    ? sizeOptions.filter(
                                                        (option) =>
                                                          value.includes(
                                                            option.value
                                                          )
                                                      )
                                                    : []
                                                } // Ensure the value is an array of objects
                                                onChange={(selectedOptions) => {
                                                  const selectedValues =
                                                    selectedOptions
                                                      ? selectedOptions.map(
                                                          (option) =>
                                                            option.value
                                                        )
                                                      : [];
                                                  onChange(selectedValues); // Update the field with selected values

                                                  // Check if "Add more" is selected
                                                  if (
                                                    selectedValues.includes(
                                                      "add_more"
                                                    )
                                                  ) {
                                                    setShowCustomSizeInput(
                                                      true
                                                    ); // Show custom size input field
                                                  }
                                                }}
                                                options={sizeOptions} // Options provided in { value, label } format
                                                isMulti
                                              />
                                            )}
                                          />
                                        </div>

                                        {/* Display input for custom size when "Add more" is selected */}
                                        {showCustomSizeInput && (
                                          <div className="mt-4  ">
                                            <input
                                              type="text"
                                              value={customSize}
                                              onChange={(e) =>
                                                setCustomSize(e.target.value)
                                              }
                                              placeholder="Enter custom size"
                                              className="p-2 border rounded-md w-full bg-white"
                                            />
                                            <button
                                              type="button"
                                              onClick={handleAddCustomSize}
                                              className="mt-2 p-2 bg-blue-500 text-white rounded-md"
                                            >
                                              Add Size
                                            </button>
                                          </div>
                                        )}
                                      </div>

                                      {/* Color options */}
                                      <div className="bg-white shadow-md p-6 rounded-md">
                                        <div className="mb-2">
                                          <Typography
                                            variant="h6"
                                            className="mb-4 font-semibold"
                                          >
                                            Select Color
                                          </Typography>
                                        </div>
                                        <div className="p-2 mb-2">
                                          <Controller
                                            control={control}
                                            defaultValue={[]}
                                            {...register("color")}
                                            render={({
                                              field: { onChange, value, ref },
                                            }) => (
                                              <Select
                                                inputRef={ref}
                                                value={colorOptions.filter(
                                                  (c) =>
                                                    value &&
                                                    value.includes(c.value)
                                                )}
                                                onChange={(val) => {
                                                  const selectedValues =
                                                    val.map((c) => c.value);
                                                  onChange(selectedValues);

                                                  // Check if "Add more" is selected
                                                  if (
                                                    selectedValues.includes(
                                                      "add_more_color"
                                                    )
                                                  ) {
                                                    setShowCustomColorInput(
                                                      true
                                                    );
                                                  }
                                                }}
                                                options={colorOptions}
                                                isMulti
                                              />
                                            )}
                                          />
                                        </div>

                                        {/* Display input for custom color when "Add more" is selected */}
                                        {showCustomColorInput && (
                                          <div className="mt-4">
                                            <input
                                              type="text"
                                              value={customColor}
                                              onChange={(e) =>
                                                setCustomColor(e.target.value)
                                              }
                                              placeholder="Enter custom Color"
                                              className="p-2 border rounded-md w-full bg-white"
                                            />
                                            <button
                                              type="button"
                                              onClick={handleAddCustomColor}
                                              className="mt-2 p-2 bg-blue-500 text-white rounded-md"
                                            >
                                              Add Color
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Pricing and Stock */}
                                    <div className="bg-white shadow-md p-6 rounded-md mt-6">
                                      <div className="mb-3">
                                        <Typography
                                          variant="h6"
                                          className="mb-4 font-semibold"
                                        >
                                          Pricing And Stock
                                        </Typography>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                        <TextField
                                          type="number"
                                          required
                                          fullWidth
                                          label="Base Pricing"
                                          {...register("price")}
                                          inputProps={{ min: 0 }}
                                        />
                                        <TextField
                                          type="number"
                                          required
                                          fullWidth
                                          label="Stock"
                                          {...register("stock")}
                                          inputProps={{ min: 0 }}
                                        />
                                        <TextField
                                          type="number"
                                          fullWidth
                                          label="Discount on parcentage"
                                          {...register("discount")}
                                          inputProps={{ min: 0 }}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Right Section */}

                                  <div className="space-y-6">
                                    {/* Upload Image Section */}
                                    <div className="bg-white shadow-md p-6 rounded-md">
                                      <div className="mb-2">
                                        <Typography
                                          variant="h6"
                                          className="mb-4 font-semibold"
                                        >
                                          Product Image
                                        </Typography>
                                      </div>
                                      <input
                                        type="file"
                                        name="photo"
                                        id="photo"
                                        accept="image/*"
                                        required
                                        multiple
                                        className="bg-white file-input file-input-bordered w-full max-w-xs"
                                        {...register("photo")}
                                      />
                                    </div>

                                    {/* Upload products more photo to products Gallary */}
                                    <div className="bg-white shadow-md p-6 rounded-md">
                                      <div className="mb-2">
                                        <Typography
                                          variant="h6"
                                          className="mb-4 font-semibold"
                                        >
                                          Product Gallery
                                        </Typography>
                                      </div>
                                      <input
                                        type="file"
                                        name="photo"
                                        id="photo"
                                        accept="image/*"
                                        multiple // Allows multiple image selection
                                        // required
                                        onChange={(e) => handleImage(e)}
                                        className="file-input file-input-bordered w-full max-w-xs bg-white"
                                      />

                                      {/* Display selected images with remove button */}
                                      <div className="mt-4">
                                        {selectedImages.length > 0 && (
                                          <div>
                                            <Typography variant="body1">
                                              Images for Prodcut Gallery:
                                            </Typography>
                                            <ul>
                                              {selectedImages.map(
                                                (image, index) => (
                                                  <li
                                                    key={index}
                                                    className="flex items-center justify-between mt-2"
                                                  >
                                                    <span>{image.name}</span>
                                                    <button
                                                      type="button"
                                                      onClick={() =>
                                                        handleRemoveImage(index)
                                                      }
                                                      className="ml-2 p-1 text-red-500 hover:text-red-700"
                                                    >
                                                      <RxCross2 />;{" "}
                                                      {/* Cross icon */}
                                                    </button>
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Category Section with Datalist */}
                                    <div className="bg-white shadow-md p-6 rounded-md">
                                      <div className="mb-2">
                                        <Typography
                                          variant="h6"
                                          className="mb-4 font-semibold"
                                        >
                                          Categories
                                        </Typography>
                                      </div>
                                      <div className="p-2 mb-2">
                                        <Controller
                                          control={control}
                                          defaultValue={[]}
                                          {...register("category")}
                                          render={({
                                            field: { onChange, value, ref },
                                          }) => (
                                            <Select
                                              inputRef={ref}
                                              value={categoryOptions.filter(
                                                (c) =>
                                                  value &&
                                                  value.includes(c.value)
                                              )}
                                              onChange={(val) => {
                                                const selectedValues = val.map(
                                                  (c) => c.value
                                                );
                                                onChange(selectedValues);

                                                // Check if "Add more" is selected
                                                if (
                                                  selectedValues.includes(
                                                    "add_more"
                                                  )
                                                ) {
                                                  setShowCustomCategoryInput(
                                                    true
                                                  );
                                                }
                                              }}
                                              options={categoryOptions}
                                              isMulti
                                            />
                                          )}
                                        />
                                      </div>

                                      {/* Display input for custom category when "Add more" is selected */}
                                      {showCustomCategoryInput && (
                                        <div className="mt-4">
                                          <input
                                            type="text"
                                            value={customCategory}
                                            onChange={(e) =>
                                              setCustomCategory(e.target.value)
                                            }
                                            placeholder="Enter custom category"
                                            className="p-2 border rounded-md w-full bg-white"
                                          />
                                          <button
                                            type="button"
                                            onClick={handleAddCustomCategory}
                                            className="mt-2 p-2 bg-blue-500 text-white rounded-md"
                                          >
                                            Add Category
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-8">
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={<AddCircleOutlineIcon />}
                                    className="capitalize"
                                    color="primary"
                                  >
                                    Upload Product
                                  </Button>
                                </div>
                              </form>
                            </div>
                            <Button onClick={handleClose}>Close Modal</Button>
                          </Box>
                        </Modal>
                      </div>
                      <button
                        onClick={() => handleDelete(row?.id)}
                        className="bg-red-500 px-6 py-3 text-white rounded-md"
                      >
                        {" "}
                        <FaTrashAlt size={16} />
                      </button>
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
  );
};

export default VendorProducts;
