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
