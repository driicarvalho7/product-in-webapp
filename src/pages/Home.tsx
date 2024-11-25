// src/pages/Home.tsx
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { GrTableAdd } from "react-icons/gr";
import { RiFileExcel2Line } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import { FaBarcode } from "react-icons/fa";
import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import Cookies from "js-cookie";
import { decodeJwt } from "../utils/decodeJwt";

interface ProductDashboard {
  name: string;
  total_weight: number;
  total_packagee: number;
}

interface DashboardData {
  total_products: number;
  total_weight: number;
  products: ProductDashboard[];
}

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const campaign = location.state?.campaign || null;
  const { request } = useApi<DashboardData>();

  const [isMobile, setIsMobile] = useState(false);
  const [username, setUsername] = useState("Usuário");
  const [greeting, setGreeting] = useState("");
  const [campaignData, setCampaignData] = useState<DashboardData>();
  const [filteredProducts, setFilteredProducts] = useState<ProductDashboard[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");

  // Lógica para pegar o nome de usuário do JWT
  useEffect(() => {
    const token = Cookies.get("auth_token");
    console.log("token: ", token);
    if (token) {
      const decoded = decodeJwt(token);
      console.log("decoded: ", decoded);
      if (decoded?.username) {
        setUsername(decoded.username);
      }
    }
  }, []);

  // Lógica para definir saudação baseada no horário
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Bom dia");
    else if (hour < 18) setGreeting("Boa tarde");
    else setGreeting("Boa noite");
  }, []);

  const fetchData = async () => {
    const response = await request(
      `/dashboard_data?campaignId=${campaign.id}`,
      "GET"
    );
    if (response) {
      setCampaignData(response);
      setFilteredProducts(response.products);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNavigate = (route: string) => {
    navigate(route, { state: { campaign } });
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filtrar produtos
  const handleSearch = () => {
    if (campaignData) {
      const filtered = campaignData.products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  // Exportar produtos para Excel
  const handleExport = async () => {
    if (campaign?.id) {
      try {
        const response = await request<{ base64: string }>(
          `/products_export/${campaign.id}`,
          "GET"
        );

        if (response?.base64) {
          const link = document.createElement("a");
          link.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${response.base64}`;
          link.download = `Produtos_Campanha_${campaign.name}.xlsx`;
          link.click();
        }
      } catch (error) {
        alert("Erro ao exportar produtos.");
      }
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar campaign={campaign} menuSelect={1} />

      <div className="flex flex-col w-full">
        {/* Nav */}
        <div className="w-full bg-gray-200 p-4 flex justify-between items-center shadow-md">
          {!isMobile && (
            <div className="flex space-x-4 md:space-x-8">
              <div className="flex flex-col bg-gray-300 rounded-lg p-2 text-base font-semibold">
                Produtos Totais{" "}
                <span className="font-bold">
                  {campaignData ? campaignData.total_products : "Não Informado"}
                </span>
              </div>
              <div className="flex flex-col bg-gray-300 rounded-lg p-2 text-base font-semibold">
                Peso Total (kg){" "}
                <span className="font-bold">
                  {campaignData ? campaignData.total_weight : "Não Informado"}
                </span>
              </div>
            </div>
          )}
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold">{campaign.name}</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-end">
              <span className="text-lg font-semibold">
                {greeting}, {username}
              </span>
            </div>
          </div>
        </div>

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
                onClick={() => handleNavigate("/product-create-edit")}
              >
                Cadastrar Produto
              </button>
            </div>
            <div className="flex-1 p-6 bg-gray-300 rounded-lg flex flex-col items-center">
              <h2 className="flex flex-row justify-evenly items-center text-xl font-semibold mb-4">
                Atrelar Produto à Campanha
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
            <div className="flex justify-center text-center space-x-2 mb-4">
              <h2 className="text-2xl font-semibold">
                Produtos atrelado a Campanha
              </h2>
            </div>
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="🔍 Pesquisar produto da campanha..."
                className="w-full px-4 py-2 rounded-md border focus:outline-none"
              />
              <button
                className="flex flex-row items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                onClick={handleSearch}
              >
                <IoMdSearch />
              </button>
            </div>

            {/* Tabela de Produtos da Campanha */}
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
                  {campaignData
                    ? [
                        <>
                          {filteredProducts.map((product, index) => (
                            <tr key={index} className="border-b">
                              <td className="p-4">{product.name}</td>
                              <td className="p-4">{product.total_weight}</td>
                              <td className="p-4">{product.total_packagee}</td>
                            </tr>
                          ))}
                        </>,
                      ]
                    : [
                        <tr>
                          <td colSpan={5} className="p-4 text-center">
                            Nenhum produto encontrado.
                          </td>
                        </tr>,
                      ]}
                </tbody>
              </table>
            </div>

            <button
              className="flex flex-row items-center mt-4 bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800"
              onClick={() => handleExport()}
            >
              <RiFileExcel2Line /> Exportar como Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
