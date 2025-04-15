
import React, { useState } from "react";
import { 
  Container, 
  Box, 
  Card, 
  CardContent, 
  CardHeader,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Header from "@/components/Header";
import VehicleMovementList from "@/components/VehicleMovementList";
import VehicleMovementForm from "@/components/VehicleMovementForm";
import CSVUpload from "@/components/CSVUpload";
import { getVehicleMovements, addVehicleMovement, addBulkVehicleMovements } from "@/services/vehicle-service";

const Index = () => {
  const [movements, setMovements] = useState(getVehicleMovements());
  const [openDialog, setOpenDialog] = useState(false);
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
    setOpenDialog(false);
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
        <Card>
          <CardHeader 
            title="Manual Vehicle Movement History"
            action={
              <Box sx={{ display: 'flex', gap: 2 }}>
                <CSVUpload onUpload={handleCSVUpload} />
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<AddIcon />}
                  onClick={() => setOpenDialog(true)}
                >
                  Add Movement
                </Button>
              </Box>
            }
          />
          <CardContent>
            <VehicleMovementList movements={movements} />
          </CardContent>
        </Card>

        <Dialog 
          open={openDialog} 
          onClose={() => setOpenDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Add Vehicle Movement</DialogTitle>
          <DialogContent>
            <VehicleMovementForm onSubmit={handleAddMovement} />
          </DialogContent>
        </Dialog>
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
