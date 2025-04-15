
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
  Paper
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

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

const VehicleMovementForm = ({ onSubmit }) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      action: "Create",
      comment: "",
    },
  });

  const onFormSubmit = (data) => {
    onSubmit({
      ...data,
      dateOfMovement: data.dateOfMovement.toISOString().split("T")[0]
    });
    
    reset();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={0} sx={{ p: 3, mt: 2 }}>
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
