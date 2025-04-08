
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { parseCSVFile } from "@/utils/csv-parser";
import { VehicleMovement } from "@/types/vehicle";
import { useToast } from "@/hooks/use-toast";

interface CSVUploadProps {
  onUpload: (data: VehicleMovement[]) => void;
}

const CSVUpload: React.FC<CSVUploadProps> = ({ onUpload }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if it's a CSV file
    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const data = await parseCSVFile(file);
      onUpload(data);
      toast({
        title: "Upload successful",
        description: `${data.length} vehicle movements imported`,
      });
      
      // Reset the file input
      e.target.value = '';
    } catch (error) {
      console.error("Error parsing CSV:", error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to parse CSV file",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        disabled={isLoading}
        className="max-w-sm"
        id="csv-upload"
      />
      <Button
        disabled={isLoading}
        variant="outline"
        onClick={() => document.getElementById("csv-upload")?.click()}
      >
        <Upload className="mr-2 h-4 w-4" />
        {isLoading ? "Processing..." : "Upload CSV"}
      </Button>
    </div>
  );
};

export default CSVUpload;
