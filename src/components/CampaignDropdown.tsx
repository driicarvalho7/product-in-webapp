// src/components/CampaignDropdown.tsx
import { Campaign } from "../utils/interfaces/campaign";
import { useState, useEffect, useRef } from "react";
import useApi from "../hooks/useApi";

interface CampaignDropdownProps {
  onSelect: (campaign: Campaign) => void;
}

const CampaignDropdown: React.FC<CampaignDropdownProps> = ({ onSelect }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { request, error } = useApi<Campaign[]>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch campaigns from API on component mount
  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    const data = await request("/campaigns_names", "GET");
    if (data) {
      setCampaigns(data);
      setFilteredCampaigns(data);
    }
  };

  // Filter campaigns based on search term
  useEffect(() => {
    const filtered = campaigns.filter((campaign) =>
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCampaigns(filtered);
  }, [searchTerm, campaigns]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        type="text"
        placeholder="🔍 Pesquisar campanha..."
        value={searchTerm}
        onFocus={() => setIsOpen(true)} // Abre o dropdown quando o input é focado
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      {isOpen && (
        <ul className="absolute left-0 w-full mt-1 bg-white border rounded-md shadow-lg max-h-48 overflow-y-auto z-10">
          {filteredCampaigns.map((campaign) => (
            <li
              key={campaign.id}
              onClick={() => {
                onSelect(campaign);
                setIsOpen(false); // Fecha o dropdown ao selecionar uma campanha
              }}
              className="px-4 py-2 cursor-pointer hover:bg-indigo-100"
            >
              {campaign.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CampaignDropdown;
