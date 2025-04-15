
import React, { useState } from "react";
import Header from "@/components/Header";
import VehicleMovementList from "@/components/VehicleMovementList";
import VehicleMovementForm from "@/components/VehicleMovementForm";
import CSVUpload from "@/components/CSVUpload";
import { VehicleFormData, VehicleMovement } from "@/types/vehicle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getVehicleMovements, addVehicleMovement, addBulkVehicleMovements } from "@/services/vehicle-service";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";

const Index = () => {
  const [movements, setMovements] = useState<VehicleMovement[]>(getVehicleMovements());
  const [openDialog, setOpenDialog] = useState(false);
  const { toast } = useToast();

  const handleAddMovement = (formData: VehicleFormData) => {
    const newMovement = addVehicleMovement(formData);
    setMovements([newMovement, ...movements]);
    toast({
      title: "Success",
      description: "Vehicle movement added successfully",
    });
    setOpenDialog(false);
  };

  const handleCSVUpload = (data: VehicleMovement[]) => {
    const newMovements = addBulkVehicleMovements(data);
    setMovements([...newMovements, ...movements]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto p-4 mt-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Manual Vehicle Movement History</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <CSVUpload onUpload={handleCSVUpload} />
              <Button onClick={() => setOpenDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Movement
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <VehicleMovementList movements={movements} />
          </CardContent>
        </Card>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Add Vehicle Movement</DialogTitle>
            </DialogHeader>
            <VehicleMovementForm onSubmit={handleAddMovement} />
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Index;
