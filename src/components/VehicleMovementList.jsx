
import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  Chip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Tooltip
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import InfoIcon from '@mui/icons-material/Info';
import { getSampleSupplierData } from '../services/vehicle-service';
import SupplierDataDialog from './SupplierDataDialog';

const VehicleMovementList = ({ movements }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceStageFilter, setSourceStageFilter] = useState('');
  const [targetStageFilter, setTargetStageFilter] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [supplierData, setSupplierData] = useState(null);
  
  const handleOpenDialog = (vehicle) => {
    const data = getSampleSupplierData(vehicle.vin);
    setSelectedVehicle(vehicle);
    setSupplierData(data);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch (e) {
      return dateString;
    }
  };

  const sourceStages = useMemo(() => {
    return [...new Set(movements.map(m => m.sourceStage))].filter(Boolean);
  }, [movements]);
  
  const targetStages = useMemo(() => {
    return [...new Set(movements.map(m => m.targetStage))].filter(Boolean);
  }, [movements]);
  
  const actions = useMemo(() => {
    return [...new Set(movements.map(m => m.action))].filter(Boolean);
  }, [movements]);

  const filteredMovements = useMemo(() => {
    return movements.filter(movement => {
      const matchesSearch = searchTerm ? 
        (movement.licensePlate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         movement.vin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         movement.contractNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         movement.comment?.toLowerCase().includes(searchTerm.toLowerCase())) : true;
         
      const matchesSourceStage = sourceStageFilter ? movement.sourceStage === sourceStageFilter : true;
      const matchesTargetStage = targetStageFilter ? movement.targetStage === targetStageFilter : true;
      const matchesAction = actionFilter ? movement.action === actionFilter : true;
      
      return matchesSearch && matchesSourceStage && matchesTargetStage && matchesAction;
    });
  }, [movements, searchTerm, sourceStageFilter, targetStageFilter, actionFilter]);
  
  const getActionChipColor = (action) => {
    switch(action) {
      case 'Create': return 'success';
      case 'Update': return 'primary';
      case 'Delete': return 'error';
      default: return 'default';
    }
  };
  
  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, mb: 2, gap: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', md: '70%' } }}>
          <FormControl size="small" sx={{ minWidth: 120, flex: 1 }}>
            <InputLabel>Source Stage</InputLabel>
            <Select
              value={sourceStageFilter}
              onChange={(e) => setSourceStageFilter(e.target.value)}
              label="Source Stage"
              displayEmpty
            >
              <MenuItem value="">All</MenuItem>
              {sourceStages.map(stage => (
                <MenuItem key={stage} value={stage}>{stage}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 120, flex: 1 }}>
            <InputLabel>Target Stage</InputLabel>
            <Select
              value={targetStageFilter}
              onChange={(e) => setTargetStageFilter(e.target.value)}
              label="Target Stage"
              displayEmpty
            >
              <MenuItem value="">All</MenuItem>
              {targetStages.map(stage => (
                <MenuItem key={stage} value={stage}>{stage}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 120, flex: 1 }}>
            <InputLabel>Action</InputLabel>
            <Select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              label="Action"
              displayEmpty
            >
              <MenuItem value="">All</MenuItem>
              {actions.map(action => (
                <MenuItem key={action} value={action}>{action}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      
      <TableContainer component={Paper} variant="outlined">
        <Table size="small" aria-label="vehicle movements table">
          <TableHead>
            <TableRow>
              <TableCell>License Plate</TableCell>
              <TableCell>VIN</TableCell>
              <TableCell>Contract №</TableCell>
              <TableCell>Source Stage</TableCell>
              <TableCell>Target Stage</TableCell>
              <TableCell>Date of Movement</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Execution Date</TableCell>
              <TableCell>Executed By</TableCell>
              <TableCell>Info</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMovements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} align="center">No vehicle movements found</TableCell>
              </TableRow>
            ) : (
              filteredMovements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell>{movement.licensePlate}</TableCell>
                  <TableCell>{movement.vin}</TableCell>
                  <TableCell>{movement.contractNumber}</TableCell>
                  <TableCell>{movement.sourceStage}</TableCell>
                  <TableCell>{movement.targetStage}</TableCell>
                  <TableCell>{formatDate(movement.dateOfMovement)}</TableCell>
                  <TableCell>
                    <Chip 
                      label={movement.action} 
                      size="small" 
                      color={getActionChipColor(movement.action)}
                    />
                  </TableCell>
                  <TableCell>{movement.comment}</TableCell>
                  <TableCell>{formatDate(movement.executionDate)}</TableCell>
                  <TableCell>{movement.executedBy}</TableCell>
                  <TableCell>
                    <Tooltip title="View supplier data">
                      <IconButton 
                        size="small" 
                        color="primary" 
                        onClick={() => handleOpenDialog(movement)}
                        sx={{ 
                          backgroundColor: 'rgba(25, 118, 210, 0.1)',
                          '&:hover': {
                            backgroundColor: 'rgba(25, 118, 210, 0.2)',
                          }
                        }}
                      >
                        <InfoIcon fontSize="small" style={{ color: '#1976d2' }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      {showDialog && selectedVehicle && (
        <SupplierDataDialog
          open={showDialog}
          onClose={handleCloseDialog}
          vehicleData={selectedVehicle}
          supplierData={supplierData}
        />
      )}
    </Box>
  );
};

export default VehicleMovementList;
