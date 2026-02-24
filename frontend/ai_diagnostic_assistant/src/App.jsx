import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import AiAssistant from './Pages/AiAssistant';
import Alerts from './Pages/Alerts';
import Cases from './Pages/Cases';
import Library from './Pages/Library';
import Profile from './Pages/Profile';
import Settings from './Pages/Settings';
import Ward from './Pages/Ward';
import ClinicalWorkSpace from './Pages/ClinicalWorkSpace';
import Results from './Pages/Results';
import AuthForm from './Pages/AuthForm';
import Preloader from './components/Preloader';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Preloader />;

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/ai-assistant" element={<AiAssistant />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/cases" element={<Cases />} />
      <Route path="/library" element={<Library />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/ward" element={<Ward />} />
      <Route path="/clinical-workspace" element={<ClinicalWorkSpace />} />
      <Route path="/results" element={<Results />} />
      <Route path="/user-auth" element={<AuthForm />} />
    </Routes>
  );
};

export default App;
