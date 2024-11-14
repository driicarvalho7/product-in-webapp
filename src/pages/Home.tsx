// src/pages/Home.tsx
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Nav from "../components/Nav";
import { GrTableAdd } from "react-icons/gr";
import { RiFileExcel2Line } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import { FaBarcode } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const campaignId = location.state?.campaignId || "Campanha não selecionada";
  console.log("campaignId: ", campaignId);

  const handleNavigate = (route: string) => {
    navigate(route, { state: { campaignId } });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar campaignId={campaignId} />

      {/* Main Content */}
      <div className="flex flex-col w-full">
        {/* Nav */}
        <Nav campaignId={campaignId} />

        {/* Content */}
        <div className="flex-1 p-6 bg-gray-200 space-y-4">
          {/* Cadastro Manual e Automático */}
          <div className="flex justify-between space-x-4">
            <div className="flex-1 p-6 bg-gray-300 rounded-lg flex flex-col items-center">
              <h2 className="flex flex-row justify-evenly items-center text-xl font-semibold mb-4">
                Cadastro Manual
                <GrTableAdd className="ml-4" />
              </h2>
              <button
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                onClick={() => handleNavigate("/product-create")}
              >
                Cadastrar Produto
              </button>
            </div>
            <div className="flex-1 p-6 bg-gray-300 rounded-lg flex flex-col items-center">
              <h2 className="flex flex-row justify-evenly items-center text-xl font-semibold mb-4">
                Cadastro Automático
                <FaBarcode className="ml-4" />
              </h2>
              <button
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                onClick={() => handleNavigate("/product-scan")}
              >
                Escanear Produto
              </button>
            </div>
          </div>

          {/* Busca e Tabela de Produtos */}
          <div className="bg-gray-300 rounded-lg p-4">
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                placeholder="🔍 Pesquisar produto da campanha..."
                className="w-full px-4 py-2 rounded-md border focus:outline-none"
              />
              <button className="flex flex-row items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                <IoMdSearch />
                Buscar
              </button>
            </div>

            {/* Tabela de Produtos */}
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg">
                <thead>
                  <tr className="text-left border-b">
                    <th className="p-4">Produto</th>
                    <th className="p-4">Quantidade (kg)</th>
                    <th className="p-4">Pacotes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4">Arroz</td>
                    <td className="p-4">92</td>
                    <td className="p-4">11</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Feijão</td>
                    <td className="p-4">17</td>
                    <td className="p-4">8</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Macarrão</td>
                    <td className="p-4">21</td>
                    <td className="p-4">12</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Óleo</td>
                    <td className="p-4">73</td>
                    <td className="p-4">10</td>
                  </tr>
                  <tr>
                    <td className="p-4">Água</td>
                    <td className="p-4">7</td>
                    <td className="p-4">3</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button className="flex flex-row items-center mt-4 bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800">
              <RiFileExcel2Line /> Exportar como Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
