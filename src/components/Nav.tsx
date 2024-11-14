// src/components/Nav.tsx
import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";

interface NavProps {
  campaignId: string | null;
}

const Nav: React.FC<NavProps> = ({ campaignId }) => {
  const [isMobile, setIsMobile] = useState(false);
  const username = "Username";

  const handleLogout = () => {
    alert("logout!");
    console.log("id: ", campaignId);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full bg-gray-100 p-4 flex justify-between items-center shadow-md">
      {!isMobile && (
        <div className="flex space-x-4 md:space-x-8">
          <div className="flex flex-col bg-gray-300 rounded-lg p-2 text-base font-semibold">
            Quantidade Total(kg) <span className="font-bold">770</span>
          </div>
          <div className="flex flex-col bg-gray-300 rounded-lg p-2 text-base font-semibold">
            Quantidade Volumes <span className="font-bold">550</span>
          </div>
        </div>
      )}
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold">Campanha Teste</h2>
      </div>
      <div className="flex items-center space-x-4">
        {!isMobile && <span className="text-lg font-semibold">{username}</span>}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-1 bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700"
        >
          <FiLogOut />
          {!isMobile && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Nav;
