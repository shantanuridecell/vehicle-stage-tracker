
import { v4 as uuidv4 } from 'uuid';

// In-memory storage for vehicle movements
let vehicleMovements = [];

/**
 * Get all vehicle movements
 * @returns {Array} Array of vehicle movements
 */
export const getVehicleMovements = () => {
  return vehicleMovements;
};

/**
 * Add a new vehicle movement
 * @param {Object} formData - Form data for the vehicle movement
 * @returns {Object} The newly added vehicle movement
 */
export const addVehicleMovement = (formData) => {
  const newMovement = {
    id: uuidv4(),
    ...formData,
    executionDate: new Date().toISOString(),
    executedBy: "System",
  };
  
  vehicleMovements.unshift(newMovement);
  return newMovement;
};

/**
 * Add bulk vehicle movements from CSV data
 * @param {Array} csvData - Array of vehicle movement data from CSV
 * @returns {Array} Array of newly added vehicle movements
 */
export const addBulkVehicleMovements = (csvData) => {
  const newMovements = csvData.map(data => ({
    id: uuidv4(),
    licensePlate: data['License Plate'],
    vin: data['VIN'],
    contractNumber: data['Contract number'],
    sourceStage: data['Source Stage'],
    targetStage: data['Target Stage'],
    dateOfMovement: data['Date of movement'],
    action: data['Action'],
    comment: data['Comment'],
    executionDate: new Date().toISOString(),
    executedBy: "Import",
  }));
  
  vehicleMovements = [...newMovements, ...vehicleMovements];
  return newMovements;
};

/**
 * Get sample data for the suppliers
 * @param {string} vin - Vehicle identification number
 * @returns {Object} Supplier data for the vehicle
 */
export const getSampleSupplierData = (vin) => {
  // This is a mock function that would be replaced with real API calls in production
  return {
    supplier1: {
      firstRegistrationDate: "2023-01-15",
      co2: "95g/km",
      createdDate: "2023-01-01",
      fileType: "Regular",
      subType: "Sedan",
      blockingType: "None",
      parkingLocation: "Zone A",
      parkingPlace: "A-15",
      administrationStatus: "Complete",
      insuranceStatus: "Active",
      contractFileNumber: "CF-2023-001",
      client: "Premium Motors",
      logisticStatus: "In Transit",
      origin: "Factory",
      dossierNumber: "D-2023-005",
      remarketingStatus: "Ready"
    },
    supplier2: {
      status: "Available",
      km: "15000",
      herkomst: "Netherlands",
      make: "Toyota",
      type: "Passenger",
      model: "Corolla",
      color: "Silver",
      location: "Amsterdam",
      adress: "Warehouse 7, Industrial Zone",
      firstGateIn: "2023-02-10",
      gateIn: "2023-03-05",
      gateOut: "2023-03-25"
    },
    supplier3: {
      status: "processed",
      type: "import",
      sub_type: "regular",
      loading_time: "2023-03-10T08:30:00",
      unloading_time: "2023-03-10T12:15:00",
      status_date: "2023-03-10",
      created_at: "2023-03-01",
      updated_at: "2023-03-15"
    },
    supplier4: {
      inspectionDossierId: "INS-2023-042",
      inspectionStatus: "Passed",
      inspectionDate: "2023-03-20",
      model: "Corolla SE",
      logDate: "2023-03-21",
      version: "1.2",
      progressDirection: "Forward",
      originalStatus: "New",
      progressStatus: "Ready",
      inspectionMileage: "15200",
      locationAddress: "Quality Inspection Center, Rotterdam",
      parkingSpace: "QIC-56"
    }
  };
};

/**
 * Add supplier data to a vehicle
 * @param {string} id - Vehicle movement ID
 * @param {Object} supplierData - Supplier data to add
 * @returns {Object} Updated vehicle movement
 */
export const addSupplierData = (id, supplierData) => {
  const index = vehicleMovements.findIndex(movement => movement.id === id);
  
  if (index !== -1) {
    vehicleMovements[index] = {
      ...vehicleMovements[index],
      supplierData: {
        ...vehicleMovements[index].supplierData,
        ...supplierData
      }
    };
    return vehicleMovements[index];
  }
  
  return null;
};
