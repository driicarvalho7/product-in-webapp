// src/pages/ProductScan.tsx
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import useApi from "../../hooks/useApi";

const ProductScan = () => {
  const [barcode, setBarcode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { request, error } = useApi();
  const location = useLocation();
  const campaign = location.state?.campaign || null;

  // Função para lidar com a entrada do código de barras
  const handleBarcodeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputBarcode = e.target.value;
    setBarcode(inputBarcode);

    // Verifica se o código de barras possui exatamente 13 dígitos
    if (inputBarcode.length === 13) {
      setIsModalOpen(true);
    }
  };

  // Função para confirmar e enviar o produto à campanha
  const handleConfirm = async () => {
    if (barcode && campaign) {
      try {
        const response = await request(
          `/campaigns/${campaign.id}/products`,
          "POST",
          {
            codebar: barcode,
            quantity,
          }
        );

        if (response) {
          alert("Produto atrelado com sucesso!");
          setBarcode("");
          setQuantity(1);
          setIsModalOpen(false);
        } else {
          setErrorMessage(error);
        }
      } catch (apiError) {
        alert("Erro ao atrelar o produto. Tente novamente.");
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar campaign={campaign} menuSelect={3} />

      {/* Main Content */}
      <div className="flex flex-col w-full">
        {/* Content */}
        <div className="flex-1 p-6 bg-gray-200 flex flex-col justify-center items-center">
          <div className="bg-red-300 border-solid border-t-2 border-r-2 border-l-2 border-b-2 border-red-700 px-[30rem] py-[20rem]">
            <h2 className="text-2xl font-bold text-center mb-6">
              Atrelar Produto à Campanha
            </h2>

            <div className="w-full flex justify-center">
              <input
                type="text"
                placeholder="Insira o código de barras EAN13"
                value={barcode}
                onChange={handleBarcodeInput}
                className="w-full max-w-md px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          {/* Modal para quantidade de volumes */}
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
                    onClick={handleConfirm}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Exibir erro, se houver */}
          {(error || errorMessage) && (
            <p className="text-red-500 text-center mt-4">
              {error || errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductScan;
