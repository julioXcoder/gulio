import { useState } from "react";

type ImageDataType = {
  imagePreview: string | null;
  imageFile: File | null;
  imageSize: number;
  imageType: string;
};

type UseImagesDataType = {
  images: ImageDataType[];
  addImage: (image: ImageDataType) => void;
  updateImage: (index: number, updatedImage: ImageDataType) => void;
  removeImage: (index: number) => void;
};

export function useImagesData(): UseImagesDataType {
  const [images, setImages] = useState<ImageDataType[]>([]);

  const addImage = (image: ImageDataType) => {
    setImages((prevImages) => [...prevImages, image]);
  };

  const updateImage = (index: number, updatedImage: ImageDataType) => {
    setImages((prevImages) =>
      prevImages.map((img, i) => (i === index ? updatedImage : img))
    );
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return {
    images,
    addImage,
    updateImage,
    removeImage,
  };
}
