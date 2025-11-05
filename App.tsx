import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PublicGallery } from './components/PublicGallery';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginModal } from './components/LoginModal';
import { type Banner } from './types';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [view, setView] = useState<'public' | 'admin'>('public');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: '1',
      title: 'Gourmet Burger Special',
      price: 35.90,
      imageData: 'https://picsum.photos/seed/burger/600/600',
    },
    {
      id: '2',
      title: 'Artisanal Pizza',
      price: 45.50,
      imageData: 'https://picsum.photos/seed/pizza/600/600',
    },
    {
        id: '3',
        title: 'Fresh Sushi Platter',
        price: 60.00,
        imageData: 'https://picsum.photos/seed/sushi/600/600',
    },
  ]);

  const handleOpenLoginModal = useCallback(() => {
    setIsLoginModalOpen(true);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAdmin(false);
    setView('public');
  }, []);

  const handleLoginAttempt = useCallback((user: string, pass: string): boolean => {
    // In a real app, this would be an API call.
    if (user === 'admin' && pass === 'password') {
      setIsAdmin(true);
      setView('admin');
      setIsLoginModalOpen(false);
      return true;
    }
    return false;
  }, []);

  const addBanner = useCallback((newBanner: Omit<Banner, 'id'>) => {
    setBanners(prevBanners => [
      { ...newBanner, id: new Date().toISOString() },
      ...prevBanners,
    ]);
  }, []);
  
  const updateBanner = useCallback((updatedBanner: Banner) => {
    setBanners(prevBanners => 
      prevBanners.map(banner => banner.id === updatedBanner.id ? updatedBanner : banner)
    );
  }, []);

  const deleteBanner = useCallback((bannerId: string) => {
    setBanners(prevBanners => prevBanners.filter(banner => banner.id !== bannerId));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header 
        isAdmin={isAdmin} 
        onLogin={handleOpenLoginModal} 
        onLogout={handleLogout} 
        onSetView={setView}
        currentView={view}
      />
      <main className="container mx-auto p-4 md:p-8">
        {view === 'public' ? (
          <PublicGallery banners={banners} />
        ) : isAdmin ? (
          <AdminDashboard 
            banners={banners}
            onAddBanner={addBanner}
            onUpdateBanner={updateBanner}
            onDeleteBanner={deleteBanner}
          />
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-red-500">Access Denied</h2>
            <p className="mt-2 text-gray-400">Please log in to access the admin dashboard.</p>
          </div>
        )}
      </main>
      {isLoginModalOpen && (
        <LoginModal 
            onLoginAttempt={handleLoginAttempt}
            onClose={() => setIsLoginModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;