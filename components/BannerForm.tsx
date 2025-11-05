
import React, { useState } from 'react';
import { type Banner, type UploadedImage } from '../types';
import { generateBannerImage } from '../services/geminiService';
import { ImageUploader } from './ImageUploader';
import { LoadingSpinner } from './LoadingSpinner';

interface BannerFormProps {
  onAddBanner: (newBanner: Omit<Banner, 'id'>) => void;
}

export const BannerForm: React.FC<BannerFormProps> = ({ onAddBanner }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || images.length === 0) {
      setError('Please fill in all fields and upload at least one image.');
      return;
    }
    
    setError(null);
    setIsLoading(true);

    try {
      const priceNumber = parseFloat(price);
      if (isNaN(priceNumber)) {
          throw new Error("Price must be a valid number.");
      }
      const imageFiles = images.map(img => img.file);
      const generatedImageData = await generateBannerImage(title, priceNumber, imageFiles);

      onAddBanner({ title, price: priceNumber, imageData: generatedImageData });

      // Reset form
      setTitle('');
      setPrice('');
      setImages([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Create New Banner</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., Ultimate Cheesy Burger"
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">Price</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., 14.99"
                step="0.01"
                min="0"
                disabled={isLoading}
              />
            </div>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Food Images</label>
            <p className="text-xs text-gray-400 mb-2">Upload one or more images of the food items to be included in the banner.</p>
            <ImageUploader images={images} setImages={setImages} disabled={isLoading} />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <div>
          <button 
            type="submit" 
            className="w-full flex justify-center items-center bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner /> : 'Generar Banner'}
          </button>
        </div>
      </form>
    </div>
  );
};
