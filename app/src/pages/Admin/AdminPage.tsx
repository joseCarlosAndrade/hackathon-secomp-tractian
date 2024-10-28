import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/24/solid';

interface Maintainer {
  id: number;
  name: string;
  description: string;
  avatar: string;
  tasks: number;
}

const maintainers: Maintainer[] = [
  { id: 1, name: 'José', description: 'Manutenção de Máquina 1', avatar: 'https://via.placeholder.com/150', tasks: 2 },
  { id: 2, name: 'João', description: 'Manutenção de Máquina 2', avatar: 'https://via.placeholder.com/150', tasks: 4 },
  { id: 3, name: 'Thiago', description: 'Manutenção de Máquina 3', avatar: 'https://via.placeholder.com/150', tasks: 8 },
];

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (maintainerId: number) => {
    navigate(`/admin/service`, { state: { maintainerId } });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 w-screen pt-24">
      <h1 className="text-3xl font-bold mb-4 text-black">Manutentores</h1>
      <div className="space-y-4">
        {maintainers.map((maintainer) => (
          <div
            key={maintainer.id}
            className="flex items-center bg-white p-4 rounded-lg shadow-md cursor-pointer"
            onClick={() => handleCardClick(maintainer.id)}
          >
            <UserIcon className="w-12 h-12 text-blue-600" />
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-semibold text-black">{maintainer.name}</h2>
              <p className="text-gray-500">{maintainer.description}</p>
            </div>
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full">
              {maintainer.tasks}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
