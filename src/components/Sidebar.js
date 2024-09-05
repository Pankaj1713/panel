import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { Dashboard, Settings, ExitToApp } from "@mui/icons-material";

const drawerWidth = 240;

const Sidebar = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#2c3e50", // Professional dark blue background for the sidebar
            color: "white",
            paddingTop: "16px",
            borderRight: "1px solid #34495e", // Subtle border for separation
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            p: 2,
            fontWeight: "bold",
            color: "#ecf0f1", // Light color for the title
          }}
        >
          Admin Panel
        </Typography>
        <Divider sx={{ backgroundColor: "#34495e" }} />{" "}
        {/* Divider with a slightly lighter shade */}
        <List>
          <ListItem
            button
            component={Link}
            to="/"
            sx={{
              "&:hover": {
                backgroundColor: "#34495e", // Darker background on hover
                borderRadius: "4px", // Rounded corners for hover effect
              },
            }}
          >
            <Dashboard sx={{ color: "#ecf0f1", mr: 2 }} />{" "}
            {/* White color for the icon */}
            <ListItemText
              primary="Dashboard"
              primaryTypographyProps={{ style: { color: "#ecf0f1" } }} // White color for the text
            />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "#ecf0f1", p: 3 }} // Light background for main content
      >
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
