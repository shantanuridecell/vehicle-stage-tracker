
/**
 * @typedef {Object} VehicleMovement
 * @property {string} [id]
 * @property {string} licensePlate
 * @property {string} vin
 * @property {string} contractNumber
 * @property {string} sourceStage
 * @property {string} targetStage
 * @property {string} dateOfMovement - ISO date string
 * @property {('Create'|'Update'|'Delete')} action
 * @property {string} comment
 * @property {string} [executionDate] - ISO date string
 * @property {string} [executedBy]
 * @property {Object} [supplierData]
 */

/**
 * @typedef {Object} VehicleFormData
 * @property {string} licensePlate
 * @property {string} vin
 * @property {string} contractNumber
 * @property {string} sourceStage
 * @property {string} targetStage
 * @property {string} dateOfMovement - ISO date string
 * @property {('Create'|'Update'|'Delete')} action
 * @property {string} comment
 * @property {Object} [supplierData]
 */

/**
 * @typedef {Object} CSVData
 * @property {string} 'License Plate'
 * @property {string} 'VIN'
 * @property {string} 'Contract number'
 * @property {string} 'Source Stage'
 * @property {string} 'Target Stage'
 * @property {string} 'Date of movement'
 * @property {string} 'Action'
 * @property {string} 'Comment'
 */

/**
 * @typedef {Object} Supplier1Data
 * @property {string} [firstRegistrationDate]
 * @property {string} [co2]
 * @property {string} [createdDate]
 * @property {string} [modifiedDate]
 * @property {string} [fileType]
 * @property {string} [subType]
 * @property {string} [clientAvailableStartDate]
 * @property {string} [transportDoor]
 * @property {string} [receptionDate]
 * @property {string} [planningDate]
 * @property {string} [dateCMR]
 * @property {string} [inspectionDate]
 * @property {string} [blockingType]
 * @property {string} [parkingLocation]
 * @property {string} [parkingPlace]
 * @property {string} [administrationStatus]
 * @property {string} [administrationStatusDate]
 * @property {string} [insuranceStatus]
 * @property {string} [insuranceStatusDate]
 * @property {string} [remarkLOG]
 * @property {string} [contractFileNumber]
 * @property {string} [startDate]
 * @property {string} [endDate]
 * @property {string} [origin]
 * @property {string} [client]
 * @property {string} [logisticStatus]
 * @property {string} [logisticStatusDate]
 * @property {string} [pickUpDate]
 * @property {string} [completedDate]
 * @property {string} [readyForSaleDate]
 * @property {string} [oldOpdrachtId]
 * @property {string} [dossierNumber]
 * @property {string} [remarketingStatus]
 * @property {string} [remarketingStatusDate]
 * @property {string} [remarketingDate]
 * @property {string} [releaseDate]
 * @property {string} [dateOfAvailable]
 * @property {string} [dateOfDeletion]
 * @property {string} [assignDate]
 * @property {string} [performedOnDate]
 * @property {string} [dateSent]
 */

/**
 * @typedef {Object} Supplier2Data
 * @property {string} [status]
 * @property {string} [km]
 * @property {string} [herkomst]
 * @property {string} [make]
 * @property {string} [type]
 * @property {string} [model]
 * @property {string} [color]
 * @property {string} [location]
 * @property {string} [adress]
 * @property {string} [firstGateIn]
 * @property {string} [gateIn]
 * @property {string} [gateOut]
 */

/**
 * @typedef {Object} Supplier3Data
 * @property {string} [status]
 * @property {string} [type]
 * @property {string} [sub_type]
 * @property {string} [loading_time]
 * @property {string} [unloading_time]
 * @property {string} [status_date]
 * @property {string} [created_at]
 * @property {string} [updated_at]
 */

/**
 * @typedef {Object} Supplier4Data
 * @property {string} [inspectionDossierId]
 * @property {string} [inspectionStatus]
 * @property {string} [inspectionDate]
 * @property {string} [model]
 * @property {string} [logDate]
 * @property {string} [version]
 * @property {string} [progressDirection]
 * @property {string} [originalStatus]
 * @property {string} [progressStatus]
 * @property {string} [inspectionMileage]
 * @property {string} [locationAddress]
 * @property {string} [parkingSpace]
 */

/**
 * @typedef {Object} SupplierData
 * @property {Supplier1Data} [supplier1]
 * @property {Supplier2Data} [supplier2]
 * @property {Supplier3Data} [supplier3]
 * @property {Supplier4Data} [supplier4]
 */

export const supplierFields = {
  supplier1: [
    'firstRegistrationDate', 'co2', 'createdDate', 'modifiedDate', 'fileType',
    'subType', 'clientAvailableStartDate', 'transportDoor', 'receptionDate',
    'planningDate', 'dateCMR', 'inspectionDate', 'blockingType',
    'parkingLocation', 'parkingPlace', 'administrationStatus',
    'administrationStatusDate', 'insuranceStatus', 'insuranceStatusDate',
    'remarkLOG', 'contractFileNumber', 'startDate', 'endDate', 'origin',
    'client', 'logisticStatus', 'logisticStatusDate', 'origin',
    'pickUpDate', 'completedDate', 'readyForSaleDate', 'oldOpdrachtId',
    'dossierNumber', 'remarketingStatus', 'remarketingStatusDate',
    'remarketingDate', 'releaseDate', 'dateOfAvailable', 'dateOfDeletion',
    'assignDate', 'performedOnDate', 'dateSent'
  ],
  supplier2: [
    'status', 'km', 'herkomst', 'make', 'type', 'model', 'color',
    'location', 'adress', 'firstGateIn', 'gateIn', 'gateOut'
  ],
  supplier3: [
    'status', 'type', 'sub_type', 'loading_time', 'unloading_time',
    'status_date', 'created_at', 'updated_at'
  ],
  supplier4: [
    'inspectionDossierId', 'inspectionStatus', 'inspectionDate',
    'model', 'logDate', 'version', 'progressDirection',
    'originalStatus', 'progressStatus', 'inspectionMileage',
    'locationAddress', 'parkingSpace'
  ]
};

