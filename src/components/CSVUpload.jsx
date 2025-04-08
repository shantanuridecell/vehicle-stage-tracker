
import React, { useState } from "react";
import { Button, Box, Typography, CircularProgress } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { parseCSV } from "../utils/csv-parser";

const CSVUpload = ({ onUpload }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const parsedData = await parseCSV(file);
      onUpload(parsedData);
    } catch (error) {
      console.error("Error parsing CSV file:", error);
      // In a real app, you'd show an error toast/alert here
    } finally {
      setIsLoading(false);
      // Reset the file input
      event.target.value = null;
    }
  };

  return (
    <Box>
      <input
        accept=".csv"
        style={{ display: 'none' }}
        id="csv-file-upload"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="csv-file-upload">
        <Button
          variant="contained"
          component="span"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : <UploadFileIcon />}
        >
          {isLoading ? 'Uploading...' : 'Upload CSV'}
        </Button>
      </label>
      <Typography variant="caption" display="block" sx={{ mt: 1 }}>
        Upload a CSV file with vehicle movement data
      </Typography>
    </Box>
  );
};

export default CSVUpload;
