
export interface VehicleMovement {
  id?: string;
  licensePlate: string;
  vin: string;
  contractNumber: string;
  sourceStage: string;
  targetStage: string;
  dateOfMovement: string; // ISO date string
  action: 'Create' | 'Update' | 'Delete';
  comment: string;
  executionDate?: string; // ISO date string
  executedBy?: string;
}

export type VehicleFormData = Omit<VehicleMovement, 'executionDate' | 'executedBy'>;

export interface CSVData {
  'License Plate': string;
  'VIN': string;
  'Contract number': string;
  'Source Stage': string;
  'Target Stage': string;
  'Date of movement': string;
  'Action': string;
  'Comment': string;
}
