
import { VehicleFormData, VehicleMovement } from "@/types/vehicle";

// Mock data for demonstration
const mockData: VehicleMovement[] = [
  {
    id: "1",
    licensePlate: "YXXY",
    vin: "HSJKSJKJSKJXKS",
    contractNumber: "83992029",
    sourceStage: "Inspection",
    targetStage: "Expertise",
    dateOfMovement: "2025-02-15",
    action: "Create",
    comment: "Moving based on Jane's need",
    executionDate: "2025-02-15T10:30:00Z",
    executedBy: "jane.doe@example.com"
  },
  {
    id: "2",
    licensePlate: "PEOKO",
    vin: "JNKSKNKNNKMK",
    contractNumber: "879200",
    sourceStage: "Check in at Storage",
    targetStage: "Expertise",
    dateOfMovement: "2025-02-16",
    action: "Create",
    comment: "Moving based on John's need",
    executionDate: "2025-02-16T09:15:00Z",
    executedBy: "john.smith@example.com"
  },
  {
    id: "3",
    licensePlate: "PEOKO",
    vin: "JNKSKNKNNKMK",
    contractNumber: "879200",
    sourceStage: "Check in at Storage",
    targetStage: "Expertise",
    dateOfMovement: "2025-02-18",
    action: "Update",
    comment: "Moving based on Jake's need",
    executionDate: "2025-02-18T14:45:00Z",
    executedBy: "jake.brown@example.com"
  },
  {
    id: "4",
    licensePlate: "ABCBD",
    vin: "JNKSKNKNNKMK",
    contractNumber: "879200",
    sourceStage: "Check in at Storage",
    targetStage: "Expertise",
    dateOfMovement: "2025-02-17",
    action: "Delete",
    comment: "Erroneously Added the earlier override",
    executionDate: "2025-02-17T16:20:00Z",
    executedBy: "admin@example.com"
  }
];

// In-memory store for our data
let vehicleMovements = [...mockData];

export const getVehicleMovements = (): VehicleMovement[] => {
  return vehicleMovements;
};

export const addVehicleMovement = (movement: VehicleFormData): VehicleMovement => {
  const newMovement: VehicleMovement = {
    ...movement,
    id: Date.now().toString(),
    executionDate: new Date().toISOString(),
    executedBy: "current.user@example.com" // In a real app, this would come from auth
  };
  
  vehicleMovements = [newMovement, ...vehicleMovements];
  return newMovement;
};

export const addBulkVehicleMovements = (movements: VehicleMovement[]): VehicleMovement[] => {
  const newMovements = movements.map(movement => ({
    ...movement,
    id: Date.now() + Math.random().toString(36).substr(2, 9),
    executionDate: new Date().toISOString(),
    executedBy: "current.user@example.com" // In a real app, this would come from auth
  }));
  
  vehicleMovements = [...newMovements, ...vehicleMovements];
  return newMovements;
};
