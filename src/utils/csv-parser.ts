
import { CSVData, VehicleMovement } from "@/types/vehicle";

export const parseCSVFile = (file: File): Promise<VehicleMovement[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const csvString = event.target?.result as string;
        if (!csvString) {
          reject(new Error("Failed to read CSV file"));
          return;
        }

        // Split the CSV into rows
        const rows = csvString.split('\n');
        if (rows.length <= 1) {
          reject(new Error("CSV file is empty or invalid"));
          return;
        }

        // Get the header row and clean it
        const headers = rows[0].split(',').map(header => header.trim());

        // Process data rows
        const data: VehicleMovement[] = [];
        for (let i = 1; i < rows.length; i++) {
          // Skip empty rows
          if (!rows[i].trim()) continue;
          
          const values = rows[i].split(',').map(value => value.trim());
          
          // Create object using headers as keys
          const rowObject: Record<string, string> = {};
          headers.forEach((header, index) => {
            rowObject[header] = values[index] || '';
          });

          // Map CSV data to VehicleMovement
          const movement: VehicleMovement = {
            licensePlate: rowObject['License Plate'] || '',
            vin: rowObject['VIN'] || '',
            contractNumber: rowObject['Contract number'] || '',
            sourceStage: rowObject['Source Stage'] || '',
            targetStage: rowObject['Target Stage'] || '',
            dateOfMovement: rowObject['Date of movement'] || '',
            action: rowObject['Action'] as 'Create' | 'Update' | 'Delete',
            comment: rowObject['Comment'] || '',
            executionDate: new Date().toISOString(),
            executedBy: 'current.user@example.com' // In a real app, this would come from auth
          };

          data.push(movement);
        }

        resolve(data);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading CSV file"));
    };

    reader.readAsText(file);
  });
};
