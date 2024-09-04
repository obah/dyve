import { PropsWithChildren } from "react";

export function CatalogWrapper({ children }: PropsWithChildren) {
  return (
    <div className="rounded-r1 w-[360px] space-y-4 border-[0.5px] border-purple-2/10 bg-gradient-to-br from-purple-1/10 p-6 drop-shadow-xl">
      {children}
    </div>
  );
}
