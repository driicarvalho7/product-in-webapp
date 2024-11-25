import { BiBarcodeReader } from "react-icons/bi";
import { FaBoxOpen } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Campaign } from "../utils/interfaces/campaign";
import { useState } from "react";

interface NavProps {
  campaign: Campaign | null;
  menuSelect: number | null;
}

const Sidebar: React.FC<NavProps> = ({ campaign, menuSelect }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Responsividade

  const handleNavigate = (route: string) => {
    navigate(route, { state: { campaign } });
  };

  const handleLogout = () => {
    alert("Logout realizado!");
    navigate("/auth");
  };

  return (
    <>
      {/* Botão para abrir/fechar no mobile */}
      <button
        className="md:hidden p-4 text-gray-500 hover:text-indigo-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MdDashboard size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:block fixed md:static bg-gray-100 h-screen w-64 shadow-md z-50`}
      >
        <div className="flex flex-col h-full">
          {/* Navegação */}
          <div className="flex-1 py-4 space-y-6">
            <div
              className={`flex items-center px-4 py-2 cursor-pointer ${
                menuSelect === 1 ? "bg-indigo-600 text-white" : "text-gray-500"
              } hover:bg-indigo-100`}
              onClick={() => handleNavigate("/")}
            >
              <MdDashboard size={24} />
              <span className="ml-4 text-sm font-medium">Dashboard</span>
            </div>
            <div
              className={`flex items-center px-4 py-2 cursor-pointer ${
                menuSelect === 2 ? "bg-indigo-600 text-white" : "text-gray-500"
              } hover:bg-indigo-100`}
              onClick={() => handleNavigate("/product-list")}
            >
              <FaBoxOpen size={24} />
              <span className="ml-4 text-sm font-medium">Produtos</span>
            </div>
            <div
              className={`flex items-center px-4 py-2 cursor-pointer ${
                menuSelect === 3 ? "bg-indigo-600 text-white" : "text-gray-500"
              } hover:bg-indigo-100`}
              onClick={() => handleNavigate("/product-scan")}
            >
              <BiBarcodeReader size={24} />
              <span className="ml-4 text-sm font-medium">Scanear Produto</span>
            </div>
          </div>

          {/* Logout */}
          <div
            className="flex items-center px-4 py-2 text-gray-500 hover:text-red-600 cursor-pointer"
            onClick={handleLogout}
          >
            <FiLogOut size={24} />
            <span className="ml-4 text-sm font-medium">Sair</span>
          </div>
        </div>
      </div>

      {/* Overlay para fechar sidebar no mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
