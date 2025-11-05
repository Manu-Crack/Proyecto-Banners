import React, { useState } from 'react';
import { type Banner } from '../types';
import { BannerForm } from './BannerForm';
import { EditBannerModal } from './EditBannerModal';

interface AdminDashboardProps {
  banners: Banner[];
  onAddBanner: (newBanner: Omit<Banner, 'id'>) => void;
  onUpdateBanner: (banner: Banner) => void;
  onDeleteBanner: (bannerId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ banners, onAddBanner, onUpdateBanner, onDeleteBanner }) => {
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const handleUpdate = (updatedBanner: Banner) => {
    onUpdateBanner(updatedBanner);
    setEditingBanner(null);
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-gray-400">Manage your promotional food banners.</p>
      </div>
      
      <BannerForm onAddBanner={onAddBanner} />

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Active Banners</h2>
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="p-4 font-semibold">Preview</th>
                  <th className="p-4 font-semibold">Title</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {banners.length > 0 ? banners.map(banner => (
                  <tr key={banner.id} className="border-t border-gray-700 hover:bg-gray-700/40">
                    <td className="p-4">
                      <img src={banner.imageData} alt={banner.title} className="w-16 h-16 object-cover rounded-md" />
                    </td>
                    <td className="p-4 font-medium">{banner.title}</td>
                    <td className="p-4 text-green-400">S/{banner.price.toFixed(2)}</td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => setEditingBanner(banner)} className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition-colors">
                        Edit
                      </button>
                      <button onClick={() => onDeleteBanner(banner.id)} className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-colors">
                        Delete
                      </button>
                    </td>
                  </tr>
                )) : (
                    <tr>
                        <td colSpan={4} className="text-center p-8 text-gray-400">No banners created yet.</td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {editingBanner && (
        <EditBannerModal 
            banner={editingBanner}
            onUpdate={handleUpdate}
            onClose={() => setEditingBanner(null)}
        />
      )}
    </div>
  );
};