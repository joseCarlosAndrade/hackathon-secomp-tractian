import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { ServiceModel } from '../models/Models';
import ServiceModal from './ServiceModal';
import ServicePDFDocument from './ServicePDFDocument';
import { useDataContext } from '../context/DataContext';

interface ServicePageProps {
  maintainer?: string;
  services?: ServiceModel[];
}

const services: ServiceModel[] = [
  {
    title: 'Inspeção e Limpeza de Peneira Poligonal na Central de Areia',
    description: 'Realizar uma inspeção detalhada na Peneira Poligonal para garantir que não há acúmulo de resíduos que possam comprometer seu funcionamento. Verificar o aquecimento do equipamento e o nível de ruído durante a operação.',
    suggestedSteps: [
      'Desligar a Peneira Poligonal seguindo os procedimentos de segurança.',
      'Remover quaisquer acúmulos de areia e detritos utilizando as ferramentas adequadas.',
      'Verificar as condições das tampas e parafusos, garantindo que estão bem fixados.',
      'Medir a temperatura dos rolamentos usando um termômetro infravermelho.',
      'Ligar o equipamento novamente e monitorar por 5 minutos para verificar se o nível de ruído está dentro do padrão.'
    ],
    suggestedTools: [
      {
        code: 'T001',
        name: 'Flashlight',
        quantity: 1,
        manual: 'https://example.com/manual1.pdf',
      },
    ],
    estimatedTime: 60,
  },
  {
    title: 'Manutenção Preventiva de Motor Elétrico',
    description: 'Realizar uma manutenção preventiva...',
    suggestedSteps: ['Step 1', 'Step 2'],
    suggestedTools: [
      {
        code: 'T002',
        name: 'Wrench',
        quantity: 1,
        manual: 'https://example.com/manual2.pdf',
      },
    ],
    estimatedTime: 120,
  },
];


const ServicePage: React.FC<ServicePageProps> = ({ maintainer }) => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<ServiceModel | null>(null);
  const { responseData } = useDataContext();

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
      {maintainer ? (
        <h1 className="text-3xl font-bold mb-4 text-black">Tarefas de {maintainer}</h1>
      ) : (
        <h1 className="text-3xl font-bold mb-4 text-black">Suas Tarefas</h1>
      )}

      <div className="space-y-4">
        {services.map((service : ServiceModel, index : number) => (
          <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-md">
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

      <div className="mt-8 flex flex-col space-y-4">
        {maintainer ? (
          <>
            <button
              className="bg-blue-100 text-blue-800 px-6 py-3 rounded-full shadow-sm hover:bg-blue-200"
              onClick={handleGenerateOrder}
            >
              Gerar Ordem de Serviço
            </button>
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-sm hover:bg-blue-700"
              onClick={() => console.log('Enviar Tarefas')}
            >
              Enviar Tarefas para {maintainer}
            </button>
          </>
        ) : (
          <BlobProvider document={<ServicePDFDocument services={services} />}>
            {({ blob, url, loading, error }) => {
              if (loading) return <span>Loading document...</span>;
              if (error) return <span>Failed to generate PDF</span>;

              const handleDownload = () => {
                if (url) {
                  // Open the blob URL in a new tab for mobile download support
                  window.open(url, '_blank');
                }
              };

              return (
                <button onClick={handleDownload} className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-sm hover:bg-blue-700">
                  Download now!
                </button>
              );
            }}
          </BlobProvider>
        )}
      </div>

      {selectedService && <ServiceModal service={selectedService} onClose={handleCloseModal} />}

    </div>
  );
};

export default ServicePage;
