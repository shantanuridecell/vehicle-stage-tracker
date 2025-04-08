
import React from "react";
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

interface VehicleMovementListProps {
  movements: VehicleMovement[];
}

const VehicleMovementList: React.FC<VehicleMovementListProps> = ({ movements }) => {
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

  return (
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {movements.length === 0 ? (
            <TableRow>
              <TableCell colSpan={10} className="text-center py-4">
                No vehicle movements found
              </TableCell>
            </TableRow>
          ) : (
            movements.map((movement) => (
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
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default VehicleMovementList;
