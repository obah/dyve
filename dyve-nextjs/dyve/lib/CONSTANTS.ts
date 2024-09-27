import { IFeatureItem, INavbar } from "./types";

export const NavItems: INavbar[] = [
  { title: "home", href: "/" },
  { title: "about", href: "/about" },
  { title: "dashboard", href: "/dashboard" },
  { title: "loan", href: "/loan" },
  { title: "savings", href: "/savings" },
  { title: "academy", href: "/academy" },
];

export const features: IFeatureItem[] = [
  {
    title: "Microloans",
    desc: "Need a small loan for personal or business",
    img: "/assets/wallet.png",
    href: "/loan",
  },
  {
    title: "Savings",
    desc: "simple way to save money, earning interest and growing your funds safely",
    img: "/assets/piggy-bank.png",
    href: "/saving",
  },
  {
    title: "Identity Verification",
    desc: "blockchain-based identity solutions to help you access financial services.",
    img: "/assets/phone.png",
    href: "/dashboard",
  },
  {
    title: "Academy",
    desc: "Learn at your own pace, get paid for it and get certified",
    img: "/assets/grade.png",
    href: "/academy",
  },
];
