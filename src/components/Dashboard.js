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
          "https:cj-backend.onrender.com/products"
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
    setOpenCreate(true);
  };

  const handleClickOpenEdit = (product) => {
    setForm({
      name: product.name,
      description_content: product.description,
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

  const handleSubmitCreate = async () => {
    try {
      await axios.post("https:cj-backend.onrender.com/products", form);
      setProducts([...products, form]); // Optionally update UI with new product
      handleCloseCreate();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleSubmitEdit = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/products/${editingProductId}`,
        form
      );
      setProducts(
        products.map((product) =>
          product._id === editingProductId ? { ...product, ...form } : product
        )
      );
      handleCloseEdit();
      clearForm();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id)); // Update UI after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Product Dashboard</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleClickOpenCreate}
        >
          Add Product
        </Button>
      </Box>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
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
                <Typography variant="h6" component="div" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  ${product.price}
                </Typography>
                <Chip label={product.category} color="primary" />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  {/* <Typography variant="body2" color="textSecondary">
                    In Stock: {product.inStock ? "Yes" : "No"}
                  </Typography> */}
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
            name="description"
            label="Description"
            fullWidth
            variant="standard"
            value={form.description}
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
          <TextField
            margin="dense"
            name="inStock"
            label="In Stock"
            type="checkbox"
            checked={form.inStock}
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
            name="description"
            label="Description"
            fullWidth
            variant="standard"
            value={form.description}
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
          <TextField
            margin="dense"
            name="inStock"
            label="In Stock"
            type="checkbox"
            checked={form.inStock}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleSubmitEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
