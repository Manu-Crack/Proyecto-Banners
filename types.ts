
export interface Banner {
  id: string;
  title: string;
  price: number;
  imageData: string; // Base64 data URL
}

export interface UploadedImage {
    file: File;
    preview: string;
}
