import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/24/solid';
import { ToolModel } from '../../models/Models';

// Example usage of ToolModel
// Sample list of tools following the ToolModel structure
const toolList: ToolModel[] = [
  {
    code: "TL-001",
    name: "Hammer",
    quantity: 10,
    manual: "https://example.com/manuals/hammer",
  },
  {
    code: "TL-002",
    name: "Screwdriver Set",
    quantity: 25,
    manual: "https://example.com/manuals/screwdriver-set",
  },
  {
    code: "TL-003",
    name: "Power Drill",
    quantity: 5,
    manual: "https://example.com/manuals/power-drill",
  },
  {
    code: "TL-004",
    name: "Wrench Set",
    quantity: 15,
    manual: "https://example.com/manuals/wrench-set",
  },
  {
    code: "TL-005",
    name: "Measuring Tape",
    quantity: 30,
    manual: "https://example.com/manuals/measuring-tape",
  },
  {
    code: "TL-006",
    name: "Ladder",
    quantity: 8,
    manual: "https://example.com/manuals/ladder",
  },
  {
    code: "TL-007",
    name: "Saw",
    quantity: 12,
    manual: "https://example.com/manuals/saw",
  },
  {
    code: "TL-008",
    name: "Pliers",
    quantity: 20,
    manual: "https://example.com/manuals/pliers",
  },
  {
    code: "TL-009",
    name: "Safety Goggles",
    quantity: 50,
    manual: "https://example.com/manuals/safety-goggles",
  },
  {
    code: "TL-010",
    name: "Paint Brush Set",
    quantity: 40,
    manual: "https://example.com/manuals/paint-brush-set",
  },
];

const ToolsPage: React.FC = () => {

  return (
    <div className="min-h-screen bg-gray-100 p-4 w-screen pt-24">
      <h1 className="text-3xl font-bold mb-4 text-black">Ferramentas Disponíveis</h1>
      <div className="space-y-4">
        {toolList.map((tool, index) => (
          <div
            key={index}
            className="flex items-center bg-white p-4 rounded-lg shadow-md cursor-pointer"
          >
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-black">{tool.name}</h2>
              <p className="text-gray-500">Código: {tool.code}</p>
              <p className="text-gray-500">Quantidade: {tool.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsPage;
