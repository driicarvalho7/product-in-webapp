// src/pages/CampaignSelection.tsx
import { useNavigate } from "react-router-dom";
import CampaignDropdown from "../../components/CampaignDropdown";

const CampaignSelection = () => {
  const navigate = useNavigate();

  const handleCampaignSelect = (campaignId: string) => {
    navigate("/", { state: { campaignId } });
  };

  const handleCreateCampaign = () => {
    navigate("/campaign-create");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-600">
      <h2 className="text-3xl font-bold text-white mb-16">
        Selecione a Campanha
      </h2>
      <div className="w-full max-w-4xl p-8 rounded-xl shadow-md flex">
        <div className="w-2/3 pr-8">
          <p className="text-lg text-white mb-4">
            Escolha uma campanha existente
          </p>
          <CampaignDropdown onSelect={handleCampaignSelect} />
        </div>
        <div className="w-1/3 flex flex-col items-center">
          <p className="text-lg text-white mb-4">Criar nova campanha</p>
          <button
            onClick={handleCreateCampaign}
            className="w-full py-3 mt-2 font-semibold text-white bg-pink-500 rounded-md hover:bg-pink-600"
          >
            Nova Campanha
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignSelection;
