import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  CircularProgress,
  IconButton,
  Box,
  Chip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastConfig = {
  position: "top-center",
  autoClose: 3500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Zoom,
};

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description_content: "",
    price: "",
    category: "",
    image: "",
  });
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://cj-backend.onrender.com/products"
        );
        setProducts(response?.data?.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const clearForm = () => {
    setForm({
      name: "",
      description_content: "",
      price: "",
      category: "",
      image: "",
    });
  };

  const handleClickOpenCreate = () => {
    clearForm();
    setOpenCreate(true);
  };

  const handleClickOpenEdit = (product) => {
    setForm({
      name: product.name,
      description_content: product.description_content,
      price: product.price,
      category: product.category,
      image: product.image,
    });
    setEditingProductId(product._id);
    setOpenEdit(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const { name, description_content, price, category, image } = form;
    if (!name || !description_content || !price || !category || !image) {
      toast.error("Please fill all fields.");
      return false;
    }
    if (isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price.");
      return false;
    }
    return true;
  };

  const handleSubmitCreate = async () => {
    if (!validateForm()) return;

    try {
      await axios.post("https://cj-backend.onrender.com/product", form);
      setProducts([...products, form]); // Optionally update UI with new product
      toast.success("Product created successfully.");
      handleCloseCreate();
    } catch (error) {
      toast.error("Error creating product.");
      console.error("Error creating product:", error);
    }
  };

  const handleSubmitEdit = async () => {
    if (!validateForm()) return;

    try {
      await axios.put(
        `https://cj-backend.onrender.com/products/${editingProductId}`,
        form
      );
      setProducts(
        products.map((product) =>
          product._id === editingProductId ? { ...product, ...form } : product
        )
      );
      toast.success("Product updated successfully.");
      handleCloseEdit();
      clearForm();
    } catch (error) {
      toast.error("Error updating product.");
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://cj-backend.onrender.com/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      toast.success("Product deleted successfully.");
    } catch (error) {
      toast.error("Error deleting product.");
      console.error("Error deleting product:", error);
    }
  };

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ padding: "16px" }}>
      <ToastContainer {...toastConfig} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" }, // Responsive direction
          mb: 2,
        }}
      >
        <Typography variant="h4" sx={{ mb: { xs: 2, md: 0 } }}>
          Product Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleClickOpenCreate}
          sx={{ width: { xs: "100%", md: "auto" } }} // Responsive button width
        >
          Add Product
        </Button>
      </Box>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {product.image && (
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: "cover" }}
                />
              )}
              <CardContent sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  component="div"
                  gutterBottom
                  sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }} // Responsive font size
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 2 }}
                >
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  ${product.price}
                </Typography>
                <Chip
                  label={product.category}
                  color="primary"
                  sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }} // Responsive chip size
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Box>
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      onClick={() => handleClickOpenEdit(product)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => handleDelete(product._id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal for creating a product */}
      <Dialog open={openCreate} onClose={handleCloseCreate}>
        <DialogTitle>Create New Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Product Name"
            fullWidth
            variant="standard"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description_content"
            label="Description"
            fullWidth
            variant="standard"
            value={form.description_content}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            value={form.price}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="category"
            label="Category"
            fullWidth
            variant="standard"
            value={form.category}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="image"
            label="Image URL"
            fullWidth
            variant="standard"
            value={form.image}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreate}>Cancel</Button>
          <Button onClick={handleSubmitCreate}>Create</Button>
        </DialogActions>
      </Dialog>

      {/* Modal for editing a product */}
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Product Name"
            fullWidth
            variant="standard"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description_content"
            label="Description"
            fullWidth
            variant="standard"
            value={form.description_content}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            value={form.price}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="category"
            label="Category"
            fullWidth
            variant="standard"
            value={form.category}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="image"
            label="Image URL"
            fullWidth
            variant="standard"
            value={form.image}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleSubmitEdit}>Update</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
