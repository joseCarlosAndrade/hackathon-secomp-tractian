import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { ServiceModel } from '../models/Models';
import ServiceModal from './ServiceModal';

interface ServicePageProps {
  maintainer?: string;
  services?: ServiceModel[];
}

const ServicePage: React.FC<ServicePageProps> = ({ maintainer, services }) => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<ServiceModel | null>(null);

  const handleEditService = (service: ServiceModel) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const handleGenerateOrder = () => {
    navigate('/admin/service/add');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 w-screen pt-24">
      {maintainer ?
        <>
          <h1 className="text-3xl font-bold mb-4 text-black">Tarefas de { maintainer }</h1>
        </> : <>
          <h1 className="text-3xl font-bold mb-4 text-black">Suas Tarefas</h1>
        </>}
      <div className="space-y-4">
        {services && services.map((service, index) => (
          <div
            key={index}
            className="flex items-center bg-white p-4 rounded-lg shadow-md"
          >
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-black">{service.title}</h2>
              <p className="text-gray-500 line-clamp-2">{service.description}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditService(service)}
                className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200"
              >
                <PencilSquareIcon className="w-5 h-5" />
              </button>
              <button className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200">
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {maintainer ? (
        <>
          <div className="mt-8 flex flex-col space-y-4">
            <button
              className="bg-blue-100 text-blue-800 px-6 py-3 rounded-full shadow-sm hover:bg-blue-200 focus:outline-none transition-all"
              onClick={handleGenerateOrder}
            >
              Gerar Ordem de Serviço
            </button>
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-sm hover:bg-blue-700 focus:outline-none transition-all"
              onClick={() => console.log('Enviar Tarefas')}
            >
              Enviar Tarefas para {maintainer}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="mt-8 flex flex-col space-y-4">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-sm hover:bg-blue-700 focus:outline-none transition-all"
              onClick={() => console.log('Enviar Tarefas')}
            >
              Baixar Tarefas
            </button>
          </div>
        </>
      )}

      {/* Render the ServiceModal when a service is selected */}
      {selectedService && (
        <ServiceModal service={selectedService} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ServicePage;
