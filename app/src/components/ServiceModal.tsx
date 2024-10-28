import React, { useState } from 'react';
import { ServiceModel, ToolModel } from '../models/Models';
import { PencilSquareIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface ServiceModalProps {
  service: ServiceModel;
  onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  const [suggestedSteps, setSuggestedSteps] = useState(service.suggestedSteps);
  const [suggestedTools, setSuggestedTools] = useState<ToolModel[]>(service.suggestedTools);
  const [estimatedTime, setEstimatedTime] = useState(service.estimatedTime || 60);

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...suggestedSteps];
    newSteps[index] = value;
    setSuggestedSteps(newSteps);
  };

  const handleAddStep = () => {
    setSuggestedSteps([...suggestedSteps, '']);
  };

  const handleAddTool = () => {
    // Add logic for adding a new tool
  };

  const handleConfirmChanges = () => {
    // Handle the confirmation of changes (e.g., save changes)
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-screen p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Etapas Sugeridas</h2>
          <button onClick={onClose} className="text-white hover:text-gray-50 bg-red-500 p-2 rounded-full">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-2 mb-4">
          {suggestedSteps.map((step, index) => (
            <textarea
              key={index}
              value={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 focus:bg-white focus:outline-none text-black resize-none"
              placeholder={`Step ${index + 1}`}
              rows={2}
            />
          ))}
          <button
            onClick={handleAddStep}
            className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full shadow-sm hover:bg-blue-200 transition-all"
          >
            Adicionar Etapas
          </button>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ferramentas Sugeridas</h2>
        <div className="space-y-2 mb-4">
          {suggestedTools.map((tool, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg border border-gray-300 text-black">
              <div>
                <h3 className="text-gray-800">{tool.name}</h3>
                <p className="text-gray-500">Código SAP {tool.code}</p>
              </div>
              <div className="flex space-x-2 items-center">
                <div className="flex items-center justify-center p-4 h-8 bg-blue-600 text-white rounded-full">
                  {service.suggestedTools[index].quantity} disponível
                </div>
                <button className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200">
                  <PencilSquareIcon className="w-5 h-5" />
                </button>
                <button className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200">
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={handleAddTool}
            className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full shadow-sm hover:bg-blue-200 transition-all"
          >
            Adicionar Ferramentas
          </button>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Tempo Estimado</h2>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(Number(e.target.value))}
            className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:outline-none text-black"
          />
          <span className="text-gray-700">minutos</span>
        </div>

        <div className="mt-6">
          <button
            onClick={handleConfirmChanges}
            className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full shadow-sm hover:bg-blue-200 transition-all w-full"
          >
            Confirmar Mudanças
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
