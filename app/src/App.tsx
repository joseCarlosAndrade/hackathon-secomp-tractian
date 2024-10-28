import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AdminSidenav from './components/AdminSidenav';
import UserSidenav from './components/UserSidenav';
import LoginPage from './pages/LoginPage';
import Service from './components/Service';
import ServiceAdd from './pages/Admin/ServiceAddPage';
import Tools from './pages/Admin/ToolsPage';
import AdminPage from './pages/Admin/AdminPage';
import { ServiceModel } from './models/Models';
import { useDataContext } from './context/DataContext';

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

const App: React.FC = () => {
  const location = useLocation();
  const { responseData } = useDataContext();

  // Check if the current path starts with "/admin" or "/user"
  const isAdminPath = location.pathname.startsWith('/admin');
  const isUserPath = location.pathname.startsWith('/user');

  return (
    <>
      {isAdminPath && <AdminSidenav />}
      {isUserPath && <UserSidenav />}
      
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<LoginPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/service" element={<Service maintainer='José' services={responseData} />} />
        <Route path="/admin/service/add" element={<ServiceAdd maintainer='José' />} />
        <Route path="/admin/tools" element={<Tools />} />

        {/* User Routes */}
        <Route path="/user" element={<Service services={services} />} />
      </Routes>
    </>
  );
};

const WrappedApp: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
