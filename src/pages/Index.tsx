
import React, { useState } from "react";
import Header from "@/components/Header";
import VehicleMovementList from "@/components/VehicleMovementList";
import VehicleMovementForm from "@/components/VehicleMovementForm";
import CSVUpload from "@/components/CSVUpload";
import { VehicleFormData, VehicleMovement } from "@/types/vehicle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getVehicleMovements, addVehicleMovement, addBulkVehicleMovements } from "@/services/vehicle-service";

const Index = () => {
  const [movements, setMovements] = useState<VehicleMovement[]>(getVehicleMovements());

  const handleAddMovement = (formData: VehicleFormData) => {
    const newMovement = addVehicleMovement(formData);
    setMovements([newMovement, ...movements]);
  };

  const handleCSVUpload = (data: VehicleMovement[]) => {
    const newMovements = addBulkVehicleMovements(data);
    setMovements([...newMovements, ...movements]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto p-4 mt-4">
        <Tabs defaultValue="list">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="list">Vehicle Movements</TabsTrigger>
            <TabsTrigger value="add">Add Movement</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Movement History</CardTitle>
                <CardDescription>
                  Track all vehicle movements between stages
                </CardDescription>
                <div className="mt-4">
                  <CSVUpload onUpload={handleCSVUpload} />
                </div>
              </CardHeader>
              <CardContent>
                <VehicleMovementList movements={movements} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="add" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Add Vehicle Movement</CardTitle>
                <CardDescription>
                  Move a vehicle from one stage to another
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VehicleMovementForm onSubmit={handleAddMovement} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
