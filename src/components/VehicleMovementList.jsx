
import React, { useState } from "react";
import { 
  Box, 
  Paper,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TablePagination,
  TextField,
  IconButton,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Tooltip
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SupplierDataDialog from './SupplierDataDialog';
import { getSampleSupplierData } from '../services/vehicle-service';

const VehicleMovementList = ({ movements }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [openSupplierDialog, setOpenSupplierDialog] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [supplierData, setSupplierData] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleActionFilterChange = (event) => {
    setActionFilter(event.target.value);
    setPage(0);
  };

  const handleShowSupplierData = (movement) => {
    setSelectedVehicle(movement);
    // In a real app, this would fetch data from API based on the VIN
    setSupplierData(getSampleSupplierData(movement.vin));
    setOpenSupplierDialog(true);
  };

  const handleCloseSupplierDialog = () => {
    setOpenSupplierDialog(false);
  };

  const filteredMovements = movements.filter(movement => {
    const matchesSearch = searchTerm === "" || 
      movement.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.vin.toLowerCase().includes(searchTerm.toLowerCase()) || 
      movement.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.sourceStage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.targetStage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (movement.executedBy && movement.executedBy.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesAction = actionFilter === "" || movement.action === actionFilter;
    
    return matchesSearch && matchesAction;
  });

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: { xs: '100%', sm: 'auto' } }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="License plate, VIN, stage..."
            fullWidth
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            }}
          />
        </Box>
        
        <FormControl sx={{ minWidth: 150 }} size="small">
          <InputLabel>Filter by Action</InputLabel>
          <Select
            value={actionFilter}
            onChange={handleActionFilterChange}
            label="Filter by Action"
          >
            <MenuItem value="">All Actions</MenuItem>
            <MenuItem value="Create">Create</MenuItem>
            <MenuItem value="Update">Update</MenuItem>
            <MenuItem value="Delete">Delete</MenuItem>
          </Select>
        </FormControl>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FilterListIcon sx={{ mr: 1 }} />
          <Button
            variant="text"
            onClick={() => {
              setSearchTerm("");
              setActionFilter("");
            }}
          >
            Clear Filters
          </Button>
        </Box>
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="vehicle movements table">
          <TableHead>
            <TableRow>
              <TableCell>License Plate</TableCell>
              <TableCell>VIN</TableCell>
              <TableCell>Contract</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Executed By</TableCell>
              <TableCell>Info</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMovements
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell>{movement.licensePlate}</TableCell>
                  <TableCell>{movement.vin}</TableCell>
                  <TableCell>{movement.contractNumber}</TableCell>
                  <TableCell>{movement.sourceStage}</TableCell>
                  <TableCell>{movement.targetStage}</TableCell>
                  <TableCell>{new Date(movement.dateOfMovement).toLocaleDateString()}</TableCell>
                  <TableCell>{movement.action}</TableCell>
                  <TableCell>{movement.comment}</TableCell>
                  <TableCell>{movement.executedBy || "N/A"}</TableCell>
                  <TableCell>
                    <Tooltip title="Show Supplier Information">
                      <IconButton 
                        size="small"
                        onClick={() => handleShowSupplierData(movement)}
                      >
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            {filteredMovements.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No vehicle movements found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredMovements.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <SupplierDataDialog 
        open={openSupplierDialog}
        onClose={handleCloseSupplierDialog}
        vehicleData={selectedVehicle}
        supplierData={supplierData}
      />
    </Box>
  );
};

export default VehicleMovementList;
