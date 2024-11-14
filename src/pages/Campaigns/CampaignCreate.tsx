// src/pages/CampaignCreate.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";

const CampaignCreate = () => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [loading, setLoading] = useState(false);
  const { request, error } = useApi();
  const navigate = useNavigate();

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const body = {
      name,
      start_date: startDate,
    };

    const response = await request("/campaigns", "POST", body);
    setLoading(false);

    if (response) {
      alert("Campanha criada com sucesso!");
      navigate("/campaign-selection");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-600">
      <div className="w-full max-w-lg p-8 space-y-6 rounded-xl shadow-md">
        <h2 className="text-4xl font-bold text-center text-white">
          Criar Nova Campanha
        </h2>
        <form onSubmit={handleCreateCampaign} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-white mb-2">
              Insira o nome da campanha
            </label>
            <input
              type="text"
              placeholder="Insira o nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <p className="text-sm text-indigo-200 mt-1">
              Insira um nome único para a campanha
            </p>
          </div>
          <div>
            <label className="block text-lg font-medium text-white mb-2">
              Insira a data de início da campanha
            </label>
            <input
              type="date"
              placeholder="DD/MM/YYYY"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full px-4 py-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold text-white rounded-md ${
              loading ? "bg-indigo-400" : "bg-pink-500 hover:bg-pink-600"
            }`}
          >
            {loading ? "Carregando..." : "Criar Campanha"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CampaignCreate;
