import { CatalogItem, TransactionsData } from "./types";

export const courses: CatalogItem[] = [
  {
    id: "1",
    imageUrl: "/images/courseImage.png",
    title: "Intro to Blockchain and Cryptocurrencies",
    description:
      "Your first step into the world of financial literacy and blockchain",
    reward: 50,
  },
  {
    id: "2",
    imageUrl: "/images/courseImage.png",
    title: "Financial Assets: Traditional & Digital",
    description:
      "Series of modules and interractive exercises to get you familiar with different financial assets and instruments",
    reward: 100,
  },
  {
    id: "3",
    imageUrl: "/images/courseImage.png",
    title: "Getting Started with DeFi",
    description:
      "Learn how to manage your money, understand decentralized finance, and build a brighter financial future",
    reward: 120,
  },
  {
    id: "4",
    imageUrl: "/images/courseImage.png",
    title: "Financial Literacy and Smart Investments",
    description:
      "Financial Management Masterclass, you will learn with Sarah Johnson - Head of Financial Platform Gojek Indonesia.",
    reward: 150,
  },
  {
    id: "5",
    imageUrl: "/images/courseImage.png",
    title: "Financial Literacy and Smart Investments",
    description:
      "Financial Management Masterclass, you will learn with Sarah Johnson - Head of Financial Platform Gojek Indonesia.",
    reward: 200,
  },
  {
    id: "6",
    imageUrl: "/images/courseImage.png",
    title: "Financial Literacy and Smart Investments",
    description:
      "Financial Management Masterclass, you will learn with Sarah Johnson - Head of Financial Platform Gojek Indonesia.",
    reward: 500,
  },
];

export const dummyTransactions: TransactionsData[] = [
  {
    id: "#1532",
    type: "Loan Issued",
    date: "Dec 30, 10:06 AM",
    status: "paid",
    total: "$ 329.40",
  },
  {
    id: "#1531",
    type: "Loan Paid",
    date: "Dec 29, 2:59 AM",
    status: "pending",
    total: "$ 329.40",
  },
  {
    id: "#1530",
    type: "Rewards Recieved",
    date: "Dec 23, 6:20 AM",
    status: "pending",
    total: "$ 329.40",
  },
];
