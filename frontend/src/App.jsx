import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { initLenis } from './utils/lenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import ProgramsSection from './components/ProgramsSection';
import StatsSection from './components/StatsSection';
import WhyUsSection from './components/WhyUsSection';
import AdmissionsSection from './components/AdmissionsSection';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';
import ChatbotWidget from './components/chatbot/ChatbotWidget';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

function HomePage() {
  useEffect(() => {
    const lenis = initLenis();
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProgramsSection />
        <StatsSection />
        <WhyUsSection />
        <AdmissionsSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <Footer />
      <ChatbotWidget />
    </>
  );
}

function AdminPage() {
  const [admin, setAdmin] = useState(() => JSON.parse(localStorage.getItem('admin') || 'null'));

  const handleLogin = (data) => {
    setAdmin(data.admin);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('admin');
    setAdmin(null);
  };

  if (!admin) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
