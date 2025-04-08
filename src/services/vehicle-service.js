
// In-memory storage for vehicle movements
let vehicleMovements = [
  {
    id: "1",
    licensePlate: "ABC123",
    vin: "1HGCM82633A004352",
    contractNumber: "CONT-001",
    sourceStage: "Inspection",
    targetStage: "Maintenance",
    dateOfMovement: "2025-04-01",
    action: "Create",
    comment: "Initial vehicle registration",
    executionDate: "2025-04-02",
    executedBy: "john.doe@example.com"
  },
  {
    id: "2",
    licensePlate: "XYZ789",
    vin: "5YJSA1E40FF000001",
    contractNumber: "CONT-002",
    sourceStage: "Maintenance",
    targetStage: "Ready for Sale",
    dateOfMovement: "2025-04-03",
    action: "Update",
    comment: "Vehicle repaired and ready for sale",
    executionDate: "2025-04-04",
    executedBy: "jane.smith@example.com"
  },
  {
    id: "3",
    licensePlate: "DEF456",
    vin: "WBADT43483G473520",
    contractNumber: "CONT-003",
    sourceStage: "Ready for Sale",
    targetStage: "Sold",
    dateOfMovement: "2025-04-05",
    action: "Delete",
    comment: "Vehicle sold to customer",
    executionDate: "2025-04-06",
    executedBy: "mike.wilson@example.com"
  }
];

/**
 * Get all vehicle movements
 * @returns {Array} Vehicle movements
 */
export const getVehicleMovements = () => {
  return vehicleMovements;
};

/**
 * Add a new vehicle movement
 * @param {Object} vehicleFormData - Vehicle form data
 * @returns {Object} New vehicle movement
 */
export const addVehicleMovement = (vehicleFormData) => {
  const newMovement = {
    id: Date.now().toString(),
    ...vehicleFormData,
    executionDate: new Date().toISOString().split("T")[0],
    executedBy: "current.user@example.com", // In a real app, this would come from authentication
  };
  
  vehicleMovements = [newMovement, ...vehicleMovements];
  return newMovement;
};

/**
 * Add multiple vehicle movements from CSV
 * @param {Array} movements - Array of vehicle movements
 * @returns {Array} Added vehicle movements
 */
export const addBulkVehicleMovements = (movements) => {
  const newMovements = movements.map((movement) => ({
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    ...movement,
    executionDate: new Date().toISOString().split("T")[0],
    executedBy: "csv.import@example.com", // In a real app, this would come from authentication
  }));
  
  vehicleMovements = [...newMovements, ...vehicleMovements];
  return newMovements;
};
