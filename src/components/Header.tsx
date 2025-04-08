
import React from "react";
import { Car } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white p-4 flex items-center justify-center">
      <div className="container flex items-center justify-center gap-2">
        <Car size={24} />
        <h1 className="text-xl font-bold">Vehicle Stage Tracker</h1>
      </div>
    </header>
  );
};

export default Header;
