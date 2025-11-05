import React, { useCallback } from 'react';
import { type UploadedImage } from '../types';

interface ImageUploaderProps {
  images: UploadedImage[];
  setImages: React.Dispatch<React.SetStateAction<UploadedImage[]>>;
  disabled?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ images, setImages, disabled = false }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // Fix: Explicitly type `files` as `File[]` to resolve type inference issues.
      const files: File[] = Array.from(event.target.files);
      const newImages = files.map(file => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (disabled) return;
    // Fix: Explicitly type `files` as `File[]` to resolve type inference issues.
    const files: File[] = Array.from(event.dataTransfer.files);
    const newImages = files
      .filter(file => file.type.startsWith('image/'))
      .map(file => ({
        file,
        preview: URL.createObjectURL(file),
      }));
    setImages(prev => [...prev, ...newImages]);
  }, [disabled, setImages]);

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };


  return (
    <div>
      <div 
        onDrop={onDrop}
        onDragOver={onDragOver}
        className={`relative border-2 border-dashed border-gray-500 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-400 transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={disabled}
        />
        <div className="text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <p className="mt-2">Drag & drop files here, or click to select files</p>
        </div>
      </div>
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img src={image.preview} alt={`preview ${index}`} className="w-full h-24 object-cover rounded-md" />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-600/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
                disabled={disabled}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};