
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Button, 
  TextField, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Box,
  FormHelperText,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Tabs,
  Tab
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { supplierFields } from '../types/vehicle';

// Add date picker dependency
<lov-add-dependency>@mui/x-date-pickers@latest</lov-add-dependency>

const formSchema = z.object({
  licensePlate: z.string().min(1, "License plate is required"),
  vin: z.string().min(1, "VIN is required"),
  contractNumber: z.string().min(1, "Contract number is required"),
  sourceStage: z.string().min(1, "Source stage is required"),
  targetStage: z.string().min(1, "Target stage is required"),
  dateOfMovement: z.date({
    required_error: "Date of movement is required",
  }),
  action: z.enum(["Create", "Update", "Delete"], {
    required_error: "Action is required",
  }),
  comment: z.string().optional(),
});

// Sample stages for the dropdowns
const stages = [
  "Inspection",
  "Expertise",
  "Check in at Storage",
  "Maintenance",
  "Ready for Sale",
  "Sold",
  "Delivery",
];

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`supplier-form-tabpanel-${index}`}
      aria-labelledby={`supplier-form-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const VehicleMovementForm = ({ onSubmit }) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      action: "Create",
      comment: "",
    },
  });
  
  const [expanded, setExpanded] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [supplierData, setSupplierData] = useState({
    supplier1: {},
    supplier2: {},
    supplier3: {},
    supplier4: {}
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSupplierDataChange = (supplier, field, value) => {
    setSupplierData(prev => ({
      ...prev,
      [supplier]: {
        ...prev[supplier],
        [field]: value
      }
    }));
  };

  const onFormSubmit = (data) => {
    // Check if any supplier data has been entered
    const hasSupplierData = Object.values(supplierData).some(supplier => 
      Object.keys(supplier).length > 0
    );
    
    onSubmit({
      ...data,
      dateOfMovement: data.dateOfMovement.toISOString().split("T")[0],
      ...(hasSupplierData && { supplierData })
    });
    
    reset();
    setSupplierData({
      supplier1: {},
      supplier2: {},
      supplier3: {},
      supplier4: {}
    });
    setExpanded(false);
    setTabValue(0);
  };

  // Format field labels
  const formatFieldLabel = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1') // Insert a space before all capital letters
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/^\w/, c => c.toUpperCase()); // Uppercase first character
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={0} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="licensePlate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="License Plate"
                    placeholder="Enter license plate"
                    error={!!errors.licensePlate}
                    helperText={errors.licensePlate?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="vin"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="VIN"
                    placeholder="Enter VIN"
                    error={!!errors.vin}
                    helperText={errors.vin?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="contractNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Contract Number"
                    placeholder="Enter contract number"
                    error={!!errors.contractNumber}
                    helperText={errors.contractNumber?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="sourceStage"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.sourceStage}>
                    <InputLabel>Source Stage</InputLabel>
                    <Select
                      {...field}
                      label="Source Stage"
                      placeholder="Select source stage"
                    >
                      {stages.map((stage) => (
                        <MenuItem key={stage} value={stage}>
                          {stage}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.sourceStage && (
                      <FormHelperText>{errors.sourceStage.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="targetStage"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.targetStage}>
                    <InputLabel>Target Stage</InputLabel>
                    <Select
                      {...field}
                      label="Target Stage"
                      placeholder="Select target stage"
                    >
                      {stages.map((stage) => (
                        <MenuItem key={stage} value={stage}>
                          {stage}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.targetStage && (
                      <FormHelperText>{errors.targetStage.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="dateOfMovement"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Date of Movement"
                    value={field.value}
                    onChange={field.onChange}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.dateOfMovement,
                        helperText: errors.dateOfMovement?.message
                      }
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="action"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.action}>
                    <InputLabel>Action</InputLabel>
                    <Select
                      {...field}
                      label="Action"
                    >
                      <MenuItem value="Create">Create</MenuItem>
                      <MenuItem value="Update">Update</MenuItem>
                      <MenuItem value="Delete">Delete</MenuItem>
                    </Select>
                    {errors.action && (
                      <FormHelperText>{errors.action.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="comment"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    rows={4}
                    label="Comment"
                    placeholder="Enter comment"
                    error={!!errors.comment}
                    helperText={errors.comment?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Accordion 
                expanded={expanded} 
                onChange={() => setExpanded(!expanded)}
                sx={{ bgcolor: 'background.default' }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography>Add Supplier Data (Optional)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs value={tabValue} onChange={handleTabChange} aria-label="supplier data tabs">
                        <Tab label="Supplier 1" id="supplier-form-tab-0" />
                        <Tab label="Supplier 2" id="supplier-form-tab-1" />
                        <Tab label="Supplier 3" id="supplier-form-tab-2" />
                        <Tab label="Supplier 4" id="supplier-form-tab-3" />
                      </Tabs>
                    </Box>

                    {/* Supplier 1 */}
                    <TabPanel value={tabValue} index={0}>
                      <Grid container spacing={2}>
                        {supplierFields.supplier1.map((field) => (
                          <Grid item xs={12} md={6} lg={4} key={field}>
                            <TextField
                              fullWidth
                              size="small"
                              label={formatFieldLabel(field)}
                              value={supplierData.supplier1[field] || ""}
                              onChange={(e) => handleSupplierDataChange('supplier1', field, e.target.value)}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </TabPanel>

                    {/* Supplier 2 */}
                    <TabPanel value={tabValue} index={1}>
                      <Grid container spacing={2}>
                        {supplierFields.supplier2.map((field) => (
                          <Grid item xs={12} md={6} lg={4} key={field}>
                            <TextField
                              fullWidth
                              size="small"
                              label={formatFieldLabel(field)}
                              value={supplierData.supplier2[field] || ""}
                              onChange={(e) => handleSupplierDataChange('supplier2', field, e.target.value)}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </TabPanel>

                    {/* Supplier 3 */}
                    <TabPanel value={tabValue} index={2}>
                      <Grid container spacing={2}>
                        {supplierFields.supplier3.map((field) => (
                          <Grid item xs={12} md={6} lg={4} key={field}>
                            <TextField
                              fullWidth
                              size="small"
                              label={formatFieldLabel(field)}
                              value={supplierData.supplier3[field] || ""}
                              onChange={(e) => handleSupplierDataChange('supplier3', field, e.target.value)}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </TabPanel>

                    {/* Supplier 4 */}
                    <TabPanel value={tabValue} index={3}>
                      <Grid container spacing={2}>
                        {supplierFields.supplier4.map((field) => (
                          <Grid item xs={12} md={6} lg={4} key={field}>
                            <TextField
                              fullWidth
                              size="small"
                              label={formatFieldLabel(field)}
                              value={supplierData.supplier4[field] || ""}
                              onChange={(e) => handleSupplierDataChange('supplier4', field, e.target.value)}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </TabPanel>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth
                size="large"
              >
                Add Vehicle Movement
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </LocalizationProvider>
  );
};

export default VehicleMovementForm;
