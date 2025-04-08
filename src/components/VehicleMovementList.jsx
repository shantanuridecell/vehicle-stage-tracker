
import React, { useState, useMemo } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  TableContainer,
  Paper,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Chip,
  InputAdornment
} from '@mui/material';
import { format } from "date-fns";
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const VehicleMovementList = ({ movements }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceStageFilter, setSourceStageFilter] = useState(null);
  const [targetStageFilter, setTargetStageFilter] = useState(null);
  const [actionFilter, setActionFilter] = useState(null);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd-MMM-yyyy");
    } catch (e) {
      return dateString;
    }
  };

  const getActionChip = (action) => {
    switch (action) {
      case 'Create':
        return <Chip label="Create" color="success" />;
      case 'Update':
        return <Chip label="Update" color="primary" />;
      case 'Delete':
        return <Chip label="Delete" color="error" />;
      default:
        return <Chip label={action} />;
    }
  };

  // Extract unique source and target stages for filters
  const sourceStages = useMemo(() => {
    const stages = Array.from(new Set(movements.map(m => m.sourceStage)));
    return stages.sort();
  }, [movements]);

  const targetStages = useMemo(() => {
    const stages = Array.from(new Set(movements.map(m => m.targetStage)));
    return stages.sort();
  }, [movements]);

  // Extract unique actions for filter
  const actions = useMemo(() => {
    const uniqueActions = Array.from(new Set(movements.map(m => m.action)));
    return uniqueActions.sort();
  }, [movements]);

  // Filter movements based on search term and selected filters
  const filteredMovements = useMemo(() => {
    return movements.filter(movement => {
      // Search term filter
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearch = 
        !searchTerm || 
        movement.licensePlate.toLowerCase().includes(searchTermLower) ||
        movement.vin.toLowerCase().includes(searchTermLower) ||
        movement.contractNumber.toLowerCase().includes(searchTermLower) ||
        movement.comment.toLowerCase().includes(searchTermLower) ||
        (movement.executedBy && movement.executedBy.toLowerCase().includes(searchTermLower));
      
      // Stage filters
      const matchesSourceStage = !sourceStageFilter || movement.sourceStage === sourceStageFilter;
      const matchesTargetStage = !targetStageFilter || movement.targetStage === targetStageFilter;
      
      // Action filter
      const matchesAction = !actionFilter || movement.action === actionFilter;
      
      return matchesSearch && matchesSourceStage && matchesTargetStage && matchesAction;
    });
  }, [movements, searchTerm, sourceStageFilter, targetStageFilter, actionFilter]);

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Search license plate, VIN, contract, executed by..."
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
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
              <FilterListIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                Filters:
              </Typography>
            </Box>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Source Stage</InputLabel>
              <Select
                value={sourceStageFilter || ""}
                label="Source Stage"
                onChange={(e) => setSourceStageFilter(e.target.value || null)}
              >
                <MenuItem value="">All Source Stages</MenuItem>
                {sourceStages.map(stage => (
                  <MenuItem key={stage} value={stage}>{stage}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Target Stage</InputLabel>
              <Select
                value={targetStageFilter || ""}
                label="Target Stage"
                onChange={(e) => setTargetStageFilter(e.target.value || null)}
              >
                <MenuItem value="">All Target Stages</MenuItem>
                {targetStages.map(stage => (
                  <MenuItem key={stage} value={stage}>{stage}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Action</InputLabel>
              <Select
                value={actionFilter || ""}
                label="Action"
                onChange={(e) => setActionFilter(e.target.value || null)}
              >
                <MenuItem value="">All Actions</MenuItem>
                {actions.map(action => (
                  <MenuItem key={action} value={action}>{action}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>License Plate</TableCell>
              <TableCell>VIN</TableCell>
              <TableCell>Contract Number</TableCell>
              <TableCell>Source Stage</TableCell>
              <TableCell>Target Stage</TableCell>
              <TableCell>Date of Movement</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Execution Date</TableCell>
              <TableCell>Executed By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMovements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center" sx={{ py: 3 }}>
                  No vehicle movements found
                </TableCell>
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
                  <TableCell>{getActionChip(movement.action)}</TableCell>
                  <TableCell 
                    sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    title={movement.comment}
                  >
                    {movement.comment}
                  </TableCell>
                  <TableCell>{movement.executionDate ? formatDate(movement.executionDate) : 'N/A'}</TableCell>
                  <TableCell>{movement.executedBy || 'N/A'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default VehicleMovementList;
