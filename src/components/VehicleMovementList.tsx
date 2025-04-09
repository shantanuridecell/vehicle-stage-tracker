
import React, { useState, useMemo } from "react";
import { VehicleMovement } from "@/types/vehicle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { getSampleSupplierData } from "@/services/vehicle-service";

interface VehicleMovementListProps {
  movements: VehicleMovement[];
}

const VehicleMovementList: React.FC<VehicleMovementListProps> = ({ movements }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceStageFilter, setSourceStageFilter] = useState<string | null>(null);
  const [targetStageFilter, setTargetStageFilter] = useState<string | null>(null);
  const [actionFilter, setActionFilter] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleMovement | null>(null);
  const [supplierData, setSupplierData] = useState<any>(null);
  const [showSupplierDialog, setShowSupplierDialog] = useState(false);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd-MMM-yyyy");
    } catch (e) {
      return dateString;
    }
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'Create':
        return <Badge className="bg-green-500">Create</Badge>;
      case 'Update':
        return <Badge className="bg-blue-500">Update</Badge>;
      case 'Delete':
        return <Badge className="bg-red-500">Delete</Badge>;
      default:
        return <Badge>{action}</Badge>;
    }
  };

  const handleShowSupplierData = (movement: VehicleMovement) => {
    setSelectedVehicle(movement);
    // In a real app, this would fetch data from API based on the VIN
    setSupplierData(getSampleSupplierData(movement.vin));
    setShowSupplierDialog(true);
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
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search license plate, VIN, contract, executed by..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">Filters:</span>
            </div>
          </div>
          <div className="w-full sm:w-40">
            <Select
              onValueChange={(value) => setSourceStageFilter(value === "all" ? null : value)}
              value={sourceStageFilter || "all"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Source Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Source Stages</SelectItem>
                {sourceStages.map(stage => (
                  <SelectItem key={stage} value={stage}>
                    {stage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-40">
            <Select
              onValueChange={(value) => setTargetStageFilter(value === "all" ? null : value)}
              value={targetStageFilter || "all"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Target Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Target Stages</SelectItem>
                {targetStages.map(stage => (
                  <SelectItem key={stage} value={stage}>
                    {stage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-40">
            <Select
              onValueChange={(value) => setActionFilter(value === "all" ? null : value)}
              value={actionFilter || "all"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                {actions.map(action => (
                  <SelectItem key={action} value={action}>
                    {action}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>License Plate</TableHead>
              <TableHead>VIN</TableHead>
              <TableHead>Contract Number</TableHead>
              <TableHead>Source Stage</TableHead>
              <TableHead>Target Stage</TableHead>
              <TableHead>Date of Movement</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Execution Date</TableHead>
              <TableHead>Executed By</TableHead>
              <TableHead>Info</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMovements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-4">
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
                  <TableCell>{getActionBadge(movement.action)}</TableCell>
                  <TableCell className="max-w-xs truncate" title={movement.comment}>
                    {movement.comment}
                  </TableCell>
                  <TableCell>{movement.executionDate ? formatDate(movement.executionDate) : 'N/A'}</TableCell>
                  <TableCell>{movement.executedBy || 'N/A'}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleShowSupplierData(movement)}
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {showSupplierDialog && selectedVehicle && supplierData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Supplier Information</h2>
            <p className="mb-2">
              <strong>License Plate:</strong> {selectedVehicle.licensePlate}
            </p>
            <p className="mb-4">
              <strong>VIN:</strong> {selectedVehicle.vin}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(supplierData).map(supplier => (
                <div key={supplier} className="border rounded-md p-4">
                  <h3 className="font-semibold capitalize mb-2">{supplier.replace(/([A-Z])/g, ' $1').trim()}</h3>
                  <dl>
                    {Object.entries(supplierData[supplier]).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 gap-2 mb-2">
                        <dt className="text-sm text-gray-600">
                          {key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim()}:
                        </dt>
                        <dd className="text-sm">{String(value)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setShowSupplierDialog(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleMovementList;
