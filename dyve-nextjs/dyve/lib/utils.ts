import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TPaymentStatus, Variant } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleTransactionBadge = (status: TPaymentStatus): Variant => {
  switch (status) {
    case "paid":
      return "default";
    case "pending":
      return "secondary";
    case "failed":
      return "destructive";
    default:
      return "secondary";
  }
};
