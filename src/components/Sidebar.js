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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Dashboard, Settings, ExitToApp } from "@mui/icons-material";

const drawerWidth = 240;

const Sidebar = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#2c3e50",
            color: "white",
            paddingTop: "16px",
            borderRight: "1px solid #34495e",
          },
        }}
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={!isMobile ? true : undefined}
        onClose={isMobile ? () => {} : undefined}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            p: 2,
            fontWeight: "bold",
            color: "#ecf0f1",
          }}
        >
          Admin Panel
        </Typography>
        <Divider sx={{ backgroundColor: "#34495e" }} />{" "}
        <List>
          <ListItem
            button
            component={Link}
            to="/"
            sx={{
              "&:hover": {
                backgroundColor: "#34495e",
                borderRadius: "4px",
              },
            }}
          >
            <Dashboard sx={{ color: "#ecf0f1", mr: 2 }} />{" "}
            <ListItemText
              primary="Dashboard"
              primaryTypographyProps={{ style: { color: "#ecf0f1" } }}
            />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "#ecf0f1", p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
