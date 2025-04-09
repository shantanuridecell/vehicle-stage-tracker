
import React, { useState, useMemo } from "react";
import { VehicleMovement } from "@/types/vehicle";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
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
      return new Date(dateString).toLocaleString();
    } catch (e) {
      return dateString;
    }
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case "Create":
        return <Badge className="bg-green-500 hover:bg-green-600">{action}</Badge>;
      case "Update":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{action}</Badge>;
      case "Delete":
        return <Badge className="bg-red-500 hover:bg-red-600">{action}</Badge>;
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
    return [...new Set(movements.map(m => m.sourceStage))].filter(Boolean);
  }, [movements]);

  const targetStages = useMemo(() => {
    return [...new Set(movements.map(m => m.targetStage))].filter(Boolean);
  }, [movements]);

  const actions = useMemo(() => {
    return [...new Set(movements.map(m => m.action))].filter(Boolean);
  }, [movements]);

  // Apply filters
  const filteredMovements = useMemo(() => {
    return movements.filter(movement => {
      const matchesSearch = searchTerm
        ? (
            movement.licensePlate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            movement.vin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            movement.contractNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            movement.comment?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : true;

      const matchesSourceStage = sourceStageFilter ? movement.sourceStage === sourceStageFilter : true;
      const matchesTargetStage = targetStageFilter ? movement.targetStage === targetStageFilter : true;
      const matchesAction = actionFilter ? movement.action === actionFilter : true;

      return matchesSearch && matchesSourceStage && matchesTargetStage && matchesAction;
    });
  }, [movements, searchTerm, sourceStageFilter, targetStageFilter, actionFilter]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative md:w-1/3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by plate, VIN, or contract..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        <div className="flex flex-1 gap-2">
          <Select value={sourceStageFilter || ""} onValueChange={setSourceStageFilter}>
            <SelectTrigger className="w-full">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Source stage" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All source stages</SelectItem>
              {sourceStages.map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={targetStageFilter || ""} onValueChange={setTargetStageFilter}>
            <SelectTrigger className="w-full">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Target stage" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All target stages</SelectItem>
              {targetStages.map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={actionFilter || ""} onValueChange={setActionFilter}>
            <SelectTrigger className="w-full">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Action" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All actions</SelectItem>
              {actions.map((action) => (
                <SelectItem key={action} value={action}>
                  {action}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>License Plate</TableHead>
              <TableHead>VIN</TableHead>
              <TableHead>Contract №</TableHead>
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
                  <TableCell className="max-w-[200px] truncate" title={movement.comment}>
                    {movement.comment}
                  </TableCell>
                  <TableCell>{movement.executionDate ? formatDate(movement.executionDate) : 'N/A'}</TableCell>
                  <TableCell>{movement.executedBy || 'N/A'}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 bg-blue-100 hover:bg-blue-200 border border-blue-300"
                            onClick={() => handleShowSupplierData(movement)}
                          >
                            <Info className="h-5 w-5 text-blue-700" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          View supplier data
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showSupplierDialog} onOpenChange={setShowSupplierDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Supplier Information</DialogTitle>
          </DialogHeader>
          
          {selectedVehicle && supplierData && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 border-b pb-4">
                <p>
                  <strong>License Plate:</strong> {selectedVehicle.licensePlate}
                </p>
                <p>
                  <strong>VIN:</strong> {selectedVehicle.vin}
                </p>
                <p>
                  <strong>Contract Number:</strong> {selectedVehicle.contractNumber}
                </p>
                <p>
                  <strong>Current Stage:</strong> {selectedVehicle.targetStage}
                </p>
              </div>
              
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
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setShowSupplierDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VehicleMovementList;
