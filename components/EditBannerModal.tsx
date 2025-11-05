import React, { useState, useEffect } from 'react';
import { type Banner } from '../types';

interface EditBannerModalProps {
  banner: Banner;
  onUpdate: (updatedBanner: Banner) => void;
  onClose: () => void;
}

export const EditBannerModal: React.FC<EditBannerModalProps> = ({ banner, onUpdate, onClose }) => {
  const [title, setTitle] = useState(banner.title);
  const [price, setPrice] = useState(banner.price.toString());

  useEffect(() => {
    setTitle(banner.title);
    setPrice(banner.price.toString());
  }, [banner]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNumber = parseFloat(price);
    if (title && !isNaN(priceNumber)) {
      onUpdate({
        ...banner,
        title,
        price: priceNumber,
      });
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Edit Banner</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="edit-title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
            <input
              type="text"
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Ultimate Cheesy Burger"
            />
          </div>
          <div>
            <label htmlFor="edit-price" className="block text-sm font-medium text-gray-300 mb-1">Price</label>
            <input
              type="number"
              id="edit-price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., 14.99"
              step="0.01"
              min="0"
            />
          </div>
          <div className="flex justify-end space-x-4 pt-2">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-md bg-gray-600 hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 text-sm font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};