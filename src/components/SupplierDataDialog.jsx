
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { supplierFields } from '../types/vehicle';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`supplier-tabpanel-${index}`}
      aria-labelledby={`supplier-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const SupplierDataDialog = ({ open, onClose, vehicleData, supplierData }) => {
  const [tabValue, setTabValue] = useState(0);
  const suppliers = ['supplier1', 'supplier2', 'supplier3', 'supplier4'];
  const supplierNames = ['Supplier 1', 'Supplier 2', 'Supplier 3', 'Supplier 4'];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const formatLabel = (key) => {
    // Convert camelCase or snake_case to Title Case with spaces
    return key
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/^\w/, c => c.toUpperCase()); // Capitalize first letter
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Supplier Data for Vehicle
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>Vehicle Details</Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell component="th" sx={{ fontWeight: 'bold' }}>License Plate</TableCell>
                  <TableCell>{vehicleData?.licensePlate}</TableCell>
                  <TableCell component="th" sx={{ fontWeight: 'bold' }}>VIN</TableCell>
                  <TableCell>{vehicleData?.vin}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" sx={{ fontWeight: 'bold' }}>Contract Number</TableCell>
                  <TableCell>{vehicleData?.contractNumber}</TableCell>
                  <TableCell component="th" sx={{ fontWeight: 'bold' }}>Current Stage</TableCell>
                  <TableCell>{vehicleData?.targetStage}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            {supplierNames.map((name, index) => (
              <Tab key={suppliers[index]} label={name} id={`supplier-tab-${index}`} />
            ))}
          </Tabs>
        </Box>
        
        {suppliers.map((supplier, index) => {
          const data = supplierData?.[supplier] || {};
          const fields = supplierFields[supplier] || [];
          const hasData = Object.keys(data).length > 0;
          
          return (
            <TabPanel key={supplier} value={tabValue} index={index}>
              {hasData ? (
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableBody>
                      {fields.map((field) => {
                        const value = data[field];
                        if (!value) return null;
                        
                        return (
                          <TableRow key={field}>
                            <TableCell component="th" sx={{ fontWeight: 'bold', width: '40%' }}>
                              {formatLabel(field)}
                            </TableCell>
                            <TableCell>{value}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 3 }}>
                  No data available from {supplierNames[index]}
                </Typography>
              )}
            </TabPanel>
          );
        })}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SupplierDataDialog;
