// src/pages/ProductCreateEdit.tsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import useApi from "../../hooks/useApi";

const ProductCreateEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { request, error } = useApi();
  const { product, campaign } = location.state || {};
  const isEdit = !!product;

  const [name, setName] = useState(product?.name || "");
  const [weightValue, setWeightValue] = useState(product?.weight_value || "");
  const [weightType, setWeightType] = useState(product?.weight_type || "Kg");
  const [codebar, setCodebar] = useState(product?.codebar || "");

  const handleSave = async () => {
    const productData = {
      codebar,
      name,
      weight_value: parseFloat(weightValue),
      weight_type: weightType,
    };

    const endpoint = isEdit ? `/products/${product.id}` : "/products";
    const method = isEdit ? "PUT" : "POST";

    const response = await request(endpoint, method, productData);
    if (response) {
      alert(`Produto ${isEdit ? "editado" : "cadastrado"} com sucesso!`);
      navigate("/product-list", { state: { campaign } });
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar campaign={campaign} menuSelect={2} />

      {/* Main Content */}
      <div className="flex flex-col w-full">
        {/* Formulário de Cadastro de Produto */}
        <div className="flex-1 p-6 bg-gray-200 flex justify-center items-center">
          <div className="w-full max-w-lg p-6 bg-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">
              {isEdit ? "Editar" : "Adicionar"} Produto
            </h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block font-medium text-gray-700">
                  Código de Barras*
                </label>
                <input
                  type="text"
                  value={codebar}
                  onChange={(e) => setCodebar(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">Nome*</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Peso do Produto*
                </label>
                <input
                  type="number"
                  value={weightValue}
                  onChange={(e) => setWeightValue(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Tipo de Unidade*
                </label>
                <select
                  value={weightType}
                  onChange={(e) => setWeightType(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="Kg">Kg</option>
                  <option value="g">g</option>
                  <option value="L">L</option>
                  <option value="ml">ml</option>
                </select>
              </div>

              {/* Botões de Ação */}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() =>
                    navigate("/product-list", { state: { campaign } })
                  }
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  ✖ Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  ✔ Salvar
                </button>
              </div>

              {/* Exibir erro, se houver */}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreateEdit;
