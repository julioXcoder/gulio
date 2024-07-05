import { useState } from "react";

type UseImageDataType = {
  imagePreview: string | null;
  imageFile: File | null;
  imageSize: number;
  imageType: string;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  setImageSize: React.Dispatch<React.SetStateAction<number>>;
  setImageType: React.Dispatch<React.SetStateAction<string>>;
};

export function useImageData(): UseImageDataType {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageType, setImageType] = useState<string>("");

  return {
    imagePreview,
    imageFile,
    imageSize,
    imageType,
    setImageFile,
    setImagePreview,
    setImageSize,
    setImageType,
  };
}
