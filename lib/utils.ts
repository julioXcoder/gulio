import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import { ChangeEvent } from "react";

const ERROR_MESSAGE =
  "An unexpected error occurred while processing your request. Please try again later.";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getNumberValueFromEvent = (
  e: ChangeEvent<HTMLInputElement>
): string | number => {
  return e.target.value === "" ? "" : Number(e.target.value);
};

export function getMimeType(fileName: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "webp":
      return "image/webp";
    case "pdf":
      return "application/pdf";
    case "ppt":
    case "pptx":
      return "application/vnd.ms-powerpoint";
    case "doc":
    case "docx":
      return "application/msword";
    case "xls":
    case "xlsx":
      return "application/vnd.ms-excel";
    case "txt":
      return "text/plain";
    case "csv":
      return "text/csv";
    case "zip":
      return "application/zip";
    case "rar":
      return "application/x-rar-compressed";
    case "mp3":
      return "audio/mpeg";
    case "mp4":
      return "video/mp4";
    case "mov":
      return "video/quicktime";
    // Add more cases as needed
    default:
      return "application/octet-stream"; // Fallback MIME type
  }
}

export function showErrorToast() {
  return toast.error(ERROR_MESSAGE, {
    duration: 6000,
    action: {
      label: "close",
      onClick: () => null,
    },
  });
}

export function enumToValueLabelArray<T extends Record<string, string>>(
  enumObject: T
): { value: T[keyof T]; label: string }[] {
  return Object.keys(enumObject).map((key) => ({
    value: enumObject[key as keyof T],
    label: key.toLowerCase().replace(/_/g, " "),
    // .replace(/\b\w/g, (char) => char.toUpperCase()),
  }));
}
