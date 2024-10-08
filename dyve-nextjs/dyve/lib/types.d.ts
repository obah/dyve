export interface CatalogItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  reward: number;
}

export interface TransactionsData {
  id: string;
  type: string;
  date: string;
  status: string;
  total: string;
}

export type TPaymentStatus = "failed" | "pending" | "paid";

export type Variant = "default" | "destructive" | "secondary";
