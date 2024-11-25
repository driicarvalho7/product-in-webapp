import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { IoMdSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import useApi from "../../hooks/useApi";
import { useEffect, useState } from "react";
import { Product } from "../../utils/interfaces/product";

const ProductList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { request } = useApi<Product[]>();
  const campaign = location.state?.campaign || null;

  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const fetchData = async () => {
    const response = await request("/products", "GET");
    if (response) {
      setProducts(response);
      setFilteredProducts(response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.codebar.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  };

  // Atrelar Produto
  const handleAttach = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleConfirmAttach = async () => {
    if (selectedProduct && campaign) {
      await request(`/campaigns/${campaign.id}/products`, "POST", {
        codebar: selectedProduct.codebar,
        quantity,
      });
      alert("Produto atrelado com sucesso!");
      setIsModalOpen(false);
      setQuantity(1);
    }
  };

  // Editar Produto
  const handleEdit = (product: Product) => {
    navigate("/product-create-edit", { state: { product, campaign } });
  };

  // Excluir Produto
  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedProduct) {
      await request(`/products/${selectedProduct.id}`, "DELETE");
      alert("Produto excluído com sucesso!");
      setDeleteModalOpen(false);
      fetchData(); // Atualiza a lista após exclusão
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar campaign={campaign} menuSelect={2} />

      <div className="flex-1 p-6 bg-gray-200 space-y-4">
        <div className="bg-gray-300 rounded-lg p-4">
          <div className="flex justify-center text-center space-x-2 mb-4">
            <h2 className="text-2xl font-semibold">
              Produtos Cadastrados na Base de Dados
            </h2>
          </div>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInput}
              placeholder="🔍 Pesquisar produto..."
              className="w-full px-4 py-2 rounded-md border focus:outline-none"
            />
            <button
              className="flex flex-row items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              onClick={handleSearch}
            >
              <IoMdSearch />
              Buscar
            </button>
            <button
              className="flex flex-row items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              onClick={() =>
                navigate("/product-create-edit", { state: { campaign } })
              }
            >
              <FaPlus />
              Adicionar
            </button>
          </div>

          {/* Tabela de Produtos */}
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-4">Código de Barras</th>
                  <th className="p-4">Nome</th>
                  <th className="p-4">Peso</th>
                  <th className="p-4">Unidade</th>
                  <th className="p-4">Ação</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="p-4">{product.codebar}</td>
                    <td className="p-4">{product.name}</td>
                    <td className="p-4">{product.weight_value}</td>
                    <td className="p-4">{product.weight_type}</td>
                    <td className="p-4">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                        onClick={() => handleAttach(product)}
                      >
                        Atrelar
                      </button>
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 mx-2"
                        onClick={() => handleEdit(product)}
                      >
                        Editar
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                        onClick={() => handleDelete(product)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-4 text-center">
                      Nenhum produto encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de Atrelar */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">
              Quantidade de Volumes
            </h3>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min={1}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmAttach}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Exclusão */}
      {deleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">
              Deseja realmente excluir este produto?
            </h3>
            <p>
              Ele será excluído de <span className="font-bold">todas</span> as
              campanhas.
            </p>
            <p>
              Esta ação é <span className="font-bold">IRREVERSÍVEL</span>.
            </p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
