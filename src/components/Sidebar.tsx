// src/components/Sidebar.tsx
import { BiBarcodeReader } from "react-icons/bi";
import { FaBoxOpen } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface NavProps {
  campaignId: string | null;
}

const Sidebar: React.FC<NavProps> = ({ campaignId }) => {
  const navigate = useNavigate();

  const handleNavigate = (route: string) => {
    navigate(route, { state: { campaignId } });
  };

  return (
    <div className="w-20 bg-gray-100 h-screen flex flex-col items-center py-4 space-y-8 shadow-md">
      <MdDashboard
        size={28}
        className="text-indigo-600 cursor-pointer"
        title="Dashboard"
        onClick={() => handleNavigate("/")}
      />
      <FaBoxOpen
        size={28}
        className="text-gray-500 cursor-pointer"
        title="Cadastro Manual"
        onClick={() => handleNavigate("/product-create")}
      />
      <BiBarcodeReader
        size={28}
        className="text-gray-500 cursor-pointer"
        title="Cadastro Automático"
        onClick={() => handleNavigate("/product-scan")}
      />
    </div>
  );
};

export default Sidebar;
