import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { cookieStorage, createStorage } from "wagmi";
import { liskSepolia } from "wagmi/chains";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

export const config = getDefaultConfig({
  appName: "Dyve",
  projectId: projectId,
  chains: [liskSepolia],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
