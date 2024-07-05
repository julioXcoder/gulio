import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { ImageSchema } from "@/types";

interface Props {
  onSetImage: (image: File) => void;
  placeholder: string;
}

const AddImage = ({ onSetImage, placeholder }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      const imageValidation = ImageSchema.safeParse({ image: file });
      if (!imageValidation.success) {
        toast.error(imageValidation.error.errors[0].message, {
          duration: 6000,
        });
        return;
      }

      onSetImage(file);
    }

    event.target.value = "";
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        id="image"
        name="image"
        accept="image/jpeg, image/jpg, image/gif ,image/png, image/webp"
        onChange={handleImageChange}
        className="hidden"
      />

      <button
        onClick={handleButtonClick}
        className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
      >
        <Upload className="h-4 w-4 text-muted-foreground" />
        <span className="sr-only">Upload</span>
      </button>
    </div>
  );
};

export default AddImage;
