
import React from "react";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Container 
} from "@mui/material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Container>
        <Toolbar>
          <DirectionsCarIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Vehicle Movement Tracker
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
