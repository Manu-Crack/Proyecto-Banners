import React from 'react';
import { type Banner } from '../types';

interface PublicGalleryProps {
  banners: Banner[];
}

const BannerCard: React.FC<{ banner: Banner }> = ({ banner }) => (
  <div className="group relative overflow-hidden rounded-lg shadow-lg bg-gray-800 transform hover:-translate-y-1 transition-transform duration-300">
    <img src={banner.imageData} alt={banner.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
    <div className="absolute bottom-0 left-0 p-4 w-full">
      <h3 className="text-lg font-bold text-white truncate">{banner.title}</h3>
      <p className="text-xl font-semibold text-green-400 mt-1">S/{banner.price.toFixed(2)}</p>
    </div>
  </div>
);

export const PublicGallery: React.FC<PublicGalleryProps> = ({ banners }) => {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
        Today's Specials
      </h1>
      {banners.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {banners.map(banner => (
            <BannerCard key={banner.id} banner={banner} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <p className="text-gray-400">No banners available at the moment. Check back soon!</p>
        </div>
      )}
    </div>
  );
};