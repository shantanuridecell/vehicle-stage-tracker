
import React, { useState } from "react";
import { 
  Container, 
  Box, 
  Card, 
  CardContent, 
  CardHeader,
  Tabs,
  Tab,
  Alert,
  Snackbar
} from '@mui/material';
import Header from "@/components/Header";
import VehicleMovementList from "@/components/VehicleMovementList";
import VehicleMovementForm from "@/components/VehicleMovementForm";
import CSVUpload from "@/components/CSVUpload";
import { getVehicleMovements, addVehicleMovement, addBulkVehicleMovements } from "@/services/vehicle-service";

const Index = () => {
  const [movements, setMovements] = useState(getVehicleMovements());
  const [tabValue, setTabValue] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleAddMovement = (formData) => {
    const newMovement = addVehicleMovement(formData);
    setMovements([newMovement, ...movements]);
    setSnackbar({
      open: true,
      message: 'Vehicle movement added successfully!',
      severity: 'success'
    });
  };

  const handleCSVUpload = (data) => {
    const newMovements = addBulkVehicleMovements(data);
    setMovements([...newMovements, ...movements]);
    setSnackbar({
      open: true,
      message: `${newMovements.length} vehicle movements imported successfully!`,
      severity: 'success'
    });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Header />
      
      <Container sx={{ py: 4, mt: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Vehicle Movements" />
          <Tab label="Add Movement" />
        </Tabs>
        
        {tabValue === 0 && (
          <Card sx={{ mt: 2 }}>
            <CardHeader 
              title="Vehicle Movement History"
              subheader="Track all vehicle movements between stages"
              action={<CSVUpload onUpload={handleCSVUpload} />}
            />
            <CardContent>
              <VehicleMovementList movements={movements} />
            </CardContent>
          </Card>
        )}
        
        {tabValue === 1 && (
          <Card sx={{ mt: 2 }}>
            <CardHeader 
              title="Add Vehicle Movement"
              subheader="Move a vehicle from one stage to another"
            />
            <CardContent>
              <VehicleMovementForm onSubmit={handleAddMovement} />
            </CardContent>
          </Card>
        )}
      </Container>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Index;
