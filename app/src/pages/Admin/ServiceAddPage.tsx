import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { ApiServiceResponse, ServiceModel } from '../../models/Models';
import { useDataContext } from '../../context/DataContext';

interface ServiceAddProps {
  maintainer?: string;
}

const ServiceAdd: React.FC<ServiceAddProps> = ({ maintainer }) => {
  const navigate = useNavigate();
  const { responseData, setResponseData } = useDataContext(); // Access setResponseData from context
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleGenerateOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/generategenerate?description=${content}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data: ServiceModel[] = await response.json();
      console.log(data);
      setResponseData([data]); // Set data from response
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 w-screen pt-24">
      <h1 className="text-3xl font-bold mb-4 text-black">Gerar OS para { maintainer }</h1>
      <div className="space-y-4 flex flex-col">
        <textarea
          className='w-full p-4 rounded-lg border border-gray-300 bg-gray-100 focus:bg-white focus:outline-none text-black resize-none'
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          className='bg-blue-600 text-white px-6 py-3 rounded-full shadow-sm hover:bg-blue-700 focus:outline-none transition-all'
          onClick={handleGenerateOrder} disabled={loading}>
          {loading ? "Loading..." : "Gerar OS"}
        </button>

        {responseData && (
          <>
            <button
              className='bg-blue-600 text-white px-6 py-3 rounded-full shadow-sm hover:bg-blue-700 focus:outline-none transition-all'
              onClick={() => navigate('/admin/service')}
            >
              Ver As Tarefas
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ServiceAdd;

